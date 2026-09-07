import React, { useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { FaBoxOpen } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { adminProductTableColumn } from '../../helper/tableColumn';
import { useDashboardProductFilter } from '../../../hooks/useProductFilter';
import AddProductForm from './AddProductForm';
import Model from '../../shared/Model';
import { DeleteModel } from "../../shared/DeleteModel";
import { deleteProduct } from '../../../store/actions';
import toast from 'react-hot-toast';
import ImageUploadForm from './ImageUploadForm';
import ProductViewModel from '../../shared/ProductViewModel';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';


const AdminProducts = () => {
 
  const {products,pagination} = useSelector((state) => state.products);
  const {isLoading,errorMessage } = useSelector((state) =>state.errors);
  

  const emptyProduct = !products || products?.length === 0; 
  

    const [currentPage, setCurrentPage] = useState(
       pagination?.pageNumber + 1 || 1
     );

     const dispatch = useDispatch();

     const [selectedProduct,setSelectedProduct] = useState('');
     const [openUpdateModel,setopenUpdateModel] = useState(false); 
     const [openAddModel,setopenAddModel] = useState(false); 
     const [openProductViewModel,setOpenProductViewModel] = useState(false); 
    const [openImageUploadModel,setOpenImageUploadModel] = useState(false); 
    const [openDeleteModel, setopenDeleteModel] = useState(false);


    const [loader ,setLoader] = useState(false); 

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;

    useDashboardProductFilter();


          const TableRecordes = products?.map((item) => {
          return {
            id: item.productId,
            productName: item.productName,
            description: item.description,
            discount: item.discount,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            specialPrice:item.specialPrice,
          };
        }) || [];

  const handleEdit = (product)=>{
       setSelectedProduct(product); 
        setopenUpdateModel(true);
  };

      const handleDelete = (product) => {
        setSelectedProduct(product);
        setopenDeleteModel(true);
      };
    const handleImageUpload = (product)=>{
         setSelectedProduct(product);
       setOpenImageUploadModel(true);
  };

    const handleProductView = (product)=>{
      setSelectedProduct(product);
      setOpenProductViewModel(true);
  };

   const handlePaginationonChange = (paginationMode)=>{
      
    const page = paginationModel.page + 1;

    setCurrentPage(page);

    params.set("page", page.toString());

    navigate(`${pathname}?${params.toString()}`);
  };


   const onDeleteHandler = ()=>{
    dispatch(deleteProduct(setLoader,selectedProduct?.id,toast,setopenDeleteModel));
  };

  return (
    <div>
      <div 
      onClick={()=> setopenAddModel(true)}
      className='pt-6 pb-10 flex justify-end'>
        <button className='bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300'>
          <MdAddShoppingCart className='text-xl' />
          Add Product
        </button>
      </div>

      {!emptyProduct && (
        <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>
          All product
        </h1>
      )}
        {isLoading ?(
            <Loader />
        ):(
          <>
          {emptyProduct ?(
            <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
              <FaBoxOpen size={50} className='mb-3'/>
              <h2 className='text-2xl font-semibold'>
                 No Products created yet
              </h2>
            </div>
          ):(
            <div className='max-w-full'>
               <DataGrid
                className="w-full"
                rows={TableRecordes}
                columns={adminProductTableColumn(
                 handleEdit,
                 handleDelete,
                 handleImageUpload,
                 handleProductView,
                setopenUpdateModel,
                 setopenDeleteModel,
                setOpenImageUploadModel,
                )}

                paginationMode="server"

                rowCount={pagination?.totalElements || 0}

                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: pagination?.pageSize || 10,
                      page: currentPage - 1,
                    },
                  },
                }}

                onPaginationModelChange={handlePaginationonChange}

                disableRowSelectionOnClick

                disableColumnResize

                pageSizeOptions={[
                  pagination?.pageSize || 10
                ]}

                pagination

                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton:
                    currentPage === pagination?.totalPages,
                }}
              />


            </div>
          )}
          </>
        )}
       
        <Model 
        open={openUpdateModel || openAddModel}
        setOpen={openUpdateModel ? setopenUpdateModel : setopenAddModel}
        title={openUpdateModel ? "Update Product" : "Add Product"}> 
          <AddProductForm 
              setOpen={openUpdateModel ? setopenUpdateModel : setopenAddModel}
              product={selectedProduct}
              update={openUpdateModel} 
          />
      </Model>


           <Model 
        open={openImageUploadModel}
        setOpen={setOpenImageUploadModel}
        title="Add Product Image"> 
          <ImageUploadForm
              setOpen={setOpenImageUploadModel}
              product={selectedProduct}
             
          />
      </Model>

        <DeleteModel 
          open={openDeleteModel}
          setOpen={setopenDeleteModel}
          title="Delete Product"
          loader={loader}
          onDeleteHandler={onDeleteHandler}/>

             <ProductViewModel
             open={openProductViewModel}
             setOpen={setOpenProductViewModel}
             product={selectedProduct}
             />
    </div>

    

  )
}

export default AdminProducts;