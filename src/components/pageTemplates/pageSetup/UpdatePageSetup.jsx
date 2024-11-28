import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useUpdatePageMutation } from "../../../store/apis/endpoints/pageSetup";

const templates = [
  { label: "Template 1", value: "template1" },
  { label: "Template 2", value: "template2" },
  { label: "Template 3", value: "template3" },
  { label: "Template 4", value: "template4" },
  { label: "Template 5", value: "template5" },
  { label: "Template 6", value: "template6" },
];

function UpdatePageSetup({ isOpen, onOpenChange, page }) {
  const [updatePage, { isLoading }] = useUpdatePageMutation();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      nameEn: "",
      nameAr: "",
      slug: "",
    },
  });

  React.useEffect(() => {
    if (page) {
      reset(page);
    }
  }, [page, reset]);

  const onSubmit = async (data) => {
    try {
      const { createdAt, updatedAt, ...updateData } = data;
      await updatePage({ id: page.id, ...updateData }).unwrap();
      toast.success("Page updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to update page");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="text-xl font-semibold">
              Update Page
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="nameEn"
                  control={control}
                  rules={{ required: "English name is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      label="English Name"
                      placeholder="Enter English name"
                      errorMessage={error?.message}
                      isInvalid={!!error}
                    />
                  )}
                />

                <Controller
                  name="nameAr"
                  control={control}
                  rules={{ required: "Arabic name is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      label="Arabic Name"
                      placeholder="Enter Arabic name"
                      errorMessage={error?.message}
                      isInvalid={!!error}
                    />
                  )}
                />

                <Controller
                  name="slug"
                  control={control}
                  rules={{ required: "Slug is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Input
                      {...field}
                      label="Slug"
                      placeholder="e.g., my-page-name"
                      description="URL friendly name (e.g., 'about-us', 'contact-page')"
                      errorMessage={error?.message}
                      isInvalid={!!error}
                    />
                  )}
                />

                <Controller
                  name="template"
                  control={control}
                  rules={{ required: "Template is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      label="Template"
                      placeholder="Select a template"
                      errorMessage={error?.message}
                      isInvalid={!!error}
                      selectedKeys={[field.value]}
                    >
                      {templates.map((template) => (
                        <SelectItem key={template.value} value={template.value}>
                          {template.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" isLoading={isLoading}>
                Update Page
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

export default UpdatePageSetup;
