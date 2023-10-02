import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-5 position-static bottom-0 start-0 end-0">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Hospital Management System</p>
      </div>
    </footer>
  );
};

export default Footer;
