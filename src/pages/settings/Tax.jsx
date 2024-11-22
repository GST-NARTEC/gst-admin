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
  Spinner,
} from "@nextui-org/react";
import { FiEye } from "react-icons/fi";
import AddTaxModal from "../../components/settings/tax/AddTaxModal";
import ViewTaxModal from "../../components/settings/tax/ViewTaxModal";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { useGetTaxQuery } from "../../store/apis/endpoints/tax";

function Tax() {
  const { data: taxData, isLoading } = useGetTaxQuery();
  const [selectedTax, setSelectedTax] = useState(null);
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

      <Table 
        topContent={topContent} 
        aria-label="Tax information table"
      >
        <TableHeader>
          <TableColumn>TAX INFO</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          emptyContent={"No taxes found"}
          loadingContent={<Spinner />}
        >
          {taxData?.data?.vats.map((tax) => (
            <TableRow key={tax.id}>
              <TableCell>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Name:</span> {tax.name}
                  </p>
                  <p>
                    <span className="font-semibold">Tax ID:</span> {tax.taxId}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span> {tax.type}
                  </p>
                  <p>
                    <span className="font-semibold">Value:</span> {tax.value}%
                  </p>
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {tax.description}
                  </p>
                  <p className="text-gray-400">
                    Created at: {new Date(tax.createdAt).toLocaleString()}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  color={tax.isActive ? "success" : "danger"}
                  variant="flat"
                >
                  {tax.isActive ? "Active" : "Inactive"}
                </Chip>
              </TableCell>
              <TableCell>
                <button
                  className="text-navy-500 hover:text-navy-700"
                  onClick={() => {
                    setSelectedTax(tax);
                    setIsViewTaxModalOpen(true);
                  }}
                >
                  <FiEye size={20} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddTaxModal
        isOpen={isAddTaxModalOpen}
        onOpenChange={() => setIsAddTaxModalOpen(false)}
      />
      <ViewTaxModal
        tax={selectedTax}
        isOpen={isViewTaxModalOpen}
        onOpenChange={() => {
          setIsViewTaxModalOpen(false);
          setSelectedTax(null);
        }}
      />
    </div>
  );
}

export default Tax;
