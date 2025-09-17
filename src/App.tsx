import { NavLink, Route, Routes } from 'react-router-dom';

import DatabasePage from 'src/pages/DatabasePage';
import RecapPage from 'src/pages/RecapPage';
import TracksPage from 'src/pages/TracksPage';

export default function App() {
  return (
    <div className="container">
      <h1 className="app-title">Performance Management</h1>

      <nav className="nav">
        <NavLink to="/" end>Database</NavLink>
        <NavLink to="/tracks">Tracks</NavLink>
        <NavLink to="/recap">Recap</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<DatabasePage />} />
        <Route path="/tracks" element={<TracksPage />} />
        <Route path="/recap" element={<RecapPage />} />
      </Routes>
    </div>
  );
}
