import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useUpdateLanguageMutation } from "../../../store/apis/endpoints/Language";

function UpdataLanguageChange({ isOpen, onClose, category }) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newname_ar, setNewname_ar] = useState("");

  useEffect(() => {
    setNewCategoryName(category?.key || "");
    setNewname_ar(category?.value || "");
  }, [category]);
  

  const [updateCategory, { isLoading }] = useUpdateLanguageMutation();

  const handleSave = async () => {
    try {
     const payload = {
       id: category.id, 
       body: { value: newname_ar },
     };
      await updateCategory(payload).unwrap();
      toast.success("Language updated successfully");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update Language");
    }
  };

    const handleClose = () => {
      setNewCategoryName("");
      setNewname_ar("");
      onClose();
    };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="2xl"
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
            <ModalHeader className="text-xl font-semibold text-navy-700">
              Edit Language
            </ModalHeader>
            <ModalBody>
              <Input
                label="Word[English]"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                classNames={{
                  base: "mt-2",
                  input: "bg-transparent",
                  inputWrapper: "bg-default-100",
                }}
              />
              <Input
                type="text"
                label="Word[Arabic]"
                value={newname_ar}
                onChange={(e) => setNewname_ar(e.target.value)}
                classNames={{
                  base: "mt-2",
                  input: "bg-transparent",
                  inputWrapper: "bg-default-100",
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-navy-600 text-white hover:bg-navy-700"
                onPress={handleSave}
                isLoading={isLoading}
              >
                Save Changes
              </Button>
              <Button
                className="text-gray-600 hover:bg-gray-100"
                variant="light"
                onPress={handleClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default UpdataLanguageChange;
