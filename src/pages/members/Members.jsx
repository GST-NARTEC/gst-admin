import React, { useEffect, useMemo, useState } from "react";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import {
  FaSearch,
  FaPlus,
  FaEllipsisV,
  FaEye,
  FaTrash,
  FaCheckCircle,
  FaSync,
  FaSignInAlt,
  FaBan,
  FaHourglassHalf,
  FaUserClock,
} from "react-icons/fa";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import { useGetUserQuery } from "../../store/apis/endpoints/user";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useUpdateUserStatusMutation } from "../../store/apis/endpoints/user";
import OverlayLoader from "../../components/common/OverlayLoader";
import toast from "react-hot-toast";
import { encrypt } from "../../utils/encryption.js";
import DeleteConfirmationModal from "../../components/members/DeleteConfirmationModal.jsx";
import ExportMembers from "../../components/members/ExportMembers.jsx";

const TABLE_COLUMNS = [
  { name: "COMPANY (EN)", uid: "companyNameEn" },
  { name: "COMPANY (AR)", uid: "companyNameAr" },
  { name: "EMAIL", uid: "email" },
  { name: "MOBILE", uid: "mobile" },
  { name: "LICENSE NO", uid: "companyLicenseNo" },
  { name: "COUNTRY", uid: "country" },
  { name: "ORDERS STATUS", uid: "orders" },
  { name: "STATUS", uid: "isActive" },
  { name: "ACTIONS", uid: "actions" },
];

const ROWS_PER_PAGE = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

function Members() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");

  const [
    updateUserStatus,
    {
      isLoading: isUpdating,
      isSuccess: isUpdated,
      isError: isUpdatedError,
      error: updatedError,
    },
  ] = useUpdateUserStatusMutation();

  // Debounce search term
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, refetch, isFetching } = useGetUserQuery({
    page,
    limit: Number(limit),
    ...(debouncedSearch && { search: debouncedSearch }),
  });

  const members = data?.data?.users || [];
  const pagination = data?.data?.pagination;

  useEffect(() => {
    if (isUpdated) {
      toast.success("Member updated successfully");
    }
    if (isUpdatedError) {
      toast.error(updatedError?.data?.message);
    }
  }, [isUpdated, isUpdatedError, updatedError]);

  const handleEdit = (member) => {
    navigate(`/edit-member/${member.id}`);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const handleDelete = (member) => {
    setMemberToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setMemberToDelete(null);
  };

  const handleView = (member) => {
    navigate(`/admin/view-member/${member.id}`);
  };

  const handleStatusUpdate = async (member, action) => {
    try {
      await updateUserStatus({ id: member.id, params: { action } });
      toast.success(
        `Member ${action === "active" ? "activated" : "suspended"} successfully`
      );
    } catch (error) {
      toast.error(error?.data?.message || "Status update failed");
    }
  };

  const handleLoginAsMember = (member) => {
    // Encrypt the member's credentials
    const credentials = encrypt({
      email: member.email,
      companyLicenseNo: member.companyLicenseNo,
    });

    // Redirect to member portal with encrypted credentials
    const memberPortalURL = `https://buybarcodeupc.com/member-portal/login?auth=${credentials}`;
    window.open(memberPortalURL, "_blank");
  };

  const renderCell = (member, columnKey) => {
    switch (columnKey) {
      case "isActive":
        return (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
              member.isActive
                ? "bg-success/20 text-success"
                : "bg-danger/20 text-danger"
            }`}
          >
            {member.isActive ? "Active" : "Inactive"}
          </div>
        );
      case "orders":
        const pendingPayment =
          member.orders?.filter((order) => order.status === "Pending Payment")
            .length || 0;

        const pendingActivation =
          member.orders?.filter(
            (order) => order.status === "Pending Account Activation"
          ).length || 0;

        const activated =
          member.orders?.filter((order) => order.status === "Activated")
            .length || 0;

        return (
          <div className="flex flex-wrap items-center gap-1.5">
            {activated > 0 && (
              <Chip
                startContent={
                  <FaCheckCircle className="text-success text-xs" />
                }
                variant="flat"
                color="success"
                size="sm"
                classNames={{
                  base: "bg-success/10 h-[26px]",
                  content: "text-success font-medium px-1",
                }}
              >
                {activated} Activated
              </Chip>
            )}
            {pendingPayment > 0 && (
              <Chip
                startContent={
                  <FaHourglassHalf className="text-warning text-xs" />
                }
                variant="flat"
                color="warning"
                size="sm"
                classNames={{
                  base: "bg-warning/10 h-[26px]",
                  content: "text-warning font-medium px-1",
                }}
              >
                {pendingPayment} Payment Pending
              </Chip>
            )}
            {pendingActivation > 0 && (
              <Chip
                startContent={<FaUserClock className="text-primary text-xs" />}
                variant="flat"
                color="primary"
                size="sm"
                classNames={{
                  base: "bg-primary/10 h-[26px]",
                  content: "text-primary font-medium px-1",
                }}
              >
                {pendingActivation} Activation Pending
              </Chip>
            )}
            {!pendingPayment && !pendingActivation && !activated && (
              <span className="text-default-400 text-xs">No orders</span>
            )}
          </div>
        );
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                className="text-lg cursor-pointer text-default-400 hover:text-default-500"
              >
                <FaEllipsisV />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Member Actions"
              className="text-default-500"
            >
              <DropdownItem
                key="profile"
                startContent={<FaEye className="text-default-500" />}
                onClick={() => handleView(member)}
              >
                View Profile
              </DropdownItem>
              <DropdownItem
                key="activation"
                isDisabled={member.isActive}
                startContent={<FaCheckCircle className="text-success" />}
                onClick={() => handleStatusUpdate(member, "active")}
              >
                Activation
              </DropdownItem>
              {/* <DropdownItem
                key="renew"
                startContent={<FaSync className="text-primary" />}
              >
                Renew Membership
              </DropdownItem> */}
              {/* <DropdownItem
                key="assign"
                startContent={<FaUserPlus className="text-warning" />}
              >
                Assign To
              </DropdownItem> */}
              <DropdownItem
                key="login"
                startContent={<FaSignInAlt className="text-secondary" />}
                onClick={() => handleLoginAsMember(member)}
              >
                Login as Member
              </DropdownItem>
              <DropdownItem
                key="suspend"
                className="text-danger"
                color="danger"
                startContent={<FaBan className="text-danger" />}
                onClick={() => handleStatusUpdate(member, "inactive")}
              >
                Suspend User
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={<FaTrash className="text-danger" />}
                onClick={() => handleDelete(member)}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return member[columnKey];
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center mb-4">
        <Input
          isClearable
          value={search}
          onValueChange={setSearch}
          className="w-full sm:max-w-[30%]"
          placeholder="Search members..."
          startContent={<FaSearch className="text-default-300" />}
        />
        <div className="flex gap-3">
          {/* <Button 
            className="bg-navy-700 text-white"
            startContent={<FaFilter />}
          >
            Filters
          </Button> */}
          {/* refresh button */}
          <Button
            className="bg-navy-700 text-white"
            startContent={<FaSync />}
            onClick={() => refetch()}
          >
            Refresh
          </Button>
          <ExportMembers members={members} />
          <Button
            className="bg-navy-700 text-white"
            startContent={<FaPlus />}
            // onClick={() => navigate("/add-member")}
            onPress={() =>
              window.open(
                "https://buybarcodeupc.com/register/barcodes",
                "_blank"
              )
            }
          >
            Add New Member
          </Button>
        </div>
      </div>
    );
  }, [search]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center px-2 py-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <span className="text-default-400 text-sm w-48">
              Rows per page:
            </span>
            <Select
              size="sm"
              defaultSelectedKeys={[limit]}
              //   className="min-w-[100px]"
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
            <span className="text-default-400 text-sm">
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
          total={pagination?.totalPages || 1}
          onChange={setPage}
        />
      </div>
    );
  }, [pagination, page, limit]);

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold pb-4">Members</h1>
        <Table
          aria-label="Members table"
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
            items={members}
            isLoading={isLoading || isFetching}
            loadingContent={<Spinner className="text-navy-700" />}
            emptyContent="No members found"
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

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        itemName={`member "${memberToDelete?.companyNameEn}"`}
        memberId={memberToDelete?.id}
        onDeleteSuccess={() => {
          // Any additional cleanup or refetch if needed
        }}
      />
    </MainLayout>
  );
}

export default Members;
