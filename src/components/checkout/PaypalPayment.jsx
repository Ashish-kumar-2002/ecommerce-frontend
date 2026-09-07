import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const PaypalPayment = () => {
  return (
    <div className="flex justify-center mt-5">
      <Alert
        severity="warning"
        variant="filled"
        sx={{ maxWidth: "400px", width: "100%" }}
      >
        <AlertTitle>PayPal Unavailable</AlertTitle>

        PayPal payment is unavailable. Please use another payment method.
      </Alert>
    </div>
  );
};

export default PaypalPayment;