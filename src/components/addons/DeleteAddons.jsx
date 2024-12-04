import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useDeleteAddonMutation } from "../../store/apis/endpoints/addons";

function DeleteAddons({ isOpen, onClose, selectedAddon }) {
  const [deleteAddon, { isLoading }] = useDeleteAddonMutation();

  const handleDelete = async () => {
    if (!selectedAddon?.id) return;

    const res = await deleteAddon(selectedAddon.id);
    if (res.data) {
      toast.success("Addon deleted successfully");
      onClose();
    }
    if (res.error) {
      toast.error(res.error.data.message);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onClose}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Addon
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete the addon "
                <span className="font-semibold">{selectedAddon?.name}</span>"?
                This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button 
                variant="flat" 
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isLoading={isLoading}
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

export default DeleteAddons;
