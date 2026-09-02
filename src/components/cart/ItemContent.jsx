import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
} from "../../store/actions";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";
import truncateText from "../../utils/truncate";

const ItemContent = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  cartId,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();

  // Check image value
  console.log("CART IMAGE:", image);
  console.log("PRODUCT:", productName);

  const cartItem = {
    image,
    productName,
    description,
    specialPrice,
    price,
    productId,
    quantity,
  };

  const handeQtyIncrease = () => {
    dispatch(
      increaseCartQuantity(
        cartItem,
        toast,
        currentQuantity,
        setCurrentQuantity
      )
    );
  };

  const handleQtyDecrease = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;

      setCurrentQuantity(newQuantity);

      dispatch(decreaseCartQuantity(cartItem, newQuantity));
    }
  };

  const removeItemFromCart = () => {
    dispatch(removeFromCart(cartItem, toast));
  };

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-slate-200 rounded-md lg:px-4 py-4 p-2">

      {/* Product */}
      <div className="md:col-span-2 justify-self-start flex flex-col gap-2">

        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">

          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
            {truncateText(productName)}
          </h3>

        </div>

        {/* Image */}
        <div className="md:w-50 sm:w-24 w-12">

          <img
            src={image}
            alt={productName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
            onError={(e) => {
              console.log("IMAGE LOAD FAILED:", image);
            }}
          />

        </div>

        {/* Remove Button */}
        <div className="flex items-start gap-5 mt-3">

          <button
            onClick={removeItemFromCart}
            className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200"
          >
            <HiOutlineTrash
              size={16}
              className="text-rose-600"
            />

            Remove
          </button>

        </div>

      </div>

      {/* Price */}
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {formatPrice(Number(specialPrice))}
      </div>

      {/* Quantity */}
      <div className="justify-self-center">

        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handeQtyIncrease={handeQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />

      </div>

      {/* Total */}
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {formatPrice(
          Number(currentQuantity) * Number(specialPrice)
        )}
      </div>

    </div>
  );
};

export default ItemContent;