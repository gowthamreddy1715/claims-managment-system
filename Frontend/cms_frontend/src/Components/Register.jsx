import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import avatarImage from "../../register1pic.webp";
 // Update the path

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "agent",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "* Email must end with @gmail.com";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^\-_])[A-Za-z\d@$!%*?&#^\-_]{8,16}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "* Password must have uppercase, lowercase, number, and special character";
    }
    if (formData.password.length < 8 || formData.password.length > 16) {
      newErrors.password = "* Password length must be between 8 and 16 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "* Passwords do not match";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://claims-managment-system.onrender.com/users/", formData);
      alert("✅ Registration successful! Redirecting to login...");
      setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "", role: "agent" });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ api: "❌ Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg border border-gray-300 rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center">
          <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-1/2 p-8"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <InputField type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <InputField type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors.email && <ErrorMessage message={errors.email} />}
            <InputField type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            <InputField type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            {errors.password && <ErrorMessage message={errors.password} />}
            <InputField type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword} />}
            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4">
              <option value="agent">Agent</option>
              <option value="policyholder">Policyholder</option>
              <option value="admin">Admin</option>
            </select>
            {errors.api && <ErrorMessage message={errors.api} />}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-4 py-2.5 text-center shadow-md"
            >
              {loading ? "Registering..." : "Submit"}
            </motion.button>
          </form>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already registered? <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
          </p>
        </motion.div>
      </div>
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
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4"
    required
  />
);

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm mb-4">{message}</p>
);

export default RegisterForm;
