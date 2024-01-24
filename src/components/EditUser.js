import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Api from './Api';

const EditUser = ({ userId, onClose }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });

  useEffect(() => {
    // Fetch user data by ID when the component mounts
    Api.get(`students/${userId}`)
      .then((response) => {
        
        const updatedUserData = {
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name,
          email: response.data.data.email,
          mobileNumber: response.data.data.mobile,
        };
        setUserData(updatedUserData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (name, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMobileNumberChange = (value) => {
    setUserData((prevData) => ({
      ...prevData,
      mobileNumber: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Prepare the data to be sent in the PUT request
      const updatedUserData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        mobileNumber: userData.mobileNumber,
      };
      // Make the PUT request to update the student data
      await Api.put(`students/${userId}`, updatedUserData).then((res) =>{
        if(res.data.status === 200)
            alert('Updated Successfully')
        else
            alert('Something Went Wrong')
      });
      onClose();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-start justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <div className="absolute top-4 mx-4 right-2 cursor-pointer" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
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
              onChange={(value, country, e) => handleMobileNumberChange(value)}
              inputProps={{
                name: 'mobileNumber',
                required: true,
                autoFocus: true,
                placeholder: 'Enter Mobile number',
                className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500',
              }}
            />
          </div>

          <div className="flex mt-4">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
