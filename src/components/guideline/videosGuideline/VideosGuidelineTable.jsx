import React, { useMemo, useState } from "react";
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
  Tooltip,
  Spinner,
  Chip,
} from "@nextui-org/react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaVideo,
  FaPlay,
} from "react-icons/fa";
import AddVideoGuideline from "./AddVideoGuideline";
import EditVideoGuideline from "./EditVideoGuideline";
import DeleteVideoGuideline from "./DeleteVideoGuideline";
import { useGetUserGuidesQuery } from "../../../store/apis/endpoints/guideline";
import { useDebounce } from "../../../hooks/useDebounce";

const TABLE_COLUMNS = [
  { name: "TITLE", uid: "title" },
  { name: "VIDEO", uid: "link" },
  { name: "CREATED AT", uid: "createdAt" },
  { name: "UPDATED AT", uid: "updatedAt" },
  { name: "ACTIONS", uid: "actions" },
];

function VideosGuidelineTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [limit] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGetUserGuidesQuery({
    page,
    limit,
    search: debouncedSearch,
    type: "video",
  });

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  const handleDelete = (video) => {
    setSelectedVideo(video);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedVideo(null);
  };

  const handlePlay = (video) => {
    if (video.link) {
      window.open(video.link, "_blank", "noopener,noreferrer");
    }
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "title":
        return <span className="font-medium">{item.title}</span>;
      case "link":
        return (
          <div className="flex items-center gap-2">
            <FaVideo className="text-primary" />
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
              onClick={(e) => {
                e.preventDefault();
                handlePlay(item);
              }}
            >
              View Video
            </a>
            <Tooltip content="Play Video">
              <span
                className="text-lg cursor-pointer text-primary hover:text-primary-500"
                onClick={() => handlePlay(item)}
              >
                <FaPlay />
              </span>
            </Tooltip>
          </div>
        );
      case "createdAt":
        return <span>{new Date(item.createdAt).toLocaleString()}</span>;
      case "updatedAt":
        return <span>{new Date(item.updatedAt).toLocaleString()}</span>;
      case "actions":
        return (
          <div className="flex gap-4 items-center">
            <Tooltip content="Edit Video">
              <span
                className="text-lg cursor-pointer text-default-400 hover:text-default-500"
                onClick={() => handleEdit(item)}
              >
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Video">
              <span
                className="text-lg cursor-pointer text-danger hover:text-danger-500"
                onClick={() => handleDelete(item)}
              >
                <FaTrash />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return item[columnKey];
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center mb-4">
        <Input
          isClearable
          value={search}
          onValueChange={setSearch}
          className="w-full sm:max-w-[33%]"
          placeholder="Search videos..."
          startContent={<FaSearch className="text-default-300" />}
        />
        <Button
          className="bg-navy-700 text-white"
          startContent={<FaPlus />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Video
        </Button>
      </div>
    );
  }, [search]);

  const bottomContent = useMemo(() => {
    if (!data?.data?.pagination) return null;

    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-small text-default-400">
          Total {data.data.pagination.total} Videos
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={data.data.pagination.totalPages}
          onChange={setPage}
          classNames={{
            cursor: "bg-navy-700 text-white",
          }}
        />
      </div>
    );
  }, [data?.data?.pagination, page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold pb-4">Video Guidelines</h1>
      <Table
        topContent={topContent}
        bottomContent={bottomContent}
        aria-label="Video Guidelines table"
      >
        <TableHeader columns={TABLE_COLUMNS}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data?.data?.guides || []}
          emptyContent="No videos found"
          isLoading={isLoading}
          loadingContent={<Spinner />}
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

      <AddVideoGuideline isOpen={isAddModalOpen} onClose={handleCloseModals} />

      <EditVideoGuideline
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        video={selectedVideo}
      />

      <DeleteVideoGuideline
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        video={selectedVideo}
      />
    </div>
  );
}

export default VideosGuidelineTable;
