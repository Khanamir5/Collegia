import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './HeroSection.css';
import { useNavigate } from "react-router-dom";

// Initialize AOS outside the component
AOS.init();

const HeroSection = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // Redirect to login if no username
  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  return (
    <HeroContainer>
      <HeroContent data-aos="fade-up">
      <WelcomeMessage>Hello {username} !! Welcome to</WelcomeMessage>
        <HeroTitle>
          
          <h1 className="rubik-glitch-pop-regular">Collegia.</h1>
        </HeroTitle>
        <HeroSubTitle>
          {/* <h1 style={styles.title}>{getGreeting()}, {username}!</h1> */}
          <h2>Revolutionize Your Student Experience</h2>
          Connect, Collaborate, and Succeed with <span>Collegia</span>
        </HeroSubTitle>
        <HeroButton href="#about">
          Get Started <FiArrowRight />
        </HeroButton>
      </HeroContent>
    </HeroContainer>
  );
};

// Styles object for inline CSS
const styles = {
  title: {
    fontSize: '2rem',
    fontWeight: '400',
    marginBottom: '1rem',
    color: '#ffffff'
  },
  logoutButton: {
    background: '#e74c3c',
    padding: '10px 25px',
    fontSize: '1rem',
    border: 'none',
    color: 'white',
    fontWeight: '500',
    borderRadius: '25px',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background 0.3s ease-in-out',
  }
};

// Styled components
const HeroContainer = styled.section`
  background: url('/images/hero-bg.jpg') no-repeat center center/cover;
  background-attachment: fixed;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  color: white;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  top: -50px;
  z-index: 2;
  padding: 20px;
  max-width: 800px;
`;

const WelcomeMessage = styled.h6`
  font-size: 1.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  margin-bottom: 2rem;
  color: #f1c40f;
`;

const HeroTitle = styled.div`
  font-size: 4.5rem;
  font-family: "Rubik Glitch Pop";
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 1rem;
  animation: fadeIn 1s ease-in-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubTitle = styled.div`
  font-size: 1.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  margin-bottom: 2rem;

  span {
    font-weight: 700;
    color: #f1c40f;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroButton = styled.a`
  background: #f1c40f;
  padding: 12px 30px;
  font-size: 1.2rem;
  border: none;
  color: #000;
  font-weight: 500;
  border-radius: 30px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #d4ac0d;
  }

  svg {
    margin-left: 10px;
    transition: margin-left 0.3s ease;
  }

  &:hover svg {
    margin-left: 15px;
  }
`;

export default HeroSection;