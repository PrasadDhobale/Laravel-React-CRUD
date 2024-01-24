import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center mx-10 bg-grey-100">
      <div className="container mx-auto bg-white p-8 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300">      
      <h2 className="text-3xl font-bold mb-6">About Us</h2>

      <p>
        Welcome to CRUD Operations Hub! At CRUD Operations Hub, we are passionate about simplifying data management through efficient CRUD operations. Our platform is designed to empower users to seamlessly Create, Read, Update, and Delete data, providing a robust foundation for building dynamic and interactive applications.
      </p>

      <h3 className="text-2xl font-bold my-4">Our Mission</h3>

      <p>
        <strong>Empowering Data Management:</strong> Our mission is to empower individuals, businesses, and developers by providing a user-friendly and powerful CRUD operation experience. We believe that effective data management is the key to unlocking the full potential of applications, and we are committed to making this process as smooth as possible.
      </p>

      <h3 className="text-2xl font-bold my-4">What We Offer</h3>

      <ol className="list-decimal pl-6">
        <li><strong>Create:</strong> Easily create new records with our intuitive interface.</li>
        <li><strong>Read:</strong> Effortlessly retrieve and view your data with our Read operations.</li>
        <li><strong>Update:</strong> Keep your data up-to-date with our Update operations.</li>
        <li><strong>Delete:</strong> Remove outdated or unnecessary data with our Delete operations.</li>
      </ol>

      <h3 className="text-2xl font-bold my-4">Why Choose CRUD Operations Hub?</h3>

      <ul className="list-disc pl-6">
        <li><strong>User-Friendly Interface:</strong> Our platform is built with a user-friendly interface, ensuring that users of all skill levels can navigate and perform CRUD operations effortlessly.</li>
        <li><strong>Flexibility and Customization:</strong> Tailor the platform to suit your specific requirements.</li>
        <li><strong>Scalability:</strong> Whether you are managing a small project or a large-scale application, CRUD Operations Hub scales with you.</li>
        <li><strong>Security:</strong> Data security is our top priority. We implement robust security measures to protect your data.</li>
      </ul>

      <p className="mt-6">
        <strong>Get Started Today!</strong> Join CRUD Operations Hub and streamline your data management process. Whether you are a developer, business owner, or enthusiast, our platform is designed to make CRUD operations efficient, effective, and enjoyable. Thank you for choosing CRUD Operations Hub – where data management meets simplicity and power.
      </p>
    </div>
    </div>
  );
};

export default About;
