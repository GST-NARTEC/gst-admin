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
import { useGetProServicesQuery } from "../../../../store/apis/endpoints/websiteEndpoints/proServices";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddProService from "./AddProService";
import EditProService from "./EditProService";
import DeleteProService from "./DeleteProService";

function ProServices() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetProServicesQuery();
  const proServices = data?.data?.proServices || [];

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
          <div className="flex flex-col max-w-[230px]">
            <Tooltip content={item.descriptionEn}>
              <p className="text-small line-clamp-2">{item.descriptionEn}</p>
            </Tooltip>
            <Tooltip content={item.descriptionAr}>
              <p className="text-tiny text-default-500 truncate line-clamp-2">
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
            color={item.status === 1 ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {item.status === 1 ? "Active" : "Inactive"}
          </Chip>
        );

      case "page":
        return (
          <div className="flex items-center">
            {item.pageId ? (
              <div className="text-primary text-small underline">
                {item.page.nameEn}
              </div>
            ) : item.externalUrl ? (
              <div className="text-primary text-small underline">
                {item.externalUrl}
              </div>
            ) : (
              <div className="text-default-400 text-small">Unlinked</div>
            )}
          </div>
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
                <FaEdit className="text-base" />
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
                <FaTrash className="text-base" />
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
          <TableColumn>PAGE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent={"No records found"}
        >
          {proServices.map((item) => (
            <TableRow key={item.id}>
              {[
                "title",
                "description",
                "image",
                "status",
                "page",
                "actions",
              ].map((columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(item, columnKey)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddProService isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} />

      <EditProService
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        proService={selectedItem}
      />

      <DeleteProService
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        proService={selectedItem}
      />
    </div>
  );
}

export default ProServices;
