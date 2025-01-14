import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Chip,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { format, isValid } from "date-fns";

function PaymentModal({ isOpen, onOpenChange, order }) {
  console.log("Payment Details in Modal:", order); // For debugging

  if (!order) {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          <ModalBody className="flex items-center justify-center py-8">
            <Spinner size="lg" label="Loading payment details..." />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (!isValid(date)) {
        return "N/A";
      }
      return format(date, "PPpp");
    } catch (error) {
      return "N/A";
    }
  };

  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return "N/A";
    try {
      return new Intl.NumberFormat("en-SA", {
        style: "currency",
        currency: "SAR",
      }).format(amount / 100);
    } catch (error) {
      return "N/A";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Payment Details
              <span className="text-sm text-default-500">
                Order ID: {order.merchantReference}
              </span>
            </ModalHeader>
            <ModalBody className="px-4 py-3">
              <div className="grid gap-6">
                {/* Payment Status */}
                <Card>
                  <CardBody className="gap-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Transaction Status
                      </h3>
                      <Chip
                        color={
                          order.responseCode === "14000" ? "success" : "danger"
                        }
                        variant="flat"
                      >
                        {order.responseMessage}
                      </Chip>
                    </div>
                    <div className="text-2xl font-bold">
                      {formatAmount(order.amount)}
                    </div>
                  </CardBody>
                </Card>

                {/* Payment Details */}
                <Card>
                  <CardBody className="gap-4">
                    <h3 className="text-lg font-semibold">
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-default-500">
                          Payment Method
                        </p>
                        <p className="font-medium">{order.paymentOption}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Card Number</p>
                        <p className="font-medium">{order.cardNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Card Holder</p>
                        <p className="font-medium">{order.cardHolderName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">
                          Authorization Code
                        </p>
                        <p className="font-medium">{order.authorizationCode}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Customer Details */}
                <Card>
                  <CardBody className="gap-4">
                    <h3 className="text-lg font-semibold">
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-default-500">
                          Customer Name
                        </p>
                        <p className="font-medium">{order.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Email</p>
                        <p className="font-medium">{order.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">IP Address</p>
                        <p className="font-medium">{order.customerIp}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">
                          Transaction Type
                        </p>
                        <p className="font-medium">{order.eci}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Transaction Details */}
                <Card>
                  <CardBody className="gap-4">
                    <h3 className="text-lg font-semibold">
                      Transaction Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-default-500">Fort ID</p>
                        <p className="font-medium">{order.fortId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Command</p>
                        <p className="font-medium">{order.command}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Created At</p>
                        <p className="font-medium">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Updated At</p>
                        <p className="font-medium">
                          {formatDate(order.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default PaymentModal;
