import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
  Input,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { FaSearch, FaPlus } from "react-icons/fa";
import MainLayout from "../../../layout/MainLayout";
import { useGetLanguageQuery } from "../../../store/apis/endpoints/Language";
import AddLanguageChange from "./AddLanguageChange";
import { MdModeEditOutline } from "react-icons/md";
import UpdataLanguageChange from "./UpdataLanguageChange";

function LaanguageChange() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data, isLoading } = useGetLanguageQuery({ page, search });
  const categories = data || [];
  
  const pagination = data?.data?.pagination;

  const columns = [
    { name: "Name [English]", uid: "key" },
    { name: "Name [Arabic]", uid: "value" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (category, columnKey) => {
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Edit Language">
              <span
                className="text-lg text-navy-700 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsViewModalOpen(true);
                  console.log(category);
                  
                }}
              >
                <MdModeEditOutline/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return category[columnKey];
    }
  };

  const topContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Input
            isClearable
            value={search}
            onValueChange={setSearch}
            className="w-full sm:max-w-[44%]"
            placeholder="Search by Language name..."
            startContent={<FaSearch className="text-default-300" />}
          />
          <Button
            className="bg-navy-600 text-white"
            startContent={<FaPlus />}
            onClick={() => setIsAddCategoryModalOpen(true)}
          >
            Add Language
          </Button>
        </div>
      </div>
    ),
    [search]
  );

  const bottomContent = useMemo(
    () => (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-sm text-gray-500">
          {/* {pagination?.total || 0} Language in total */}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          classNames={{
            wrapper: "gap-0 overflow-visible h-8",
            item: "w-8 h-8 text-sm rounded-none",
            cursor: "bg-navy-600 text-white font-bold",
          }}
          page={page}
          total={pagination?.totalPages || 1}
          onChange={setPage}
        />
      </div>
    ),
    [page, pagination]
  );

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Language</h1>
        <Table
          aria-label="Language table"
          bottomContent={bottomContent}
          topContent={topContent}
          classNames={{
            wrapper: "shadow-md rounded-lg",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                className="bg-gray-50 text-gray-600"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={categories}
            emptyContent="No Language found"
            loadingContent={<Spinner />}
            isLoading={isLoading}
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
      </div>

      <AddLanguageChange
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
      />

      <UpdataLanguageChange
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
      />
    </MainLayout>
  );
}

export default LaanguageChange;
