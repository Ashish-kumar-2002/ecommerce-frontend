import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { stripePaymentConfirmation } from "../../store/actions";

const PaymentConfirmation = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get(
    "payment_intent_client_secret"
  );
  const redirectStatus = searchParams.get("redirect_status");

  const selectedUserCheckoutAddress =
    localStorage.getItem("CHECKOUT_ADDRESS")
      ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
      : null;

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus === "succeeded" &&
      selectedUserCheckoutAddress
    ) {
      const sendData = {
        addressId: selectedUserCheckoutAddress.addressId,
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };

      console.log("ORDER SEND DATA =", sendData);

      // Payment successful hai -> turant success screen dikhao
      setOrderSuccess(true);

      // Backend me order create karo
      dispatch(
        stripePaymentConfirmation(
          sendData,
          setErrorMessage,
          setLoading,
          toast,
          setOrderSuccess
        )
      );
    }
  }, [
    paymentIntent,
    clientSecret,
    redirectStatus,
    dispatch,
  ]);

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4">

      {orderSuccess ? (
        <>
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />

          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful!
          </h1>

          <p className="mt-3 text-gray-600 text-center">
            Thank you for your purchase! Your payment was successful,
            and your order has been placed successfully.
          </p>
        </>
      ) : errorMessage ? (
        <>
          <h1 className="text-3xl font-bold text-red-600">
            Order Failed
          </h1>

          <p className="mt-3 text-gray-600 text-center">
            {errorMessage}
          </p>
        </>
      ) : redirectStatus === "succeeded" ? (
        <>
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />

          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful!
          </h1>

          <p className="mt-3 text-gray-600 text-center">
            Payment was successful. We are processing your order.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600">
            Payment Failed
          </h1>

          <p className="mt-3 text-gray-600">
            Please try again.
          </p>
        </>
      )}

    </div>
  );
};

export default PaymentConfirmation;