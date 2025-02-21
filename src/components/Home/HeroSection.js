import React from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './HeroSection.css';


AOS.init();

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent data-aos="fade-up">
        <HeroTitle>
          <h1 className="rubik-glitch-pop-regular">Collegia.</h1>
        </HeroTitle>
        <HeroSubTitle>
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

export default HeroSection;

const HeroContainer = styled.section`
  background: url('/images/hero-bg.jpg') no-repeat center center/cover;
  background-attachment: fixed; /* This creates the parallax effect */
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

const HeroTitle = styled.h1`
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

const HeroSubTitle = styled.p`
  font-size: 1.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  margin-bottom: 2rem;

  span {
    font-weight: 700;
    color: #f1c40f;
  }

  h2{
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
