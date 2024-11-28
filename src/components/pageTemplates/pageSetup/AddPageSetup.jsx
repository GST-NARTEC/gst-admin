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
import { useCreatePageMutation } from "../../../store/apis/endpoints/pageSetup";

const templates = [
  { label: "Template 1", value: "template1" },
  { label: "Template 2", value: "template2" },
  { label: "Template 3", value: "template3" },
  { label: "Template 4", value: "template4" },
  { label: "Template 5", value: "template5" },
  { label: "Template 6", value: "template6" },
];

function AddPageSetup({ isOpen, onOpenChange }) {
  const [createPage, { isLoading }] = useCreatePageMutation();
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      nameEn: "",
      nameAr: "",
      slug: "",
      template: "",
    },
  });

  // Watch nameEn to generate slug
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "nameEn") {
        const slug = value.nameEn
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        setValue("slug", slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onSubmit = async (data) => {
    try {
      await createPage(data).unwrap();
      toast.success("Page created successfully");
      reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to create page");
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
              Add New Page
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
                      placeholder="page-slug"
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
              <Button
                variant="light"
                onPress={() => {
                  reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                Create Page
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddPageSetup;
