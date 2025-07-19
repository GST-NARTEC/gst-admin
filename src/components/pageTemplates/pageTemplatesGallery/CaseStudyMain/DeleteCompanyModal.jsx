import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useDeleteCompanyMutation } from "../../../../store/apis/endpoints/compnies";

function DeleteCompanyModal({ isOpen, onOpenChange, company }) {
  const [deleteCompany, { isLoading }] = useDeleteCompanyMutation();

  const handleDelete = async () => {
    try {
      await deleteCompany(company.id).unwrap();
      toast.success("Company deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete company");
    }
  };

  const handleModalClose = () => {
    onOpenChange(false);
  };

  if (!company) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="md"
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
            <ModalHeader className="text-xl font-semibold text-danger">
              Delete Company
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
                  <h4 className="font-semibold text-danger-800 mb-2">
                    Are you sure you want to delete this company?
                  </h4>
                  <div className="text-sm text-danger-700 space-y-1">
                    <p>
                      <strong>Company:</strong> {company.titleEn}
                    </p>
                    {company.titleAr && (
                      <p>
                        <strong>Arabic Title:</strong> {company.titleAr}
                      </p>
                    )}
                    {company.websiteLink && (
                      <p>
                        <strong>Website:</strong> {company.websiteLink}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-800 text-sm">
                    <strong>Warning:</strong> This action cannot be undone. This
                    will permanently delete the company and remove all
                    associated data.
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={handleModalClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete Company"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteCompanyModal;
