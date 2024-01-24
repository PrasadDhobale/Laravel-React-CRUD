import React, { useEffect, useState } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import Api from './Api';
import EditUser from './EditUser';


const ConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline-red active:bg-red-800"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// ... (previous imports)

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10); // Default rows per page
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const getUsers = () => {
    Api.get('students')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (userId) => {
    setIsEditModalOpen(true);
    setSelectedUserId(userId);
  };

  const closeEditModal = () => {
    getUsers();
    setIsEditModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirmationOpen(false);

    // Make the API call to delete the user
    Api.delete(`students/${userToDelete}`)
      .then((response) => {
        if (response.data.status === 'success') {
          alert('Deleted Successfully');
          getUsers();
        } else {
          alert('Failed to delete user. Please try again.');
        }
      })
      .catch((error) => {
        // Handle API call error
        console.error('Error deleting user:', error);
      });
  };

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false);
    setUserToDelete(null);
  };

  const handleChangeRowsPerPage = (e) => {
    setUsersPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mb-10 bg-white p-8 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="mr-2">Rows per page:</label>
        <select
          value={usersPerPage}
          onChange={handleChangeRowsPerPage}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mobile</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.first_name} {user.last_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.mobile}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2 flex flex-col items-center sm:flex-row">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    <PencilAltIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700 transition duration-300 mt-2 sm:mt-0"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <ul className="flex space-x-2">
            {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 border ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'border-gray-300'
                  } rounded-md hover:bg-blue-700 transition duration-300`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isEditModalOpen && selectedUserId && <EditUser userId={selectedUserId} onClose={closeEditModal} />}

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default DisplayUsers;
