import React, { useState, useMemo, useEffect } from "react";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import {
  FaFileExcel,
  FaFilePdf,
  FaSearch,
  FaSync,
  FaChartLine,
  FaEye,
  FaTrash,
  FaCheckCircle,
  FaHourglassHalf,
  FaUserClock,
  FaEllipsisV,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Card,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useGetQuickStatsQuery,
  useGetRevenueTrendsQuery,
  useGetKpiMembersQuery,
  useLazyGetKpiExportQuery,
} from "../../store/apis/endpoints/kpi";

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

const ORDER_STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "Activated", label: "Activated" },
  { value: "Pending Payment", label: "Pending Payment" },
  { value: "Pending Account Activation", label: "Pending Activation" },
];

const ACTIVE_STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

const KPIReports = () => {
  const navigate = useNavigate();

  // Period state
  const [activePeriod, setActivePeriod] = useState("monthly");

  // Filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [activeStatusFilter, setActiveStatusFilter] = useState("all");

  // Members table states
  const [memberSearch, setMemberSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(memberSearch);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [memberSearch]);

  // Map period to groupBy for chart
  const getGroupBy = (period) => {
    switch (period) {
      case "today":
        return "hour";
      case "weekly":
        return "day";
      case "monthly":
        return "week";
      default:
        return "day";
    }
  };

  // API Queries
  const {
    data: quickStatsData,
    isLoading: isLoadingStats,
    refetch: refetchStats,
  } = useGetQuickStatsQuery({ period: activePeriod });

  const {
    data: trendsData,
    isLoading: isLoadingTrends,
    isFetching: isFetchingTrends,
    refetch: refetchTrends,
  } = useGetRevenueTrendsQuery({
    period: activePeriod,
    groupBy: getGroupBy(activePeriod),
  });

  const {
    data: membersData,
    isLoading: isLoadingMembers,
    isFetching: isFetchingMembers,
    refetch: refetchMembers,
  } = useGetKpiMembersQuery({
    page,
    limit: parseInt(limit),
    search: debouncedSearch,
    orderStatus: orderStatusFilter,
    isActive: activeStatusFilter,
    sortBy: "createdAt",
    sortOrder: "desc",
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  const [triggerExport, { isLoading: isExporting }] = useLazyGetKpiExportQuery();

  // Extract data from API responses
  const stats = useMemo(() => {
    if (!quickStatsData?.data?.stats) {
      return [
        { title: "Total Approved Amount", value: "0 SAR", change: "0% from last period", icon: <FaChartLine />, color: "blue", isLoading: true },
        { title: "New Orders", value: "0", change: "0 from last period", icon: <FaShoppingCart />, color: "green", isLoading: true },
        { title: "Members Activated", value: "0", change: "0 from last period", icon: <FaUsers />, color: "purple", isLoading: true },
      ];
    }

    return quickStatsData.data.stats.map((stat) => ({
      title: stat.title,
      value: stat.value,
      change: stat.changeLabel,
      icon: stat.icon === "chart" ? <FaChartLine /> : stat.icon === "cart" ? <FaShoppingCart /> : <FaUsers />,
      color: stat.color,
      isLoading: false,
    }));
  }, [quickStatsData]);

  const chartData = useMemo(() => {
    if (!trendsData?.data?.chartData) return [];
    return trendsData.data.chartData;
  }, [trendsData]);

  const members = useMemo(() => {
    return membersData?.data?.members || [];
  }, [membersData]);

  const pagination = useMemo(() => {
    return membersData?.data?.pagination || { total: 0, totalPages: 1 };
  }, [membersData]);

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-navy-400 text-white",
      green: "bg-navy-500 text-white",
      purple: "bg-navy-600 text-white",
    };
    return colors[color] || colors.blue;
  };

  const handleExportExcel = async () => {
    try {
      const result = await triggerExport({ period: activePeriod }).unwrap();

      if (result?.data) {
        // Export orders
        const ordersWs = XLSX.utils.json_to_sheet(result.data.orders || []);
        const usersWs = XLSX.utils.json_to_sheet(result.data.users || []);
        const summaryWs = XLSX.utils.json_to_sheet([result.data.summary]);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");
        XLSX.utils.book_append_sheet(wb, ordersWs, "Orders");
        XLSX.utils.book_append_sheet(wb, usersWs, "Users");

        XLSX.writeFile(wb, `KPI_Report_${activePeriod}_${new Date().toISOString().split('T')[0]}.xlsx`);
        toast.success("Exported to Excel successfully");
      }
    } catch (error) {
      toast.error("Failed to export data");
      console.error("Export error:", error);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("KPI Report", 14, 22);
    doc.text(`Period: ${activePeriod.charAt(0).toUpperCase() + activePeriod.slice(1)}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);

    // Add summary stats
    if (quickStatsData?.data?.stats) {
      doc.text("Summary Statistics:", 14, 50);
      quickStatsData.data.stats.forEach((stat, index) => {
        doc.text(`${stat.title}: ${stat.value}`, 20, 58 + (index * 8));
      });
    }

    // Add chart data table
    if (chartData.length > 0) {
      doc.autoTable({
        head: [["Period", "Activated (SAR)", "Pending (SAR)"]],
        body: chartData.map((item) => [
          item.name,
          item.activated?.toLocaleString() || "0",
          item.pending?.toLocaleString() || "0",
        ]),
        startY: 90,
      });
    }

    doc.save(`KPI_Report_${activePeriod}_${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success("Exported to PDF successfully");
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setMemberSearch("");
    setDebouncedSearch("");
    setOrderStatusFilter("all");
    setActiveStatusFilter("all");
    setPage(1);
    toast.success("Filters reset");
  };

  const handleRefresh = () => {
    refetchStats();
    refetchTrends();
    refetchMembers();
    toast.success("Data refreshed");
  };

  const handleView = (member) => {
    navigate(`/admin/members/${member.id}`);
  };

  const handleDelete = (member) => {
    toast.success(`Delete action for ${member.companyNameEn}`);
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
        return member[columnKey] || "-";
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Input
            isClearable
            value={memberSearch}
            onValueChange={setMemberSearch}
            className="w-full md:max-w-[300px]"
            placeholder="Search members..."
            startContent={<FaSearch className="text-default-300" />}
          />
          <div className="flex flex-wrap gap-3">
            <Select
              size="sm"
              label="Order Status"
              className="w-40"
              selectedKeys={[orderStatusFilter]}
              onChange={(e) => {
                setOrderStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              {ORDER_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              size="sm"
              label="Active Status"
              className="w-32"
              selectedKeys={[activeStatusFilter]}
              onChange={(e) => {
                setActiveStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              {ACTIVE_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <Button
              className="bg-navy-700 text-white"
              startContent={isFetchingMembers ? <Spinner size="sm" color="white" /> : <FaSync />}
              onClick={handleRefresh}
              isDisabled={isFetchingMembers}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }, [memberSearch, orderStatusFilter, activeStatusFilter, isFetchingMembers]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center px-2 py-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <span className="text-default-400 text-sm">Rows per page:</span>
            <Select
              size="sm"
              className="w-20"
              selectedKeys={[limit]}
              onChange={(e) => {
                setLimit(e.target.value);
                setPage(1);
              }}
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
              {pagination.total > 0
                ? `${(page - 1) * Number(limit) + 1}-${Math.min(
                    page * Number(limit),
                    pagination.total
                  )} of ${pagination.total}`
                : "0 results"}
            </span>
          </div>
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pagination.totalPages || 1}
          onChange={setPage}
        />
      </div>
    );
  }, [pagination, page, limit]);

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen font-inter">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-700 flex items-center gap-2">
              <FaChartLine className="text-primary" /> KPI Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-default-100 p-1 rounded-lg flex gap-1">
              {["today", "weekly", "monthly"].map((period) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activePeriod === period
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-white border text-gray-700 hover:bg-gray-50"
                startContent={isExporting ? <Spinner size="sm" /> : <FaFileExcel className="text-green-600" />}
                onClick={handleExportExcel}
                isDisabled={isExporting}
              >
                Excel
              </Button>
              <Button
                size="sm"
                className="bg-white border text-gray-700 hover:bg-gray-50"
                startContent={<FaFilePdf className="text-red-500" />}
                onClick={handleExportPDF}
              >
                PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) =>
            stat.isLoading || isLoadingStats ? (
              <Card key={index} className="border-none p-6">
                <div className="flex items-center">
                  <Skeleton className="rounded-full w-12 h-12" />
                  <div className="ml-4 flex-1">
                    <Skeleton className="h-4 w-24 rounded mb-2" />
                    <Skeleton className="h-6 w-16 rounded" />
                  </div>
                </div>
              </Card>
            ) : (
              <Card key={index} className="border-none">
                <div className="flex items-center p-6">
                  <div
                    className={`rounded-full p-3 ${getColorClasses(stat.color)}`}
                  >
                    <div className="text-xl">{stat.icon}</div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                      <span className="ml-2 text-sm text-gray-600">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          )}
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="sm"
                variant="bordered"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="sm"
                variant="bordered"
              />
            </div>
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <Input
                placeholder="Search by company, email, license..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                startContent={<FaSearch className="text-gray-400" />}
                size="sm"
                variant="bordered"
                isClearable
                onClear={() => setMemberSearch("")}
              />
            </div>
            <div className="md:col-span-2">
              <Button
                fullWidth
                onClick={handleReset}
                variant="flat"
                color="default"
                startContent={<FaSync />}
                className="h-10"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-[400px] mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-navy-800">
              Transaction Trends
            </h3>
            {isFetchingTrends && <Spinner size="sm" />}
          </div>
          {isLoadingTrends ? (
            <div className="flex items-center justify-center h-[300px]">
              <Spinner size="lg" />
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No data available for the selected period
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="85%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(value) => `SAR${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => [`SAR ${value.toLocaleString()}`, ""]}
                />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="activated"
                  name="Activated"
                  stroke="#06ffa5"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#06ffa5", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  name="Pending Payment"
                  stroke="#ffbe0b"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ffbe0b", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Members Table Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-navy-800 mb-4">Members Report</h2>
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
                <TableColumn
                  key={column.uid}
                  className="border-b border-divider"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={members}
              emptyContent={
                isLoadingMembers ? (
                  <div className="flex justify-center py-8">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  "No members found"
                )
              }
              isLoading={isLoadingMembers}
              loadingContent={<Spinner size="lg" />}
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
      </div>
    </MainLayout>
  );
};

export default KPIReports;
