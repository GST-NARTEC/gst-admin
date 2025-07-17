import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useDeleteSmartSolutionMutation } from "../../../../store/apis/endpoints/websiteEndpoints/smartSolution";

function DeleteSmartSolution({ isOpen, onOpenChange, smartSolution }) {
  const [deleteSmartSolution, { isLoading }] = useDeleteSmartSolutionMutation();

  const handleDelete = async () => {
    try {
      await deleteSmartSolution(smartSolution.id).unwrap();
      toast.success("Smart Solution deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete smart solution");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-xl font-semibold">
              Delete Smart Solution
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this smart solution? This action
                cannot be undone.
              </p>
              {smartSolution && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    {smartSolution.image && (
                      <img
                        src={smartSolution.image}
                        alt="Smart Solution"
                        className="w-16 h-16 rounded object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{smartSolution.titleEn}</p>
                      <p className="text-sm text-gray-600">
                        {smartSolution.titleAr}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                className="text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                color="danger"
                isLoading={isLoading}
                onPress={handleDelete}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteSmartSolution;
