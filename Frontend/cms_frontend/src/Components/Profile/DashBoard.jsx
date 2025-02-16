import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { FiEdit, FiSave } from "react-icons/fi";

function Dashboard() {
  const { token, role, setRole, id, setId, setPHID } = useAuth();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", role: "" });
  const [policyData, setData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const response1 = await fetch("https://claims-managment-system.onrender.com/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response1.ok) throw new Error("Failed to fetch user data");
        const data1 = await response1.json();
        setId(data1.id);
        setUser(data1);
        setFormData({ name: data1.name, phone: data1.phone, email: data1.email, role: data1.role });
        setRole(data1.role);

        const response2 = await fetch("https://claims-managment-system.onrender.com/policyholder/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response2.ok) throw new Error("Failed to fetch policy data");
        const data2 = await response2.json();
        const filteredData = data2.find((data) => data.policyHolderId === data1.id) || {};
        setPHID(filteredData._id);
        setData(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    if (!token) return;
    try {
      const response = await fetch("https://claims-managment-system.onrender.com/users/edit", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update user data");
      const updatedData = await response.json();
      setUser(updatedData);
      if (updatedData.role) setRole(updatedData.role);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          {isEditing ? (
            <button onClick={handleEdit} className="bg-blue-500 p-2 rounded-full text-white">
              <FiSave size={18} />
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 p-2 rounded-full text-white">
              <FiEdit size={18} />
            </button>
          )}
        </div>
        <div className="mt-4 space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold">Name:</p>
            {isEditing ? <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded" /> : <p>{user.name}</p>}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold">Phone:</p>
            {isEditing ? <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border p-2 w-full rounded" /> : <p>{user.phone}</p>}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold">Email:</p>
            {isEditing ? <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full rounded" /> : <p>{user.email}</p>}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold">Role:</p>
            {isEditing ? <input type="text" name="role" value={formData.role} onChange={handleChange} className="border p-2 w-full rounded" /> : <p>{user.role}</p>}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold">Date of Birth:</p>
            <p>{policyData.dob}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold">PAN Number:</p>
            <p>{policyData.PAN_NUMBER}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 font-semibold">Address:</p>
            <p>{policyData.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
