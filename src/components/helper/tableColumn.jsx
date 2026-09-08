import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
export const adminProductTableColumn = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView,
  setOpen,
  setOpenDeleteModel,
  setOpenImageUploadModel,
) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "ID",
    minWidth: 70,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span className="text-center">Product ID</span>
    ),
  },

  {
    disableColumnMenu: true,
    field: "productName",
    headerName: "Product Name",
    align: "center",
    width: 160,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center border",
    cellClassName: "text-black font-normal border text-center",
    renderHeader: () => (
      <span className="text-center">Product Name</span>   
    ),
  },

  {
    disableColumnMenu: true,
    field: "price",
    headerName: "Price",
    width: 90,
    headerAlign: "center",
    editable: false,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span className="text-center">Price</span>
    ),
  },

  {
    disableColumnMenu: true,
    field: "quantity",
    headerName: "Quantity",
    width: 100,
    headerAlign: "center",
    editable: false,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span className="text-center">Quantity</span>
    ),
  },

  {
    disableColumnMenu: true,
    field: "specialPrice",
    headerName: "Special Price",
    width: 120,
    headerAlign: "center",
    editable: false,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span className="text-center">Special Price</span>
    ),
  },


  {
    field: "description",
    headerName: "Description",
    width: 160,
    headerAlign: "center",
    editable: false,
    align: "center",
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span>Description</span>
    ),
  },

    {
    field: "image",
    headerName: "Image",
    width: 150,
    headerAlign: "center",
    editable: false,
    align: "center",
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span>Image</span>
    ),
  },

      {
    field: "action",
    headerName: "Action",
    width: 400,
    headerAlign: "center",
    editable: false,
    align: "center",
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span>Action</span>
    ),
  
renderCell: (params) => {
  return (
    <div className="flex justify-center items-center space-x-2 h-full pt-2">
      <button
        onClick={() => {
          handleImageUpload(params.row);  
           setOpenImageUploadModel(true);
        }}
        className="flex items-center bg-green-500 hover:bg-green-500 text-white px-4 h-9 rounded-md">
        <FaImage className="mr-2" />
        Image
      </button>

      <button
         onClick={() => {
          handleEdit(params.row);   
          setOpen(true);
        }}
        className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md">
        <FaEdit className="mr-2" />
        Edit
      </button>

          <button
        onClick={() => {
            handleDelete(params.row);   
            setOpenDeleteModel(true);   // ✅ ab sahi wala setter
          }}
          className="flex items-center bg-red-500  text-white px-4 h-9 rounded-md">
          <FaTrashAlt className="mr-2" />
          DElete
        </button>

        <button
          onClick={() => {
          handleProductView(params.row);  
        }}
        className="flex items-center bg-slate-800  text-white px-4 h-9 rounded-md">
        <FaEye className="mr-2" />
        View
        </button>
    </div>
  );
},
  },
];



export const adminOrderTableColumn = (setOpen, setSelectedItem) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "orderId",
    minWidth: 180,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span className="text-center">Order ID</span>
    ),
  },

  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    width: 250,
    headerAlign: "center",
    sortable: false,
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span className="text-center">Email</span>
    ),
  },

  {
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    width: 200,
    headerAlign: "center",
    sortable: true,
    editable: false,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span className="text-center">Total Amount</span>
    ),
  },

  {
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    width: 200,
    headerAlign: "center",
    sortable: false,
    editable: false,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span className="text-center">Status</span>
    ),
  },

  {
    disableColumnMenu: true,
    field: "date",
    headerName: "Order Date",
    width: 200,
    headerAlign: "center",
    sortable: false,
    editable: false,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",
    renderHeader: () => (
      <span className="text-center">Order Date</span>
    ),
  },


  {
    field: "action",
    headerName: "Action",
    width: 250,
    headerAlign: "center",
    sortable: false,
    editable: false,
    align: "center",
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-black font-normal border",

    renderHeader: () => (
      <span>Action</span>
    ),

renderCell: (params) => {
  return (
    <div className="flex justify-center items-center space-x-2 h-full pt-2">
      <button
        onClick={() => {
          setSelectedItem(params.row);   
          setOpen(true);
        }}
        className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md"
      >
        <FaEdit className="mr-2" />
        Edit
      </button>
    </div>
  );
},
  },
];

  



export const categoryTableColumns = (handleEdit, handleDelete) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "CategoryId",
    minWidth: 300,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">CategoryId</span>,
  },
  {
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Category Name",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Category Name</span>,
  },

  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 400,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
        </div>
      );
    },
  },
];