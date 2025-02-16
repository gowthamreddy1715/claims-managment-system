import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext"; // Import the Auth Context
import userlogo from "../../../userlogo.webp"
function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo & Brand Name */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex items-center space-x-3 transform transition duration-200 hover:scale-110">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold text-gray-900 dark:text-white">
              SafeHorizon
            </span>
          </div>
        </Link>

        {/* User Dropdown */}
        <div className="flex items-center md:order-2 space-x-3">
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
              <img
                className="w-8 h-8 rounded-full transform transition duration-200 hover:scale-110"
                src={userlogo}
                alt="User"
              />
            </button>

            {dropdownOpen && (
              <div className=" z-20 absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                {token && (
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                )}
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="items-center justify-between hidden md:flex md:w-auto">
          <ul className="flex flex-col font-medium md:space-x-8 md:flex-row">
            <li>
              <Link
                to="/"
                onClick={() => setActive("home")}
                className={`block py-2 px-3 rounded-sm md:p-0 transition ${
                  active === "home"
                    ? "text-blue-700"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setActive("About")}
                className={`block py-2 px-3 rounded-sm md:p-0 transition ${
                  active === "About"
                    ? "text-blue-700"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
              About
              </Link>
            </li>
            <li>
              <Link
                to="/policies"
                onClick={() => setActive("policies")}
                className={`block py-2 px-3 rounded-sm md:p-0 transition ${
                  active === "policies"
                    ? "text-blue-700"
                    : "text-gray-900 hover:text-blue-700 dark:text-white"
                }`}
              >
                Policies
              </Link>
            </li>
            {!token ? (
              <>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setActive("register")}
                    className={`block py-2 px-3 rounded-sm md:p-0 transition ${
                      active === "register"
                        ? "text-blue-700"
                        : "text-gray-900 hover:text-blue-700 dark:text-white"
                    }`}
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setActive("login")}
                    className={`block py-2 px-3 rounded-sm md:p-0 transition ${
                      active === "login"
                        ? "text-blue-700"
                        : "text-gray-900 hover:text-blue-700 dark:text-white"
                    }`}
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                {role === "admin" && (
                  <li>
                    <Link
                      to="/admin-dashboard"
                      onClick={() => setActive("admin-dashboard")}
                      className={`block py-2 px-3 rounded-sm md:p-0 transition ${
                        active === "admin-dashboard"
                          ? "text-blue-700"
                          : "text-gray-900 hover:text-blue-700 dark:text-white"
                      }`}
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
