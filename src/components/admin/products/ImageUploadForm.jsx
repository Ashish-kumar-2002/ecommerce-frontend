import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Spinners from '../../Spinners';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateProductImageFromDashboard } from '../../../store/actions';

const ImageUploadForm = ({ setOpen,product }) => {

    const fileInputRef = useRef();
    const [loader, setLoader] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();

    const onHandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && ["image/jpeg","image/jpg","image/png"].includes(file.type)) {
            const reader = new FileReader();
         reader.onload = () => {
    setPreviewImage(reader.result);
};
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }else{
            toast.error("Please select a valid image file (.jpeg,.jpg,.png)")
            setPreviewImage(null);
            setSelectedFile(null);
        }
    };

    const addNewImageHandler = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            toast.error("Please select an image before saving.");
            return;
        }
        const formData = new FormData();
        formData.append("image", selectedFile);
        dispatch(updateProductImageFromDashboard(formData,product.id,toast,setLoader,setOpen));
    };

    const handleClearImage = () => {
        setPreviewImage(null);
       setSelectedFile(null);
       fileInputRef.current.value = null;
    };

    return (
        <div className='py-5 relative h-full'>
            <div className='pb-20'>
                <form className='space-y-4' onSubmit={addNewImageHandler}>
                    <div className='flex flex-col gap-4 w-full'>
                        <label className='flex flex-col items-center justify-center gap-2 cursor-pointer text-blue-600 border-2 border-dashed border-blue-600 rounded-md py-8 px-4 w-full'>
                            <FaCloudUploadAlt size={30} />
                            <span className='text-sm font-medium'>
                                Upload Product Image
                            </span>
                            <input type="file"
                                ref={fileInputRef}
                                onChange={onHandleImageChange}
                                className='hidden'
                                accept='.jpeg,.jpg,.png' />
                        </label>

                        {previewImage && (
                            <div>
                                <img
                                    src={previewImage}
                                    alt='Image Preview'
                                    className='h-60 rounded-md mb-2' />

                                <button
                                    type='button'
                                    onClick={handleClearImage}
                                    className='bg-rose-600 text-white px-2 py-1 rounded-md'>
                                    Clear Image
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            <div className='absolute bottom-0 left-0 right-0 px-1 py-4 bg-white flex justify-between items-center border-t'>
                <button
                    disabled={loader}
                    onClick={() => setOpenImageUploadModel(true)}
                    type='button'
                    className='text-gray-700 py-[10px] px-4 text-sm font-medium border rounded'
                >
                    Cancel
                </button>

                <button
                    disabled={loader}
                    onClick={addNewImageHandler}
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
    )
}

export default ImageUploadForm;
