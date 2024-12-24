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
import { useDropzone } from "react-dropzone";
import { useUpdateUserGuideMutation } from "../../../store/apis/endpoints/guideline";
import toast from "react-hot-toast";
import { FaFilePdf } from "react-icons/fa";

function EditPdfGuideline({ isOpen, onClose, pdf }) {
  console.log(pdf);
  const [formData, setFormData] = useState({
    titleEn: "",
    // titleAr: "",
    pdf: null,
  });

  const [updateUserGuide, { isLoading }] = useUpdateUserGuideMutation();

  // Update form data when pdf prop changes
  useEffect(() => {
    if (pdf) {
      setFormData({
        titleEn: pdf.title || "",
        // titleAr: pdf.titleAr || "",
        pdf: null, // Reset PDF file on each open
      });
    }
  }, [pdf]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titleEn", formData.titleEn);
      //   formDataToSend.append("titleAr", formData.titleAr);
      if (formData.pdf) {
        formDataToSend.append("pdf", formData.pdf);
      }

      const payload = {
        id: pdf.id,
        data: formDataToSend,
      };

      await updateUserGuide(payload).unwrap();
      toast.success("PDF guideline updated successfully");
      onClose();
    } catch (error) {
      console.error("Failed to update PDF:", error);
      toast.error("Failed to update PDF guideline");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Edit PDF Guideline
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Title"
                placeholder="Enter title"
                value={formData.titleEn}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, titleEn: e.target.value }))
                }
                required
              />
              {/* <Input
                label="Title (Arabic)"
                placeholder="Enter title in Arabic"
                value={formData.titleAr}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, titleAr: e.target.value }))
                }
                required
              /> */}
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
                    <div className="mb-2">
                      {pdf?.link && (
                        <a
                          href={pdf.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 justify-center text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              pdf.link,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                        >
                          <FaFilePdf className="text-danger text-xl" />
                          <span>View Current PDF</span>
                        </a>
                      )}
                    </div>
                    <p>
                      Drag and drop a new PDF file here to update, or click to
                      select
                    </p>
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
              color="primary"
              type="submit"
              isLoading={isLoading}
              className="bg-navy-700"


>
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default EditPdfGuideline;
