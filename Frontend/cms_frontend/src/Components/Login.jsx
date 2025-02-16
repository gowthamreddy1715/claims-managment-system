import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import loginImage from "../../register1pic.webp"


function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
    }
    if (formData.password.length < 8 || formData.password.length > 16) {
      newErrors.password = "Password must be 8-16 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    if (validate()) {
      try {
        const response = await axios.post(
          "https://claims-managment-system.onrender.com/users/login",
          formData
        );

        login(response.data.token, response.data.role);
        navigate(response.data.role === "admin" ? "/admin-dashboard" : "/policies");
      } catch (error) {
        setApiError("Invalid credentials. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex bg-white rounded-2xl border border-gray-300 shadow-lg shadow-gray-400/50 w-[750px] max-w-full"
      >
        <div className="w-1/2">
          <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
        </div>

        <div className="w-1/2 p-8 space-y-5">
          <h2 className="text-xl font-bold text-gray-800 text-center">Login</h2>
          {apiError && <ErrorMessage message={apiError} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage message={errors.email} />}

            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <ErrorMessage message={errors.password} />}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

const InputField = ({ type, name, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 transition"
  />
);

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm">{message}</p>
);

export default LoginPage;
