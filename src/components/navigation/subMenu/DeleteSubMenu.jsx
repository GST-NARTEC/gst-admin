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
import { useDeleteSubMenuMutation } from "../../../store/apis/endpoints/websiteEndpoints/subMenu";

function DeleteSubMenu({ isOpen, onOpenChange, subMenu }) {
  const [deleteSubMenu, { isLoading }] = useDeleteSubMenuMutation();

  const handleDelete = async () => {
    try {
      await deleteSubMenu(subMenu.id).unwrap();
      toast.success("Submenu deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete submenu");
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="md"
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
            <ModalHeader className="text-xl font-semibold">
              Delete Submenu
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this submenu?</p>
              <p className="text-gray-500 mt-2">
                <strong>Name:</strong> {subMenu?.nameEn} ({subMenu?.nameAr})
              </p>
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

export default DeleteSubMenu;
