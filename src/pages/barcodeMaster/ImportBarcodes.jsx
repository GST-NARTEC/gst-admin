import React, { useState, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import { useAddBulkGtinsMutation } from "../../store/apis/endpoints/barcodeMaster";

function ImportBarcodes({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [addBulkGtins, { isLoading }] = useAddBulkGtinsMutation();

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  const handleSubmit = async () => {
    if (!file) return;

    try {
      const text = await file.text();
      const gtins = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      await addBulkGtins({ gtins });
      onClose();
      setFile(null);
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Import Barcodes
        </ModalHeader>
        <ModalBody>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-gray-300"
              }
              ${file ? "bg-success/10 border-success" : ""}`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div>
                <p className="text-success font-medium">
                  File selected: {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  Click or drag another file to replace
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium">
                  {isDragActive
                    ? "Drop the file here"
                    : "Drag & drop a text file here"}
                </p>
                <p className="text-sm text-gray-500">
                  or click to select a file
                </p>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isDisabled={!file}
            isLoading={isLoading}
          >
            Import
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ImportBarcodes;
