import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBarcode,
  FaChartLine,
} from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import OverlayLoader from "../../common/OverlayLoader";
import { useCreateOrderMutation } from "../../../store/apis/endpoints/checkout";

import {
  selectCartItems,
  selectVatDetails,
  clearCart,
} from "../../../store/slice/cartSlice";

import toast from "react-hot-toast";

function PaymentResponse() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const vatDetails = useSelector(selectVatDetails);
  const [checkout, { isLoading }] = useCreateOrderMutation();

  const params = new URLSearchParams(location.search);
  const status = params.get("status");
  const transactionId = params.get("transactionId");
  const orderNumber = params.get("orderNumber");

  // Get userId from sessionStorage
  const userId = sessionStorage.getItem("temp_payment_user_id");

  console.log(userId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const completeCheckout = async () => {
      if (status === "success" && orderNumber && !loading) {
        try {
          const formattedCartItems = cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            addons: (item.selectedAddons || []).map((addon) => ({
              id: addon.id,
              quantity: addon.quantity,
            })),
          }));

          const checkoutPayload = {
            userId,
            cartItems: formattedCartItems,
            paymentType: "card",
            vat: vatDetails.value,
            orderNumber: orderNumber,
          };

          const response = await checkout(checkoutPayload);
          if (response.data) {
            dispatch(clearCart());
            toast.success("Payment processed successfully!");
          }
        } catch (error) {
          console.error("Checkout failed:", error);
          toast.error(error?.data?.message || "Checkout failed");
        }
      }
    };

    completeCheckout();
  }, [status, orderNumber, loading]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-10 rounded-2xl shadow-2xl bg-white max-w-md w-full mx-4 border border-gray-100"
        >
          <ImSpinner8 className="animate-spin text-blue-500 text-5xl mx-auto mb-6" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-3">
            Processing Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your payment...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {isLoading && <OverlayLoader />}
      {status === "success" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center p-10 rounded-2xl shadow-2xl bg-white max-w-md w-full border border-gray-100"
        >
          <div className="flex justify-center items-center h-20 pb-3">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-navy-600 to-navy-400 bg-clip-text text-transparent mb-6">
            Purchase Complete! 🎉
          </h2>
          <div className="space-y-4 mb-8">
            <p className="text-gray-600 text-lg">
              Barcodes have been successfully purchased and assigned to the
              selected member's account.
            </p>
            <p className="text-gray-500">
              The member can now access and use these barcodes through their
              dashboard.
            </p>
            {transactionId && (
              <div className="bg-gray-50 p-4 rounded-xl backdrop-blur-sm border border-gray-100">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Transaction ID:</span>{" "}
                  <span className="font-mono">{transactionId}</span>
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/admin/view-member/${userId}`)}
              className="bg-gradient-to-r from-navy-700 to-navy-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform w-full flex items-center justify-center gap-2"
            >
              <FaChartLine className="text-lg" />
              Back to Member Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin/members")}
              className="bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform flex items-center justify-center gap-2"
            >
              <FaBarcode className="text-lg" />
              View All Members
            </motion.button>
          </div>
        </motion.div>
      )}

      {status === "pending" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center p-10 rounded-2xl shadow-2xl bg-white max-w-md w-full border border-gray-100"
        >
          <motion.div variants={iconVariants}>
            <BiTime className="text-yellow-500 text-7xl mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent mb-6">
            Payment Pending
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Your payment is being processed. Please wait...
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/dashboard")}
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
          >
            Return to Home
          </motion.button>
        </motion.div>
      )}

      {(status === "failed" || status === "error" || !status) && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center p-10 rounded-2xl shadow-2xl bg-white max-w-md w-full border border-gray-100"
        >
          <motion.div variants={iconVariants}>
            <FaTimesCircle className="text-red-500 text-7xl mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-6">
            Payment Failed
          </h2>
          <div className="space-y-3 mb-8">
            <p className="text-gray-600 text-lg">
              The payment transaction could not be completed.
            </p>
            <p className="text-gray-500">
              Please try again or use a different payment method.
            </p>
          </div>
          {/* <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/member-portal/my-barcodes/buy/payment")}
              className="bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
            >
              Try Again
            </motion.button>
            <button
              className="text-navy-700 hover:text-navy-800 font-medium text-sm mt-2"
              onClick={() =>
                window.open("https://gstsa1.org/template3/contact-us", "_blank")
              }
            >
              Need help? Contact support
            </button>
          </div> */}
        </motion.div>
      )}
    </div>
  );
}

export default PaymentResponse;
