import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Image,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { selectCurrencySymbol } from "../../store/slice/currencySlice";

function OrderDetailsModal({ isOpen, onOpenChange, order }) {
  if (!order) return null;

  const currencySymbol = useSelector(selectCurrencySymbol);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      size="3xl"
      classNames={{
        base: "bg-white",
        header: "border-b border-gray-200",
        body: "py-6",
        footer: "border-t border-gray-200",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold text-navy-700">
                Order Details
              </h3>
              <p className="text-sm text-gray-500">
                Order ID: {order?.orderNumber}
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{order.paymentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{order.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">
                      {currencySymbol} {order.overallAmount}
                    </p>
                  </div>
                </div>

                {/* Order Items Table */}
                <Table aria-label="Order items">
                  <TableHeader>
                    <TableColumn>PRODUCT</TableColumn>
                    <TableColumn>QUANTITY</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>TOTAL</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {order.orderItems?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {item.product.image && (
                              <Image
                                src={item.product.image}
                                alt={item.product.title}
                                className="w-10 h-10 object-cover rounded"
                              />
                            )}
                            <span>{item.product.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {currencySymbol} {item.price}
                        </TableCell>
                        <TableCell>
                          {currencySymbol} {item.price * item.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Order Totals */}
                <div className="space-y-2 text-right">
                  <p className="text-sm">
                    Subtotal:{" "}
                    <span className="font-medium">
                      {currencySymbol} {order.totalAmount}
                    </span>
                  </p>
                  <p className="text-sm">
                    VAT:{" "}
                    <span className="font-medium">
                      {currencySymbol} {order.vat}
                    </span>
                  </p>
                  <p className="text-lg font-semibold">
                    Total:{" "}
                    <span className="font-medium">
                      {currencySymbol} {order.overallAmount}
                    </span>
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                className="text-gray-600 hover:bg-gray-100"
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default OrderDetailsModal;
