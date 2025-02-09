import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Parallax } from 'react-parallax'; // Import Parallax component

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const ParallaxBackground = styled(Parallax)` // Use Parallax component here
  background-image: url('./images/abc.jpg');
  background-size: cover;
  background-position: center;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
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
  {
    id: 2,
    name: 'Priya Patel',
    testimonial: 'I love how intuitive and user-friendly the platform is. It has made my learning journey so much easier!',
  },
  {
    id: 3,
    name: 'Rahul Singh',
    testimonial: 'The AI-powered features are a game-changer. They provide insights that are incredibly valuable.',
  },
  {
    id: 4,
    name: 'Neha Gupta',
    testimonial: 'The community is amazing! I’ve connected with so many like-minded individuals and learned a lot.',
  },
  {
    id: 5,
    name: 'Suresh Kumar',
    testimonial: 'The platform has helped me stay organized and focused on my goals. Highly recommend it!',
  },
  {
    id: 6,
    name: 'Anjali Mehta',
    testimonial: 'The automated summaries are a lifesaver. They save me so much time and effort!',
  },
  {
    id: 7,
    name: 'Vikram Joshi',
    testimonial: 'The dynamic insights feature is fantastic. It helps me track my progress and make better decisions.',
  },
  {
    id: 8,
    name: 'Deepika Reddy',
    testimonial: 'The personalized recommendations are spot on. They always suggest exactly what I need!',
  },
];

const TestimonialsSection = () => {
  // Duplicate the testimonials array to create a seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <ParallaxBackground
      bgImage="./images/abc.jpg" // Set the background image
      strength={0} // Set strength to 0 to keep the image static
    >
      <SliderContainer>
        <Heading>What People Are Saying</Heading>
        <SliderTrack>
          {duplicatedTestimonials.map((testimonial, index) => (
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