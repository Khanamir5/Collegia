import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('request'); // 'request' or 'verify'
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register/request-otp', {
        username,
        password,
        email
      });
      if (response.data === "OTP sent to your email") {
        alert('Check your email for OTP!');
        setStep('verify');
      } else {
        alert(response.data); 
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Registration failed!');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register/verify-otp', {
        email,
        otp
      });
      if (response.data) {
        alert('Registration successful! You can now log in.');
        navigate('/login');
      } else {
        alert('Invalid OTP!');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      alert('OTP verification failed!');
    }
  };

  return React.createElement(
    'div',
    { 
      style: { 
        height: '100vh',
        width: '100vw',
        background: 'url("/images/hero-bg.jpg") no-repeat center center/cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        { style: { textAlign: 'center', color: '#2c3e50', marginBottom: '20px', fontSize: 'clamp(1.5rem, 5vw, 2rem)' } }, 
        'Sign Up'
      ),
      step === 'request' ? (
        React.createElement(
          'form',
          { onSubmit: handleRequestOtp },
          React.createElement('input', {
            type: 'text',
            placeholder: 'Username',
            value: username,
            onChange: (e) => setUsername(e.target.value),
            required: true,
            style: inputStyle
          }),
          React.createElement('input', {
            type: 'email',
            placeholder: 'Email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            style: inputStyle
          }),
          React.createElement('input', {
            type: 'password',
            placeholder: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            style: inputStyle
          }),
          React.createElement('button', 
            { type: 'submit', style: buttonStyle }, 
            'Send OTP'
          ),
          React.createElement(
            'p',
            { style: textStyle },
            'Already have an account? ',
            React.createElement(
              'span',
              { onClick: () => navigate('/login'), style: linkStyle },
              'Login'
            )
          )
        )
      ) : (
        React.createElement(
          'form',
          { onSubmit: handleVerifyOtp },
          React.createElement('input', {
            type: 'text',
            placeholder: 'Enter OTP',
            value: otp,
            onChange: (e) => setOtp(e.target.value),
            required: true,
            style: inputStyle
          }),
          React.createElement('button', 
            { type: 'submit', style: buttonStyle }, 
            'Verify OTP'
          ),
          React.createElement(
            'p',
            { style: textStyle },
            React.createElement(
              'span',
              { onClick: () => setStep('request'), style: linkStyle },
              'Resend OTP'
            )
          )
        )
      )
    )
  );
}

const inputStyle = {
  width: '100%',
  padding: 'clamp(8px, 2vw, 12px)',
  margin: '10px 0',
  border: 'none',
  borderRadius: '5px',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  fontSize: 'clamp(14px, 4vw, 16px)',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%',
  padding: 'clamp(8px, 2vw, 12px)',
  background: '#2ecc71',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  fontSize: 'clamp(14px, 4vw, 16px)',
  cursor: 'pointer',
  transition: 'background 0.3s'
};

const textStyle = {
  textAlign: 'center',
  marginTop: '15px',
  color: '#666',
  fontSize: 'clamp(12px, 3vw, 14px)'
};

const linkStyle = {
  cursor: 'pointer',
  color: '#3498db',
  fontWeight: 'bold',
  textDecoration: 'underline'
};

export default Signup;
