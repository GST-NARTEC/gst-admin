import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BsGlobe } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/slice/languageSlice";
import { Images } from "../../assets/Index";

export default function LanguageSwitcher({ isMobile = false }) {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage =
    useSelector((state) => state.language.language) || "en";

  // Set initial language
  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
      document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const handleLanguageChange = (keys) => {
    const newLang = Array.from(keys)[0];
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button
          className={`${
            isMobile ? "p-2" : "p-1.5"
          } text-[#1B365D] hover:bg-[#1B365D] hover:text-white rounded transition-all duration-300 flex items-center gap-1`}
        >
          <BsGlobe className="h-4 w-4" />
          <span className="text-sm font-medium">
            {currentLanguage?.toUpperCase()}
          </span>
        </button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Language selection"
        selectedKeys={new Set([currentLanguage])}
        selectionMode="single"
        onSelectionChange={handleLanguageChange}
      >
        <DropdownItem
          key="en"
          //   startContent={
          //     <img
          //       src={Images.USAFlag}
          //       alt="English"
          //       className="w-5 h-5 object-contain "
          //     />
          //   }
        >
          English
        </DropdownItem>
        <DropdownItem
          key="ar"
          //   startContent={
          //     <img
          //       src={Images.KSAFlag}
          //       alt="Arabic"
          //       className="w-5 h-5 object-contain "
          //     />
          //   }
        >
          العربية
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
