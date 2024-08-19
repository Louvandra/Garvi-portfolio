import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  return (
    <header className="bg-gray-300 text-black p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">My Portfolio</Link>
        <div>
          <Link to="/" className="mx-2">Home</Link>
          <Link to="/about" className="mx-2">About</Link>
          <Link to="/skill" className="mx-2">skills</Link>
          <Link to="/contact" className="mx-2">Contact</Link>
          <Link to="/login" className="mx-2">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
