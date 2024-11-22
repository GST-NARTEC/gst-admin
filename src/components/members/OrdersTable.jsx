import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Spinner,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { FaSearch, FaEye, FaFileInvoice } from "react-icons/fa";
import { useGetUserByIdQuery } from "../../store/apis/endpoints/user";
import OrderDetailsModal from "./OrderDetailsModal";
import { useParams } from "react-router-dom";


function OrdersTable() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: ordersData, isLoading } = useGetUserByIdQuery(
    {
      id,
      params: { fields: "invoices" },
    },
    {
      skip: !id,
    }
  );

  const orders =
    ordersData?.data?.user?.invoices?.map((invoice) => ({
      ...invoice.order,
      invoiceNumber: invoice.invoiceNumber,
      invoicePdf: invoice.pdf,
      orderItems: invoice.order.orderItems || [],
    })) || [];

  const columns = [
    { name: "ORDER ID", uid: "id" },
    { name: "ITEMS", uid: "totalItems" },
    { name: "AMOUNT", uid: "totalAmount" },
    { name: "VAT", uid: "vat" },
    { name: "TOTAL", uid: "overallAmount" },
    { name: "PAYMENT", uid: "paymentType" },
    { name: "STATUS", uid: "status" },
    { name: "DATE", uid: "createdAt" },
    { name: "INVOICE", uid: "invoice" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (order, columnKey) => {
    switch (columnKey) {
      case "id":
        return (
          <Tooltip content={order.id}>
            <p className="text-sm cursor-pointer">{order.id.slice(0, 8)}...</p>
          </Tooltip>
        );
      case "totalAmount":
      case "vat":
      case "overallAmount":
        return <p className="text-sm">${order[columnKey].toFixed(2)}</p>;
      case "status":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={order.status === "COMPLETED" ? "success" : "warning"}
          >
            {order.status}
          </Chip>
        );
      case "createdAt":
        return (
          <p className="text-sm">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        );
      case "invoice":
        return (
          <div className="relative flex items-center justify-center">
            <Tooltip content="View Invoice">
              <a
                href={order.invoicePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-navy-700 cursor-pointer active:opacity-50"
              >
                <FaFileInvoice />
              </a>
            </Tooltip>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="View Order Details">
              <span
                className="text-lg text-navy-700 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedOrder(order);
                  setIsModalOpen(true);
                }}
              >
                <FaEye />
              </span>
            </Tooltip>
          </div>
        );
      case "totalItems":
        return <p className="text-sm">{order.orderItems?.length || 0}</p>;
      default:
        return <p className="text-sm">{order[columnKey]}</p>;
    }
  };

  const topContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex justify-between items-center">
          <Input
            isClearable
            value={search}
            onValueChange={setSearch}
            className="w-full sm:max-w-[44%]"
            placeholder="Search by order ID..."
            startContent={<FaSearch className="text-default-300" />}
          />
        </div>
      </div>
    ),
    [search]
  );

//   const bottomContent = useMemo(
//     () => (
//       <div className="py-2 px-2 flex justify-between items-center">
//         <span className="w-[30%] text-sm text-gray-500">
//           {orders.length} orders in total
//         </span>
//         <Pagination
//           isCompact
//           showControls
//           showShadow
//           color="primary"
//           page={page}
//           total={10}
//           onChange={setPage}
//         />
//       </div>
//     ),
//     [page]
//   );

  return (
    <>
      <Table
        aria-label="Orders table"
        // bottomContent={bottomContent}
        topContent={topContent}
        classNames={{
          wrapper: "shadow-md rounded-lg",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className="bg-gray-50 text-gray-600"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={orders}
          isLoading={isLoading}
          emptyContent="No orders found"
          loadingContent={<Spinner />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <OrderDetailsModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        order={selectedOrder}
      />
    </>
  );
}

export default OrdersTable;
