import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username,
        password,
        email
      });
      if (response.data && response.data.username) {
        localStorage.setItem('username', response.data.username);
        alert('Registration successful!');
        navigate('/home');
      } else {
        alert('Registration failed!');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Registration failed!');
    }
  };

  return React.createElement(
    'div',
    { 
      style: { 
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        background: 'url("/images/hero-bg.jpg") no-repeat center center/cover',
        fixed: 'fixed', // Fixed background
        display: 'flex', // Flexbox for centering
        justifyContent: 'center', // Horizontal centering
        alignItems: 'center' // Vertical centering
      }
      
    },
    
    React.createElement(
      'div',
      { 
        className: 'auth-form',
        style: { 
          maxWidth: '400px', 
          width: '90%', // Responsive width
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 0 15px rgba(0,0,0,0.2)', 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          boxSizing: 'border-box'
        }
      },
      React.createElement(
        'h2', 
        { 
          style: { 
            textAlign: 'center', 
            color: '#2c3e50', 
            marginBottom: '20px', 
            fontSize: 'clamp(1.5rem, 5vw, 2rem)' // Responsive font size
          } 
        }, 
        'Sign Up'
      ),
      React.createElement(
        'form',
        { onSubmit: handleSubmit },
        React.createElement('input', {
          type: 'text',
          placeholder: 'Username',
          value: username,
          onChange: (e) => setUsername(e.target.value),
          required: true,
          style: { 
            width: '100%', 
            padding: 'clamp(8px, 2vw, 12px)', // Responsive padding
            margin: '10px 0', 
            border: 'none', 
            borderRadius: '5px', 
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            fontSize: 'clamp(14px, 4vw, 16px)', // Responsive font size
            boxSizing: 'border-box'
          }
        }),
        React.createElement('input', {
          type: 'email',
          placeholder: 'Email',
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          style: { 
            width: '100%', 
            padding: 'clamp(8px, 2vw, 12px)', 
            margin: '10px 0', 
            border: 'none', 
            borderRadius: '5px', 
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            fontSize: 'clamp(14px, 4vw, 16px)', 
            boxSizing: 'border-box'
          }
        }),
        React.createElement('input', {
          type: 'password',
          placeholder: 'Password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
          style: { 
            width: '100%', 
            padding: 'clamp(8px, 2vw, 12px)', 
            margin: '10px 0', 
            border: 'none', 
            borderRadius: '5px', 
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            fontSize: 'clamp(14px, 4vw, 16px)', 
            boxSizing: 'border-box'
          }
        }),
        React.createElement(
          'button', 
          { 
            type: 'submit',
            style: { 
              width: '100%', 
              padding: 'clamp(8px, 2vw, 12px)', 
              background: '#2ecc71', 
              border: 'none', 
              borderRadius: '5px', 
              color: 'white', 
              fontSize: 'clamp(14px, 4vw, 16px)', 
              cursor: 'pointer', 
              transition: 'background 0.3s'
            }
          }, 
          'Sign Up'
        ),
        React.createElement(
          'p',
          { 
            style: { 
              textAlign: 'center', 
              marginTop: '15px', 
              color: '#666', 
              fontSize: 'clamp(12px, 3vw, 14px)' // Responsive font size
            } 
          },
          'Already have an account? ',
          React.createElement(
            'span',
            {
              onClick: () => navigate('/login'),
              style: { 
                cursor: 'pointer', 
                color: '#3498db', 
                fontWeight: 'bold',
                textDecoration: 'underline'
              }
            },
            'Login'
          )
        )
      )
    )
  );
}

export default Signup;