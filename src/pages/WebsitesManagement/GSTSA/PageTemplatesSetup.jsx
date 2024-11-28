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
} from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useGetPagesQuery } from "../../../store/apis/endpoints/pageSetup";
import AddPageSetup from "../../../components/pageTemplates/pageSetup/AddPageSetup";
import UpdatePageSetup from "../../../components/pageTemplates/pageSetup/UpdatePageSetup";
import DeletePageSetup from "../../../components/pageTemplates/pageSetup/DeletePageSetup";

const columns = [
  { name: "PAGE NAME", uid: "nameEn" },
  { name: "SLUG", uid: "slug" },
  { name: "TEMPLATE", uid: "template" },
  { name: "ACTIONS", uid: "actions" },
];

function PageTemplatesSetup() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  
  const { data, isLoading, isError } = useGetPagesQuery();

  const renderCell = (page, columnKey) => {
    const cellValue = page[columnKey];

    switch (columnKey) {
      case "nameEn":
        return <div className="font-medium">{cellValue}</div>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center mx-auto">
            <Tooltip content="Edit">
              <Button 
                isIconOnly 
                size="sm" 
                variant="light"
                onPress={() => {
                  setSelectedPage(page);
                  setUpdateModalOpen(true);
                }}
              >
                <FiEdit className="text-lg" />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <Button 
                isIconOnly 
                size="sm" 
                variant="light"
                onPress={() => {
                  setSelectedPage(page);
                  setDeleteModalOpen(true);
                }}
              >
                <RiDeleteBinLine className="text-lg text-danger" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-end items-end">
        <Button 
          color="primary" 
          variant="shadow"
          onPress={() => setAddModalOpen(true)}
        >
          Add Page
        </Button>
      </div>
    );
  }, []);

  return (
    <div className="w-full">
      <Table aria-label="Pages table" topContent={topContent}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data?.data?.pages ?? []}
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent={"No pages found"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AddPageSetup 
        isOpen={addModalOpen} 
        onOpenChange={setAddModalOpen}
      />
      
      <UpdatePageSetup 
        isOpen={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        page={selectedPage}
      />
      
      <DeletePageSetup 
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        page={selectedPage}
      />
    </div>
  );
}

export default PageTemplatesSetup;
