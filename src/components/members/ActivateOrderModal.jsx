import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { useActivateOrderMutation } from "../../store/apis/endpoints/order";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";

function ActivateOrderModal({ isOpen, onOpenChange, order }) {
  const [activateOrder, { isLoading }] = useActivateOrderMutation();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleActivation = async () => {
    try {
      await activateOrder(order.orderNumber).unwrap();
      setShowConfetti(true);
      toast.success("Order activated successfully");
      setTimeout(() => {
        setShowConfetti(false);
        onOpenChange(false);
      }, 3000);
    } catch (error) {
      toast.error(error.data?.message || "Failed to activate order");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          setShowConfetti(false);
          onOpenChange(open);
        }}
        size="md"
        classNames={{
          base: "bg-white",
          header: "border-b border-gray-200",
          body: "py-6",
          footer: "border-t border-gray-200",
          wrapper: "z-[200]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-xl text-success" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Activate Order
                  </h3>
                </div>
              </ModalHeader>
              <ModalBody className="z-[150] relative">
                <div className="space-y-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="p-3 bg-success-50 rounded-full mb-4">
                      <FaCheckCircle className="text-4xl text-success" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Confirm Order Activation
                    </h4>
                    <p className="text-sm text-gray-500">
                      Are you sure you want to activate order{" "}
                      <span className="font-medium">{order?.orderNumber}</span>?
                    </p>
                  </div>

                  <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <FaExclamationTriangle className="text-lg text-warning mt-0.5" />
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">
                          Important Note
                        </h5>
                        <p className="text-sm text-gray-600">
                          This action will activate the user's account and grant
                          access to the ordered services. This action cannot be
                          undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  color="success"
                  onPress={handleActivation}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  {isLoading ? "Activating..." : "Activate Order"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[201]">
          <Confetti
            width={width}
            height={height}
            recycle={true}
            numberOfPieces={200}
            gravity={0.3}
            tweenDuration={5000}
          />
        </div>
      )}
    </>
  );
}

export default ActivateOrderModal;
