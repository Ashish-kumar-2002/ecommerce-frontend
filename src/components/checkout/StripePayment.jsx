// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// import PaymentForm from "./PaymentForm";
// import { createStripePaymentSecret } from "../../store/actions";
// import { Description } from "@headlessui/react";

// const stripePromise = loadStripe(
//   import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
//   {
//     developerTools: {
//       assistant: {
//         enabled: false,
//       },
//     },
//   }
// );

// // const StripePayment = () => {
// //   const dispatch = useDispatch();

// //   const { clientSecret } = useSelector((state) => state.auth);
// //   const { totalPrice } = useSelector((state) => state.carts);
// //   const {user,selectedUserCheckoutAddress} =  useSelector((state)=>state.auth);

// //   console.log(
// //     "STRIPE PAYMENT CLIENT SECRET =",
// //     clientSecret
// //   );

// //   console.log(
// //     "TOTAL PRICE =",
// //     totalPrice
// //   );

// //   console.log(
// //     "STRIPE KEY =",
// //     import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
// //   );

// //   useEffect(() => {
// //     if (!clientSecret && totalPrice) {
// //       const sendData={
// //         amount:Number(totalPrice) * 100,
// //         currency:"usd",
// //         email:user.email,
// //         name: '${user.username}',
// //         address:selectedUserCheckoutAddress,
// //         Description:'Order for ${user.email}',
// //         metadata:{
// //           test:1
// //         }
// //       }
// //       dispatch(createStripePaymentSecret(sendData));
// //     }
// //   }, [clientSecret, totalPrice, dispatch]);

// const StripePayment = () => {
//   const dispatch = useDispatch();

//   const { clientSecret } = useSelector((state) => state.auth);
//   const { totalPrice } = useSelector((state) => state.carts);
//   const { user, selectedUserCheckoutAddress } =
//     useSelector((state) => state.auth);

//   console.log("STRIPE PAYMENT CLIENT SECRET =", clientSecret);
//   console.log("TOTAL PRICE =", totalPrice);
//   console.log(
//     "STRIPE KEY =",
//     import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
//   );

//   useEffect(() => {
//     if (
//       !clientSecret &&
//       totalPrice &&
//       user &&
//       selectedUserCheckoutAddress
//     ) {
//       const sendData = {
//         amount: Number(totalPrice) * 100,
//         currency: "usd",
//         email: user.email,
//         name: user.username,
//         address: selectedUserCheckoutAddress,
//         description: `Order for ${user.email}`,
//         metadata: {
//           test: "1"
//         }
//       };

//       console.log("STRIPE SEND DATA =", sendData);

//       dispatch(createStripePaymentSecret(sendData));
//     }
//   }, [
//     clientSecret,
//     totalPrice,
//     user,
//     selectedUserCheckoutAddress,
//     dispatch
//   ]);

//   // baaki tumhara code...

//   // Client secret abhi nahi mila
//   if (!clientSecret) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <p className="text-lg">
//           Loading payment information...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <Elements
//       stripe={stripePromise}
//       options={{
//         clientSecret: clientSecret,
//       }}
//     >
//       <PaymentForm
//         clientSecret={clientSecret}
//         totalPrice={totalPrice}
//       />
//     </Elements>
//   );
// };

// export default StripePayment;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";
import { createStripePaymentSecret } from "../../store/actions";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  {
    developerTools: {
      assistant: {
        enabled: false,
      },
    },
  }
);

const StripePayment = () => {
  const dispatch = useDispatch();

  const { clientSecret, user, selectedUserCheckoutAddress } =
    useSelector((state) => state.auth);

  const { totalPrice } = useSelector((state) => state.carts);

  console.log(
    "STRIPE PAYMENT CLIENT SECRET =",
    clientSecret
  );

  console.log("TOTAL PRICE =", totalPrice);

  console.log(
    "STRIPE KEY =",
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  );

  useEffect(() => {
    if (
      !clientSecret &&
      totalPrice &&
      user &&
      selectedUserCheckoutAddress
    ) {
      const sendData = {
        amount: Number(totalPrice) * 100,
        currency: "usd",
        email: user.email,
        name: user.username,
        address: selectedUserCheckoutAddress,
        description: `Order for ${user.email}`,
        metadata: {
          test: "1",
        },
      };

      console.log("STRIPE SEND DATA =", sendData);

      dispatch(createStripePaymentSecret(sendData));
    }
  }, [
    clientSecret,
    totalPrice,
    user,
    selectedUserCheckoutAddress,
    dispatch,
  ]);

  // Client secret abhi nahi mila
  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg">
          Loading payment information...
        </p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: clientSecret,
      }}
    >
      <PaymentForm
        clientSecret={clientSecret}
        totalPrice={totalPrice}
      />
    </Elements>
  );
};

export default StripePayment;