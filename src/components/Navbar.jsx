import React from 'react';
import { Link } from 'react-router-dom';
import Admin from './logout'
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';


const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-gray-300 text-black p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Louvandra</Link>
        <div>
          <Link to="/" className="mx-2">Home</Link>
          <Link to="/about" className="mx-2">About</Link>
          <Link to="/skill" className="mx-2">skills</Link>
          <Link to="/contact" className="mx-2">Contact</Link>
          {
            user == null ?    <Link to="/login" className="mx-2">LogIn</Link> :          <Link to="/login" className="mx-2"></Link>
          }


          {/* <Link to="/logout" className="mx-2">logout</Link> */}
          <Admin/>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
