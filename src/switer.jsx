import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import engflage from "./assets/Images/Flage.png"
import arabicflage from "./assets/Images/Arabflage.jpg"
// import { useLanguage } from './Contexts/LanguageContext';
import { IoMdArrowDropdown } from 'react-icons/io';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    // const { selectedLanguage, setSelectedLanguage } = useLanguage();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        // setSelectedLanguage(language);
    };
    const storedLanguage = sessionStorage.getItem('selectedLanguaged');
    const initialLanguage = storedLanguage || 'ar'; 
    sessionStorage.setItem('selectedLanguaged', initialLanguage);
    const [isActive, setIsActive] = useState(false);
    const [currentOption, setCurrentOption] = useState(initialLanguage);

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    const handleOptionClick = (option, image) => {
        setCurrentOption(option);
        setIsActive(false);
        changeLanguage(option);
        sessionStorage.setItem('selectedLanguaged', option);
    };

    return (
        <div>
            <div className="wrapper" style={{ position: 'relative', zIndex: 999 }}>
                <div className="select_wrap relative">
                    <ul
                        className={`default_option bg-transparent border-1 rounded-md cursor-pointer`}
                        onClick={handleToggle}
                    >
                        <li className="p-2">
                            <div className="flex items-center">
                                <div className="icon bg-cover bg-center" />
                                {currentOption === 'en' && <img src={engflage} alt="" width='33px' />}
                                {currentOption === 'ar' && <img src={arabicflage} alt="" width='33px' />}
                                <IoMdArrowDropdown  className='ms-1'/>
                            </div>
                        </li>
                    </ul>
                    <ul  className={`select_ul absolute top-9 mt-1 w-full items-center justify-center  bg-gray-200 rounded-md ${isActive ? 'block' : 'hidden'}`} >
                        <li className="cursor-pointer" onClick={() => handleOptionClick('en', engflage)}>
                            <div className="option pizza flex items-center justify-center">
                                <div className="icon h-8 bg-center" />
                                <img src={engflage} alt="" width='40px' className='mr-2 ml-2 ' />
                            </div>
                        </li>
                        <li className="cursor-pointer " onClick={() => handleOptionClick('ar', arabicflage)}>
                            <div className="option burger flex items-center justify-center">
                                <div className="icon h-8 bg-center " />
                                <img src={arabicflage} alt="" width='40px' className='mr-2 ml-2' />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default LanguageSwitcher;