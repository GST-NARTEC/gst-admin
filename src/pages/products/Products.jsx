import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Input,
  Button,
  Pagination,
  Tooltip,
  Spinner,
  Chip,
} from "@nextui-org/react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFileExcel,
  FaFilePdf,
} from "react-icons/fa";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../store/apis/endpoints/products";
import { useDebounce } from "../../hooks/useDebounce";
import DeleteProduct from "../../components/products/DeleteProduct";
import { useSelector } from "react-redux";
import { selectCurrencySymbol } from "../../store/slice/currencySlice";

const TABLE_COLUMNS = [
  { name: "NAME", uid: "title" },
  { name: "CATEGORY", uid: "category" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "PRICE", uid: "price" },
  { name: "ADDONS", uid: "addons" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

function Products() {
  const currencySymbol = useSelector(selectCurrencySymbol);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGetProductsQuery({
    page,
    limit: 10,
    ...(debouncedSearch && { search: debouncedSearch }),
  });

  const products = data?.data?.products || [];
  const pagination = data?.data?.pagination;

  const handleEdit = (product) => {
    navigate(`/admin/edit-product/${product.id}`);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const renderCell = (product, columnKey) => {
    switch (columnKey) {
      case "title":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src:
                product.image ||
                "https://www.sagedata.com/images/2007/Code_128_Barcode_Graphic.jpg",
              name: product.title,
            }}
            description={`Created: ${new Date(
              product.createdAt
            ).toLocaleDateString()}`}
            name={product.title}
          />
        );
      case "category":
        return <span>{product.category?.name || "Uncategorized"}</span>;
      case "description":
        return (
          <Tooltip content={product.description}>
            <div className="max-w-[150px]">
              <p className="text-small  line-clamp-2">{product.description}</p>
            </div>
          </Tooltip>
        );
      case "price":
        return (
          <span>
            {currencySymbol} {Number(product.price).toFixed(2)}
          </span>
        );
      case "addons":
        return (
          <Tooltip
            content={
              product.addons.length > 0
                ? product.addons
                    .map(
                      (addon) =>
                        `${addon.name} (${currencySymbol}${addon.price})`
                    )
                    .join(", ")
                : "No addons available"
            }
          >
            <Chip
              className="cursor-pointer"
              color={product.addons.length > 0 ? "primary" : "default"}
              size="sm"
              variant="flat"
            >
              {product.addons.length} Addon
              {product.addons.length !== 1 ? "s" : ""}
            </Chip>
          </Tooltip>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={product.status === "active" ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {product.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex gap-4 items-center">
            <Tooltip content="Edit product">
              <span
                className="text-lg cursor-pointer text-default-400 hover:text-default-500"
                onClick={() => handleEdit(product)}
              >
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete product">
              <span
                className="text-lg cursor-pointer text-danger hover:text-danger-500"
                onClick={() => handleDelete(product)}
              >
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return product[columnKey];
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Input
            isClearable
            value={search}
            onValueChange={setSearch}
            className="w-full sm:max-w-[33%]"
            placeholder="Search products..."
            startContent={<FaSearch className="text-default-300" />}
          />
          <div className="flex gap-3 items-center">
            <Button
              className="bg-navy-700 text-white"
              startContent={<FaPlus />}
              onClick={() => navigate("/admin/add-product")}
            >
              Add New Product
            </Button>
          </div>
        </div>
      </div>
    );
  }, [search]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-small text-default-400">
          Total {pagination?.total || 0} products
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pagination?.totalPages || 1}
          onChange={setPage}
          classNames={{
            cursor: "bg-navy-700 text-white",
          }}
        />
      </div>
    );
  }, [pagination, page]);

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold pb-4">Products</h1>
        <Table
          topContent={topContent}
          bottomContent={bottomContent}
          aria-label="Products table"
        >
          <TableHeader columns={TABLE_COLUMNS}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={products}
            isLoading={isLoading}
            loadingContent={<Spinner className="text-navy-700" />}
            emptyContent="No products found"
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

        <DeleteProduct
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      </div>
    </MainLayout>
  );
}

export default Products;
