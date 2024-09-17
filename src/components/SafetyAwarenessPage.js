import React from 'react';
import styled from 'styled-components';

// Helper for responsive font sizes
const responsiveFontSize = (size) => `
  font-size: ${size};
  @media (max-width: 768px) {
    font-size: calc(${size} * 0.9);
  }
  @media (max-width: 480px) {
    font-size: calc(${size} * 0.8);
  }
`;

// Hero Section
const HeroSection = styled.section`
  background-image: url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); // Add your background image URL
  background-size: cover;
  background-position: center;
  padding: 120px 20px;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;


  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }
`;

const HeroTitle = styled.h1`
  ${responsiveFontSize('4rem')};
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const HeroSubtitle = styled.p`
  ${responsiveFontSize('1.5rem')};
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
`;

const CallToAction = styled.a`
  padding: 15px 30px;
  background-color: #ff6f61;
  color: #fff;
  text-decoration: none;
  ${responsiveFontSize('1.2rem')};
  border-radius: 30px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    background-color: #ff8a65;
    transform: scale(1.05);
  }
`;

// Resources Section
const ResourcesSection = styled.section`
  padding: 60px 20px;
  background-color: #f1f1f1;
  text-align: center;
`;

const ResourcesTitle = styled.h2`
  ${responsiveFontSize('2.5rem')};
  color: #333;
  margin-bottom: 40px;
`;

const ResourcesGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const ResourceItem = styled.div`
  flex: 1;
  max-width: 320px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
  overflow: hidden;

  h3 {
    ${responsiveFontSize('1.5rem')};
    color: #ff6f61;
    margin-bottom: 15px;
  }

  p {
    ${responsiveFontSize('1rem')};
    color: #666;
  }
`;

// Reporting Tools Section
const ReportingSection = styled.section`
  padding: 60px 20px;
  background-color: #fff;
  text-align: center;
`;

const ReportingTitle = styled.h2`
  ${responsiveFontSize('2.5rem')};
  color: #333;
  margin-bottom: 40px;
`;

const ReportingGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const ReportingItem = styled.div`
  flex: 1;
  max-width: 320px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
  overflow: hidden;

  h3 {
    ${responsiveFontSize('1.5rem')};
    color: #ff6f61;
    margin-bottom: 15px;
  }

  p {
    ${responsiveFontSize('1rem')};
    color: #666;
  }
`;

// Security System Integration Section
const SecuritySection = styled.section`
  padding: 60px 20px;
  background-color: #f1f1f1;
  text-align: center;
`;

const SecurityTitle = styled.h2`
  ${responsiveFontSize('2.5rem')};
  color: #333;
  margin-bottom: 40px;
`;

const SecurityGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const SecurityItem = styled.div`
  flex: 1;
  max-width: 320px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
  overflow: hidden;

  h3 {
    ${responsiveFontSize('1.5rem')};
    color: #ff6f61;
    margin-bottom: 15px;
  }

  p {
    ${responsiveFontSize('1rem')};
    color: #666;
  }
`;

// Support Services Section
const SupportSection = styled.section`
  padding: 60px 20px;
  background-color: #fff;
  text-align: center;
`;

const SupportTitle = styled.h2`
  ${responsiveFontSize('2.5rem')};
  color: #333;
  margin-bottom: 40px;
`;

const SupportGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const SupportItem = styled.div`
  flex: 1;
  max-width: 320px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
  overflow: hidden;

  h3 {
    ${responsiveFontSize('1.5rem')};
    color: #ff6f61;
    margin-bottom: 15px;
  }

  p {
    ${responsiveFontSize('1rem')};
    color: #666;
  }
`;

// Call to Action Section
const ContactSection = styled.section`
  padding: 60px 20px;
  text-align: center;
  background-color: #ff6f61;
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 0;
  }
`;

const ContactTitle = styled.h2`
  ${responsiveFontSize('2.5rem')};
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const ContactButton = styled.a`
  padding: 15px 30px;
  background-color: #fff;
  color: #ff6f61;
  text-decoration: none;
  ${responsiveFontSize('1.2rem')};
  border-radius: 30px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    background-color: #ff8a65;
    transform: scale(1.05);
  }
`;

// Safety Awareness Page Component
const SafetyAwarenessPage = () => (
  <div>
    {/* Hero Section */}
    <HeroSection>
      <HeroTitle>Your Safety is Our Priority</HeroTitle>
      <HeroSubtitle>Comprehensive resources and tools to ensure a safer campus experience.</HeroSubtitle>
      <CallToAction href="#resources">Learn More</CallToAction>
    </HeroSection>

    {/* Comprehensive Safety Resources Section */}
    <ResourcesSection id="resources">
      <ResourcesTitle>Comprehensive Safety Resources</ResourcesTitle>
      <ResourcesGrid>
        <ResourceItem>
          <h3>Interactive Campus Map</h3>
          <p>Find safe routes and emergency phone locations across campus with real-time updates.</p>
        </ResourceItem>
        <ResourceItem>
          <h3>Video Tutorials</h3>
          <p>Watch tutorials on personal safety, emergency procedures, and reporting suspicious activities.</p>
        </ResourceItem>
        <ResourceItem>
          <h3>Safety Guidelines</h3>
          <p>Read up-to-date guidelines and safety tips for maintaining personal security in various scenarios.</p>
        </ResourceItem>
      </ResourcesGrid>
    </ResourcesSection>

    {/* Reporting Tools Section */}
    <ReportingSection>
      <ReportingTitle>Effective Reporting Tools</ReportingTitle>
      <ReportingGrid>
        <ReportingItem>
          <h3>Incident Report Form</h3>
          <p>Submit detailed reports on any safety incidents or concerns with ease and confidentiality.</p>
        </ReportingItem>
        <ReportingItem>
          <h3>Emergency Contacts</h3>
          <p>Quick access to emergency contacts including campus security and local authorities.</p>
        </ReportingItem>
        <ReportingItem>
          <h3>Feedback System</h3>
          <p>Provide feedback on safety measures and suggest improvements for a safer environment.</p>
        </ReportingItem>
      </ReportingGrid>
    </ReportingSection>

    {/* Security System Integration Section */}
    <SecuritySection>
      <SecurityTitle>Advanced Security System Integration</SecurityTitle>
      <SecurityGrid>
        <SecurityItem>
          <h3>Real-time Alerts</h3>
          <p>Receive immediate notifications for any safety threats or emergency situations.</p>
        </SecurityItem>
        <SecurityItem>
          <h3>Integration with Local Authorities</h3>
          <p>Seamless connection with local authorities for quicker response and coordination.</p>
        </SecurityItem>
        <SecurityItem>
          <h3>Campus Security Cameras</h3>
          <p>Access live feeds and security footage from various locations around the campus.</p>
        </SecurityItem>
      </SecurityGrid>
    </SecuritySection>

    {/* Support Services Section */}
    <SupportSection>
      <SupportTitle>24/7 Support Services</SupportTitle>
      <SupportGrid>
        <SupportItem>
          <h3>Emergency Help Line</h3>
          <p>Round-the-clock assistance available through our dedicated emergency help line.</p>
        </SupportItem>
        <SupportItem>
          <h3>Counseling Services</h3>
          <p>Professional counseling services to help you manage stress and personal safety concerns.</p>
        </SupportItem>
        <SupportItem>
          <h3>Safety Workshops</h3>
          <p>Participate in workshops to enhance your personal safety skills and awareness.</p>
        </SupportItem>
      </SupportGrid>
    </SupportSection>

    {/* Contact Section */}
    <ContactSection>
      <ContactTitle>Get In Touch With Us</ContactTitle>
      <ContactButton href="mailto:support@safetyawareness.com">Contact Us</ContactButton>
    </ContactSection>
  </div>
);

export default SafetyAwarenessPage;
