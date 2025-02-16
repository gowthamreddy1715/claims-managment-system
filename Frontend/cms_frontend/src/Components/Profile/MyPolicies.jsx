import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { FaEdit } from "react-icons/fa";

function MyPolicies() {
  const [policies, setPolicies] = useState([]);
  const { token, role, phId } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    dob: "",
    address: "",
    PAN_NUMBER: "",
  });

  useEffect(() => {
    fetchPolicies();
  }, [token]);

  const fetchPolicies = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://claims-managment-system.onrender.com/policyholder/policies",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Unauthorized or failed to fetch policies");
      }

      const data = await response.json();
      console.log(data)
      setPolicies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (policy) => {
    setEditData({
      dob: policy.dob || "",
      address: policy.address || "",
      PAN_NUMBER: policy.PAN_NUMBER || "",
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://claims-managment-system.onrender.com/policyholder/${phId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (!response.ok) {
        console.log("Failed to update policy");
        return;
      }

      setShowEditModal(false);
      fetchPolicies();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-center font-bold text-3xl mt-4 text-gray-800">
        My Policies
      </h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {policies.length > 0 ? (
          policies.map((policy, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 shadow-md bg-white relative flex flex-col space-y-2"
            >
              <h2 className="text-xl font-bold text-gray-800">{policy.name}</h2>
              <p className="text-gray-600"><strong>Type:</strong> {policy.type}</p>
              <p className="text-gray-600"><strong>Amount:</strong> {policy.amount}</p>
              <p className="text-gray-600"><strong>Premium:</strong> {policy.premium}</p>
              {role !== "policyholder" && (
                <button
                  className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                  onClick={() => handleEditClick(policy)}
                >
                  <FaEdit />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No policies found</p>
        )}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Policy Details</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Date of Birth (YYYY-MM-DD)</label>
              <input
                type="date"
                name="dob"
                value={editData.dob}
                onChange={handleChange}
                className="w-full border p-2 mb-2 rounded"
                required
              />

              <label className="block mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={editData.address}
                onChange={handleChange}
                className="w-full border p-2 mb-2 rounded"
                required
              />

              <label className="block mb-2">PAN Card</label>
              <input
                type="text"
                name="PAN_NUMBER"
                value={editData.PAN_NUMBER}
                onChange={handleChange}
                className="w-full border p-2 mb-4 rounded"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white p-2 rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPolicies;
