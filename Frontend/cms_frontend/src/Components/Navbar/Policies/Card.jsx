import { FaCheckCircle, FaEdit, FaTrash, FaTimes, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../../Contexts/AuthContext";
import { useState } from "react";
import bg_policies from "../../../../bg_policies3.webp";

function InsuranceBox({ name, description, amount, premium, id, onEdit, type }) {
  const { role, token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    dob: "",
    address: "",
    PAN_NUMBER: "",
    policyId: id,
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      
      const response = await fetch(
        `https://claims-managment-system.onrender.com/policies/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setIsEditing(false);
        onEdit();
      } else {console.log(formData)
        console.error("Failed to update policy");
      }
    } catch (error) {
      console.error("Error updating policy:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://claims-managment-system.onrender.com/policyholder/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData, policyId: id }),
        }
      );
      if (response.ok) {
        setIsModalOpen(false);
      } else {
        console.log(formData)
        console.error("Failed to submit policyholder data");
      }
    } catch (error) {
      console.log("Error submitting policyholder data:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;

    try {
      const response = await fetch(
        `https://claims-managment-system.onrender.com/policies/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        onEdit();
      } else {
        console.error("Failed to delete policy");
      }
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-gray-900 text-white rounded-lg p-4 flex justify-between items-center shadow-md border border-gray-700"
      >
        {isEditing ? (
          <div className="flex flex-col w-full">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 text-black bg-white border rounded mb-2" />
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 text-black bg-white border rounded mb-2" />
            <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} className="w-full p-2 text-black bg-white border rounded mb-2" />
            <select name="premium" value={formData.premium} onChange={handleInputChange} className="w-full p-2 text-black bg-white border rounded mb-2">
              {["Monthly", "Quarterly", "Halfyearly", "Annually"].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-2 rounded">Cancel</button>
              <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-2 rounded"><FaSave className="inline mr-1" />Save</button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-lg font-semibold text-blue-400">{name}</h2>
              <p className="text-gray-300 text-sm">{description}</p>
              <p className="text-gray-400 text-xs">Amount: Rs. {amount} | Premium: {premium}</p>
            </div>
            <div className="flex items-center gap-4">
              {role === "agent" && (
                <>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => setIsEditing(true)} className="text-blue-400 hover:text-blue-300 transition"><FaEdit size={18} /></motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={handleDelete} className="text-red-400 hover:text-red-300 transition"><FaTrash size={18} /></motion.button>
                </>
              )}
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"><FaCheckCircle className="inline mr-2" />Apply Now</motion.button>
            </div>
          </>
        )}
      </motion.div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-200 bg-opacity-50" style={{ backgroundImage: `url('${bg_policies}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-96 border border-blue-300">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-600">Apply for Policy</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700"><FaTimes /></button>
            </div>
            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black mb-2" placeholder="Date of Birth" />
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black mb-2" placeholder="Address" />
            <input type="text" name="PAN_NUMBER" value={formData.PAN_NUMBER} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-black mb-2" placeholder="PAN Card" />
            <button onClick={handleSubmit} className="w-full bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600">Submit</button>
          </div>
        </div>
      )}
    </>
  );
}
export default InsuranceBox;
