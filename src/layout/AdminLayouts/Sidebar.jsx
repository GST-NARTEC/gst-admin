import { useState, useEffect } from "react";
import {
  FaTimes,
  FaBars,
  FaChartLine,
  FaBox,
  FaList,
  FaCog,
  FaUsers,
  FaUserShield,
  FaDatabase,
  FaAngleDown,
  FaRuler,
  FaFile,
  FaBoxes,
  FaCloud,
  FaGlobe,
  FaBarcode,
  FaUncharted,
  FaCity,
  FaGlobeAmericas,
  FaImages,
  FaSearch,
  FaPuzzlePiece,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Images } from "../../assets";
import { MdEmail } from "react-icons/md";

function Sidebar({ isOpen, toggleSidebar, isLargeScreenCollapsed }) {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const menuItems = [
    { path: "/admin/dashboard", icon: <FaChartLine />, label: "Dashboard" },
    { path: "/admin/kpi-dashboard", icon: <FaChartLine />, label: "KPI Dashboard" },
    { path: "/admin/members", icon: <FaUsers />, label: "Members" },
    {
      label: "Master Data",
      icon: <FaDatabase />,
      isDropdown: true,
      subItems: [
        { path: "/master/users", icon: <FaUsers />, label: "Users" },
        {
          path: "/admin/master/email-settings",
          icon: <MdEmail />,
          label: "Email Settings",
        },
        { path: "/admin/master/roles", icon: <FaUserShield />, label: "Roles" },
        { path: "/admin/master/units", icon: <FaRuler />, label: "Units" },
        // {
        //   path: "/admin/master/language",
        //   icon: <FaLanguage />,
        //   label: "Language",
        // },
        {
          path: "/admin/master/documents",
          icon: <FaFile />,
          label: "Documents",
        },
        {
          path: "/admin/master/product-packaging",
          icon: <FaBox />,
          label: "Product Packaging",
        },
        {
          path: "/admin/master/other-products",
          icon: <FaBoxes />,
          label: "Other Products",
        },
        {
          path: "/admin/master/gcp-type",
          icon: <FaCloud />,
          label: "Gcp Type",
        },
        {
          path: "/admin/master/country-of-sales",
          icon: <FaGlobe />,
          label: "Country Of Sales",
        },
        {
          path: "/admin/master/hs-code",
          icon: <FaBarcode />,
          label: "Hs Code",
        },
        {
          path: "/admin/master/unspcs",
          icon: <FaUncharted />,
          label: "UNSPCS",
        },
        { path: "/admin/master/cities", icon: <FaCity />, label: "Cities" },
      ],
    },
    {
      label: "Websites",
      icon: <FaGlobe />,
      isDropdown: true,
      subItems: [
        {
          path: "/admin/gstsa1",
          icon: <FaGlobeAmericas />,
          label: "GSTSA1",
          isNested: true,
          nestedItems: [
            { path: "/admin/gstsa1/pages", icon: <FaFile />, label: "Pages" },
            { path: "/admin/gstsa1/media", icon: <FaImages />, label: "Media" },
            {
              path: "/admin/gstsa1/navigation",
              icon: <FaBars />,
              label: "Navigation",
            },
            {
              path: "/admin/gstsa1/seo",
              icon: <FaSearch />,
              label: "SEO Settings",
            },
          ],
        },
        {
          path: "/admin/barcode",
          icon: <FaBarcode />,
          label: "Barcode UPC",
          isNested: true,
          nestedItems: [
            { path: "/admin/barcode/pages", icon: <FaFile />, label: "Pages" },
            {
              path: "/admin/barcode/banners",
              icon: <FaImages />,
              label: "Banners",
            },
            {
              path: "/admin/barcode/menus",
              icon: <FaBars />,
              label: "Menu Items",
            },
            {
              path: "/admin/barcode/seo",
              icon: <FaSearch />,
              label: "SEO Settings",
            },
          ],
        },
      ],
    },
    { path: "/admin/categories", icon: <FaList />, label: "Categories" },
    { path: "/admin/products", icon: <FaBox />, label: "Products" },
    // barcodeMaster
    {
      path: "/admin/barcode-master",
      icon: <FaBarcode />,
      label: "Barcode Master",
    },
    { path: "/admin/addons", icon: <FaPuzzlePiece />, label: "Addons" },
    // { path: "/admin/languages", icon: <FaLanguage />, label: "Languages" },
    { path: "/admin/roles", icon: <FaUserShield />, label: "User Roles" },
    // help and support
    {
      path: "/admin/help-and-support",
      icon: <FaQuestionCircle />,
      label: "Help and Support",
    },
    // expo members
    {
      path: "/admin/expo-members",
      icon: <FaUsers />,
      label: "Expo Members",
    },
    { path: "/admin/settings", icon: <FaCog />, label: "Settings" },
  ];

  // Modified to handle nested paths better
  const isDropdownPath = (items) => {
    return items?.some((item) => {
      if (location.pathname.startsWith(item.path)) {
        return true;
      }
      if (item.isNested && item.nestedItems) {
        return item.nestedItems.some((nestedItem) =>
          location.pathname.startsWith(nestedItem.path)
        );
      }
      return false;
    });
  };

  // Initialize dropdowns state with nested items
  useEffect(() => {
    const initialState = {};
    menuItems.forEach((item) => {
      if (item.isDropdown) {
        initialState[item.label] = isDropdownPath(item.subItems);

        // Also check nested items
        item.subItems.forEach((subItem) => {
          if (subItem.isNested) {
            initialState[subItem.label] = isDropdownPath(subItem.nestedItems);
          }
        });
      }
    });
    setOpenDropdowns(initialState);
  }, [location.pathname]);

  const toggleDropdown = (dropdownLabel, parentLabel = null) => {
    setOpenDropdowns((prev) => {
      const newState = { ...prev };

      // If it's a nested dropdown, don't close parent
      if (parentLabel) {
        newState[dropdownLabel] = !prev[dropdownLabel];
      } else {
        // For top-level dropdowns, close other top-level dropdowns
        Object.keys(prev).forEach((key) => {
          if (
            !menuItems.find(
              (item) =>
                item.isDropdown &&
                item.subItems.some((sub) => sub.label === key)
            )
          ) {
            newState[key] = key === dropdownLabel ? !prev[key] : false;
          }
        });
      }

      return newState;
    });
  };

  return (
    <>
      {/* Mobile burger */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-white bg-navy-600"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-navy-600 text-white transition-all duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 
        ${isLargeScreenCollapsed ? "lg:w-16" : "lg:w-64"} 
        w-64 z-40`}
      >
        <div className="p-2 h-20 flex items-center justify-center border-b border-gray-600">
          {!isLargeScreenCollapsed ? (
            <img
              src={Images.Logo}
              alt="Logo"
              className="h-16 max-w-[220px] w-full object-contain bg-white rounded-lg p-1"
            />
          ) : (
            <img
              src={Images.Logo}
              alt="Logo"
              className="h-12 w-12 object-contain bg-white rounded-lg p-1"
            />
          )}
        </div>

        <div className="h-[calc(100vh-5rem)] overflow-y-auto scrollbar-custom">
          <nav className="p-4">
            {menuItems.map((item) =>
              item.isDropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`w-full flex items-center p-3 rounded-lg mb-2 transition-colors relative group
                      ${isLargeScreenCollapsed ? "lg:justify-center" : "gap-3"}
                      hover:bg-navy-700`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span
                      className={`transition-all duration-300 ${
                        isLargeScreenCollapsed ? "lg:hidden" : "block"
                      }`}
                    >
                      {item.label}
                    </span>
                    <FaAngleDown
                      className={`ml-auto transition-transform 
                      ${openDropdowns[item.label] ? "rotate-180" : ""} 
                      ${isLargeScreenCollapsed ? "lg:hidden" : "block"}`}
                    />

                    {/* Tooltip for collapsed state */}
                    {isLargeScreenCollapsed && (
                      <div className="hidden lg:group-hover:block absolute left-full ml-2 bg-navy-800 text-white px-2 py-1 rounded whitespace-nowrap">
                        {item.label}
                      </div>
                    )}
                  </button>

                  {openDropdowns[item.label] && (
                    <div
                      className={`${
                        isLargeScreenCollapsed
                          ? "lg:absolute lg:left-full lg:ml-2 lg:top-0 lg:mt-10 lg:bg-navy-800 lg:rounded-lg lg:p-2"
                          : "ml-4"
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <div key={subItem.path}>
                          {subItem.isNested ? (
                            <button
                              onClick={() =>
                                toggleDropdown(subItem.label, item.label)
                              }
                              className={`w-full flex items-center p-2 rounded-lg mb-1 transition-colors whitespace-nowrap
                                ${
                                  isLargeScreenCollapsed ? "lg:px-4" : "gap-3"
                                }`}
                            >
                              <span className="text-xl">{subItem.icon}</span>
                              <span>{subItem.label}</span>
                              <FaAngleDown
                                className={`ml-auto transition-transform ${
                                  openDropdowns[subItem.label]
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                          ) : (
                            <Link
                              to={subItem.path}
                              className={`flex items-center p-2 rounded-lg mb-1 transition-colors whitespace-nowrap
                                ${
                                  location.pathname === subItem.path
                                    ? "bg-navy-700 text-white"
                                    : "hover:bg-navy-700"
                                }
                                ${
                                  isLargeScreenCollapsed ? "lg:px-4" : "gap-3"
                                }`}
                            >
                              <span className="text-xl">{subItem.icon}</span>
                              <span>{subItem.label}</span>
                            </Link>
                          )}

                          {subItem.isNested && openDropdowns[subItem.label] && (
                            <div className="ml-4">
                              {subItem.nestedItems.map((nestedItem) => (
                                <Link
                                  key={nestedItem.path}
                                  to={nestedItem.path}
                                  className={`flex items-center p-2 rounded-lg mb-1 transition-colors whitespace-nowrap
                                    ${
                                      location.pathname === nestedItem.path
                                        ? "bg-navy-700 text-white"
                                        : "hover:bg-navy-700"
                                    }
                                    ${
                                      isLargeScreenCollapsed
                                        ? "lg:px-4"
                                        : "gap-3"
                                    }`}
                                >
                                  <span className="text-xl">
                                    {nestedItem.icon}
                                  </span>
                                  <span>{nestedItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg mb-2 transition-colors relative group
                    ${
                      location.pathname === item.path
                        ? "bg-navy-700 text-white"
                        : "hover:bg-navy-700"
                    }
                    ${isLargeScreenCollapsed ? "lg:justify-center" : "gap-3"}`}
                  title={isLargeScreenCollapsed ? item.label : ""}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span
                    className={`transition-all duration-300 ${
                      isLargeScreenCollapsed ? "lg:hidden" : "block"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Tooltip for collapsed state */}
                  {isLargeScreenCollapsed && (
                    <div className="hidden lg:group-hover:block absolute left-full ml-2 bg-navy-800 text-white px-2 py-1 rounded whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
