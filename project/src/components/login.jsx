import React from 'react';
import { auth, provider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Hasil autentikasi Google
      console.log(result.user);
      navigate('/skill  '); // Arahkan ke halaman utama setelah login berhasil
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-gray-400 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <button 
            onClick={handleGoogleLogin} 
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Login dengan Google
          </button>
        </div>
        <p className="mt-6 text-center">
          Belum punya akun? 
          <a href="/register" className="text-blue-500 hover:underline ml-1">Buat akun</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
