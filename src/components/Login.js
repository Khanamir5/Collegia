import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role is 'User'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === 'Admin') {
      // Hardcoded Admin credentials
      const adminUsername = 'Admin';
      const adminPassword = 'admin123';
      

      if (username === adminUsername && password === adminPassword) {
        localStorage.setItem('username', adminUsername);
        localStorage.setItem('role', 'Admin');
        alert('Admin login successful!');
        navigate('/home');
      } else {
        alert('Admin login failed!');
      }
    }else if (role === 'User') {
      // Hardcoded User credentials
      
      const userUsername = 'TestUser';
      const userPassword = 'Test123';

      if (username === userUsername && password === userPassword) {
        localStorage.setItem('username', userUsername);
        localStorage.setItem('role', 'User');
        alert('User login successful!');
        navigate('/home');
      } else {
        alert('User login failed! Use TestUser/Test123');
      }
      
    }
    else {
      // API Authentication for User role
      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          username,
          password,
        });

        if (response.data && response.data.username) {
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('role', 'User');
          alert('User login successful!');
          navigate('/home');
        } else {
          alert('User login failed! Check credentials or API response.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('User login failed! Ensure backend is running at http://localhost:8080');
      }
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        background: 'url("/images/hero-bg.jpg") no-repeat center center/cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="auth-form"
        style={{
          maxWidth: '400px',
          width: '90%',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#2c3e50',
            marginBottom: '20px',
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
          }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 'clamp(8px, 2vw, 12px)',
              margin: '10px 0',
              border: 'none',
              borderRadius: '5px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
              fontSize: 'clamp(14px, 4vw, 16px)',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 'clamp(8px, 2vw, 12px)',
              margin: '10px 0',
              border: 'none',
              borderRadius: '5px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
              fontSize: 'clamp(14px, 4vw, 16px)',
              boxSizing: 'border-box',
            }}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: 'clamp(8px, 2vw, 12px)',
              margin: '10px 0',
              border: 'none',
              borderRadius: '5px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
              fontSize: 'clamp(14px, 4vw, 16px)',
              boxSizing: 'border-box',
              background: 'white',
              color: '#2c3e50',
            }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 'clamp(8px, 2vw, 12px)',
              background: '#3498db',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              fontSize: 'clamp(14px, 4vw, 16px)',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
          >
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '15px',
            color: '#666',
            fontSize: 'clamp(12px, 3vw, 14px)',
          }}
        >
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{
              cursor: 'pointer',
              color: '#3498db',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            Sign up
          </span>
        </p>

        <p
          style={{
            textAlign: 'center',
            marginTop: '15px',
            color: 'red',
            fontSize: 'clamp(12px, 3vw, 14px)',
          }}
        >
          TestUser: Use Testuser/Test123 to login.
        </p>
      </div>
    </div>
  );
}

export default Login;