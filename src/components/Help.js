// src/components/Help.js

import React from 'react';
import styled from 'styled-components';
import { FaQuestionCircle, FaEnvelope, FaPhone, FaBook, FaTools, FaStar } from 'react-icons/fa';

// Styled components for the Help page
const HelpContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: auto;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 3rem;
    color: #f75c7e;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionHeader = styled.h2`
  font-size: 2.5rem;
  color: #f75c7e;
  border-bottom: 2px solid #f75c7e;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const FAQList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
  }

  .question {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
  }

  .answer {
    margin-top: 10px;
    font-size: 1rem;
    color: #666;
  }
`;

const ContactMethods = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
`;

const ContactCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 280px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.div`
  font-size: 2.5rem;
  color: #f75c7e;
  margin-bottom: 10px;
`;

const ContactInfo = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const Guides = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const GuideLink = styled.a`
  display: flex;
  align-items: center;
  color: #f75c7e;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: 10px;
  }
`;

const FeaturesOverview = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 2rem;
    color: #f75c7e;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
    color: #666;
  }
`;

const UserGuide = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 2rem;
    color: #f75c7e;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
    color: #666;
  }
`;

// Main Help component
const Help = () => {
  return (
    <HelpContainer>
      <Header>
        <h1>Help Center</h1>
        <p>Find answers to common questions, get in touch with our support team, or explore our guides.</p>
      </Header>

      <Section>
        <SectionHeader>Frequently Asked Questions (FAQs)</SectionHeader>
        <FAQList>
          <li>
            <div className="question">How do I reset my password?</div>
            <div className="answer">You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions to reset it.</div>
          </li>
          <li>
            <div className="question">How do I update my profile information?</div>
            <div className="answer">To update your profile information, go to the "Profile" section under your account settings. You can edit your details there.</div>
          </li>
          <li>
            <div className="question">What should I do if I encounter a bug?</div>
            <div className="answer">If you encounter a bug, please report it to our support team through the "Contact Support" section below.</div>
          </li>
          <li>
            <div className="question">How can I change my notification settings?</div>
            <div className="answer">You can adjust your notification settings in the "Settings" section of your account. There, you can choose your preferred notification preferences.</div>
          </li>
          <li>
            <div className="question">Can I delete my account?</div>
            <div className="answer">Yes, you can delete your account by going to the "Settings" section and selecting the "Delete Account" option. Be sure to back up any important data before proceeding.</div>
          </li>
        </FAQList>
      </Section>

      <Section>
        <SectionHeader>Contact Support</SectionHeader>
        <ContactMethods>
          <ContactCard>
            <Icon><FaEnvelope /></Icon>
            <ContactInfo>Email: support@collegia.com</ContactInfo>
          </ContactCard>
          <ContactCard>
            <Icon><FaPhone /></Icon>
            <ContactInfo>Phone: +91 123 456 7890</ContactInfo>
          </ContactCard>
        </ContactMethods>
      </Section>

      <Section>
        <SectionHeader>User Guide</SectionHeader>
        <UserGuide>
          <h3>Getting Started</h3>
          <p>Welcome to Collegia! Here's a quick guide to help you get started:</p>
          <ul>
            <li>**Create an Account**: Sign up with your email address to create a new account.</li>
            <li>**Profile Setup**: Complete your profile by adding a profile picture and personal details.</li>
            <li>**Explore Features**: Navigate through the dashboard to explore various features such as messaging, forums, and notifications.</li>
            <li>**Contact Support**: If you need help, use the contact methods listed above to reach out to our support team.</li>
          </ul>
        </UserGuide>
      </Section>

      <Section>
        <SectionHeader>Features Overview</SectionHeader>
        <FeaturesOverview>
          <h3>Main Features</h3>
          <p>Collegia offers a range of features to enhance your experience:</p>
          <ul>
            <li>**Messaging**: Communicate with friends, mentors, and groups through real-time messaging.</li>
            <li>**Profile Management**: Customize your profile, manage your information, and upload a profile picture.</li>
            <li>**Forums and Groups**: Participate in discussions, join groups, and engage with the community.</li>
            <li>**Notifications**: Stay updated with real-time notifications for messages, updates, and more.</li>
            <li>**Events and Calendar**: Keep track of upcoming events and important dates with our integrated calendar.</li>
          </ul>
        </FeaturesOverview>
      </Section>
    </HelpContainer>
  );
};

export default Help;
