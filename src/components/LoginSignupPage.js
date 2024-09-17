import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

const FormContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 20px;
  text-align: center;

  h1 {
    color: #f75c7e;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    button {
      padding: 10px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      color: #fff;
      background: #f75c7e;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #e64a6b;
      }
    }

    .switch {
      margin-top: 10px;
      font-size: 14px;

      a {
        color: #f75c7e;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <PageContainer>
      <FormContainer>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form>
          {!isLogin && (
            <input type="text" placeholder="Full Name" required />
          )}
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          <div className="switch">
            {isLogin ? (
              <p>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Sign Up</a></p>
            ) : (
              <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login</a></p>
            )}
          </div>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginSignupPage;
