import React, { useReducer, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { initialState, reducer, actionTypes } from "../utils/Reducer";
import AddMemberModal from "../components/forms/AddModal";
import { FiUsers, FiLogOut, FiPlus } from "react-icons/fi";

// Member Table component
const MemberTable = ({ members, role, handleActiveChange, handlePermissionChange, handleDelete }) => (
  <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
    {members.length === 0 ? (
      <p className="text-gray-600">No {role}s found</p>
    ) : (
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {["Name", "Email", "Role", "Permissions", "Status", "Actions"].map((header) => (
              <th
                key={header}
                className="py-3 px-4 text-left text-gray-600 font-medium border-b"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              key={member.id}
              className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition-all`}
            >
              <td className="py-3 px-4">{member.name}</td>
              <td className="py-3 px-4">{member.email}</td>
              <td className="py-3 px-4">{member.role}</td>
              <td className="py-3 px-4">
                {["read", "write", "delete"].map((perm) => (
                  <label key={perm} className="inline-flex items-center mr-2">
                    <input
                      type="checkbox"
                      checked={member.permissions[perm] || false} // Ensure permission is defined
                      onChange={() => handlePermissionChange(member.id, perm, role)} // Pass correct arguments
                      className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                    />
                    <span className="ml-1">{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
                  </label>
                ))}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    member.active
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {member.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="py-3 px-4 flex gap-2">
                <button
                  onClick={() => handleActiveChange(member.id, role)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleDelete(member.id, role)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

const AdminDashboard = () => {
  const { auth, logout } = useAuth();
  const storedMembers = JSON.parse(localStorage.getItem("members")) || initialState.members;
  const [state, dispatch] = useReducer(reducer, { ...initialState, members: storedMembers });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "user" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(state.members));
  }, [state.members]);

  // Handle toggle logic
  const handleToggle = (type, id, role) => {
    dispatch({ type, id, role });
  };

  // Handle permission change logic
  const handlePermissionChange = (id, perm, role) => {
    dispatch({
      type: actionTypes.TOGGLE_PERMISSION,
      payload: { id, perm, role },
    });
  };

  // Handle adding a new member
  const handleAddMember = () => {
    if (newMember.email.trim()) {
      dispatch({ type: actionTypes.ADD_MEMBER, payload: newMember });
      setNewMember({ name: "", email: "", role: "user" });
      setIsModalOpen(false);
    } else {
      alert("Please provide a valid email.");
    }
  };

  // Filter members by role
  const membersByRole = (role) => state.members.filter((member) => member.role === role);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside
        className={`w-64 bg-gray-900 text-white min-h-screen flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold tracking-wide text-center">Admin Panel</h1>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {[{ label: "Manage Users", icon: <FiUsers className="mr-2" /> }, { label: "Manage Creators", icon: <FiUsers className="mr-2" /> }].map(
            ({ label, icon }) => (
              <button
                key={label}
                className="flex items-center px-6 py-3 w-full text-left text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
              >
                {icon}
                {label}
              </button>
            )
          )}
        </nav>
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <FiLogOut className="inline mr-2" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 bg-white">
        <header className="flex items-center justify-between pb-4 border-b border-gray-300">
          <h1 className="text-2xl font-semibold">Welcome, {auth.role}</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded hover:from-green-500 hover:to-green-700"
          >
            <FiPlus className="mr-2" />
            Add Member
          </button>
        </header>

        {["user", "creator"].map((role) => (
          <section key={role} className="my-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Manage {role.charAt(0).toUpperCase() + role.slice(1)}s
            </h2>
            <MemberTable
              members={membersByRole(role)}
              role={role}
              handleActiveChange={(id) => handleToggle(actionTypes.TOGGLE_ACTIVE, id, role)}
              handlePermissionChange={handlePermissionChange}
              handleDelete={(id) => handleToggle(actionTypes.DELETE_MEMBER, id, role)}
            />
          </section>
        ))}
      </main>

      <AddMemberModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        newMember={newMember}
        setNewMember={setNewMember}
        handleAddMember={handleAddMember}
      />
    </div>
  );
};

export default AdminDashboard;
