import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Api from './Api';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });

  const handleChange = (name, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the form submission (e.g., API call or state update)
    // console.log('Submitted:', userData);
    Api.post('/addstudent', userData)
      .then((res) => {
        alert('Added Successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <div className="flex items-center justify-center mx-10 bg-grey-100">
      <div className="container mx-auto bg-white p-8 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Prasad"
              value={userData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Dhobale"
              value={userData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="prasad@gmail.com"
              value={userData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number:
            </label>
            <PhoneInput
              country={'in'}
              value={userData.mobileNumber}
              onChange={(value, country, e) => handleChange('mobileNumber', value)}
              inputProps={{
                name: 'mobileNumber',
                required: true,
                autoFocus: true,
                placeholder: 'Enter Mobile number',
                className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500',
              }}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
