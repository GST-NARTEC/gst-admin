import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Image,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useCreateLanguageMutation } from "../../../store/apis/endpoints/Language";

function AddLanguageChange({ isOpen, onClose }) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newname_ar, setNewname_ar] = useState("");


  const [createCategory, { isLoading, isError, error, isSuccess }] =
    useCreateLanguageMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Language added successfully!");
      handleClose();
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed to add Language");
    }
  }, [isError, isSuccess, error]);

  const handleClose = () => {
    setNewCategoryName("");
    setNewname_ar("");
    onClose();
  };

  const handleAddCategory = async () => {
    try {
    const payload = { 'key': newCategoryName, 'value': newname_ar };
      await createCategory(payload).unwrap();
    } catch (err) {
      console.error("Failed to add Language:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      placement="top-center"
      classNames={{
        base: "max-w-md",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Language
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
                color="danger"
                variant="flat"
                onPress={handleClose}
                className="hover:bg-danger-100"
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                color="primary"
                onPress={handleAddCategory}
                className="bg-navy-600 text-white hover:bg-navy-700"
                isDisabled={!newCategoryName}
              >
                Add Language
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddLanguageChange;
