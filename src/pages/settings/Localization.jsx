import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Spinner,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { FaSearch, FaEdit } from "react-icons/fa";
import {
  useGetPaginatedLocalizationsQuery,
  useUpdateLocalizationMutation,
} from "../../store/apis/endpoints/localization";
import { useDebounce } from "../../hooks/useDebounce";
import toast from "react-hot-toast";

const TABLE_COLUMNS = [
  { name: "ENGLISH VALUE", uid: "valueEn" },
  { name: "ARABIC VALUE", uid: "valueAr" },
  { name: "CREATED AT", uid: "createdAt" },
  { name: "UPDATED AT", uid: "updatedAt" },
  { name: "ACTIONS", uid: "actions" },
];

function Localization() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocalization, setSelectedLocalization] = useState(null);
  const [valueEn, setValueEn] = useState("");
  const [valueAr, setValueAr] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const [updateLocalization, { isLoading: isUpdating }] =
    useUpdateLocalizationMutation();

  const { data: response, isLoading } = useGetPaginatedLocalizationsQuery({
    page,
    limit: 10,
    ...(debouncedSearch && { search: debouncedSearch }),
  });

  const localizations = response?.data?.data || [];
  const pagination = response?.data?.meta;

  const handleEdit = (item) => {
    setSelectedLocalization(item);
    setValueEn(item.valueEn);
    setValueAr(item.valueAr);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedLocalization(null);
    setValueEn("");
    setValueAr("");
  };

  const handleUpdate = async () => {
    if (!valueEn || !valueAr) {
      toast.error("Please fill all required fields");
      return;
    }


    try {
      const payload = {
        id: selectedLocalization.id,
        body: {
          key: selectedLocalization.key,
          valueEn,
          valueAr,
        },
      };
      const res = await updateLocalization(payload);

      if (res.data) {
        toast.success("Localization updated successfully");
        handleCloseModal();
      }
      if (res.error) {
        toast.error(res.error.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "createdAt":
      case "updatedAt":
        return new Date(item[columnKey]).toLocaleDateString();
      case "actions":
        return (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={() => handleEdit(item)}
          >
            <FaEdit className="text-default-500" />
          </Button>
        );
      default:
        return item[columnKey];
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center gap-4">
        <Input
          isClearable
          value={search}
          onValueChange={setSearch}
          className="w-full sm:max-w-[30%]"
          placeholder="Search localizations..."
          startContent={<FaSearch className="text-default-300" />}
        />
      </div>
    );
  }, [search]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center px-2 py-2">
        <div className="flex gap-2">
          <span className="text-default-400 text-sm">
            {`${(page - 1) * 10 + 1}-${Math.min(
              page * 10,
              pagination?.total || 0
            )} of ${pagination?.total || 0}`}
          </span>
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
  }, [pagination, page]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold pb-4">Localizations</h1>
      <Table
        aria-label="Localizations table"
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
          items={localizations}
          isLoading={isLoading}
          loadingContent={<Spinner className="text-navy-700" />}
          emptyContent="No localizations found"
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

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onOpenChange={handleCloseModal}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Localization
              </ModalHeader>
              <ModalBody>
                <Input
                  label="English Value"
                  placeholder="Enter English value"
                  value={valueEn}
                  onChange={(e) => setValueEn(e.target.value)}
                  isRequired
                />
                <Input
                  label="Arabic Value"
                  placeholder="Enter Arabic value"
                  value={valueAr}
                  onChange={(e) => setValueAr(e.target.value)}
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleUpdate}
                  isLoading={isUpdating}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Localization;
