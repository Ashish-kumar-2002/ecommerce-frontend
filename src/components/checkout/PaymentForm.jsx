import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("PAYMENT FORM CLIENT SECRET =", clientSecret);
  console.log("PAYMENT FORM STRIPE =", stripe);
  console.log("PAYMENT FORM ELEMENTS =", elements);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
      },
    });

    if (error) {
      console.error("STRIPE PAYMENT ERROR =", error);
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">
        Payment Information
      </h2>

      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      {errorMessage && (
        <p className="text-red-500 mt-4">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isLoading || !clientSecret}
        className="text-white w-full px-5 py-[10px] bg-black mt-6 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {isLoading
          ? "Processing..."
          : `Pay $${Number(totalPrice).toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;