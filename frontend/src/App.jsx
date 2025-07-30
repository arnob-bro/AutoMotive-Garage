import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Login from './components/loginSignup/login';
import Register from './components/loginSignup/register';
import Services from './components/services/services';
import Parts from './components/parts/parts';
import Checkout from './components/parts/checkout';
import About from './components/about/about';
import ContactPage from './components/contactPage/contactPage';
import MyAccount from './components/userAccount/myAccount/myAccount';
import Profile from './components/userAccount/profile/profile';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/parts" element={<Parts/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/account" element={<MyAccount/>} />
          <Route path="/account/profile" element={<Profile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
