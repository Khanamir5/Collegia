import React from 'react';
import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const ParallaxBackground = styled.div`
  background-image: url('./images/abc.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    background-attachment: scroll;
    min-height: 400px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 40px 20px;
  color: #fff;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const SliderTrack = styled.div`
  display: flex;
  animation: ${slide} 60s linear infinite;
  width: fit-content;

  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    animation: ${slide} 30s linear infinite;
  }
`;

const TestimonialCard = styled.div`
  flex: 0 0 300px;
  margin: 0 15px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  margin-top: 75px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  color: #fff;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    color: pink;
    font-size: 0.8rem;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    flex: 0 0 250px;
    padding: 15px;
    margin-top: 50px;

    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.7rem;
    }
  }
`;

const Heading = styled.h2`
  text-align: center;
  color: #fff;
  margin-bottom: 40px;
  font-size: 2.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const testimonials = [
  {
    id: 1,
    name: 'Amit Sharma',
    testimonial: 'The platform has been instrumental in advancing my career. The networking opportunities are exceptional!',
  },
  // ... (other testimonials remain the same)
];

const TestimonialsSection = () => {
  return (
    <ParallaxBackground>
      <SliderContainer>
        <Heading>What People Are Saying</Heading>
        <SliderTrack>
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.id}-${index}`}>
              <h3>{testimonial.name}</h3>
              <p>"{testimonial.testimonial}"</p>
            </TestimonialCard>
          ))}
        </SliderTrack>
      </SliderContainer>
    </ParallaxBackground>
  );
};

export default TestimonialsSection;