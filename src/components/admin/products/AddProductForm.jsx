// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import InputField from '../../shared/InputField';
// import Spinners from '../../Spinners';
// import { useDispatch, useSelector } from 'react-redux';
// import { addNewProductFormDashboard, fetchCategories, updateProductFromDashboard } from '../../../store/actions';
// import toast from 'react-hot-toast';
// import SelectTextField from '../../shared/SelectTexField ';
// import Skeleton from '@mui/material/Skeleton';
// import ErrorPage from '../../shared/ErrorPage'; 

// const AddProductForm = ({ setOpen, product, update = false }) => {
//   const [loader, setLoader] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState();
//   const {categories} = useSelector((state)=>state.products);
//   const {categoriesLoader,errorsMessage} = useSelector((state)=>state.errors);
//   const {user } = useSelector((state)=>state.auth); 
// const isAdmin = user?.roles?.includes("ROLE_ADMIN"); 
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors }
//   } = useForm({
//     mode: "onTouched"
//   })

// //   const saveProductHandler = (data) => {
// //     if (!update) {
// //       // const sendData = {
// //       //   ...data,
// //       //   categoryId: selectedCategory.categoryId,
// //       // };
// //       // dispatch(addNewProductFormDashboard(
// //       //   sendData,toast,reset,setLoader,setOpen
// //       // ));


// //       const sendData = {
// //   ...data,
// //   productId: product?.id,   // <-- key ka naam "productId" hai
// // };


// // dispatch(updateProductFromDashboard(sendData, toast, setLoader, setOpen));
// //     } else {
// //       const sendData = {
// //         ...data,
// //         id: product.id,
// //       };
// //       dispatch(updateProductFromDashboard(sendData, toast, reset, setLoader, setOpen));
// //     }
// //   };

// const saveProductHandler = (data) => {
//   if (!update) {
//     // Naya product add karna hai
//     const sendData = {
//       ...data,
//       categoryId: selectedCategory.categoryId,
//     };
//     dispatch(addNewProductFormDashboard(sendData, toast, reset, setLoader, setOpen,isAdmin));
//   } else {
//     // Existing product update karna hai
//     const sendData = {
//       ...data,
//       id: product.id,
//     };
//     dispatch(updateProductFromDashboard(sendData, toast, setLoader, setOpen));
//   }
// };

//   useEffect(() => {
//     if (update && product) {
//       setValue("productName", product?.productName);
//       setValue("price", product?.price);
//       setValue("quantity", product?.quantity);
//       setValue("discount", product?.discount);
//       setValue("specialPrice", product?.specialPrice);
//       setValue("description", product?.description);
//     }
//   })

//   useEffect(() => {
//     if (!update) {
//       dispatch(fetchCategories());
//     }
//   }, [dispatch, update]);

//   useEffect(() => {
//     if (categories) {
//       setSelectedCategory(categories[0]);
//     }
//   }, [categories, categoriesLoader]);


//   if (categoriesLoader) return <Skeleton />
//   if (errorsMessage) return <ErrorPage message={errorsMessage} />


//   const onSubmit = (data) => {
//     const sendData = {
//       ...data,
//       productId: product?.id,
//     };

//     console.log("Form Data:", sendData);

//     dispatch(updateProductFromDashboard(sendData, toast, setLoader, setOpen));
//   };

//   return (
//     <div className='py-5 relative h-full'>
//       <form className='space-y-4'
//         onSubmit={handleSubmit(saveProductHandler)}
//       >
//         <div className='flex md:flex-row flex-col gap-4 w-full'>
//           <InputField
//             label="Product Name"
//             required
//             id="productName"
//             type="text"
//             message="This filed is  required"
//             register={register}
//             placeholder="Product Name"
//             errors={errors}
//           />

//           {!update && (
//             <SelectTextField
//               label="Select Categories"
//               select={selectedCategory}
//               setSelect={setSelectedCategory}
//               lists={categories}
//             />
//           )}
//         </div>

//         <div className='flex md:flex-row flex-col gap-4 w-full'>
//           <InputField
//             label="Price"
//             required
//             id="price"
//             type="number"
//             message="This filed is  required"
//             register={register}
//             placeholder="Product price"
//             errors={errors}
//           />

//           <InputField
//             label="Quantity"
//             required
//             id="quantity"
//             type="number"
//             message="This filed is  required"
//             register={register}
//             placeholder="Quantity Name"
//             errors={errors}
//           />
//         </div>

//         <div className='flex md:flex-row flex-col gap-4 w-full'>
//           <InputField
//             label="Discount"
//             required
//             id="discount"
//             type="number"
//             message="This filed is  required"
//             register={register}
//             placeholder="Product Discount"
//             errors={errors}
//           />

//           <InputField
//             label="Special Price"
//             required
//             id="specialPrice"
//             type="number"
//             message="This filed is  required"
//             register={register}
//             placeholder="Special Price"
//             errors={errors}
//           />
//         </div>

//         <div className='flex flex-col gap-2 w-full'>
//           <label htmlFor="desc"
//             className='font-semibold text-sm text-slate-800'>
//             Description
//           </label>

//           <textarea
//             rows={5}
//             placeholder="Add Product description..."
//             className={`px-4 py-2 w-full border outline-none bg-transparent text-slate-800 rounded-md ${
//               errors["description"]?.message ? "border-red-500" : "border-slate-700"
//             }`}
//             maxLength={255}
//             {...register("description", {
//               required: { value: true, message: "Description is required " },
//             })}
//           />

//           {errors["description"]?.message && (
//             <p className="text-sm font-semibold text-red-600 mt-0">
//               {errors["description"]?.message}
//             </p>
//           )}
//         </div>

//         <div className='absolute bottom-0 left-0 right-0 px-1 py-4 bg-white flex justify-between items-center border-t'>
//           <button
//             disabled={loader}
//             onClick={() => setOpen(false)}
//             type='button'
//             className='text-gray-700 py-[10px] px-4 text-sm font-medium border rounded'
//           >
//             Cancel
//           </button>

//           <button
//             disabled={loader}
//             onClick={handleSubmit(onSubmit)}
//             type='button'
//             className='bg-custom-blue text-white py-[10px] px-4 text-sm font-medium rounded flex items-center justify-center gap-2'
//           >
//             {loader ? (
//               <>
//                 <Spinners /> Loading...
//               </>
//             ) : (
//               "Save"
//             )}
//           </button>
//         </div>

//       </form>

//     </div>
//   )
// }

// export default AddProductForm;




















import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/InputField';
import Spinners from '../../Spinners';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductFormDashboard, fetchCategories, updateProductFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';
import SelectTextField from '../../shared/SelectTexField ';
import Skeleton from '@mui/material/Skeleton';
import ErrorPage from '../../shared/ErrorPage'; 

const AddProductForm = ({ setOpen, product, update = false }) => {
  const [loader, setLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const {categories} = useSelector((state)=>state.products);
  const {categoriesLoader,errorsMessage} = useSelector((state)=>state.errors);
  const {user } = useSelector((state)=>state.auth); 
const isAdmin = user?.roles?.includes("ROLE_ADMIN"); 
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "onTouched"
  })

const saveProductHandler = (data) => {
  if (!update) {
    // Naya product add karna hai
    const sendData = {
      ...data,
      categoryId: selectedCategory.categoryId,
    };
    dispatch(addNewProductFormDashboard(sendData, toast, reset, setLoader, setOpen,isAdmin));
  } else {
    // Existing product update karna hai
    const sendData = {
      ...data,
      id: product.id,
    };
    dispatch(updateProductFromDashboard(sendData, toast, setLoader, setOpen));
  }
};

  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("price", product?.price);
      setValue("quantity", product?.quantity);
      setValue("discount", product?.discount);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
    }
  })

  useEffect(() => {
    if (!update) {
      dispatch(fetchCategories());
    }
  }, [dispatch, update]);

  useEffect(() => {
    if (categories) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, categoriesLoader]);


  if (categoriesLoader) return <Skeleton />
  if (errorsMessage) return <ErrorPage message={errorsMessage} />

  return (
    <div className='py-5 relative h-full'>
      <form className='space-y-4'
        onSubmit={handleSubmit(saveProductHandler)}
      >
        <div className='flex md:flex-row flex-col gap-4 w-full'>
          <InputField
            label="Product Name"
            required
            id="productName"
            type="text"
            message="This filed is  required"
            register={register}
            placeholder="Product Name"
            errors={errors}
          />

          {!update && (
            <SelectTextField
              label="Select Categories"
              select={selectedCategory}
              setSelect={setSelectedCategory}
              lists={categories}
            />
          )}
        </div>

        <div className='flex md:flex-row flex-col gap-4 w-full'>
          <InputField
            label="Price"
            required
            id="price"
            type="number"
            message="This filed is  required"
            register={register}
            placeholder="Product price"
            errors={errors}
          />

          <InputField
            label="Quantity"
            required
            id="quantity"
            type="number"
            message="This filed is  required"
            register={register}
            placeholder="Quantity Name"
            errors={errors}
          />
        </div>

        <div className='flex md:flex-row flex-col gap-4 w-full'>
          <InputField
            label="Discount"
            required
            id="discount"
            type="number"
            message="This filed is  required"
            register={register}
            placeholder="Product Discount"
            errors={errors}
          />

          <InputField
            label="Special Price"
            required
            id="specialPrice"
            type="number"
            message="This filed is  required"
            register={register}
            placeholder="Special Price"
            errors={errors}
          />
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label htmlFor="desc"
            className='font-semibold text-sm text-slate-800'>
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Add Product description..."
            className={`px-4 py-2 w-full border outline-none bg-transparent text-slate-800 rounded-md ${
              errors["description"]?.message ? "border-red-500" : "border-slate-700"
            }`}
            maxLength={255}
            {...register("description", {
              required: { value: true, message: "Description is required " },
            })}
          />

          {errors["description"]?.message && (
            <p className="text-sm font-semibold text-red-600 mt-0">
              {errors["description"]?.message}
            </p>
          )}
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
            onClick={handleSubmit(saveProductHandler)}
            type='button'
            className='bg-custom-blue text-white py-[10px] px-4 text-sm font-medium rounded flex items-center justify-center gap-2'
          >
            {loader ? (
              <>
                <Spinners /> Loading...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>

      </form>

    </div>
  )
}

export default AddProductForm;