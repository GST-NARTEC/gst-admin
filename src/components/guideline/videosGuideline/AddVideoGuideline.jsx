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

function AddVideoGuideline({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    titleEn: "",
    video: null,
  });

  const [createUserGuide, { isLoading }] = useCreateUserGuideMutation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "video/*": [".mp4", ".avi", ".mov", ".wmv"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,
        video: acceptedFiles[0],
      }));
    },
  });

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titleEn", formData.titleEn);
      formDataToSend.append("video", formData.video);

      await createUserGuide(formDataToSend).unwrap();
      toast.success("Video guideline created successfully");
      onClose();
      setFormData({ titleEn: "", video: null });
    } catch (error) {
      console.error("Failed to create guideline:", error);
      toast.error("Failed to create video guideline");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add New Video Guideline
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
            />
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                ${isDragActive ? "border-primary" : "border-gray-300"}
                ${formData.video ? "bg-gray-50" : ""}`}
            >
              <input {...getInputProps()} />
              {formData.video ? (
                <div className="text-success">
                  Selected file: {formData.video.name}
                </div>
              ) : (
                <div>
                  <p>Drag and drop a video file here, or click to select</p>
                  <p className="text-small text-gray-500">
                    Supported formats: MP4, AVI, MOV, WMV
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
            disabled={!formData.titleEn || !formData.video}
            className="bg-navy-700"
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddVideoGuideline;