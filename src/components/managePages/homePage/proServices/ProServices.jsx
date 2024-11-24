import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Spinner,
  Chip,
} from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";

function ProServices() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Static data for now
  const proServices = [
    {
      id: 1,
      titleEn: "Barcode Consultation",
      titleAr: "استشارات الباركود",
      descriptionEn: "Expert consultation for barcode implementation",
      descriptionAr: "استشارات خبيرة لتنفيذ الباركود",
      image: "https://placehold.co/100x100",
      isActive: true,
    },
    {
      id: 2,
      titleEn: "Integration Services",
      titleAr: "خدمات التكامل",
      descriptionEn: "Seamless integration with existing systems",
      descriptionAr: "تكامل سلس مع الأنظمة الحالية",
      image: "https://placehold.co/100x100",
      isActive: false,
    },
  ];

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{item.titleEn}</p>
            <p className="text-bold text-tiny text-default-500">
              {item.titleAr}
            </p>
          </div>
        );

      case "description":
        return (
          <div className="flex flex-col max-w-xs">
            <Tooltip content={item.descriptionEn}>
              <p className="text-small truncate">{item.descriptionEn}</p>
            </Tooltip>
            <Tooltip content={item.descriptionAr}>
              <p className="text-tiny text-default-500 truncate">
                {item.descriptionAr}
              </p>
            </Tooltip>
          </div>
        );

      case "image":
        return (
          <Tooltip content="Image">
            <img
              src={item.image}
              alt="Service"
              className="w-10 h-10 rounded object-cover"
            />
          </Tooltip>
        );

      case "status":
        return (
          <Chip
            className="capitalize"
            color={item.isActive ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {item.isActive ? "Active" : "Inactive"}
          </Chip>
        );

      case "actions":
        return (
          <div className="flex gap-2">
            <Tooltip content="Edit">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-default-400 cursor-pointer active:opacity-50"
                onPress={() => handleEdit(item)}
              >
                <FaEdit />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-danger cursor-pointer active:opacity-50"
                onPress={() => handleDelete(item)}
              >
                <FaTrash />
              </Button>
            </Tooltip>
          </div>
        );

      default:
        return null;
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-bold">Professional Services</h1>
        <Button
          className="bg-navy-600 text-white"
          onPress={() => setIsAddModalOpen(true)}
        >
          Add New
        </Button>
      </div>
    );
  }, []);

  return (
    <div className="p-6">
      <Table topContent={topContent} aria-label="Professional Services table">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No records found"}>
          {proServices.map((item) => (
            <TableRow key={item.id}>
              {["title", "description", "image", "status", "actions"].map(
                (columnKey) => (
                  <TableCell key={columnKey}>
                    {renderCell(item, columnKey)}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal components will be added later */}
    </div>
  );
}

export default ProServices;
