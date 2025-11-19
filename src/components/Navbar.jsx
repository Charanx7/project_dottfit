


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/Register");
    setMenuOpen(false); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Top Fixed Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-4">
        <div className="flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-lg border border-white/10 rounded-full shadow-lg">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
            DottFit
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 ml-10">
            <Link to="/About" className="text-gray-200 hover:text-red-500 transition-colors">
              About Us
            </Link>
            <Link to="/Services" className="text-gray-200 hover:text-red-500 transition-colors">
              Services
            </Link>
          </div>

          {/* Register Button (Desktop only) */}
          <button
            onClick={handleRegisterClick}
            className="hidden md:block ml-8 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-5 py-2 rounded-full font-medium shadow-md transition-all"
          >
            Register
          </button>

          {/* Hamburger Icon (Mobile only) */}
          <div className="md:hidden text-white text-2xl cursor-pointer" onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-40">
          <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 space-y-4 text-center border border-white/10 shadow-md">
            <Link
              to="/About"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-200 hover:text-red-500 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/Services"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-200 hover:text-red-500 transition-colors"
            >
              Services
            </Link>
            <button
              onClick={handleRegisterClick}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-5 py-2 rounded-full font-medium shadow-md transition-all"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </>
  );
}
