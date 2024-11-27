import React from "react";
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
  Button
} from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";

const pages = [
  {
    id: 1,
    pageName: "About Us",
    slug: "about-us",
    template: "Template1",
    status: "active",
  },
  {
    id: 2,
    pageName: "Contact",
    slug: "contact",
    template: "Template2",
    status: "inactive",
  },
  {
    id: 3,
    pageName: "Services",
    slug: "services",
    template: "Template3",
    status: "active",
  },
];

const columns = [
  { name: "PAGE NAME", uid: "pageName" },
  { name: "SLUG", uid: "slug" },
  { name: "TEMPLATE", uid: "template" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

function PageTemplatesConfiguration() {
  const renderCell = (page, columnKey) => {
    const cellValue = page[columnKey];

    switch (columnKey) {
      case "pageName":
        return <div className="font-medium">{cellValue}</div>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={page.status === "active" ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <Button isIconOnly size="sm" variant="light">
                <AiOutlineEye className="text-lg" />
              </Button>
            </Tooltip>
            <Tooltip content="Edit">
              <Button isIconOnly size="sm" variant="light">
                <FiEdit className="text-lg" />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <Button isIconOnly size="sm" variant="light">
                <RiDeleteBinLine className="text-lg text-danger" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full">
      <Table aria-label="Pages table">
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
        <TableBody items={pages}>
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
  );
}

export default PageTemplatesConfiguration; 