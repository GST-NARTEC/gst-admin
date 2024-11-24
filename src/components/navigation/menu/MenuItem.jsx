import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
  Input,
  Pagination,
  Spinner,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useGetMenuItemsQuery } from "../../../store/apis/endpoints/websiteEndpoints/menuItems";
import AddMenuItem from "./AddMenuItem";
import EditMenuItem from "./EditMenuItem";
import DeleteMenuItem from "./DeleteMenuItem";

function MenuItem() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [isEditMenuModalOpen, setIsEditMenuModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const { data, isLoading } = useGetMenuItemsQuery();
  const menus = data?.data?.menus || [];

  const columns = [
    { name: "MENU NAME (EN)", uid: "nameEn" },
    { name: "MENU NAME (AR)", uid: "nameAr" },
    { name: "SUB MENUS", uid: "subMenus" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (menu, columnKey) => {
    switch (columnKey) {
      case "nameEn":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{menu.nameEn}</p>
            <p className="text-bold text-sm text-gray-400">
              {new Date(menu.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
      case "nameAr":
        return <p className="text-sm">{menu.nameAr}</p>;
      case "subMenus":
        return menu.subMenus.length > 0 ? (
          <Popover placement="right">
            <PopoverTrigger>
              <Chip
                className="capitalize cursor-pointer"
                color="primary"
                size="sm"
                variant="flat"
              >
                {menu.subMenus.length} items
              </Chip>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-4 py-3">
                <div className="text-small font-bold mb-2">Sub Menus</div>
                <div className="space-y-2">
                  {menu.subMenus.map((subMenu) => (
                    <div key={subMenu.id} className="flex flex-col gap-1">
                      <div className="text-sm">{subMenu.nameEn}</div>
                      {subMenu.headingEn !== "null" && (
                        <div className="text-xs text-gray-500">
                          Category: {subMenu.headingEn}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Chip className="capitalize" color="primary" size="sm" variant="flat">
            {menu.subMenus.length} items
          </Chip>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={menu.status === 1 ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {menu.status === 1 ? "Active" : "Inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit menu">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedMenu(menu);
                  setIsEditMenuModalOpen(true);
                }}
              >
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete menu">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedMenu(menu);
                  setIsDeleteModalOpen(true);
                }}
              >
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return menu[columnKey];
    }
  };

  const topContent = useMemo(
    () => (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Input
            isClearable
            value={search}
            onValueChange={setSearch}
            className="w-full sm:max-w-[44%]"
            placeholder="Search by menu name..."
            startContent={<FaSearch className="text-default-300" />}
          />
          <Button
            className="bg-navy-600 text-white"
            startContent={<FaPlus />}
            onPress={() => setIsAddMenuModalOpen(true)}
          >
            Add New Menu
          </Button>
        </div>
      </div>
    ),
    [search]
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menu Items</h1>
      <Table
        aria-label="Menu items table"
        topContent={topContent}
        classNames={{
          wrapper: "shadow-md rounded-lg",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className="bg-gray-50 text-gray-600"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={menus}
          emptyContent="No menu items found"
          loadingContent={<Spinner />}
          isLoading={isLoading}
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

      <AddMenuItem
        isOpen={isAddMenuModalOpen}
        onOpenChange={setIsAddMenuModalOpen}
      />

      <EditMenuItem
        isOpen={isEditMenuModalOpen}
        onOpenChange={(open) => {
          setIsEditMenuModalOpen(open);
          if (!open) setSelectedMenu(null);
        }}
        menuItem={selectedMenu}
      />

      <DeleteMenuItem
        isOpen={isDeleteModalOpen}
        onOpenChange={(open) => {
          setIsDeleteModalOpen(open);
          if (!open) setSelectedMenu(null);
        }}
        menuItem={selectedMenu}
      />
    </div>
  );
}

export default MenuItem;
