import { NavLink, Route, Routes } from 'react-router-dom';

import DatabasePage from 'src/pages/DatabasePage';
import RecapPage from 'src/pages/RecapPage';
import TracksPage from 'src/pages/TracksPage';

const NAV_LINKS = [
  { to: '/', label: 'Database', icon: '🗄️', exact: true },
  { to: '/tracks', label: 'Tracks', icon: '🛤️' },
  { to: '/recap', label: 'Recap', icon: '📊' },
];

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1 className="app-title">Performance Management</h1>
              <p className="app-tagline">
                Tracking daily activities and performance metrics.
              </p>
            </div>

            <nav className="nav" aria-label="Primary">
              {NAV_LINKS.map(({ to, label, icon, exact }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' nav-link-active' : ''}`
                  }
                >
                  <span className="nav-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Routes>
            <Route path="/" element={<DatabasePage />} />
            <Route path="/tracks" element={<TracksPage />} />
            <Route path="/recap" element={<RecapPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}