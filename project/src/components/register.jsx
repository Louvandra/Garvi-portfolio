import React from 'react';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Buat Akun</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Konfirmasi Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Konfirmasi Password"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Daftar
          </button>
        </form>
        <p className="mt-6 text-center">
          Sudah punya akun? 
          <a href="/login" className="text-blue-500 hover:underline ml-1">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
