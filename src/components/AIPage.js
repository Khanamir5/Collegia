// AIPages.js
import React from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaChartLine, FaStar } from 'react-icons/fa';

const AIPages = () => {
  return (
    <AIPagesContainer>
      <Header>
        <Title>AI-Driven Features</Title>
        <Subtitle>Enhance your academic and career journey with our intelligent solutions</Subtitle>
      </Header>
      <FeaturesGrid>
        <FeatureCard>
          <Icon><FaFileAlt /></Icon>
          <FeatureTitle>Automated Summaries</FeatureTitle>
          <FeatureDescription>
            Get concise and comprehensive summaries of your notes and video lectures, saving you time and effort in studying.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <Icon><FaChartLine /></Icon>
          <FeatureTitle>Dynamic Insights</FeatureTitle>
          <FeatureDescription>
            Receive real-time insights on your academic and career progress, helping you make informed decisions and stay ahead.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <Icon><FaStar /></Icon>
          <FeatureTitle>Personalized Recommendations</FeatureTitle>
          <FeatureDescription>
            Enjoy tailored suggestions for courses, career paths, and study resources based on your interests and performance.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
    </AIPagesContainer>
  );
};

export default AIPages;

const AIPagesContainer = styled.div`
  padding: 60px 20px;
  background: #f0f4f8;
  color: #333;
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #007bff;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  color: #555;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 15px;
`;

const FeatureTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
`;
