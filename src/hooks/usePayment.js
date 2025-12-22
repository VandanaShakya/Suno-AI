import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCheckoutSessionMutation } from "../services/api/paymentApi";
import { useSelector } from "react-redux";

/**
 * Custom hook for handling payment checkout flow
 */
export const usePayment = () => {
  const [createCheckoutSession, { isLoading }] = useCreateCheckoutSessionMutation();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const handlePayment = async (planType) => {
    // Handle free plan activation
    if (planType === "free") {
      if (!isAuthenticated) {
        navigate("/signin");
        return;
      }
      // Free plan is already active for logged-in users
      // Could show a success message or redirect
      navigate("/user-profile");
      return;
    }

    // Check authentication for paid plans
    if (!isAuthenticated) {
      navigate("/signin", { state: { redirectTo: "/Pricing" } });
      return;
    }

    try {
      setError(null);
      const result = await createCheckoutSession(planType).unwrap();
      
      if (result.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = result.checkoutUrl;
      } else {
        setError("Failed to create checkout session");
      }
    } catch (err) {
      const errorMessage = err?.data?.error?.message || "Failed to initiate payment. Please try again.";
      setError(errorMessage);
    }
  };

  return {
    handlePayment,
    isLoading,
    error,
  };
};

