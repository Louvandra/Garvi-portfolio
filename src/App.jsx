import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Navbar';
import Footer from './components/footer';
import Login from './components/login';
import Register from './components/register';
import Home from './pages/home';
import About from './pages/about';
import Skill from './pages/skill';
import Contact from './pages/contact';
import Admin from './components/Admin';
import PrivateRoute from './PrivateRoute';
import Logout from './components/logout'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
          
          {/* <Route path="/" element={<Login />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
