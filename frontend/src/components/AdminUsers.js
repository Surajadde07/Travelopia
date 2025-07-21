import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import AdminSidebar from './AdminSidebar';
import logo from '../assets/Logo.png';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch users from the backend API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token from localStorage
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data.users);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch users.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((user) => user._id !== id)); // Remove user from UI after successful delete
        } catch (err) {
            setError("Failed to delete user.");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading users...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex w-full h-[20%] justify-between items-center px-[3rem]">
                <img src={logo} alt="" className="h-[90px] w-auto" />
                <div className="flex w-[40%] h-[3rem] px-2 bg-white py-1 justify-center items-center rounded-md border-2">
                    <IoMdSearch className="text-3xl text-gray-500 h-full" />
                    <input
                        type="text"
                        className="w-full h-full outline-none flex px-3 text-lg"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <HiUserCircle className="text-[#4083f3] text-4xl" />
                    <p className="text-md">Admin</p>
                </div>
            </div>

            {/* Sidebar */}
            <div className="flex justify-between pr-8 h-[80%]">
                <AdminSidebar />

                {/* Main Content */}
                <div className="flex items-center h-full">
                    {/* Table */}
                    <div className="overflow-x-auto border rounded-lg shadow-lg w-[80vw] h-full">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white">
                                <tr>
                                    <th className="p-4">First Name</th>
                                    <th className="p-4 px-3">Last Name</th>
                                    <th className="p-4">Username</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Gender</th>
                                    <th className="p-4">Bookings</th>
                                    <th className="p-4">Reviews</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="border-t hover:bg-gray-50">
                                            <td className="p-4">{user.firstname}</td>
                                            <td className="p-4">{user.lastname}</td>
                                            <td className="p-4">{user.username}</td>
                                            <td className="p-4">{user.email}</td>
                                            <td className="p-4">{user.phone}</td>
                                            <td className="p-4">{user.gender}</td>
                                            <td className="p-4">{user.bookings.length}</td>
                                            <td className="p-4">{user.reviews.length}</td>
                                            <td className="p-4 space-x-2">
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="bg-[#ff6347] text-white px-3 py-1 rounded-md shadow-md hover:bg-[#ff4500] transition-all duration-200"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="p-4 text-center text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminUsers;
