import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


// Dummy credentials for testing
    const dummyUsername = 'Testuser';
    const dummyPassword = '12345';

    if (username === dummyUsername && password === dummyPassword) {
      localStorage.setItem('username', dummyUsername);
      alert('Login successful!');
      navigate('/home');
      return;
    }

// Dummy credentials for testing ends here


    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });


      if (response.data && response.data.username) {
        localStorage.setItem('username', response.data.username);
        alert('Login successful!');
        navigate('/home');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed!');
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
          width: '90%', 
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
            fontSize: 'clamp(1.5rem, 5vw, 2rem)' 
          } 
        }, 
        'Login'
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
              background: '#3498db', 
              border: 'none', 
              borderRadius: '5px', 
              color: 'white', 
              fontSize: 'clamp(14px, 4vw, 16px)', 
              cursor: 'pointer', 
              transition: 'background 0.3s'
            }
          }, 
          'Login'
        ),
        React.createElement(
          'p',
          { 
            style: { 
              textAlign: 'center', 
              marginTop: '15px', 
              color: '#666', 
              fontSize: 'clamp(12px, 3vw, 14px)' 
            } 
          },
          "Don't have an account? ",
          React.createElement(
            'span',
            {
              onClick: () => navigate('/signup'),
              style: { 
                cursor: 'pointer', 
                color: '#3498db', 
                fontWeight: 'bold',
                textDecoration: 'underline'
              }
            },
            'Sign up'
          )
        ),

// Dummy credentials for testing on login page

        React.createElement(
            'p',
            { 
              style: { 
                textAlign: 'center', 
                marginTop: '15px', 
                color: 'red', 
                fontSize: 'clamp(12px, 3vw, 14px)' 
              } 
            },
            "App is Still in Development."
          ),
          React.createElement(
            'p',
            { 
              style: { 
                textAlign: 'center', 
                color: 'red', 
                fontSize: 'clamp(12px, 3vw, 14px)' 
              } 
            },
            "Use the following credentials to login:"
          ),
          React.createElement(
            'p',
            { 
              style: { 
                textAlign: 'center', 
                color: '#666', 
                fontSize: 'clamp(12px, 3vw, 14px)' 
              } 
            },
            React.createElement(
              'span',
              {
                style: { 
                  cursor: 'pointer', 
                  color: '#3498db', 
                  fontWeight: 'bold',
                //   textDecoration: 'underline'
                }
              },
              'Username: Testuser & Password: 12345'
            )
          )

// Dummy credentials for testing on login page ends here

      )
    )
  );
}

export default Login;