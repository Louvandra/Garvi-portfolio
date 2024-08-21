import React from 'react';
import { FaWhatsapp, FaGithub, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-gray-500 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Me</h2>
        <div className="flex justify-around">
          <a
            href="https://wa.me/083848102616" 
            className="text-green-500 text-4xl hover:text-green-600 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://github.com/louvandra"
            className="text-gray-800 text-4xl hover:text-gray-900 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://instagram.com/livandra_mlg"
            className="text-pink-500 text-4xl hover:text-pink-600 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
