import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import { useCreateUserGuideMutation } from "../../../store/apis/endpoints/guideline";
import toast from "react-hot-toast";

function AddPdfGuideline({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    titleEn: "",
    // titleAr: "",
    pdf: null,
  });

  const [createUserGuide, { isLoading }] = useCreateUserGuideMutation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,
        pdf: acceptedFiles[0],
      }));
    },
  });

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titleEn", formData.titleEn);
      formDataToSend.append("titleAr", formData.titleAr);
      formDataToSend.append("type", "pdf");
      formDataToSend.append("pdf", formData.pdf);

      await createUserGuide(formDataToSend).unwrap();
      toast.success("PDF guideline created successfully");
      onClose();
      setFormData({ titleEn: "", titleAr: "", pdf: null });
    } catch (error) {
      console.error("Failed to create guideline:", error);
      toast.error("Failed to create PDF guideline");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add New PDF Guideline
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Title (English)"
              placeholder="Enter title in English"
              value={formData.titleEn}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, titleEn: e.target.value }))
              }
            />
            <Input
              label="Title (Arabic)"
              placeholder="Enter title in Arabic"
              value={formData.titleAr}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, titleAr: e.target.value }))
              }
            />
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                ${isDragActive ? "border-primary" : "border-gray-300"}
                ${formData.pdf ? "bg-gray-50" : ""}`}
            >
              <input {...getInputProps()} />
              {formData.pdf ? (
                <div className="text-success">
                  Selected file: {formData.pdf.name}
                </div>
              ) : (
                <div>
                  <p>Drag and drop a PDF file here, or click to select</p>
                  <p className="text-small text-gray-500">
                    Only PDF files are allowed
                  </p>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            color="primary"
            onPress={handleSubmit}
            disabled={!formData.titleEn || !formData.titleAr || !formData.pdf}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddPdfGuideline;
