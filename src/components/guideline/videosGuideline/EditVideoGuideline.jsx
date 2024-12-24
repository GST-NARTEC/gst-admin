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
import { FaVideo } from "react-icons/fa";

function EditVideoGuideline({ isOpen, onClose, video }) {
  const [formData, setFormData] = useState({
    titleEn: "",
    video: null,
  });

  const [updateUserGuide, { isLoading }] = useUpdateUserGuideMutation();

  useEffect(() => {
    if (video) {
      setFormData({
        titleEn: video.title || "",
        video: null,
      });
    }
  }, [video]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titleEn", formData.titleEn);
      if (formData.video) {
        formDataToSend.append("video", formData.video);
      }

      const payload = {
        id: video.id,
        data: formDataToSend,
      };

      await updateUserGuide(payload).unwrap();
      toast.success("Video guideline updated successfully");
      onClose();
    } catch (error) {
      console.error("Failed to update video:", error);
      toast.error("Failed to update video guideline");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Edit Video Guideline
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
                    <div className="mb-2">
                      {video?.link && (
                        <a
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 justify-center text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              video.link,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                        >
                          <FaVideo className="text-primary text-xl" />
                          <span>View Current Video</span>
                        </a>
                      )}
                    </div>
                    <p>
                      Drag and drop a new video file here to update, or click to
                      select
                    </p>
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

export default EditVideoGuideline;
