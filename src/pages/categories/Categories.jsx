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
import { FaSearch, FaPlus, FaEye } from "react-icons/fa";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import AddCategory from "../../components/categories/AddCategory";
import ViewCategory from "../../components/categories/ViewCategory";
import { useGetCategoriesQuery } from "../../store/apis/endpoints/categories";

function Categories() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data, isLoading } = useGetCategoriesQuery({ page, search});
  const categories = data?.data?.categories || [];
  const pagination = data?.data?.pagination;

  const columns = [
    { name: "CATEGORY", uid: "name" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (category, columnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: category.image }}
            description={`Created: ${new Date(category.createdAt).toLocaleDateString()}`}
            name={category.name}
          >
            {category.name}
          </User>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="View category">
              <span
                className="text-lg text-navy-700 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsViewModalOpen(true);
                }}
              >
                <FaEye />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return category[columnKey];
    }
  };

  const topContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Input
          isClearable
          value={search}
          onValueChange={setSearch}
          className="w-full sm:max-w-[44%]"
          placeholder="Search by category name..."
          startContent={<FaSearch className="text-default-300" />}
        />
        <Button
          className="bg-navy-600 text-white"
          startContent={<FaPlus />}
          onClick={() => setIsAddCategoryModalOpen(true)}
        >
          Add New Category
        </Button>
      </div>
    </div>
  ), [search]);

  const bottomContent = useMemo(() => (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-sm text-gray-500">
        {pagination?.total || 0} categories in total
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
  ), [page, pagination]);

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <Table
          aria-label="Categories table"
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
            emptyContent="No categories found"
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

      <AddCategory
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
      />

      <ViewCategory
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

export default Categories;
