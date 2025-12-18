import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
// twaitter ( now X)
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { Images } from "../../assets/Index";
import { useTranslation } from "react-i18next";

const socialLinks = [
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/company/gstsolutionsksa",
    color: "hover:text-quaternary",
  },
  {
    icon: <FaFacebook />,
    href: "https://www.facebook.com/GSTSolutionsSaudi",
    color: "hover:text-quaternary",
  },
  {
    icon: <FaXTwitter />,
    href: "https://x.com/gstsa1org",
    color: "hover:text-quaternary",
  },
  // { icon: <FaInstagram />, href: "#", color: "hover:text-quaternary" }, // Commented out as requested
  {
    icon: <FaYoutube />,
    href: "https://www.youtube.com/@GSTSolutionsKSA",
    color: "hover:text-quaternary",
  },
  // { icon: <FaWhatsapp />, href: "#", color: "hover:text-quaternary" }, // Commented out as requested
  {
    icon: <FaTiktok />,
    href: "https://www.tiktok.com/@gstsolutionsksa",
    color: "hover:text-quaternary",
  },
];

function Footer() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <footer
      className="relative bg-gradient-to-b from-secondary via-tertiary to-primary text-white py-16 overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-quaternary rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-quaternary rounded-full blur-3xl" />
      </div>

      <div className="mx-4 sm:mx-6 md:mx-10 px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="bg-white p-3 rounded-xl inline-block shadow-lg shadow-quaternary/20">
              <img src={Images.Logo} alt="GST Solutions" className="w-24" />
            </div>
            <div className="space-y-4">
              <h3
                className={`font-bold text-xl bg-clip-text text-transparent ${
                  isArabic
                    ? " bg-gradient-to-l from-white to-quaternary"
                    : "bg-gradient-to-r from-white to-quaternary"
                }`}
              >
                {t("footer.company.name")}
              </h3>
              <p className="text-gray-300 max-w-[235px]">
                {t("footer.company.address")}
              </p>
            </div>
            <p className="text-sm text-gray-400 border-l-4 border-quaternary pl-3">
              {t("footer.company.copyright")}
            </p>
            <p className="text-sm text-gray-300 border-l-4 border-quaternary pl-3 mt-3">
              {t("footer.company.manufacturing")}
            </p>
          </div>

          {/* Get in Touch */}
          <div className="space-y-6">
            <h2
              className={`text-2xl font-bold  bg-clip-text text-transparent ${
                isArabic
                  ? " bg-gradient-to-l from-white/80 to-quaternary"
                  : "bg-gradient-to-r from-white/80 to-quaternary"
              }`}
            >
              {t("footer.getInTouch.title")}
            </h2>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: isArabic ? -5 : 5 }}
                className="flex items-center gap-3 text-gray-300 hover:text-quaternary transition-colors group"
              >
                <div className="p-2 bg-quaternary/10 rounded-lg group-hover:bg-quaternary/20 transition-colors">
                  <HiLocationMarker className="text-xl text-white" />
                </div>
                <p>{t("footer.getInTouch.address")}</p>
              </motion.div>

              <motion.a
                whileHover={{ x: isArabic ? -5 : 5 }}
                href="mailto:info@gstsa1.org"
                className="flex items-center gap-3 text-gray-300 hover:text-quaternary transition-colors group"
              >
                <div className="p-2 bg-quaternary/10 rounded-lg group-hover:bg-quaternary/20 transition-colors">
                  <HiMail className="text-xl text-white" />
                </div>
                {t("footer.getInTouch.email")}
              </motion.a>

              <motion.a
                whileHover={{ x: isArabic ? -5 : 5 }}
                href="tel:+966115030591"
                className="flex items-center gap-3 text-gray-300 hover:text-quaternary transition-colors group"
              >
                <div className="p-2 bg-quaternary/10 rounded-lg group-hover:bg-quaternary/20 transition-colors">
                  <HiPhone className="text-xl text-white" />
                </div>
                <div dir="ltr">{isArabic ? "11 503 0591" : "0115030591"}</div>
              </motion.a>

              <motion.a
                whileHover={{ x: isArabic ? -5 : 5 }}
                href="tel:+966920051091"
                className="flex items-center gap-3 text-gray-300 hover:text-quaternary transition-colors group"
              >
                <div className="p-2 bg-quaternary/10 rounded-lg group-hover:bg-quaternary/20 transition-colors">
                  <HiPhone className="text-xl text-white" />
                </div>
                <div dir="ltr">{isArabic ? "92 005 1091" : "920051091"}</div>
              </motion.a>
            </div>
          </div>

          {/* Follow Us */}
          <div className="space-y-6">
            <h2
              className={`text-2xl font-bold  bg-clip-text text-transparent ${
                isArabic
                  ? " bg-gradient-to-l from-white/80 to-quaternary"
                  : "bg-gradient-to-r from-white/80 to-quaternary"
              }`}
            >
              {t("footer.followUs.title")}
            </h2>
            <div className="flex gap-4 text-2xl flex-wrap">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-quaternary/10 rounded-lg text-gray-300 ${social.color} transition-all duration-300 hover:bg-quaternary/20`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h2
              className={`text-2xl font-bold  bg-clip-text text-transparent ${
                isArabic
                  ? " bg-gradient-to-l from-white/80 to-quaternary"
                  : "bg-gradient-to-r from-white/80 to-quaternary"
              }`}
            >
              {t("footer.newsletter.title")}
            </h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  {t("footer.newsletter.email")}{" "}
                  <span className="text-quaternary">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder={t("footer.newsletter.placeholder")}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-quaternary/20 focus:outline-none focus:border-quaternary focus:bg-white/10 transition-all"
                  />
                  <div className="absolute inset-0 -z-10 blur-xl bg-quaternary/20" />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-quaternary to-tertiary hover:from-tertiary hover:to-quaternary text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-quaternary/25 hover:shadow-quaternary/40"
              >
                {t("footer.newsletter.subscribe")}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
