"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Logo from "./Logo";

const Footer = () => {
  const data = {
    navLinks: [
      { text: "Home", href: "/" },
      { text: "About", href: "/about" },
      { text: "FAQ", href: "/faq" },
      { text: "Services", href: "/services" },
      { text: "Contact", href: "/contact" },
    ],
    socialLinks: [
      { icon: faFacebook, href: "https://facebook.com" },
      { icon: faTwitter, href: "https://twitter.com" },
      { icon: faInstagram, href: "https://instagram.com" },
      { icon: faLinkedin, href: "https://linkedin.com" },
    ],
  };
  const { navLinks, socialLinks } = data;
  return (
    <footer className="bg-[#1a1a1a] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Logo />
            <p className="text-sm text-gray-400 font-roboto">
              Empowering your digital journey with innovative solutions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4 font-roboto">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-roboto"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={link.icon} className="h-12 w-12" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="text-gray-400 not-italic">
              <p>123 Business Street</p>
              <p>City, State 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@company.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left">
          <p className="text-sm text-gray-400 font-roboto">
            © 2025 Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
