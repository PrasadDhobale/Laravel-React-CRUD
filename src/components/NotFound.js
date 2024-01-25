import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-bounce">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page Not Found</p>
        <p className="text-gray-500 mb-8">Oops! The page you are looking for might be in another galaxy...</p>
        <span role="img" aria-label="Sad Emoji" className="text-2xl mr-2">
          😟
        </span>
        <span role="img" aria-label="Galaxy Emoji" className="text-2xl">
          🌌
        </span>
        <div>
          <Link
            to="/"
            className="text-blue-500 hover:underline transition duration-300 focus:outline-none focus:shadow-outline-blue"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
