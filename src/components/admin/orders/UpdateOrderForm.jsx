import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import Spinners from '../../Spinners';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatusFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Accepted",
];

const UpdateOrderForm = ({ setOpen, selectedId, selectedItem, loader, setLoader }) => {

  const [orderStatus, setOrderStatus] = useState(selectedItem?.status || 'Accepted');
  const [error, setError] = useState("");
  const dispatch = useDispatch();
   const {user} = useSelector((state)=>state.auth);
   const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const updateOrderStatus = (e) => {
    e.preventDefault();
   if (!orderStatus) {
        setError("Order status  is requires");
        return;
   }
   dispatch(updateOrderStatusFromDashboard(
        selectedId,
        orderStatus,
        toast,
        setLoader,
        isAdmin,
   ));

  };

  return (
    <div className='relative py-5 h-full'>
      <div className='pb-20'>
        <form className='space-y-4' onSubmit={updateOrderStatus}>
          <FormControl fullWidth variant='outlined' error={!!error}>
            <InputLabel id="order-status-label">Order Status</InputLabel>
            <Select
              labelId="order-status-label"
              label="Order Status"
              value={orderStatus}
              onChange={(e) => {
                setOrderStatus(e.target.value);
                setError("");
              }}
            >
              {ORDER_STATUSES.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </form>
      </div>

      <div className='absolute bottom-0 left-0 right-0 px-1 py-4 bg-white flex justify-between items-center border-t'>
        <button
          disabled={loader}
          onClick={() => setOpen(false)}
          type='button'
          className='text-gray-700 py-[10px] px-4 text-sm font-medium border rounded'
        >
          Cancel
        </button>

       <button
              disabled={loader}
              onClick={updateOrderStatus}
              type='button'
              className='bg-custom-blue text-white py-[10px] px-4 text-sm font-medium rounded flex items-center justify-center gap-2'
            >
              {loader ? (
                <>
                  <Spinners /> Loading...
                </>
              ) : (
                "Update"
              )}
         </button>
      </div>

    </div>
  );
};

export default UpdateOrderForm;