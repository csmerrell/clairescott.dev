import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hud from './components/hud/Hud';

import Dashboard from './pages/dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Hud>
        <div slot="main-module">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Hud>
    </Router>
  );
};

export default App;
