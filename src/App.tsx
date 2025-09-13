import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import DatabasePage from './pages/DatabasePage';
import TracksPage from './pages/TracksPage';
import RecapPage from './pages/RecapPage';

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: 'none',
  padding: '6px 10px',
  borderRadius: 8,
  background: isActive ? '#e5e7eb' : 'transparent',
  color: '#111827',
});

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16, maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 12 }}>Performance Management</h1>
      <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <NavLink to="/" end style={linkStyle}>Database</NavLink>
        <NavLink to="/tracks" style={linkStyle}>Tracks</NavLink>
        <NavLink to="/recap" style={linkStyle}>Recap</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DatabasePage />} />
        <Route path="/tracks" element={<TracksPage />} />
        <Route path="/recap" element={<RecapPage />} />
      </Routes>
    </div>
  );
}
