import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  const { cart = [] } = useSelector((state) => state.carts);

  const totalPrice = cart.reduce(
    (acc, cur) =>
      acc + Number(cur.specialPrice || 0) * Number(cur.quantity || 0),
    0
  );

  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">

      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <MdShoppingCart size={36} className="text-gray-700" />

        <h1 className="text-4xl font-bold text-gray-900">
          Your Cart
        </h1>

        <p className="text-lg text-gray-600 mt-2">
          All your selected items
        </p>
      </div>

      {/* Table Header */}
      <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
        <div className="md:col-span-2 text-lg">
          Product
        </div>

        <div className="text-center text-lg">
          Price
        </div>

        <div className="text-center text-lg">
          Quantity
        </div>

        <div className="text-center text-lg">
          Total
        </div>
      </div>

      {/* Cart Items */}
      <div>
        {cart.map((item, index) => (
          <ItemContent
            key={item.productId || index}
            {...item}
          />
        ))}
      </div>

      {/* Subtotal */}
      <div className="border-t border-slate-300 mt-6 pt-4 flex justify-between flex-wrap">

        <div></div>

        <div className="flex flex-col gap-4">

          <div className="flex justify-between w-[300px]">
            <span className="font-semibold">
              Subtotal
            </span>

            <span className="font-semibold">
              {totalPrice.toFixed(2)}
            </span>
          </div>

          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>

          <Link to="/checkout">
            <button className="w-full py-2 rounded bg-blue-600 text-white flex justify-center items-center gap-2">
              <MdShoppingCart size={20} />
              Checkout
            </button>
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-2 text-slate-500"
          >
            <MdArrowBack />
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Cart;

