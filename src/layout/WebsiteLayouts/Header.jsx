import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPhone, BsGlobe } from "react-icons/bs";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { Images } from "../../assets/Index";
import { useGetActiveMenuItemsQuery } from "../../store/apis/endpoints/websiteEndpoints/menuItems";
import { useNavigate } from "react-router-dom";
import OverlayLoader from "../../components/common/OverlayLoader";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const timeoutRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { data: menuData, isLoading, isError } = useGetActiveMenuItemsQuery();

  const navigate = useNavigate();

  const transformedMenuItems = React.useMemo(() => {
    if (!menuData?.data?.menus) return [];

    return menuData.data.menus.map((menu) => {
      if (menu.subMenus.length === 0) {
        return {
          title: menu.nameEn,
          items: [{ links: ["No submenu items available"] }],
        };
      }

      const groupedSubmenus = menu.subMenus.reduce((acc, item) => {
        const heading = item.headingEn === "null" ? "" : item.headingEn;
        if (!acc[heading]) {
          acc[heading] = [];
        }
        acc[heading].push({
          name: item.nameEn,
          page: item.page,
          externalUrl: item.externalUrl,
        });
        return acc;
      }, {});

      const items = Object.entries(groupedSubmenus).map(([section, items]) => ({
        section: section || undefined,
        links: items,
      }));

      return {
        title: menu.nameEn,
        items,
      };
    });
  }, [menuData]);

  const handleMouseEnter = (title) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLeaving(false);
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    setIsLeaving(true);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setIsLeaving(false);
    }, 300); // Delay before closing
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleLinkClick = (link) => {
    if (link.externalUrl) {
      window.open(link.externalUrl, "_blank");
    } else if (link.page) {
      navigate(`/${link.page.template}/${link.page.slug}`);
    }
  };

  // Close mobile menu when navigating
  const handleMobileNavigation = (link) => {
    handleLinkClick(link);
    setIsMobileMenuOpen(false);
    setActiveMobileSubmenu(null);
  };

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        setActiveMobileSubmenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <OverlayLoader />;
  }

  if (isError) {
    return <div>Error loading menu items</div>;
  }

  return (
    <header className="w-full relative">
      {/* Top Banner */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-[#1B365D] to-[#335082] text-white py-1.5"
      >
        <div className="container mx-auto flex justify-end items-center text-sm px-4 gap-x-6">
          <div className="flex items-center">
            <MdMail className="h-3 w-3 mr-2" />
            <span>info@gstsa1.org</span>
          </div>
          <div className="flex items-center">
            <BsPhone className="h-3 w-3 mr-2" />
            <span>+966 504420607</span>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="mx-4 lg:mx-10 px-2 lg:px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <img
                src={Images.Logo}
                alt="Logo"
                className="w-16 md:w-20 h-auto cursor-pointer hover:opacity-80 transition-all duration-300"
                onClick={() => navigate("/")}
              />
              <div className="hidden sm:block">
                <h1 className="text-[#1B365D] font-bold text-base lg:text-lg">
                  Global Standard Technology
                </h1>
                <p className="text-xs text-gray-600">
                  The Future of Innovation
                </p>
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden space-x-2">
              <button className="p-2 text-[#1B365D] hover:bg-[#1B365D] hover:text-white rounded transition-all duration-300">
                <BsGlobe className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#1B365D]"
              >
                {isMobileMenuOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Right Side Buttons - Hidden on Mobile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:flex items-center space-x-3"
            >
              <button
                onClick={() =>
                  window.open("https://buybarcodeupc.com/", "_blank")
                }
                className="px-3 py-1.5 text-sm border-2 border-[#1B365D] text-[#1B365D] rounded hover:bg-[#1B365D] hover:text-white transition-all duration-300"
              >
                Buy Barcode
              </button>
              <button
                onClick={() => navigate("/admin/login")}
                className="px-3 py-1.5 text-sm bg-[#335082] text-white rounded hover:bg-[#1B365D] transition-all duration-300"
              >
                Login
              </button>
              <button className="p-1.5 text-[#1B365D] hover:bg-[#1B365D] hover:text-white rounded transition-all duration-300">
                <BsGlobe className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on Mobile */}
      <div className="hidden lg:block bg-[#1B365D] text-white relative z-20">
        <div className="container mx-auto px-4 py-1">
          <nav className="flex justify-center gap-x-5">
            {transformedMenuItems.map((menu) => (
              <div
                key={menu.title}
                onMouseEnter={() => handleMouseEnter(menu.title)}
                onMouseLeave={handleMouseLeave}
                className="relative group"
              >
                <button
                  className={`px-4 py-2.5 flex items-center space-x-1.5 hover:bg-[#335082] transition-all duration-300 ${
                    activeMenu === menu.title ? "bg-[#335082]" : ""
                  }`}
                >
                  <span className="text-base font-medium">{menu.title}</span>
                  <IoChevronDownOutline
                    className={`h-3 w-3 transition-transform duration-300 ${
                      activeMenu === menu.title ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-[104px] left-0 right-0 bg-white shadow-xl z-50 overflow-y-auto max-h-[calc(100vh-104px)]"
            style={{ position: "fixed" }}
          >
            <div className="p-4">
              {/* Mobile Menu Buttons */}
              <div className="flex flex-col space-y-2 mb-4 border-b border-gray-200 pb-4">
                <button
                  onClick={() =>
                    window.open("https://buybarcodeupc.com/", "_blank")
                  }
                  className="w-full px-3 py-2 text-sm border-2 border-[#1B365D] text-[#1B365D] rounded hover:bg-[#1B365D] hover:text-white transition-all duration-300"
                >
                  Buy Barcode
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-sm bg-[#335082] text-white rounded hover:bg-[#1B365D] transition-all duration-300"
                >
                  Login
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <nav className="flex flex-col space-y-2">
                {transformedMenuItems.map((menu) => (
                  <div
                    key={menu.title}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <button
                      onClick={() =>
                        setActiveMobileSubmenu(
                          activeMobileSubmenu === menu.title ? null : menu.title
                        )
                      }
                      className="w-full px-4 py-3 flex justify-between items-center text-[#1B365D]"
                    >
                      <span className="font-medium">{menu.title}</span>
                      <IoChevronDownOutline
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeMobileSubmenu === menu.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeMobileSubmenu === menu.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50 px-4 py-2"
                        >
                          {menu.items.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-4 last:mb-0">
                              {section.section && (
                                <h3 className="text-[#1B365D] font-semibold text-sm mb-2">
                                  {section.section}
                                </h3>
                              )}
                              <div className="flex flex-col space-y-2">
                                {section.links.map((link, linkIndex) => (
                                  <button
                                    key={linkIndex}
                                    onClick={() => handleMobileNavigation(link)}
                                    className="text-left text-sm text-gray-700 hover:text-[#1B365D] py-1"
                                  >
                                    {link.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dropdown Menu */}
      <AnimatePresence>
        {activeMenu && !isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-white shadow-xl z-50 hidden lg:block"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto">
              <div className="py-8 px-6 max-w-5xl mx-auto">
                {transformedMenuItems
                  .find((menu) => menu.title === activeMenu)
                  ?.items.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-8 last:mb-0">
                      {section.section && (
                        <h3 className="text-[#1B365D] font-bold text-lg mb-4 pb-2 border-b border-gray-200">
                          {section.section}
                        </h3>
                      )}
                      <div
                        className={`grid ${
                          section.section ? "grid-cols-3" : "grid-cols-2"
                        } gap-x-8 gap-y-3`}
                      >
                        {section.links.map((link, linkIndex) => (
                          <motion.a
                            key={linkIndex}
                            onClick={() => handleLinkClick(link)}
                            style={{
                              cursor:
                                link.page || link.externalUrl
                                  ? "pointer"
                                  : "default",
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: linkIndex * 0.03 }}
                            className="group flex items-center text-sm text-gray-700 hover:text-[#1B365D] py-1 transition-colors duration-200"
                          >
                            <span className="relative overflow-hidden">
                              {link.name}
                              {(link.page || link.externalUrl) && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1B365D] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                              )}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
