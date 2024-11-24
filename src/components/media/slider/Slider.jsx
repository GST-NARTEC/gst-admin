import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useGetSlidersQuery } from "../../../store/apis/endpoints/websiteEndpoints/slider";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddSlider from "./AddSlider";
import EditSlider from "./EditSlider";
import DeleteSlider from "./DeleteSlider";

function Slider() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const { data, isLoading, isError } = useGetSlidersQuery();
  const sliders = data?.data?.sliders || [];

  const handleEdit = (slider) => {
    setSelectedSlider(slider);
    setIsEditModalOpen(true);
  };

  const handleDelete = (slider) => {
    setSelectedSlider(slider);
    setIsDeleteModalOpen(true);
  };

  const renderCell = (slider, columnKey) => {
    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{slider.titleEn}</p>
            <p className="text-bold text-tiny text-default-500">
              {slider.titleAr}
            </p>
          </div>
        );

      case "description":
        return (
          <div className="flex flex-col max-w-xs">
            <Tooltip content={slider.descriptionEn}>
              <p className="text-small truncate">{slider.descriptionEn}</p>
            </Tooltip>
            <Tooltip content={slider.descriptionAr}>
              <p className="text-tiny text-default-500 truncate">
                {slider.descriptionAr}
              </p>
            </Tooltip>
          </div>
        );

      case "caption":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{slider.captionEn}</p>
            <p className="text-bold text-tiny text-default-500">
              {slider.captionAr}
            </p>
          </div>
        );

      case "images":
        return (
          <div className="flex gap-2">
            <Tooltip content="English Image">
              <img
                src={slider.imageEn}
                alt="English"
                className="w-10 h-10 rounded object-cover"
              />
            </Tooltip>
            <Tooltip content="Arabic Image">
              <img
                src={slider.imageAr}
                alt="Arabic"
                className="w-10 h-10 rounded object-cover"
              />
            </Tooltip>
          </div>
        );

      case "status":
        return (
          <Chip
            className="capitalize"
            color={slider.status === 1 ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {slider.status === 1 ? "Active" : "Inactive"}
          </Chip>
        );

      case "actions":
        return (
          <div className="flex gap-2">
            <Tooltip content="Edit slider">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-default-400 cursor-pointer active:opacity-50"
                onPress={() => handleEdit(slider)}
              >
                <FaEdit />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete slider">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-danger cursor-pointer active:opacity-50"
                onPress={() => handleDelete(slider)}
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Sliders</h1>
        <Button 
          className="bg-navy-600 text-white"
          onPress={() => setIsAddModalOpen(true)}
        >
          Add New Slider
        </Button>
      </div>

      <Table aria-label="Sliders table">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>CAPTION</TableColumn>
          <TableColumn>IMAGES</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent={"No sliders found"}
        >
          {sliders.map((slider) => (
            <TableRow key={slider.id}>
              {[
                "title",
                "description",
                "caption",
                "images",
                "status",
                "actions",
              ].map((columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(slider, columnKey)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddSlider 
        isOpen={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
      />
      
      <EditSlider 
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        slider={selectedSlider}
      />
      
      <DeleteSlider 
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        slider={selectedSlider}
      />
    </div>
  );
}

export default Slider;
