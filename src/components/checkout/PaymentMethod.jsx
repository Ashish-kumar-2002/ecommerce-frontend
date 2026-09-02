import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";
const PaymentMethod = () => {
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState(" ");

  // Redux State
  const { cart, cartId } = useSelector((state) => state.carts);

  const { errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      dispatch(createUserCart(sendCartItems));
    }
  }, [dispatch, cart, cartId, errorMessage]);

  const paymentMethodHandler = (event) => {
    const method = event.target.value;

    setPaymentMethod(method);
    dispatch(addPaymentMethod(method));
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
      <h1 className="text-2xl font-semibold mb-4">
        Select Payment Method
      </h1>

      <FormControl>
        <RadioGroup
          value={paymentMethod}
          onChange={paymentMethodHandler}
        >
          <FormControlLabel
            value="Stripe"
            control={<Radio />}
            label="Stripe"
          />

          <FormControlLabel
            value="Paypal"
            control={<Radio />}
            label="Paypal"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;







