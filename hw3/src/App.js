import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import List from './pages/List';
import Population from './pages/Population';
import Custom from './pages/Custom';
import './style.css';

// used the slides as a reference
export default function App() {
  return (
    <div>
      <NavBar />
      <main style={{ padding: '1px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/population" element={<Population />} />
          <Route path="/custom-route" element={<Custom />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </main>
    </div>
  );
}
