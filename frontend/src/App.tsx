import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Album from './pages/Album';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/album/:userId"
            element={
              <PrivateRoute>
                <Album />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<div>404 页面未找到</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
