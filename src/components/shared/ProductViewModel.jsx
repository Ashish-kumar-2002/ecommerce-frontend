import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import Status from "./Status";
import { FaCheck, FaTimes } from "react-icons/fa";

function ProductViewModel({ open, setOpen, product, isAvailable }) {
  if (!product) return null;

  const {
    productName,
    image,
    description,
    price,
    specialPrice,
  } = product;

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-50"
      onClose={() => setOpen(false)}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">

          <img
            src={image}
            alt={productName}
            className="w-full h-80 object-cover"
          />

          <div className="p-6">

            <DialogTitle className="text-3xl font-bold mb-4">
              {productName}
            </DialogTitle>

            <p className="text-gray-600 mb-6">
              {description}
            </p>

            <div className="flex justify-between items-center mb-6">

              <div>
                <span className="line-through text-gray-400 mr-3 text-lg">
                  ${price}
                </span>

                <span className="text-2xl font-bold text-black">
                  ${specialPrice}
                </span>
              </div>

              {isAvailable ? (
                <Status
                  text="In Stock"
                  Icon={FaCheck}
                  bg="bg-green-100"
                  color="text-green-700"
                />
              ) : (
                <Status
                  text="Out Of Stock"
                  Icon={FaTimes}
                  bg="bg-red-100"
                  color="text-red-700"
                />
              )}

            </div>

            <Button
              onClick={() => setOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Close
            </Button>

          </div>

        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ProductViewModel;


