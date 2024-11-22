import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { Images } from "../../assets/Index";

const socialLinks = [
  { icon: <FaLinkedin />, href: "#", color: "hover:text-quaternary" },
  { icon: <FaFacebook />, href: "#", color: "hover:text-quaternary" },
  { icon: <FaTwitter />, href: "#", color: "hover:text-quaternary" },
  { icon: <FaInstagram />, href: "#", color: "hover:text-quaternary" },
  { icon: <FaYoutube />, href: "#", color: "hover:text-quaternary" },
  { icon: <FaWhatsapp />, href: "#", color: "hover:text-quaternary" },
];

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-secondary via-tertiary to-primary text-white py-16 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-quaternary rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-quaternary rounded-full blur-3xl" />
      </div>

      <div className=" mx-10 px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="bg-white p-3 rounded-xl inline-block shadow-lg shadow-quaternary/20">
              <img src={Images.Logo} alt="GST Solutions" className="w-24" />
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-xl bg-gradient-to-r from-white to-quaternary bg-clip-text text-transparent">
                Global Standard for Technology
              </h3>
              <p className="text-gray-300">
                Solution King Abdullah Road, Riyadh Kingdom of Saudi Arabia
              </p>
            </div>
            <p className="text-sm text-gray-400 border-l-4 border-quaternary pl-3">
              Copyright © 2022 GST Solutions All Right Reserved
            </p>
          </div>

          {/* Get in Touch */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white/50 to-quaternary bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-gray-300 hover:text-quaternary transition-colors group"
              >
                <div className="p-2 bg-quaternary/10 rounded-lg group-hover:bg-quaternary/20 transition-colors">
                  <HiLocationMarker className="text-xl text-white" />
                </div>
                <p>
                  Global Standard for Technology Solution King Abdullah Road,
                  Riyadh Kingdom of Saudi Arabia
                </p>
              </motion.div>

              <motion.a
                whileHover={{ x: 5 }}
                href="mailto:info@gstsa1.org"
                className="flex items-center gap-3 text-gray-300 hover:text-quaternary transition-colors group"
              >
                <div className="p-2 bg-quaternary/10 rounded-lg group-hover:bg-quaternary/20 transition-colors">
                  <HiMail className="text-xl text-white" />
                </div>
                info@gstsa1.org
              </motion.a>

              <motion.a
                whileHover={{ x: 5 }}
                href="tel:+966504420607"
                className="flex items-center gap-3 text-gray-300 hover:text-quaternary transition-colors group"
              >
                <div className="p-2 bg-quaternary/10 rounded-lg group-hover:bg-quaternary/20 transition-colors">
                  <HiPhone className="text-xl text-white" />
                </div>
                +966 504420607
              </motion.a>
            </div>
          </div>

          {/* Follow Us */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white/50 to-quaternary bg-clip-text text-transparent">
              Follow us
            </h2>
            <div className="flex gap-4 text-2xl max-w- flex-wrap">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
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
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white/50 to-quaternary bg-clip-text text-transparent">
              Join our Newsletter
            </h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email <span className="text-quaternary">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email"
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
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
