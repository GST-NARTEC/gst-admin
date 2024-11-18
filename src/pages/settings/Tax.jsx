import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@nextui-org/react";
import { FiEye } from "react-icons/fi";
import AddTaxModal from "../../components/settings/tax/AddTaxModal";
import ViewTaxModal from "../../components/settings/tax/ViewTaxModal";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";

function Tax() {
  const vatData = {
    name: "VAT",
    taxId: "923456789012345",
    type: "percentage",
    value: "5%",
    description: "Goods and Services",
    createdAt: "11/11/2024, 1:57:08 AM",
    status: "Active",
  };

  const [isAddTaxModalOpen, setIsAddTaxModalOpen] = useState(false);
  const [isViewTaxModalOpen, setIsViewTaxModalOpen] = useState(false);
  const navigate = useNavigate();

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-end">
        <Button
          onClick={() => setIsAddTaxModalOpen(true)}
          className="bg-navy-700 text-white"
        >
          Add Tax
        </Button>
      </div>
    );
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-semibold mb-4">Taxes</h1>
        <Button
          startContent={<IoArrowBack />}
          onClick={() => navigate(-1)}
          color="default"
        >
          Back
        </Button>
      </div>

      <Table topContent={topContent} aria-label="Tax information table">
        <TableHeader>
          <TableColumn>TAX INFO</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Name:</span> {vatData.name}
                </p>
                <p>
                  <span className="font-semibold">Tax ID:</span> {vatData.taxId}
                </p>
                <p>
                  <span className="font-semibold">Type:</span> {vatData.type}
                </p>
                <p>
                  <span className="font-semibold">Value:</span> {vatData.value}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {vatData.description}
                </p>
                <p className="text-gray-400">Created at: {vatData.createdAt}</p>
              </div>
            </TableCell>
            <TableCell>
              <Chip
                color={vatData.status === "Active" ? "success" : "danger"}
                variant="flat"
              >
                {vatData.status}
              </Chip>
            </TableCell>
            <TableCell>
              <button
                className="text-navy-500 hover:text-navy-700"
                onClick={() => setIsViewTaxModalOpen(true)}
              >
                <FiEye size={20} />
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <AddTaxModal
        isOpen={isAddTaxModalOpen}
        onOpenChange={() => setIsAddTaxModalOpen(false)}
      />
      <ViewTaxModal
        isOpen={isViewTaxModalOpen}
        onOpenChange={() => setIsViewTaxModalOpen(false)}
      />
    </div>
  );
}

export default Tax;
