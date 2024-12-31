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
  Tooltip,
  Spinner,
  Chip,
} from "@nextui-org/react";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import AddPdfGuideline from "./AddPdfGuideline";
import EditPdfGuideline from "./EditPdfGuideline";
import DeletePdfGuideline from "./DeletePdfGuideline";
import { useGetUserGuidesQuery } from "../../../store/apis/endpoints/guideline";
import { useDebounce } from "../../../hooks/useDebounce";

const TABLE_COLUMNS = [
  { name: "TITLE (EN/AR)", uid: "title" },
  { name: "PDF", uid: "link" },
  { name: "CREATED AT", uid: "createdAt" },
  { name: "UPDATED AT", uid: "updatedAt" },
  { name: "ACTIONS", uid: "actions" },
];

function PdfsGuidelineTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [limit] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGetUserGuidesQuery({
    page,
    limit,
    search: debouncedSearch,
    type: "pdf",
  });

  const handleEdit = (pdf) => {
    setSelectedPdf(pdf);
    setIsEditModalOpen(true);
  };

  const handleDelete = (pdf) => {
    setSelectedPdf(pdf);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedPdf(null);
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{item.titleEn}</span>
            {item.titleAr && (
              <span className="text-sm text-gray-500 font-medium">
                {item.titleAr}
              </span>
            )}
          </div>
        );
      case "link":
        return (
          <div className="flex items-center gap-2">
            <FaFilePdf className="text-danger" />
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              View PDF
            </a>
          </div>
        );
      case "createdAt":
        return <span>{new Date(item.createdAt).toLocaleString()}</span>;
      case "updatedAt":
        return <span>{new Date(item.updatedAt).toLocaleString()}</span>;
      case "actions":
        return (
          <div className="flex gap-4 items-center">
            <Tooltip content="Edit PDF">
              <span
                className="text-lg cursor-pointer text-default-400 hover:text-default-500"
                onClick={() => handleEdit(item)}
              >
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete PDF">
              <span
                className="text-lg cursor-pointer text-danger hover:text-danger-500"
                onClick={() => handleDelete(item)}
              >
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return item[columnKey];
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center mb-4">
        <Input
          isClearable
          value={search}
          onValueChange={setSearch}
          className="w-full sm:max-w-[33%]"
          placeholder="Search PDFs..."
          startContent={<FaSearch className="text-default-300" />}
        />
        <Button
          className="bg-navy-700 text-white"
          startContent={<FaPlus />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New PDF
        </Button>
      </div>
    );
  }, [search]);

  const bottomContent = useMemo(() => {
    if (!data?.data?.pagination) return null;

    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-small text-default-400">
          Total {data.data.pagination.total} PDFs
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={data.data.pagination.totalPages}
          onChange={setPage}
          classNames={{
            cursor: "bg-navy-700 text-white",
          }}
        />
      </div>
    );
  }, [data?.data?.pagination, page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold pb-4">PDF Guidelines</h1>
      <Table
        topContent={topContent}
        bottomContent={bottomContent}
        aria-label="PDF Guidelines table"
      >
        <TableHeader columns={TABLE_COLUMNS}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data?.data?.guides || []}
          emptyContent="No PDFs found"
          isLoading={isLoading}
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

      <AddPdfGuideline isOpen={isAddModalOpen} onClose={handleCloseModals} />

      <EditPdfGuideline
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        pdf={selectedPdf}
      />

      <DeletePdfGuideline
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        pdf={selectedPdf}
      />
    </div>
  );
}

export default PdfsGuidelineTable;
