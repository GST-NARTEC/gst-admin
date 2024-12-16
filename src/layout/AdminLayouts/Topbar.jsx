import { FaBell, FaBars, FaGlobe } from "react-icons/fa";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { Images } from "../../assets/Index";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentAdmin, logout } from "../../store/slice/adminSlice";

function Topbar({ toggleLargeScreenSidebar, isLargeScreenCollapsed }) {
  const dispatch = useDispatch();
  const admin = useSelector(selectCurrentAdmin);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <button
        onClick={toggleLargeScreenSidebar}
        className="hidden lg:flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg"
      >
        <FaBars
          className={`text-gray-600 transition-transform duration-300 
          ${isLargeScreenCollapsed ? "rotate-180" : ""}`}
        />
      </button>

      <div className="flex items-center gap-4">
        <a
          href="https://gstsa1.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2 hover:bg-gray-100 rounded-full"
        >
          <FaGlobe className="text-gray-600" />
          <span className="ml-2 text-gray-600">GSTSA1</span>
        </a>
        <a
          href="https://buybarcodeupc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2 hover:bg-gray-100 rounded-full"
        >
          <FaGlobe className="text-gray-600" />
          <span className="ml-2 text-gray-600">BuyBarcodeUPC</span>
        </a>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FaBell className="text-gray-600" />
        </button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              size="sm"
              as="button"
              className="transition-transform object-contain "
              src={Images.Logo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{admin.email}</p>
            </DropdownItem>
            {/* <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="profile">Members</DropdownItem> */}

            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Topbar;
