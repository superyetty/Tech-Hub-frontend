import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserProvider";
import AuthHeader from "../../components/auth-header/AuthHeader";
import Footer from "../../components/Footer";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { initializePayment, verifyPayment } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const checkoutId = searchParams.get("checkoutId");
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  useEffect(() => {
    // If coming back from Paystack with reference, verify payment
    if (reference) {
      verifyPaymentStatus();
    }
  }, [reference]);

  const handleInitializePayment = async () => {
    if (!checkoutId) {
      setError("Checkout ID is missing");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await initializePayment(checkoutId);

      if (result.success && result.authorization_url) {
        window.location.href = result.authorization_url;
      } else {
        setError(result.message || "Failed to initialize payment");
      }
    } catch (err) {
      setError(err.message || "An error occurred while initializing payment");
    } finally {
      setLoading(false);
    }
  };

  const verifyPaymentStatus = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await verifyPayment(reference);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/user/dashboard");
        }, 2000);
      } else {
        setError(result.message || "Payment verification failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred while verifying payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="flex items-center gap-x-3 mb-12">
            <p className="text-sm text-gray-400 cursor-pointer">Account</p>
            <span className="text-gray-400">/</span>
            <p className="text-sm text-gray-400 cursor-pointer">Checkout</p>
            <span className="text-gray-400">/</span>
            <p className="text-sm cursor-pointer">Payment</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-2">Payment</h1>
            <p className="text-gray-500 mb-8">
              Complete your purchase securely
            </p>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-center font-medium">
                  Payment verified successfully! Redirecting to dashboard...
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-center text-sm">{error}</p>
              </div>
            )}

            {reference && !success && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-center text-sm">
                  Verifying your payment...
                </p>
              </div>
            )}

            {!reference && (
              <div className="mb-8 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold">Paystack</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-yellow-600">Pending</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Click the button below to proceed to secure payment with
                  Paystack.
                </p>
              </div>
            )}

            {!reference && (
              <div className="mb-8 flex justify-center items-center gap-4">
                <div className="h-8 w-20 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">
                    Paystack
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/user/checkout")}
                disabled={loading}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Back to Checkout
              </button>
              {!reference && (
                <button
                  onClick={handleInitializePayment}
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-[#DB4444] text-white font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              )}
            </div>

            <p className="mt-6 text-xs text-gray-500 text-center">
              🔒 Your payment is secure and encrypted
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
