import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faMagnifyingGlass,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav
      className=" z-[100px] text-[#e6f3f9]"
      style={{
        background: "rgb(157,182,204)",
        background:
          "linear-gradient(90deg, rgba(157,182,204,1) 0%, rgba(19,114,184,1) 0%, rgba(112,147,181,1) 0%, rgba(87,135,176,1) 0%, rgba(18,113,183,1) 25%, rgba(0,85,148,1) 98%)",
      }}
    >
      <div className="flex justify-between items-center max-w-full mx-auto p-4">
        {/* Logo */}
        <div className="">
          <img src={logo} className="w-[55px] h-[55px]" />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div
          className="text-2xl md:hidden z-[100px] cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </div>

        {/* Navbar Links */}
        <ul
          className={`fixed md:static top-0 left-0 w-full md:w-auto h-full md:h-auto bg-[#0098DB] md:bg-transparent flex flex-col md:flex-row items-center justify-center md:justify-between space-y-6 md:space-y-0 md:space-x-8 transition-transform duration-300 ease-in-out z-[1] ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          {/* Close Button for Mobile Menu */}
          {isMenuOpen && (
            <div
              className="absolute top-4 right-4 cursor-pointer text-white text-3xl"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          )}

          <li>
            <a href="/" className="hover:text-white">
              Home
            </a>
          </li>
          <li>
            <a href="/products" className="hover:text-white">
              Products
            </a>
          </li>
          <li>
            <a href="/cart" className="hover:text-white">
              Cart
            </a>
          </li>
          <li>
            <a href="/order-detail" className="hover:text-white">
              Order Details
            </a>
          </li>

          {/* Profile Icon */}
          <li>
            {!isLoggedIn ? (
              <a href="/login" className="hover:text-white">
                Login
              </a>
            ) : (
              <div className="relative group">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="text-xl cursor-pointer"
                />
                <div className="hidden group-hover:block absolute right-0  bg-white text-gray-800 shadow-lg rounded-md">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200 hover:rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
