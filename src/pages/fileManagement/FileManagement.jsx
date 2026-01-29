import React, { useState } from "react";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Chip,
  Pagination,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import {
  FaUpload,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFileAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  useGetFilesQuery,
  useUploadFileMutation,
  useUpdateFileMutation,
  useToggleFileStatusMutation,
  useDeleteFileMutation,
} from "../../store/apis/endpoints/files";
import { useDebounce } from "../../hooks/useDebounce";

function FileManagement() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const debouncedSearch = useDebounce(search, 500);

  // Modals
  const {
    isOpen: isUploadOpen,
    onOpen: onUploadOpen,
    onClose: onUploadClose,
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

  // Form states
  const [uploadForm, setUploadForm] = useState({ name: "", document: null });
  const [editForm, setEditForm] = useState({ id: "", name: "", document: null });
  const [deleteId, setDeleteId] = useState(null);

  // API hooks
  const { data: filesData, isLoading } = useGetFilesQuery({
    page,
    limit,
    search: debouncedSearch,
    isActive,
    sortBy,
    sortOrder,
  });

  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [updateFile, { isLoading: isUpdating }] = useUpdateFileMutation();
  const [toggleStatus, { isLoading: isToggling }] = useToggleFileStatusMutation();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();

  // Handlers
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.document) {
      toast.error("Please provide both name and file");
      return;
    }

    const formData = new FormData();
    formData.append("name", uploadForm.name);
    formData.append("document", uploadForm.document);

    try {
      const result = await uploadFile(formData).unwrap();
      toast.success(result.message || "File uploaded successfully");
      setUploadForm({ name: "", document: null });
      onUploadClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to upload file");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editForm.name) {
      toast.error("Please provide a file name");
      return;
    }

    const formData = new FormData();
    formData.append("name", editForm.name);
    if (editForm.document) {
      formData.append("document", editForm.document);
    }

    try {
      const result = await updateFile({ id: editForm.id, formData }).unwrap();
      toast.success(result.message || "File updated successfully");
      setEditForm({ id: "", name: "", document: null });
      onEditClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update file");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const result = await toggleStatus(id).unwrap();
      toast.success(result.message || "Status updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to toggle status");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteFile(deleteId).unwrap();
      toast.success(result.message || "File deleted successfully");
      setDeleteId(null);
      onDeleteClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete file");
    }
  };

  const openEditModal = (file) => {
    setEditForm({ id: file.id, name: file.name, document: null });
    onEditOpen();
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    onDeleteOpen();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <MainLayout>
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">File Management</h1>
          <p className="text-gray-600 mt-1">Manage your documents and files</p>
        </div>
        <Button
          color="primary"
          startContent={<FaUpload />}
          onPress={onUploadOpen}
          size="lg"
        >
          Upload File
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          isClearable
          placeholder="Search files..."
          value={search}
          onValueChange={setSearch}
          startContent={<FaSearch className="text-gray-400" />}
          classNames={{
            input: "text-base",
            inputWrapper: "shadow-sm",
          }}
        />
        <Select
          label="Status"
          selectedKeys={[isActive]}
          onChange={(e) => setIsActive(e.target.value)}
          classNames={{
            trigger: "shadow-sm",
          }}
        >
          <SelectItem key="all" value="all">All</SelectItem>
          <SelectItem key="true" value="true">Active</SelectItem>
          <SelectItem key="false" value="false">Inactive</SelectItem>
        </Select>
        <Select
          label="Sort By"
          selectedKeys={[sortBy]}
          onChange={(e) => setSortBy(e.target.value)}
          classNames={{
            trigger: "shadow-sm",
          }}
        >
          <SelectItem key="createdAt" value="createdAt">Created Date</SelectItem>
          <SelectItem key="name" value="name">Name</SelectItem>
          <SelectItem key="size" value="size">Size</SelectItem>
        </Select>
        <Select
          label="Order"
          selectedKeys={[sortOrder]}
          onChange={(e) => setSortOrder(e.target.value)}
          classNames={{
            trigger: "shadow-sm",
          }}
        >
          <SelectItem key="asc" value="asc">Ascending</SelectItem>
          <SelectItem key="desc" value="desc">Descending</SelectItem>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <>
          <Table
            aria-label="Files table"
            classNames={{
              wrapper: "shadow-md",
            }}
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>SIZE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>CREATED</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No files found">
              {filesData?.data?.files?.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FaFileAlt className="text-blue-500" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat">
                      {file.mimeType?.split("/")[1]?.toUpperCase() || "FILE"}
                    </Chip>
                  </TableCell>
                  <TableCell>{formatFileSize(file.size)}</TableCell>
                  <TableCell>
                    <Chip
                      color={file.isActive ? "success" : "default"}
                      variant="flat"
                      size="sm"
                    >
                      {file.isActive ? "Active" : "Inactive"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {new Date(file.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="primary"
                        onPress={() => window.open(file.path, "_blank")}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="warning"
                        onPress={() => openEditModal(file)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color={file.isActive ? "default" : "success"}
                        onPress={() => handleToggleStatus(file.id)}
                        isLoading={isToggling}
                      >
                        {file.isActive ? <FaToggleOn /> : <FaToggleOff />}
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => openDeleteModal(file.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {filesData?.data?.pagination && (
            <div className="flex flex-col items-center gap-4 py-8 mt-4">
              <div className="flex gap-2 items-center">
                <span className="text-default-400">
                  Page {page} of {filesData.data.pagination.totalPages}
                </span>
              </div>
              <Pagination
                isCompact
                showControls
                total={filesData.data.pagination.totalPages}
                page={page}
                onChange={setPage}
                color="primary"
                size="lg"
                radius="full"
              />
            </div>
          )}
        </>
      )}

      {/* Upload Modal */}
      <Modal isOpen={isUploadOpen} onClose={onUploadClose} size="2xl">
        <ModalContent>
          <form onSubmit={handleUploadSubmit}>
            <ModalHeader>Upload New File</ModalHeader>
            <ModalBody>
              <Input
                label="File Name"
                placeholder="Enter file name"
                value={uploadForm.name}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, name: e.target.value })
                }
                required
              />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, document: e.target.files[0] })
                  }
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                  required
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onUploadClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isUploading}
                startContent={<FaUpload />}
              >
                Upload
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="2xl">
        <ModalContent>
          <form onSubmit={handleEditSubmit}>
            <ModalHeader>Edit File</ModalHeader>
            <ModalBody>
              <Input
                label="File Name"
                placeholder="Enter file name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                required
              />
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Replace File (Optional)
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setEditForm({ ...editForm, document: e.target.files[0] })
                  }
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onEditClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isUpdating}
                startContent={<FaEdit />}
              >
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this file? This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onDeleteClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleDeleteConfirm}
              isLoading={isDeleting}
              startContent={<FaTrash />}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
    </MainLayout>
  );
}

export default FileManagement;
