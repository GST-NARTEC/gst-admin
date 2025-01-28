import React from "react";
import { Card, Skeleton } from "@nextui-org/react";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import {
  FaQrcode,
  FaBarcode,
  FaDollarSign,
  FaShoppingCart,
  FaChartLine,
  FaUsers,
  FaCreditCard,
  FaUniversity,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrencySymbol } from "../../store/slice/currencySlice";
import {
  useGetOrdersCountQuery,
  useGetUsersCountQuery,
  useGetProductsCountQuery,
  useGetCategoriesCountQuery,
  useGetTopSoldProductsQuery,
} from "../../store/apis/endpoints/dashboardStats";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const currencySymbol = useSelector(selectCurrencySymbol);

  const { data: ordersCount, isLoading: isLoadingOrders } =
    useGetOrdersCountQuery();
  const { data: usersCount, isLoading: isLoadingUsers } =
    useGetUsersCountQuery();
  const { data: productsCount, isLoading: isLoadingProducts } =
    useGetProductsCountQuery();
  const { data: categoriesCount, isLoading: isLoadingCategories } =
    useGetCategoriesCountQuery();
  const { data: topSoldProducts, isLoading: isLoadingTopProducts } =
    useGetTopSoldProductsQuery();

  // Theme colors from tailwind config
  const THEME_COLORS = {
    primary: "#1B365D",
    secondary: "#335082",
    tertiary: "#254170",
    navy: {
      400: "#335082",
      500: "#254170",
      600: "#1B365D",
      700: "#152A4A",
    },
  };

  // Prepare data for order types pie chart
  const orderTypesData = ordersCount?.data
    ? [
        { name: "Bank Orders", value: ordersCount.data.bankOrdersCount },
        { name: "Online Orders", value: ordersCount.data.onlineOrdersCount },
      ]
    : [];

  // Prepare data for products status
  const productsStatusData = productsCount?.data
    ? [
        { name: "Active", value: productsCount.data.activeProducts },
        { name: "Inactive", value: productsCount.data.inactiveProducts },
      ]
    : [];

  // Prepare data for top products bar chart
  const topProductsData =
    topSoldProducts?.data?.map((product, index) => ({
      name:
        product.title.length > 30
          ? product.title.substring(0, 30) + "..."
          : product.title,
      value: 5 - index, // Reverse ranking: 5 for first, 1 for last
      fullName: product.title,
    })) || [];

  const PIE_COLORS = [THEME_COLORS.navy[400], THEME_COLORS.navy[600]];

  const stats = [
    {
      title: "Total Orders",
      value: ordersCount?.data?.totalOrders || 0,
      change: `${ordersCount?.data?.activeOrdersCount || 0} Active`,
      icon: <FaShoppingCart />,
      color: "blue",
      isLoading: isLoadingOrders,
    },
    {
      title: "Total Users",
      value: usersCount?.data?.totalUsers || 0,
      change: `${usersCount?.data?.activeUsersCount || 0} Active`,
      icon: <FaUsers />,
      color: "green",
      isLoading: isLoadingUsers,
    },
    {
      title: "Total Products",
      value: productsCount?.data?.totalProducts || 0,
      change: `${productsCount?.data?.activeProducts || 0} Active`,
      icon: <FaBarcode />,
      color: "purple",
      isLoading: isLoadingProducts,
    },
    {
      title: "Categories",
      value: categoriesCount?.data || 0,
      change: "Total Categories",
      icon: <FaQrcode />,
      color: "indigo",
      isLoading: isLoadingCategories,
    },
    {
      title: "Online Orders",
      value: ordersCount?.data?.onlineOrdersCount || 0,
      change: "Via Online Payment",
      icon: <FaCreditCard />,
      color: "pink",
      isLoading: isLoadingOrders,
    },
    {
      title: "Bank Orders",
      value: ordersCount?.data?.bankOrdersCount || 0,
      change: "Via Bank Transfer",
      icon: <FaUniversity />,
      color: "cyan",
      isLoading: isLoadingOrders,
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-navy-400 text-white",
      green: "bg-navy-500 text-white",
      purple: "bg-navy-600 text-white",
      indigo: "bg-navy-700 text-white",
      pink: "bg-navy-400 text-white",
      cyan: "bg-navy-500 text-white",
    };
    return colors[color];
  };

  const StatCardSkeleton = () => (
    <Card className="border-none p-6">
      <div className="flex items-center">
        <Skeleton className="rounded-full w-12 h-12" />
        <div className="ml-4 flex-1">
          <Skeleton className="h-4 w-24 rounded mb-2" />
          <Skeleton className="h-6 w-16 rounded" />
        </div>
      </div>
    </Card>
  );

  const ChartSkeleton = () => (
    <Card className="p-6">
      <Skeleton className="h-8 w-48 rounded mb-4" />
      <Skeleton className="h-80 w-full rounded" />
    </Card>
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-navy-600">Dashboard</h1>
            <p className="text-gray-500">Welcome back, Admin</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) =>
              stat.isLoading ? (
                <StatCardSkeleton key={index} />
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

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Order Types Pie Chart */}
            {isLoadingOrders ? (
              <ChartSkeleton />
            ) : (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-navy-600">
                  Order Distribution
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill={THEME_COLORS.primary}
                        dataKey="value"
                      >
                        {orderTypesData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {/* Products Status Pie Chart */}
            {isLoadingProducts ? (
              <ChartSkeleton />
            ) : (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-navy-600">
                  Products Status
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productsStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill={THEME_COLORS.primary}
                        dataKey="value"
                      >
                        {productsStatusData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </div>

          {/* Top Sold Products Bar Chart */}
          {isLoadingTopProducts ? (
            <ChartSkeleton />
          ) : (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-navy-600">
                Top Sold Products
              </h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProductsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis type="category" dataKey="name" width={250} />
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border rounded shadow">
                              <p className="text-sm text-navy-600">
                                {payload[0].payload.fullName}
                              </p>
                              <p className="text-sm font-semibold">
                                Rank: {payload[0].value}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" fill={THEME_COLORS.navy[400]}>
                      {topProductsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
