import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserCreditsQuery } from "../../services/api/generationApi";
import { userApi } from "../../services/api/userApi";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const [countdown, setCountdown] = useState(5);

  // Fetch updated credits if authenticated
  const { data: creditsData, refetch, isLoading: creditsLoading } = useGetUserCreditsQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isAuthenticated && sessionId) {
      // Invalidate User tag to ensure profile updates after payment
      dispatch(userApi.util.invalidateTags(["User"]));
      // Refetch credits to show updated balance
      refetch();
    }
  }, [sessionId, isAuthenticated, refetch, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/user-profile");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#131B27] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-400 mb-4">
            Your payment has been processed successfully.
          </p>
          {isAuthenticated && (
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <p className="text-gray-300 text-sm mb-1">Your Credits</p>
              {creditsLoading ? (
                <p className="text-2xl font-bold text-white">Loading...</p>
              ) : (
                <p className="text-2xl font-bold text-white">
                  {creditsData?.generationCredits || 0}
                </p>
              )}
            </div>
          )}
          <p className="text-gray-400 text-sm">
            Redirecting to your profile in {countdown} seconds...
          </p>
        </div>
        <button
          onClick={() => navigate("/user-profile")}
          className="w-full px-6 py-3 rounded-lg font-bold text-white transition duration-300"
          style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

