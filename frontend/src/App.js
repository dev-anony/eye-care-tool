import Navbar from "./components/Navbar"
import Kerat from "./pages/kerat"
import Diabetic from "./pages/Diabetic"
import Header2 from "./components/common/NewHeader";
import './pages/Login.css';
import { Route, Routes, useNavigate} from "react-router-dom"
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import './pages/App.css'
import React, { useState, useEffect } from 'react';

function App() {
  const [logged, setLog] = useState(false);
  const [notlog, setNlog] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const correctEmail = 'test@example.com';
  const correctPassword = 'password123';
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in from previous session
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      setLog(true);
      setNlog(false);
    }
  }, []);

  const handleLogin = () => {
    if (email === correctEmail && password === correctPassword) {
      setLog(true);
      setNlog(false)

      localStorage.setItem('loggedIn', 'true');
      navigate('/diabetic');
    } else {
      console.log('Invalid credentials');
    }
    

  };
  
  const handleLogout = () => {
    setLog(false);
    setNlog(true);
    setPassword('');
    // Clear login status from local storage
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  return (
    <div>
      {notlog && (
          <><Header />
          <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
        </>
      )}    
      {logged && (
          <>
          <Header2 
            button3={handleLogout}
          />
          <div className="container" style={{ width: '100%' }}>
          <Navbar />
          <div style={{ paddingLeft: '20px' }}>
            <Routes>
              <Route path="*" element={<Diabetic />} />
              <Route path="/diabetic" element={<Diabetic />} />
              <Route path="/kerat" element={<Kerat />} />
            </Routes>
          </div>
        </div></>
      )}
      <Footer />
    </div>
  )
}

export default App
