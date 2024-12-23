import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Spinner,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { IoCloudUpload } from "react-icons/io5";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import {
  useGetGtinsQuery,
  useGetGtinStatsQuery,
} from "../../store/apis/endpoints/barcodeMaster";
import { useDebounce } from "../../hooks/useDebounce";
import ImportBarcodes from "./ImportBarcodes";

const TABLE_COLUMNS = [
  { name: "GTIN", uid: "gtin" },
  { name: "STATUS", uid: "status" },
  { name: "CREATED AT", uid: "createdAt" },
  { name: "UPDATED AT", uid: "updatedAt" },
];

const ROWS_PER_PAGE = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

const BarcodesMaster = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [status, setStatus] = useState("");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Debounce search term
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGetGtinsQuery({
    page,
    limit: Number(limit),
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(status && { status }),
  });
  const { data: stats } = useGetGtinStatsQuery();

  const gtins = data?.data?.gtins || [];
  const pagination = data?.data?.pagination;

  const renderCell = (gtin, columnKey) => {
    switch (columnKey) {
      case "status":
        return (
          <Chip
            className={`capitalize ${
              gtin.status === "Available"
                ? "bg-success/20 text-success"
                : "bg-warning/20 text-warning"
            }`}
            size="sm"
            variant="flat"
          >
            {gtin.status === "Used" ? "Sold" : gtin.status}
          </Chip>
        );
      case "createdAt":
      case "updatedAt":
        return new Date(gtin[columnKey]).toLocaleDateString();
      default:
        return gtin[columnKey];
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h3 className="text-lg font-semibold text-success">Available</h3>
            <p className="text-2xl font-bold">{stats?.data?.Available || 0}</p>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h3 className="text-lg font-semibold text-warning">Sold</h3>
            <p className="text-2xl font-bold">{stats?.data?.Sold || 0}</p>
          </div>
          <div className="p-4 rounded-lg bg-danger/10 border border-danger/20">
            <h3 className="text-lg font-semibold text-danger">Used</h3>
            <p className="text-2xl font-bold">{stats?.data?.Used || 0}</p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4 flex-1">
            <Input
              isClearable
              value={search}
              onValueChange={setSearch}
              className="w-full sm:max-w-[30%]"
              placeholder="Search GTINs..."
              startContent={<FaSearch className="text-default-300" />}
            />
            <Select
              className="w-full sm:max-w-[150px]"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <SelectItem key="" value="">
                All
              </SelectItem>
              <SelectItem key="Available" value="Available">
                Available
              </SelectItem>
              <SelectItem key="Sold" value="Sold">
                Sold
              </SelectItem>
            </Select>
          </div>
          <Button
            color="primary"
            startContent={<IoCloudUpload size={20} />}
            onPress={() => setIsImportModalOpen(true)}
          >
            Import Barcodes
          </Button>
        </div>
      </div>
    );
  }, [search, status, stats]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center px-2 py-2">
        <div className="flex items-center gap-4 ">
          <div className="flex gap-2 items-center w-full">
            <span className="text-default-400 text-sm w-48">
              Rows per page:
            </span>
            <Select
              size="sm"
              defaultSelectedKeys={[limit]}
              onChange={(e) => setLimit(e.target.value)}
            >
              {ROWS_PER_PAGE.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-2">
            <span className="text-default-400 text-sm w-48">
              {`${(page - 1) * Number(limit) + 1}-${Math.min(
                page * Number(limit),
                pagination?.total || 0
              )} of ${pagination?.total || 0}`}
            </span>
          </div>
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pagination?.pages || 1}
          onChange={setPage}
        />
      </div>
    );
  }, [pagination, page, limit]);

  return (
    <MainLayout>
      <div className="p-8 ">
        <h1 className="text-2xl font-bold pb-4">Barcodes Master</h1>
        <Table
          aria-label="GTINs table"
          topContent={topContent}
          bottomContent={bottomContent}
          topContentPlacement="outside"
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "min-h-[222px]",
            td: "border-b border-divider",
            tr: "hover:bg-default-100",
          }}
        >
          <TableHeader columns={TABLE_COLUMNS}>
            {(column) => (
              <TableColumn key={column.uid} className="border-b border-divider">
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={gtins}
            isLoading={isLoading}
            loadingContent={<Spinner className="text-navy-700" />}
            emptyContent="No GTINs found"
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

        <ImportBarcodes
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
      </div>
    </MainLayout>
  );
};

export default BarcodesMaster;
