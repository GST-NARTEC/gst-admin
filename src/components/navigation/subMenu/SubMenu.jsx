import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Input,
  Spinner,
  Chip,
} from "@nextui-org/react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useGetSubMenusQuery } from "../../../store/apis/endpoints/websiteEndpoints/subMenu";
import AddSubMenu from "./AddSubMenu";
import EditSubMenu from "./EditSubMenu";
import DeleteSubMenu from "./DeleteSubMenu";

function SubMenu() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isAddSubMenuModalOpen, setIsAddSubMenuModalOpen] = useState(false);
  const [isEditSubMenuModalOpen, setIsEditSubMenuModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const { data, isLoading } = useGetSubMenusQuery();
  const subMenus = data?.data?.subMenus || [];

  const columns = [
    { name: "SUB MENU NAME (EN)", uid: "nameEn" },
    { name: "SUB MENU NAME (AR)", uid: "nameAr" },
    { name: "HEADING (EN)", uid: "headingEn" },
    { name: "PARENT MENU", uid: "menu" },
    { name: "LINKED PAGE", uid: "page" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (subMenu, columnKey) => {
    switch (columnKey) {
      case "nameEn":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{subMenu.nameEn}</p>
            <p className="text-bold text-sm text-gray-400">
              {new Date(subMenu.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
      case "nameAr":
        return <p className="text-sm">{subMenu.nameAr}</p>;
      case "headingEn":
        return subMenu.headingEn !== "null" ? (
          <Chip className="capitalize" color="primary" size="sm" variant="flat">
            {subMenu.headingEn}
          </Chip>
        ) : (
          <span className="text-gray-400">-</span>
        );
      case "menu":
        return (
          <div className="flex flex-col">
            <p className="text-sm">{subMenu.menu.nameEn}</p>
            <p className="text-xs text-gray-400">{subMenu.menu.nameAr}</p>
          </div>
        );
      case "page":
        return subMenu.page ? (
          <div className="flex flex-col">
            <p className="text-sm">{subMenu.page.nameEn}</p>
            <p className="text-xs text-gray-400">{subMenu.page.slug}</p>
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Unlinked</span>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit submenu">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedSubMenu(subMenu);
                  setIsEditSubMenuModalOpen(true);
                }}
              >
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete submenu">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedSubMenu(subMenu);
                  setIsDeleteModalOpen(true);
                }}
              >
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return subMenu[columnKey];
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
            placeholder="Search by submenu name..."
            startContent={<FaSearch className="text-default-300" />}
          />
          <Button
            className="bg-navy-600 text-white"
            startContent={<FaPlus />}
            onPress={() => setIsAddSubMenuModalOpen(true)}
          >
            Add New SubMenu
          </Button>
        </div>
      </div>
    ),
    [search]
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sub Menu Items</h1>
      <Table
        aria-label="Sub menu items table"
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
          items={subMenus}
          emptyContent="No sub menu items found"
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

      <AddSubMenu
        isOpen={isAddSubMenuModalOpen}
        onOpenChange={setIsAddSubMenuModalOpen}
      />

      <EditSubMenu
        isOpen={isEditSubMenuModalOpen}
        onOpenChange={setIsEditSubMenuModalOpen}
        subMenu={selectedSubMenu}
      />

      <DeleteSubMenu
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        subMenu={selectedSubMenu}
      />
    </div>
  );
}

export default SubMenu;