import React, { useMemo, useState } from "react";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  useDisclosure,
  Pagination,
  Spinner,
  Input,
} from "@nextui-org/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import CreateAddons from "../../components/addons/CreateAddons";
import EditAddons from "../../components/addons/EditAddons";
import DeleteAddons from "../../components/addons/DeleteAddons";
import { useGetAddonsQuery } from "../../store/apis/endpoints/addons";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { selectCurrencySymbol } from "../../store/slice/currencySlice";

function Addons() {
  const [selectedAddon, setSelectedAddon] = useState(null);
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const currencySymbol = useSelector(selectCurrencySymbol);

  const { data: addonsData, isLoading } = useGetAddonsQuery({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  const handleEdit = (addon) => {
    setSelectedAddon(addon);
    onEditOpen();
  };

  const handleDelete = (addon) => {
    setSelectedAddon(addon);
    onDeleteOpen();
  };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "PRICE", uid: "price" },
    { name: "UNIT", uid: "unit" },
    { name: "STOCK", uid: "stock" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center">
        <Input
          label="Search"
          size="sm"
          type="search"
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          color="primary"
          startContent={<FaPlus />}
          onPress={onCreateOpen}
        >
          Add New
        </Button>
      </div>
    );
  }, [search]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          total={addonsData?.data?.pagination?.totalPages || 1}
          page={page}
          onChange={setPage}
        />
      </div>
    );
  }, [addonsData?.data?.pagination?.totalPages, page]);

  const renderCell = (addon, columnKey) => {
    const cellValue = addon[columnKey];

    switch (columnKey) {
      case "price":
        return `${currencySymbol} ${cellValue}`;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={addon.status === "active" ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {addon.status === "active" ? "Active" : "Inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit addon">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => handleEdit(addon)}
              >
                <FaEdit className="text-default-500 text-lg" />
              </Button>
            </Tooltip>
            <Tooltip content="Delete addon" color="danger">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => handleDelete(addon)}
              >
                <FaTrash className="text-danger text-lg" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <MainLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Addons</h1>
        </div>

        <Table
          aria-label="Addons table"
          topContent={topContent}
          bottomContent={bottomContent}
          isLoading={isLoading}
        >
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
            items={addonsData?.data?.addons || []}
            isLoading={isLoading}
            emptyContent={"No addons found"}
            loadingContent={<Spinner />}
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

        <CreateAddons isOpen={isCreateOpen} onClose={onCreateClose} />

        <EditAddons
          isOpen={isEditOpen}
          onClose={onEditClose}
          selectedAddon={selectedAddon}
        />

        <DeleteAddons
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          selectedAddon={selectedAddon}
        />
      </div>
    </MainLayout>
  );
}

export default Addons;
