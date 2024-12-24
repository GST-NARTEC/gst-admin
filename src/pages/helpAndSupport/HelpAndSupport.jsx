import React, { useState, useMemo } from "react";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Select,
  SelectItem,
  Input,
  Spinner,
} from "@nextui-org/react";
import { FaEye, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { format } from "date-fns";
import {
  useGetHelpAndSupportQuery,
  useUpdateHelpAndSupportMutation,
  useDeleteHelpAndSupportMutation,
  Status,
  Priority,
  TicketCategory,
} from "../../store/apis/endpoints/helpAndSupport";
import toast from "react-hot-toast";

const statusColorMap = {
  OPEN: "warning",
  IN_PROGRESS: "primary",
  RESOLVED: "success",
  CLOSED: "danger",
};

const priorityColorMap = {
  LOW: "success",
  MEDIUM: "warning",
  HIGH: "danger",
};

function HelpAndSupport() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    priority: "",
    category: "",
  });

  const { data, isLoading, isFetching } = useGetHelpAndSupportQuery(filters);
  const [updateTicket, { isLoading: isUpdateLoading }] =
    useUpdateHelpAndSupportMutation();
  const [deleteTicket, { isLoading: isDeleteLoading }] =
    useDeleteHelpAndSupportMutation();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  const {
    isOpen: isResolveOpen,
    onOpen: onResolveOpen,
    onClose: onResolveClose,
  } = useDisclosure();
  const [resolution, setResolution] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1, // Reset page when other filters change
    }));
  };

  const columns = [
    { name: "TICKET ID", uid: "id" },
    { name: "USER", uid: "user" },
    { name: "SUBJECT", uid: "subject" },
    { name: "STATUS", uid: "status" },
    { name: "PRIORITY", uid: "priority" },
    { name: "CATEGORY", uid: "category" },
    { name: "DATE", uid: "date" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    onViewOpen();
  };

  const handleDeleteClick = (ticket) => {
    setTicketToDelete(ticket);
    onDeleteOpen();
  };

  const handleDelete = async () => {
    try {
      await deleteTicket(ticketToDelete.id).unwrap();
      toast.success("Ticket deleted successfully");
      onDeleteClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete ticket");
    }
  };

  const handleResolve = (ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setResolution("");
    onResolveOpen();
  };

  const handleUpdateTicket = async () => {
    if (!resolution || !newStatus) {
      toast.error("Please provide both response and status");
      return;
    }
    try {
      await updateTicket({
        id: selectedTicket.id,
        data: {
          status: newStatus,
          response: resolution,
        },
      }).unwrap();
      toast.success("Ticket updated successfully");
      onResolveClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update ticket");
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 flex-1">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by subject..."
              startContent={<FaSearch />}
              value={filters.search}
              onClear={() => handleFilterChange("search", "")}
              onValueChange={(value) => handleFilterChange("search", value)}
            />
            <div className="flex gap-3">
              <Select
                className="w-[150px]"
                placeholder="Status"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <SelectItem key="" value="">
                  All Status
                </SelectItem>
                {Object.entries(Status).map(([key, value]) => (
                  <SelectItem key={value} value={value}>
                    {key.split("_").join(" ")}
                  </SelectItem>
                ))}
              </Select>
              <Select
                className="w-[150px]"
                placeholder="Priority"
                value={filters.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
              >
                <SelectItem key="" value="">
                  All Priority
                </SelectItem>
                {Object.entries(Priority).map(([key, value]) => (
                  <SelectItem key={value} value={value}>
                    {key}
                  </SelectItem>
                ))}
              </Select>
              <Select
                className="w-[150px]"
                placeholder="Category"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <SelectItem key="" value="">
                  All Categories
                </SelectItem>
                {Object.entries(TicketCategory).map(([key, value]) => (
                  <SelectItem key={value} value={value}>
                    {key}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
  }, [filters]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center">
        <span className="text-small text-default-400">
          Total {data?.data?.pagination?.total || 0} tickets
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
          </Select>
        </div>
      </div>
    );
  }, [data?.data?.pagination, filters.page, filters.limit]);

  const renderCell = (ticket, columnKey) => {
    if (!ticket) return null;

    switch (columnKey) {
      case "id":
        return ticket.id?.slice(0, 8) || "N/A";
      case "user":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {ticket.user?.companyNameEn || "N/A"}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {ticket.user?.email || "N/A"}
            </p>
          </div>
        );
      case "subject":
        return ticket.subject || "N/A";
      case "status":
        return ticket.status ? (
          <Chip color={statusColorMap[ticket.status]} size="sm" variant="flat">
            {ticket.status}
          </Chip>
        ) : (
          "N/A"
        );
      case "priority":
        return ticket.priority ? (
          <Chip
            color={priorityColorMap[ticket.priority]}
            size="sm"
            variant="flat"
          >
            {ticket.priority}
          </Chip>
        ) : (
          "N/A"
        );
      case "category":
        return ticket.category || "N/A";
      case "date":
        return ticket.createdAt
          ? format(new Date(ticket.createdAt), "MMM dd, yyyy")
          : "N/A";
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="View Details">
              <span
                className="text-lg cursor-pointer"
                onClick={() => handleViewDetails(ticket)}
              >
                <FaEye />
              </span>
            </Tooltip>
            <Tooltip content="Resolve Ticket">
              <span
                className="text-lg cursor-pointer text-primary"
                onClick={() => handleResolve(ticket)}
              >
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip content="Delete Ticket">
              <span
                className="text-lg cursor-pointer text-danger"
                onClick={() => handleDeleteClick(ticket)}
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
          <h1 className="text-2xl font-bold">Help & Support Tickets</h1>
        </div>

        <Table
          aria-label="Help Support table"
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
            items={data?.data?.tickets || []}
            isLoading={isLoading || isFetching}
            loadingContent={<Spinner label="Loading..." />}
            emptyContent={!isLoading && "No tickets found"}
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

      {/* View Ticket Modal */}
      <Modal size="3xl" isOpen={isViewOpen} onClose={onViewClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">Ticket Details</h2>
                <p className="text-small text-default-500">
                  #{selectedTicket?.id}
                </p>
              </ModalHeader>
              <ModalBody>
                {selectedTicket && (
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Subject</h3>
                        <p>{selectedTicket.subject}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Message</h3>
                        <p className="bg-gray-100 p-4 rounded-md">
                          {selectedTicket.message}
                        </p>
                      </div>
                      {selectedTicket.response && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Response
                          </h3>
                          <p className="bg-green-100 p-4 rounded-md">
                            {selectedTicket.response}
                          </p>
                        </div>
                      )}
                      {selectedTicket.doc && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Attachment
                          </h3>
                          <img
                            src={selectedTicket.doc}
                            alt="Attachment"
                            className="max-h-40 rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-default-500">Status</span>
                            <Chip
                              color={statusColorMap[selectedTicket.status]}
                              size="sm"
                              variant="flat"
                            >
                              {selectedTicket.status}
                            </Chip>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Priority</span>
                            <Chip
                              color={priorityColorMap[selectedTicket.priority]}
                              size="sm"
                              variant="flat"
                            >
                              {selectedTicket.priority}
                            </Chip>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Category</span>
                            <span className="capitalize">
                              {selectedTicket.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          User Details
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-default-500">User ID</span>
                            <span>{selectedTicket.user.userId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Email</span>
                            <span>{selectedTicket.user.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Company</span>
                            <span>{selectedTicket.user.companyNameEn}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Timestamps
                        </h3>
                        <div className="space-y-2 text-small">
                          <div className="flex justify-between">
                            <span className="text-default-500">Created</span>
                            <span>
                              {format(
                                new Date(selectedTicket.createdAt),
                                "PPpp"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Updated</span>
                            <span>
                              {format(
                                new Date(selectedTicket.updatedAt),
                                "PPpp"
                              )}
                            </span>
                          </div>
                        </div>
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

      {/* Resolve Ticket Modal */}
      <Modal size="2xl" isOpen={isResolveOpen} onClose={onResolveClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Resolve Ticket
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Status"
                  placeholder="Select new status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  {Object.entries(Status).map(([key, value]) => (
                    <SelectItem key={value} value={value}>
                      {key.split("_").join(" ")}
                    </SelectItem>
                  ))}
                </Select>
                <Textarea
                  label="Response"
                  placeholder="Enter ticket response"
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleUpdateTicket}
                  isLoading={isUpdateLoading}
                >
                  Update Ticket
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
                <h2 className="text-xl font-bold">Delete Ticket</h2>
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this ticket?
                  <br />
                  <span className="text-sm text-default-400">
                    This action cannot be undone.
                  </span>
                </p>
                {ticketToDelete && (
                  <div className="mt-4 bg-default-100 p-3 rounded-lg">
                    <p className="font-semibold">{ticketToDelete.subject}</p>
                    <p className="text-sm text-default-400">
                      ID: {ticketToDelete.id.slice(0, 8)}
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

export default HelpAndSupport;
