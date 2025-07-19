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
  Pagination,
} from "@nextui-org/react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaExternalLinkAlt,
  FaImage,
} from "react-icons/fa";
import { useGetCompaniesQuery } from "../../../../store/apis/endpoints/compnies";
import AddCompanyModal from "./AddCompanyModal";
import EditCompanyModal from "./EditCompanyModal";
import DeleteCompanyModal from "./DeleteCompanyModal";

function CompniesTable() {
  const [page, setPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: companiesData, isLoading: isCompaniesLoading } =
    useGetCompaniesQuery();

  // Get companies from API
  const companies = companiesData?.data?.companies || [];

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  };

  const handleDelete = (company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const renderCell = (company, columnKey) => {
    switch (columnKey) {
      case "icon":
        return (
          <div className="flex items-center justify-center">
            {company.icon ? (
              <img
                src={company.icon}
                alt={company.titleEn}
                className="w-10 h-10 rounded-lg object-cover border"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-default-200 flex items-center justify-center">
                <FaImage className="text-default-400" />
              </div>
            )}
          </div>
        );

      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{company.titleEn}</p>
            <p className="text-bold text-tiny text-default-500">
              {company.titleAr}
            </p>
          </div>
        );

      case "description":
        return (
          <div className="flex flex-col max-w-[300px]">
            <Tooltip content={company.descriptionEn}>
              <p className="text-small line-clamp-2">{company.descriptionEn}</p>
            </Tooltip>
            <Tooltip content={company.descriptionAr}>
              <p className="text-tiny text-default-500 line-clamp-2">
                {company.descriptionAr}
              </p>
            </Tooltip>
          </div>
        );

      case "websiteLink":
        return company.websiteLink ? (
          <div className="flex items-center gap-1">
            <a
              href={company.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-small hover:underline truncate max-w-[150px]"
            >
              {company.websiteLink.replace("https://", "")}
            </a>
            <FaExternalLinkAlt className="text-primary text-xs" />
          </div>
        ) : (
          <span className="text-default-400 text-small">No website</span>
        );

      case "status":
        return (
          <Chip
            className="capitalize"
            color={company.isActive ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {company.isActive ? "Active" : "Inactive"}
          </Chip>
        );

      case "page":
        return company.page ? (
          <div className="flex flex-col">
            <span className="text-small text-primary">
              {company.page.nameEn}
            </span>
            <span className="text-tiny text-default-500">
              {company.page.nameAr}
            </span>
          </div>
        ) : (
          <span className="text-default-400 text-small">No page linked</span>
        );

      case "createdAt":
        return (
          <span className="text-small text-default-500">
            {new Date(company.createdAt).toLocaleDateString()}
          </span>
        );

      case "updatedAt":
        return (
          <span className="text-small text-default-500">
            {new Date(company.updatedAt).toLocaleDateString()}
          </span>
        );

      case "actions":
        return (
          <div className="flex gap-2">
            <Tooltip content="Edit Company">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-default-400 cursor-pointer active:opacity-50"
                onPress={() => handleEdit(company)}
              >
                <FaEdit className="text-base" />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete Company">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-danger cursor-pointer active:opacity-50"
                onPress={() => handleDelete(company)}
              >
                <FaTrash className="text-base" />
              </Button>
            </Tooltip>
          </div>
        );

      default:
        return company[columnKey];
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Companies</h1>
          <Button
            className="bg-navy-600 text-white"
            startContent={<FaPlus />}
            onPress={handleAdd}
          >
            Add New Company
          </Button>
        </div>
        <div className="flex justify-end items-center">
          <span className="text-default-400 text-small">
            Total: {companies.length} companies
          </span>
        </div>
      </div>
    );
  }, [companies.length]);

  const bottomContent = useMemo(() => {
    const totalPages = Math.ceil(companies.length / 10);
    if (totalPages <= 1) return null;

    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-small text-default-400">
          {companies.length} companies total
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={setPage}
          classNames={{
            cursor: "bg-navy-700 text-white",
          }}
        />
      </div>
    );
  }, [companies.length, page]);

  return (
    <div className="p-6">
      <Table
        topContent={topContent}
        bottomContent={bottomContent}
        aria-label="Companies table"
        classNames={{
          wrapper: "shadow-md rounded-lg",
        }}
      >
        <TableHeader>
          <TableColumn align="center">ICON</TableColumn>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>WEBSITE</TableColumn>
          <TableColumn align="center">STATUS</TableColumn>
          <TableColumn>LINKED PAGE</TableColumn>
          <TableColumn align="center">CREATED</TableColumn>
          <TableColumn align="center">UPDATED</TableColumn>
          <TableColumn align="center">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody
          items={companies}
          isLoading={isCompaniesLoading}
          loadingContent={<Spinner />}
          emptyContent="No companies found"
        >
          {(company) => (
            <TableRow key={company.id}>
              {[
                "icon",
                "title",
                "description",
                "websiteLink",
                "status",
                "page",
                "createdAt",
                "updatedAt",
                "actions",
              ].map((columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(company, columnKey)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Modals */}
      <AddCompanyModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />

      <EditCompanyModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        company={selectedCompany}
      />

      <DeleteCompanyModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        company={selectedCompany}
      />
    </div>
  );
}

export default CompniesTable;
