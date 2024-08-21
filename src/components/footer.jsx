import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-black p-4 text-center">
      <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
