import React from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { Dialog, DialogBackdrop,DialogPanel,DialogTitle,} from "@headlessui/react";

export const DeleteModal = ({ open,setOpen,title,onDeleteHandler,loader,
}) => {
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-50"
    >
      {/* Background */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            {/* Close Button */}
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                disabled={loader}
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            {/* Icon + Text */}
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <FaExclamationTriangle className="text-red-600" />
              </div>

              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  {title}
                </DialogTitle>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete?
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                disabled={loader}
                type="button"
                onClick={onDeleteHandler}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 sm:ml-3 sm:w-auto"
              >
                {loader ? "Loading..." : "Delete"}
              </button>

              <button
                disabled={loader}
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};