import React from "react";
import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccessModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      size="lg"
      className="bg-white"
    >
      <ModalContent>
        <ModalBody className="py-12 px-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Success Icon */}
            <div className="bg-green-100 p-4 rounded-full">
              <FaCheckCircle className="text-green-500 text-5xl" />
            </div>

            {/* Success Message */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                Payment Successful!
              </h2>
              <p className="text-green-500 font-medium text-lg">
                Thank you for your purchase!
              </p>
            </div>

            {/* Instructions */}
            <p className="text-gray-600 max-w-md">
              Please proceed to log in to your member portal using the link sent
              to your registered email.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col w-full gap-3 mt-4">
              <Button
                color="primary"
                className="w-full"
                size="lg"
                onClick={() => navigate("/")}
              >
                Go to Homepage
              </Button>

              <div className="flex items-center gap-2 justify-center text-sm">
                <span className="text-gray-600">Need help?</span>
                <Button
                  variant="light"
                  className="text-blue-500 hover:text-blue-600 p-0"
                  onClick={() => navigate("/support")}
                >
                  Contact support
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
