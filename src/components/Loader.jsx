import React from "react";

export default function Loader({
  accent = "fuchsia",
  maxScale = 4,
  speed = 0.2,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
      <div
        className="flex gap-[0.3em] skew-x-[15deg] skew-y-[10deg] items-end"
        style={{
          "--accent": accent,
          "--max-scale": maxScale,
          "--speed": speed,
        }}
        aria-hidden
      >
        {[0, 1, 2, 3, 0, 1, 2, 3].map((i, idx) => (
          <span
            key={idx}
            className={`spinner-part-${i} block`}
            style={{
              backgroundColor: "var(--accent)",
              boxShadow: "1px 1px 5px 0.2px var(--accent)",
              width: "0.7px",
              height: "0.6em",
            }}
          />
        ))}
      </div>
    </div>
  );
}
