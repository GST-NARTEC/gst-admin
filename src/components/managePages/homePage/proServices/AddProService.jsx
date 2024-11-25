import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Switch,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useCreateProServiceMutation } from "../../../../store/apis/endpoints/websiteEndpoints/proServices";
import { FaUpload } from "react-icons/fa";

function AddProService({ isOpen, onOpenChange }) {
  const [createProService, { isLoading }] = useCreateProServiceMutation();

  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    captionEn: "",
    captionAr: "",
    image: null,
    status: 1,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "image") {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await createProService(formDataToSend).unwrap();
      toast.success("Professional Service created successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error.data?.message || "Failed to create professional service"
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      size="3xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add Professional Service</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Title (English)"
                  value={formData.titleEn}
                  onChange={handleChange("titleEn")}
                  isRequired
                />
                <Input
                  label="Title (Arabic)"
                  value={formData.titleAr}
                  onChange={handleChange("titleAr")}
                  isRequired
                />
                <Textarea
                  label="Description (English)"
                  value={formData.descriptionEn}
                  onChange={handleChange("descriptionEn")}
                  isRequired
                />
                <Textarea
                  label="Description (Arabic)"
                  value={formData.descriptionAr}
                  onChange={handleChange("descriptionAr")}
                  isRequired
                />
                <Input
                  label="Caption (English)"
                  value={formData.captionEn}
                  onChange={handleChange("captionEn")}
                />
                <Input
                  label="Caption (Arabic)"
                  value={formData.captionAr}
                  onChange={handleChange("captionAr")}
                />
                <div className="col-span-2">
                  <p className="text-sm mb-2">Image</p>
                  <div
                    onClick={() => document.getElementById("image").click()}
                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <FaUpload className="text-2xl mb-2" />
                        <p>Click to upload image</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
                <div className="col-span-2">
                  <Switch
                    isSelected={formData.status === 1}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: value ? 1 : 0,
                      }))
                    }
                  >
                    {formData.status === 1 ? "Active" : "Inactive"}
                  </Switch>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isLoading}
              >
                Add Service
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddProService;
