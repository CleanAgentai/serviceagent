import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const navigate = useNavigate();

  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    fetch(`${apiBaseUrl}/api/stripe/verify-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Verification failed");
        return res.json();
      })
      .then((data) => {
        if (data.paid) {
          setStatus("success");
          // Redirect to company profile setup after successful payment
          setTimeout(() => {
            navigate("/post-signup");
          }, 3000);
        } else {
          setStatus("error");
        }
      })
      .catch((err) => {
        console.error("Verification error:", err);
        setStatus("error");
      });
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="max-w-md w-full text-center p-8 rounded-lg">
        {status === "verifying" && (
          <>
            <h2 className="text-xl font-semibold">Verifying your payment...</h2>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600">Payment Successful</h2>
            <p className="text-gray-600 mt-2">Thank you for your subscription.</p>
            <button
              onClick={() => navigate("/post-signup")}
              className="mx-auto w-full group flex items-center justify-center mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-full
              border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
            >
              Complete Your Profile
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600">Payment Verification Failed</h2>
            <p className="text-gray-600 mt-2">Please contact support or try again.</p>
            <button
              onClick={() => navigate("/")}
              className="mx-auto w-full group flex items-center justify-center mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-full
              border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;