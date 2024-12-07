import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Upload } from './pages/Upload';
import { Signup } from './pages/Signup';
import { Partner } from './pages/Partner';
import { RegisterShop } from './pages/RegisterShop';
import { LoginModal } from './components/LoginModal';

export function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/register-shop" element={<RegisterShop />} />
          </Routes>
        </main>
        <Footer />
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </div>
    </Router>
  );
}