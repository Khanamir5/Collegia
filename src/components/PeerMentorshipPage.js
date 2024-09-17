import React from 'react';
import styled from 'styled-components';

// Base styles for light theme
const lightTheme = {
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  textColor: '#333333',
  accentColor: '#3498db',
  borderColor: '#e0e0e0',
};

// Hero Section
const HeroSection = styled.section`
  background-color: ${lightTheme.background};
  padding: 100px 20px;
  text-align: center;
  color: ${lightTheme.textColor};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 200%;
    height: 100%;
    background: rgba(52, 152, 219, 0.1);
    transform: translateX(-50%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: ${lightTheme.accentColor};
  font-weight: 700;
  position: relative;
  z-index: 1;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  font-weight: 300;
  position: relative;
  z-index: 1;
`;

const CallToAction = styled.a`
  padding: 12px 24px;
  background-color: ${lightTheme.accentColor};
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: 30px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
  }
`;

// Section Wrapper
const Section = styled.section`
  padding: 60px 20px;
  background-color: ${props => props.alt ? '#f9f9f9' : lightTheme.background};
  color: ${lightTheme.textColor};
  text-align: center;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 30px;
  color: ${lightTheme.accentColor};
  font-weight: 700;
`;

const SectionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

// Card for Feature Items
const FeatureCard = styled.div`
  flex-basis: 300px;
  padding: 20px;
  background-color: ${lightTheme.cardBackground};
  border: 1px solid ${lightTheme.borderColor};
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.4rem;
    color: ${lightTheme.accentColor};
    margin-bottom: 15px;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: ${lightTheme.textColor};
  }
`;

// Peer Mentorship Page Component
const PeerMentorshipPage = () => (
  <div style={{ backgroundColor: lightTheme.background }}>
    {/* Hero Section */}
    <HeroSection>
      <HeroTitle>Peer Mentorship Program</HeroTitle>
      <HeroSubtitle>Connecting students through mentorship for academic and personal growth.</HeroSubtitle>
      <CallToAction href="#matching">Get Matched with a Mentor</CallToAction>
    </HeroSection>

    {/* Matching Algorithm Section */}
    <Section id="matching">
      <SectionTitle>Sophisticated Matching Algorithm</SectionTitle>
      <SectionGrid>
        <FeatureCard>
          <h3>Multi-Factor Matching</h3>
          <p>Match based on academic interests, career goals, and personal attributes for the best mentoring experience.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Preferred Mentor Selection</h3>
          <p>Mentees can choose from suggested matches and find mentors that align with their needs and preferences.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Group Mentorship</h3>
          <p>Join peer-led study groups or interest-based cohorts for collaborative learning and support.</p>
        </FeatureCard>
      </SectionGrid>
    </Section>

    {/* Communication Tools Section */}
    <Section alt>
      <SectionTitle>Robust Communication Tools</SectionTitle>
      <SectionGrid>
        <FeatureCard>
          <h3>Scheduled Check-ins & Planners</h3>
          <p>Stay on top of meetings and check-ins with reminders and scheduling tools for easy communication.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Video Conferencing Integration</h3>
          <p>Host virtual mentorship sessions directly through our platform with integrated video conferencing.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Goal Setting & Progress Tracking</h3>
          <p>Mentors and mentees can collaborate on setting goals, track progress, and measure success.</p>
        </FeatureCard>
      </SectionGrid>
    </Section>

    {/* Progress Tracking Section */}
    <Section>
      <SectionTitle>Comprehensive Progress Tracking</SectionTitle>
      <SectionGrid>
        <FeatureCard>
          <h3>Milestone Achievements</h3>
          <p>Celebrate every achievement together and make mentorship a rewarding experience for both parties.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Skill Development Logs</h3>
          <p>Track skill development for both mentors and mentees to document growth and learning.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Academic Performance Integration</h3>
          <p>With permission, link mentorship progress with academic performance for holistic growth tracking.</p>
        </FeatureCard>
      </SectionGrid>
    </Section>

    {/* Feedback System Section */}
    <Section alt>
      <SectionTitle>Feedback and Evaluation System</SectionTitle>
      <SectionGrid>
        <FeatureCard>
          <h3>360-degree Feedback</h3>
          <p>Receive feedback from both mentors and mentees to continuously improve the program.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Anonymous Suggestions</h3>
          <p>Submit anonymous feedback for program improvements and suggest new features for a better experience.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Impact Assessment Surveys</h3>
          <p>Take surveys to assess the long-term impact of the mentorship program and its effectiveness.</p>
        </FeatureCard>
      </SectionGrid>
    </Section>

    {/* Call to Action Section */}
    <Section>
      <SectionTitle>Join the Peer Mentorship Program Today!</SectionTitle>
      <CallToAction href="#join">Sign Up Now</CallToAction>
    </Section>
  </div>
);

export default PeerMentorshipPage;
