import { I18nextProvider } from "react-i18next";
import { FaBell, FaUser, FaBars } from "react-icons/fa";
import {useSelector,useDispatch} from "react-redux"
import LanguageSwitcher from "../../switer";
import i18n from "../../i18n";
import { seleclanguage } from "../../store/slice/Lanugagereducer";
// import LanguageSwitcher from "../switer";
// import i18ns from "../i18n";

function Topbar({ toggleLargeScreenSidebar, isLargeScreenCollapsed }) {
 const language = useSelector(seleclanguage);
 

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
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FaBell className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FaUser className="text-gray-600" />
        </button>
        <I18nextProvider i18n={i18n}>
          <LanguageSwitcher />
        </I18nextProvider>
      </div>
    </div>
  );
}

export default Topbar;
