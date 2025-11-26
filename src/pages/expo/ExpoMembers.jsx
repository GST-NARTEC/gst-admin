import React, { useState, useMemo } from "react";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FaEye, FaTrash, FaEdit, FaSearch, FaPlus, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import {
  useGetExhibitVisitorsQuery,
  useCreateExhibitVisitorMutation,
  useUpdateExhibitVisitorMutation,
  useDeleteExhibitVisitorMutation,
  useGetAllExhibitorsQuery,
} from "../../store/apis/endpoints/expo";
import toast from "react-hot-toast";

function ExpoMembers() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const { data, isLoading, isFetching } = useGetExhibitVisitorsQuery(filters);
  const [createVisitor, { isLoading: isCreateLoading }] =
    useCreateExhibitVisitorMutation();
  const [updateVisitor, { isLoading: isUpdateLoading }] =
    useUpdateExhibitVisitorMutation();
  const [deleteVisitor, { isLoading: isDeleteLoading }] =
    useDeleteExhibitVisitorMutation();

  const { data: exhibitors, isLoading: exhibitorsLoading } = useGetAllExhibitorsQuery();

  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  
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

  const [visitorToDelete, setVisitorToDelete] = useState(null);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1,
    }));
  };

  const columns = [
    { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "PHONE", uid: "phone" },
    { name: "COMPANY", uid: "company" },
    { name: "REGISTERED", uid: "date" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleViewDetails = (visitor) => {
    setSelectedVisitor(visitor);
    onViewOpen();
  };

  const handleCreateClick = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
    });
    onCreateOpen();
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await createVisitor(formData).unwrap();
      toast.success("Visitor created successfully");
      onCreateClose();
      setFormData({ name: "", email: "", phone: "", company: "" });
    } catch (error) {
      toast.error(error.data?.message || "Failed to create visitor");
    }
  };

  const handleEditClick = (visitor) => {
    setSelectedVisitor(visitor);
    setFormData({
      name: visitor.name || "",
      email: visitor.email || "",
      phone: visitor.phone || "",
      company: visitor.company || "",
    });
    onEditOpen();
  };

  const handleUpdate = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await updateVisitor({
        id: selectedVisitor.id,
        data: formData,
      }).unwrap();
      toast.success("Visitor updated successfully");
      onEditClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update visitor");
    }
  };

  const handleDeleteClick = (visitor) => {
    setVisitorToDelete(visitor);
    onDeleteOpen();
  };

  const handleDelete = async () => {
    try {
      await deleteVisitor(visitorToDelete.id).unwrap();
      toast.success("Visitor deleted successfully");
      onDeleteClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete visitor");
    }
  };

  const handleExport = () => {
    if (!exhibitors?.data?.exhibitVisitors || exhibitors.data.exhibitVisitors.length === 0) {
      toast.error("No data to export");
      return;
    }

    const exportData = exhibitors.data.exhibitVisitors.map((visitor) => ({
      ID: visitor.id,
      Name: visitor.name,
      Email: visitor.email,
      Phone: visitor.phone,
      Company: visitor.company,
      "Created At": format(new Date(visitor.createdAt), "PPpp"),
      "Updated At": format(new Date(visitor.updatedAt), "PPpp"),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitors");
    XLSX.writeFile(wb, "Expo_Visitors.xlsx");
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 flex-1">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name, email, company..."
              startContent={<FaSearch />}
              value={filters.search}
              onClear={() => handleFilterChange("search", "")}
              onValueChange={(value) => handleFilterChange("search", value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              color="success"
              className="text-white"
              endContent={<FaFileExcel />}
              onPress={handleExport}
              isLoading={exhibitorsLoading}
            >
              Export Excel
            </Button>
            <Button
              color="primary"
              endContent={<FaPlus />}
              onPress={handleCreateClick}
            >
              Add Visitor
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filters, exhibitors, exhibitorsLoading]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center">
        <span className="text-small text-default-400">
          Total {data?.data?.pagination?.total || 0} visitors
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={filters.page}
          total={data?.data?.pagination?.totalPages || 1}
          onChange={(page) => handleFilterChange("page", page)}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Select
            className="w-[30%]"
            value={filters.limit.toString()}
            onChange={(e) =>
              handleFilterChange("limit", Number(e.target.value))
            }
          >
            <SelectItem key={5} value="5">
              5
            </SelectItem>
            <SelectItem key={10} value="10">
              10
            </SelectItem>
            <SelectItem key={15} value="15">
              15
            </SelectItem>
            <SelectItem key={20} value="20">
              20
            </SelectItem>
          </Select>
        </div>
      </div>
    );
  }, [data?.data?.pagination, filters.page, filters.limit]);

  const renderCell = (visitor, columnKey) => {
    if (!visitor) return null;

    switch (columnKey) {
      case "id":
        return visitor.id?.slice(0, 8) || "N/A";
      case "name":
        return visitor.name || "N/A";
      case "email":
        return visitor.email || "N/A";
      case "phone":
        return visitor.phone || "N/A";
      case "company":
        return visitor.company || "N/A";
      case "date":
        return visitor.createdAt
          ? format(new Date(visitor.createdAt), "MMM dd, yyyy")
          : "N/A";
      case "actions":
        return (
          <div className="flex items-center gap-2 justify-center">
            <Tooltip content="View Details">
              <span
                className="text-lg cursor-pointer text-default-400 hover:text-default-600"
                onClick={() => handleViewDetails(visitor)}
              >
                <FaEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit Visitor">
              <span
                className="text-lg cursor-pointer text-primary hover:text-primary-600"
                onClick={() => handleEditClick(visitor)}
              >
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip content="Delete Visitor">
              <span
                className="text-lg cursor-pointer text-danger hover:text-danger-600"
                onClick={() => handleDeleteClick(visitor)}
              >
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy-700">Expo Visitors</h1>
          <p className="text-gray-600 mt-1">Manage exhibit visitor registrations</p>
        </div>

        <Table
          aria-label="Expo visitors table"
          isHeaderSticky
          topContent={topContent}
          bottomContent={bottomContent}
          classNames={{
            wrapper: "min-h-[222px]",
          }}
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
            items={data?.data?.exhibitVisitors || []}
            isLoading={isLoading || isFetching}
            loadingContent={<Spinner label="Loading..." />}
            emptyContent={!isLoading && "No visitors found"}
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

      {/* View Visitor Modal */}
      <Modal size="2xl" isOpen={isViewOpen} onClose={onViewClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">Visitor Details</h2>
                <p className="text-small text-default-500">
                  #{selectedVisitor?.id}
                </p>
              </ModalHeader>
              <ModalBody>
                {selectedVisitor && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-default-500">Name</p>
                        <p className="font-semibold">{selectedVisitor.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Email</p>
                        <p className="font-semibold">{selectedVisitor.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Phone</p>
                        <p className="font-semibold">{selectedVisitor.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Company</p>
                        <p className="font-semibold">{selectedVisitor.company}</p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Registered On</p>
                        <p className="font-semibold">
                          {format(new Date(selectedVisitor.createdAt), "PPpp")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-default-500">Last Updated</p>
                        <p className="font-semibold">
                          {format(new Date(selectedVisitor.updatedAt), "PPpp")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Create Visitor Modal */}
      <Modal size="2xl" isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Visitor
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Name"
                    placeholder="Enter visitor name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    isRequired
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    isRequired
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    isRequired
                  />
                  <Input
                    label="Company"
                    placeholder="Enter company name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    isRequired
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleCreate}
                  isLoading={isCreateLoading}
                >
                  Create Visitor
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Visitor Modal */}
      <Modal size="2xl" isOpen={isEditOpen} onClose={onEditClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Visitor
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Name"
                    placeholder="Enter visitor name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    isRequired
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    isRequired
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    isRequired
                  />
                  <Input
                    label="Company"
                    placeholder="Enter company name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    isRequired
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleUpdate}
                  isLoading={isUpdateLoading}
                >
                  Update Visitor
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal size="sm" isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">Delete Visitor</h2>
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this visitor?
                  <br />
                  <span className="text-sm text-default-400">
                    This action cannot be undone.
                  </span>
                </p>
                {visitorToDelete && (
                  <div className="mt-4 bg-default-100 p-3 rounded-lg">
                    <p className="font-semibold">{visitorToDelete.name}</p>
                    <p className="text-sm text-default-400">
                      {visitorToDelete.email}
                    </p>
                    <p className="text-sm text-default-400">
                      {visitorToDelete.company}
                    </p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleDelete}
                  isLoading={isDeleteLoading}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </MainLayout>
  );
}

export default ExpoMembers;