import { API_BASE_URL } from "../config/api";

/**
 * SSE Client with fallback support
 * Handles Server-Sent Events connections with automatic reconnection
 * and fallback to polling if SSE is not supported or fails
 */
export class SSEClient {
  constructor(taskId, token, options = {}) {
    this.taskId = taskId;
    this.token = token;
    this.eventSource = null;
    this.isConnected = false;
    this.shouldReconnect = true;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    this.reconnectDelay = options.reconnectDelay || 3000;
    this.onMessage = options.onMessage || null;
    this.onError = options.onError || null;
    this.onOpen = options.onOpen || null;
    this.onClose = options.onClose || null;
    this.fallbackCallback = options.fallbackCallback || null;
    this.useFallback = false;
  }

  /**
   * Connect to SSE endpoint
   */
  connect() {
    // Check if EventSource is supported
    if (typeof EventSource === "undefined") {
      console.warn("EventSource not supported, using fallback");
      this.startFallback();
      return;
    }

    try {
      const url = `${API_BASE_URL}/v1/tasks/${this.taskId}/stream`;
      
      // EventSource doesn't support custom headers, so we'll use query param for auth
      // Note: This is less secure but necessary for EventSource. Consider using cookies or
      // a different approach for production if security is a concern
      const urlWithAuth = `${url}?token=${encodeURIComponent(this.token)}`;
      
      // For proper auth, we'd need to use fetch with ReadableStream, but that's more complex
      // For now, we'll use EventSource and handle auth via query param (backend should validate)
      this.eventSource = new EventSource(urlWithAuth);

      this.eventSource.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        if (this.onOpen) {
          this.onOpen();
        }
      };

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === "connected") {
            console.log("SSE connection established");
            return;
          }

          if (data.type === "task_update" && this.onMessage) {
            this.onMessage(data.data);
          }
        } catch (error) {
          console.error("Failed to parse SSE message:", error);
        }
      };

      this.eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);
        this.isConnected = false;

        if (this.eventSource.readyState === EventSource.CLOSED) {
          // Connection closed, attempt reconnect or fallback
          if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
              if (this.shouldReconnect) {
                this.connect();
              }
            }, this.reconnectDelay * this.reconnectAttempts);
          } else {
            // Max reconnection attempts reached, use fallback
            if (this.onError) {
              this.onError(error);
            }
            this.startFallback();
          }
        }
      };
    } catch (error) {
      console.error("Failed to create SSE connection:", error);
      if (this.onError) {
        this.onError(error);
      }
      this.startFallback();
    }
  }

  /**
   * Start fallback polling mechanism
   */
  startFallback() {
    if (this.useFallback) {
      return; // Already using fallback
    }

    this.useFallback = true;
    console.log("Using polling fallback for task updates");

    if (this.fallbackCallback) {
      this.fallbackCallback();
    }
  }

  /**
   * Close SSE connection
   */
  close() {
    this.shouldReconnect = false;
    this.isConnected = false;

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    if (this.onClose) {
      this.onClose();
    }
  }

  /**
   * Check if currently connected
   */
  get connected() {
    return this.isConnected && !this.useFallback;
  }
}

/**
 * Create an SSE client with proper authentication
 * Uses fetch API with ReadableStream for proper header support
 */
export function createSSEClient(taskId, token, options = {}) {
  // Always use fetch-based SSE for proper Bearer token authentication
  // EventSource doesn't support custom headers, so we use fetch + ReadableStream
  return new FetchSSEClient(taskId, token, options);
}

/**
 * Fetch-based SSE client that supports custom headers
 */
class FetchSSEClient {
  constructor(taskId, token, options = {}) {
    this.taskId = taskId;
    this.token = token;
    this.controller = null;
    this.isConnected = false;
    this.shouldReconnect = true;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    this.reconnectDelay = options.reconnectDelay || 3000;
    this.onMessage = options.onMessage || null;
    this.onError = options.onError || null;
    this.onOpen = options.onOpen || null;
    this.onClose = options.onClose || null;
    this.fallbackCallback = options.fallbackCallback || null;
    this.useFallback = false;
  }

  async connect() {
    try {
      this.controller = new AbortController();
      const url = `${API_BASE_URL}/v1/tasks/${this.taskId}/stream`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "text/event-stream",
        },
        signal: this.controller.signal,
      });

      if (!response.ok) {
        throw new Error(`SSE connection failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      this.isConnected = true;
      this.reconnectAttempts = 0;

      if (this.onOpen) {
        this.onOpen();
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.substring(6);
            try {
              const data = JSON.parse(dataStr);

              if (data.type === "connected") {
                console.log("SSE connection established");
                continue;
              }

              if (data.type === "task_update" && this.onMessage) {
                this.onMessage(data.data);
              }
            } catch (error) {
              console.error("Failed to parse SSE message:", error);
            }
          }
        }
      }
    } catch (error) {
      if (error.name === "AbortError") {
        // Connection was intentionally closed
        return;
      }

      console.error("SSE connection error:", error);
      this.isConnected = false;

      if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => {
          if (this.shouldReconnect) {
            this.connect();
          }
        }, this.reconnectDelay * this.reconnectAttempts);
      } else {
        if (this.onError) {
          this.onError(error);
        }
        this.startFallback();
      }
    }
  }

  startFallback() {
    if (this.useFallback) {
      return;
    }

    this.useFallback = true;
    console.log("Using polling fallback for task updates");

    if (this.fallbackCallback) {
      this.fallbackCallback();
    }
  }

  close() {
    this.shouldReconnect = false;
    this.isConnected = false;

    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }

    if (this.onClose) {
      this.onClose();
    }
  }

  get connected() {
    return this.isConnected && !this.useFallback;
  }
}

