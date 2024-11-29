import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../../layout/AdminLayouts/MainLayout";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoArrowBack, IoEyeOutline } from "react-icons/io5";
import { useGetTemplatesQuery } from "../../../../store/apis/endpoints/templates";
import DeleteTemplate1 from "./DeleteTemplate1";

function Template1() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  const { data: templatesData, isLoading } = useGetTemplatesQuery({
    templateType: "template1",
    page,
    limit: rowsPerPage,
  });

  const templates = templatesData?.data?.templates || [];
  const pagination = templatesData?.data?.pagination || {};

  const handleAdd = () => {
    navigate("add");
  };

  const handleEdit = (template) => {
    navigate(`edit/${template?.page?.id}`);
  };

  const handleDelete = (id) => {
    setSelectedTemplateId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setSelectedTemplateId(null);
  };

  const handleView = (template) => {
    navigate(`view/${template?.page?.id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            onPress={() => navigate("/admin/gstsa1/page-templates/templates")}
          >
            <IoArrowBack className="text-xl" />
          </Button>
          <h1 className="text-2xl font-bold">Template 1 Management</h1>
        </div>
        <Button color="primary" onPress={handleAdd}>
          Add New Content
        </Button>
      </div>
    );
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-center items-center">
        <Pagination
          showControls
          total={pagination.totalPages || 1}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    );
  }, [pagination.totalPages, page]);

  return (
    <MainLayout>
      <div className="p-6">
        <Table
          aria-label="Template sections table"
          topContent={topContent}
          bottomContent={bottomContent}
        >
          <TableHeader>
            <TableColumn>TITLE (EN)</TableColumn>
            <TableColumn>TITLE (AR)</TableColumn>
            <TableColumn>PAGE SLUG</TableColumn>
            <TableColumn>PAGE NAME</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent={"No templates found"}
            loadingContent={<Spinner />}
          >
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>{template.nameEn}</TableCell>
                <TableCell>{template.nameAr}</TableCell>
                <TableCell>{template.page.slug}</TableCell>
                <TableCell>{template.page.nameEn}</TableCell>
                <TableCell>
                  {template.isActive ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip content="View">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleView(template)}
                      >
                        <IoEyeOutline className="text-lg" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Edit">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(template)}
                      >
                        <FiEdit className="text-lg" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete" color="danger">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleDelete(template.id)}
                      >
                        <RiDeleteBinLine className="text-lg text-danger" />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DeleteTemplate1
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        templateId={selectedTemplateId}
      />
    </MainLayout>
  );
}

export default Template1;
