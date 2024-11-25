import React, { useState, useEffect } from "react";
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
import { useUpdateCoreSolutionMutation } from "../../../../store/apis/endpoints/websiteEndpoints/CoreSolution";
import { FaUpload } from "react-icons/fa";

function EditCoreSolution({ isOpen, onOpenChange, coreSolution }) {
  const [updateCoreSolution, { isLoading }] = useUpdateCoreSolutionMutation();

  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    captionEn: "",
    captionAr: "",
    image: null,
    isActive: true,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (coreSolution) {
      setFormData({
        titleEn: coreSolution.titleEn || "",
        titleAr: coreSolution.titleAr || "",
        descriptionEn: coreSolution.descriptionEn || "",
        descriptionAr: coreSolution.descriptionAr || "",
        captionEn: coreSolution.captionEn || "",
        captionAr: coreSolution.captionAr || "",
        isActive: coreSolution.isActive,
      });
      setPreview(coreSolution.image);
    }
  }, [coreSolution]);

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

      await updateCoreSolution({
        id: coreSolution.id,
        data: formDataToSend,
      }).unwrap();

      toast.success("Core Solution updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to update core solution");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      size="3xl"
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
            <ModalHeader className="text-xl font-semibold">
              Edit Core Solution
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Title (English)"
                  placeholder="Enter title in English"
                  value={formData.titleEn}
                  onChange={handleChange("titleEn")}
                  isRequired
                />
                <Input
                  label="Title (Arabic)"
                  placeholder="Enter title in Arabic"
                  value={formData.titleAr}
                  onChange={handleChange("titleAr")}
                  isRequired
                />
                <Textarea
                  label="Description (English)"
                  placeholder="Enter description in English"
                  value={formData.descriptionEn}
                  onChange={handleChange("descriptionEn")}
                  className="col-span-1"
                  isRequired
                />
                <Textarea
                  label="Description (Arabic)"
                  placeholder="Enter description in Arabic"
                  value={formData.descriptionAr}
                  onChange={handleChange("descriptionAr")}
                  className="col-span-1"
                  isRequired
                />
                <Input
                  label="Caption (English)"
                  placeholder="Enter caption in English"
                  value={formData.captionEn}
                  onChange={handleChange("captionEn")}
                />
                <Input
                  label="Caption (Arabic)"
                  placeholder="Enter caption in Arabic"
                  value={formData.captionAr}
                  onChange={handleChange("captionAr")}
                />

                <div className="col-span-2">
                  <p className="text-sm mb-2">Image</p>
                  <div
                    onClick={() => document.getElementById("editImage").click()}
                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
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
                    id="editImage"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>

                <div className="col-span-2">
                  <Switch
                    isSelected={formData.isActive}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: value,
                      }))
                    }
                  >
                    {formData.isActive ? "Active" : "Inactive"}
                  </Switch>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                className="text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                onPress={handleSubmit}
                className="bg-navy-600 text-white hover:bg-navy-700"
              >
                Update Core Solution
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditCoreSolution;
