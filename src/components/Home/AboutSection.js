import React from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutGif from './images/About.gif';

AOS.init();

const AboutSection = () => {
  return (
    <AboutContainer id="about">
      <AboutContent data-aos="fade-in">
        <AboutHeading>About Us</AboutHeading>
        <AboutText>
          At StudentHub, we redefine the student experience with a platform that seamlessly integrates networking, job opportunities, event management, and academic support. Our mission is to empower students with the tools they need to excel both academically and socially.
        </AboutText>
      </AboutContent>
      <AboutImageContainer data-aos="fade-in">
      <AboutImage src={AboutGif} alt="About us" />
      </AboutImageContainer>
    </AboutContainer>
  );
};

export default AboutSection;

const AboutContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  background-color: #000;
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 50px 10px;
  }
`;

const AboutContent = styled.div`
  max-width: 600px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const AboutHeading = styled.h2`
  font-size: 3rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.6;
  color: #ccc;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AboutImageContainer = styled.div`
  max-width: 500px;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const AboutImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
`;
