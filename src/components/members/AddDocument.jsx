import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import {
  useCreateUserDocMutation,
  useGetDocsTypesQuery,
} from "../../store/apis/endpoints/userDocs";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function AddDocument({ isOpen, onClose }) {
  const { id } = useParams();
  const { data: docsTypesResponse, isLoading: docsTypesLoading } = useGetDocsTypesQuery();

  const [formData, setFormData] = useState({
    name: "",
    doc: null,
  });
  const [createUserDoc, { isLoading }] = useCreateUserDocMutation();

  // Transform the docs types data for Autocomplete
  const documentTypes = docsTypesResponse?.data?.map(type => ({
    label: type.name,
    value: type.name,
    id: type.id
  })) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("doc", formData.doc);
    formDataToSend.append("userId", id);

    try {
      await createUserDoc(formDataToSend).unwrap();
      onClose();
      setFormData({ name: "", doc: null });
      toast.success("Document added successfully");
    } catch (error) {
      console.error("Failed to create document:", error);
      toast.error("Failed to add document");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Add New Document</ModalHeader>
          <ModalBody className="gap-4">
            <Autocomplete
              label="Document Type"
              placeholder="Select document type"
              defaultItems={documentTypes}
              selectedKey={formData.name}
              onSelectionChange={(value) => 
                setFormData({ ...formData, name: value })
              }
              isLoading={docsTypesLoading}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Input
              type="file"
              label="Upload Document"
              onChange={(e) =>
                setFormData({ ...formData, doc: e.target.files[0] })
              }
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              Add Document
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default AddDocument;
