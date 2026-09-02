import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { adminOrderTableColumn } from '../../helper/tableColumn';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from "../../shared/Model.jsx";
import UpdateOrderForm from './UpdateOrderForm.jsx';

const OrderTable = ({ adminOrder, pagination }) => {

  const navigate = useNavigate();

  const [updateOpenModel, setUpdateOpenModel] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const TableRecordes = adminOrder?.map((item) => {
    return {
      id: item.orderId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.orderStatus,
      date: item.orderDate,
    };
  }) || [];


  const handlePaginationonChange = (paginationModel) => {

    const page = paginationModel.page + 1;

    setCurrentPage(page);

    params.set("page", page.toString());

    navigate(`${pathname}?${params.toString()}`);
  };


  return (
    <div>

      <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase pt-10">
        All Orders
      </h1>


      <DataGrid
        className="w-full"

        rows={TableRecordes}

        columns={adminOrderTableColumn(
          setUpdateOpenModel,
          setSelectedItem
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



      <Modal
        open={updateOpenModel}
        setOpen={setUpdateOpenModel}
        title="Update Order Status"
      >

        {selectedItem && (
          <UpdateOrderForm
            setOpen={setUpdateOpenModel}
            open={updateOpenModel}
            loader={loader}
            setLoader={setLoader}
            selectedId={selectedItem.id}
            selectedItem={selectedItem}
          />
        )}

      </Modal>

    </div>
  );
};

export default OrderTable;