import React, { useState, useMemo } from "react";
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
} from "@nextui-org/react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

const KPIReports = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Members table states
  const [memberSearch, setMemberSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");

  // Dummy members data
  const dummyMembers = [
    {
      id: 1,
      companyNameEn: "Tech Solutions LLC",
      companyNameAr: "تك سوليوشنز",
      email: "contact@techsolutions.com",
      mobile: "+1234567890",
      companyLicenseNo: "LIC-001-2024",
      country: "United States",
      isActive: true,
      orders: [
        { status: "Activated" },
        { status: "Activated" },
        { status: "Pending Payment" }
      ]
    },
    {
      id: 2,
      companyNameEn: "Global Trade Co",
      companyNameAr: "جلوبال تريد",
      email: "info@globaltrade.com",
      mobile: "+9876543210",
      companyLicenseNo: "LIC-002-2024",
      country: "United Kingdom",
      isActive: true,
      orders: [
        { status: "Activated" },
        { status: "Pending Account Activation" }
      ]
    },
    {
      id: 3,
      companyNameEn: "Emirates Trading",
      companyNameAr: "الإمارات للتجارة",
      email: "contact@emiratestrading.ae",
      mobile: "+9715551234",
      companyLicenseNo: "LIC-003-2024",
      country: "UAE",
      isActive: false,
      orders: [
        { status: "Pending Payment" },
        { status: "Pending Payment" }
      ]
    },
    {
      id: 4,
      companyNameEn: "Saudi Commerce Hub",
      companyNameAr: "مركز التجارة السعودي",
      email: "admin@saudicommerce.sa",
      mobile: "+9665551234",
      companyLicenseNo: "LIC-004-2024",
      country: "Saudi Arabia",
      isActive: true,
      orders: [
        { status: "Activated" },
        { status: "Activated" },
        { status: "Activated" },
        { status: "Pending Account Activation" }
      ]
    },
    {
      id: 5,
      companyNameEn: "Digital Marketplace Inc",
      companyNameAr: "السوق الرقمي",
      email: "support@digitalmarket.com",
      mobile: "+4471234567",
      companyLicenseNo: "LIC-005-2024",
      country: "Canada",
      isActive: true,
      orders: []
    },
  ];

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    if (!memberSearch) return dummyMembers;
    
    const searchLower = memberSearch.toLowerCase();
    return dummyMembers.filter(
      (member) =>
        member.companyNameEn.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        member.companyLicenseNo.toLowerCase().includes(searchLower) ||
        member.country.toLowerCase().includes(searchLower)
    );
  }, [memberSearch]);

  // Paginate members
  const paginatedMembers = useMemo(() => {
    const start = (page - 1) * Number(limit);
    const end = start + Number(limit);
    return filteredMembers.slice(start, end);
  }, [filteredMembers, page, limit]);

  const pagination = {
    total: filteredMembers.length,
    totalPages: Math.ceil(filteredMembers.length / Number(limit))
  };

  // Mock Data for KPI stats
  const stats = [
    {
      title: "Total Approved Amount",
      value: "11,500 SAR",
      change: "12% from last month",
      icon: <FaChartLine />,
      color: "blue",
      isLoading: false,
    },
    {
      title: "New Orders",
      value: "4",
      change: "2 from last week",
      icon: <FaShoppingCart />,
      color: "green",
      isLoading: false,
    },
    {
      title: "Members Activated",
      value: "0",
      change: "3 from last month",
      icon: <FaUsers />,
      color: "purple",
      isLoading: false,
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-navy-400 text-white",
      green: "bg-navy-500 text-white",
      purple: "bg-navy-600 text-white",
    };
    return colors[color];
  };

  const chartData = {
    today: [
      { name: "00:00", activated: 1000, pending: 800 },
      { name: "04:00", activated: 2500, pending: 2200 },
      { name: "08:00", activated: 4500, pending: 3800 },
      { name: "12:00", activated: 7000, pending: 5800 },
      { name: "16:00", activated: 9500, pending: 8500 },
      { name: "20:00", activated: 11500, pending: 11500 },
    ],
    weekly: [
      { name: "Mon", activated: 2000, pending: 1500 },
      { name: "Tue", activated: 3500, pending: 3000 },
      { name: "Wed", activated: 5000, pending: 4500 },
      { name: "Thu", activated: 6500, pending: 6000 },
      { name: "Fri", activated: 8000, pending: 7500 },
      { name: "Sat", activated: 9500, pending: 9000 },
      { name: "Sun", activated: 11500, pending: 11500 },
    ],
    monthly: [
      { name: "Week 1", activated: 3000, pending: 2500 },
      { name: "Week 2", activated: 6000, pending: 5500 },
      { name: "Week 3", activated: 9000, pending: 8500 },
      { name: "Week 4", activated: 11500, pending: 11500 },
    ],
  };

  const getChartData = () => {
    return chartData[activePeriod] || chartData.monthly;
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(getChartData());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "KPI Report");
    XLSX.writeFile(wb, "KPI_Report.xlsx");
    toast.success("Exported to Excel successfully");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("KPI Report", 14, 22);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.autoTable({
      head: [["Time", "Activated", "Pending"]],
      body: getChartData().map((item) => [
        item.name,
        item.activated,
        item.pending,
      ]),
      startY: 40,
    });
    doc.save("KPI_Report.pdf");
    toast.success("Exported to PDF successfully");
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setSearchQuery("");
    toast.success("Filters reset");
  };

  // Members table handlers
  const handleView = (member) => {
    toast.success(`Viewing profile for ${member.companyNameEn}`);
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
        return member[columnKey];
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center mb-4">
        <Input
          isClearable
          value={memberSearch}
          onValueChange={setMemberSearch}
          className="w-full sm:max-w-[30%]"
          placeholder="Search members..."
          startContent={<FaSearch className="text-default-300" />}
        />
        <div className="flex gap-3">
          <Button
            className="bg-navy-700 text-white"
            startContent={<FaSync />}
            onClick={() => toast.success("Members list refreshed")}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }, [memberSearch]);

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
                startContent={<FaFileExcel className="text-green-600" />}
                onClick={handleExportExcel}
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
            stat.isLoading ? (
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
                    className={`rounded-full p-3 ${getColorClasses(
                      stat.color
                    )}`}
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
                placeholder="Search by ID or Transaction ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<FaSearch className="text-gray-400" />}
                size="sm"
                variant="bordered"
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
          <h3 className="text-lg font-bold text-navy-800 mb-4">
            Transaction Trends
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart
              data={getChartData()}
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
                tickFormatter={(value) => `SAR${value}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`SAR${value}`, ""]}
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
                fill="url(#colorActivated)"
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
        </div>

        {/* Members Table Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-navy-800 mb-4">KPI Report</h2>
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
              items={paginatedMembers}
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
      </div>
    </MainLayout>
  );
};

export default KPIReports;