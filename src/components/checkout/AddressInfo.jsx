import React, { useState } from "react";
import Skeleton from "../shared/Skeleton";
import { FaAddressBook } from "react-icons/fa";
import AddressInfoModel from "./AddressInfoModel";
import AddAddressForm from "./AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import AddressList from "./AddressList";
import { DeleteModal } from "./DeleteModel";
import { deleteUserAddress } from "../../store/actions";
import toast from "react-hot-toast";

const AddressInfo = ({ address }) => {
  console.log("AddressInfo Address =", address);

  const [openAddressModel, setOpenAddressModel] = useState(false);
  const [openDeleteModal, setOpenDeleteModel] = useState(false);
  const [SelectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();

  const { isLoading, btnLoader } = useSelector(
    (state) => state.errors
  );

  const addNewAddressHandler = () => {
    setSelectedAddress(null);
    setOpenAddressModel(true);
  };

  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddress(
        SelectedAddress?.addressId,
        toast,
        setOpenDeleteModel
      )
    );
  };

  const noAddressExist = !address || address.length === 0;

  return (
    <div className="w-full mt-16">
      {noAddressExist ? (
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-20">
          <FaAddressBook
            size={50}
            className="text-gray-500 mb-4"
          />

          <h1 className="text-center font-semibold text-gray-900 mb-2">
            No Address Added Yet
          </h1>

          <p className="text-gray-800 mb-6">
            Please add your address to complete purchase
          </p>

          <button
            onClick={addNewAddressHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto py-10">
          <h1 className="text-3xl font-bold text-center mb-8">
            Select Address
          </h1>

          {isLoading ? (
            <div className="px-10">
              <Skeleton />
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <AddressList
                  addresses={address}
                  setSelectedAddress={setSelectedAddress}
                  setOpenAddressModel={setOpenAddressModel}
                  setOpenDeleteModel={setOpenDeleteModel}
                />
              </div>

              {address.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={addNewAddressHandler}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md"
                  >
                    Add More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <AddressInfoModel
        open={openAddressModel}
        setOpen={setOpenAddressModel}
      >
        <AddAddressForm
          address={SelectedAddress}
          setOpenAddressModel={setOpenAddressModel}
        />
      </AddressInfoModel>

      <DeleteModal
        open={openDeleteModal}
        loader={btnLoader}
        setOpen={setOpenDeleteModel}
        title="Delete Address"
        onDeleteHandler={deleteAddressHandler}
      />
    </div>
  );
};

export default AddressInfo;

