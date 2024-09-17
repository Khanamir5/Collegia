import React from 'react';
import styled from 'styled-components';

// Modern theme colors and variables
const modernTheme = {
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  textColor: '#333333',
  accentColor: '#007bff',
  accentSecondary: '#6c757d',
  borderColor: '#dddddd',
  // heroImage: 'url("https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', 
};

// Hero Section
const HeroSection = styled.section`
 background-image: url('https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); // Add your background image URL
  background-size: cover;
  padding: 80px 20px;
  text-align: center;
  color: #ffffff;
  border-radius: 0 0 50px 50px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 15px;
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CallToAction = styled.a`
  padding: 15px 25px;
  background-color: #ffffff;
  color: ${modernTheme.accentColor};
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: 25px;
  border: 2px solid ${modernTheme.accentColor};
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background-color: ${modernTheme.accentColor};
    color: #ffffff;
  }
`;

// Features Section
const Section = styled.section`
  padding: 60px 20px;
  background-color: ${props => props.alt ? '#f9f9f9' : '#ffffff'};
  color: ${modernTheme.textColor};
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${modernTheme.accentColor};
  margin-bottom: 30px;
  font-weight: bold;
`;

const SectionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

// Feature Card Component
const FeatureCard = styled.div`
  flex-basis: 300px;
  padding: 20px;
  background-color: ${modernTheme.cardBackground};
  border: 1px solid ${modernTheme.borderColor};
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;

  h3 {
    color: ${modernTheme.accentColor};
    font-size: 1.6rem;
    margin-bottom: 10px;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    color: ${modernTheme.textColor};
  }
`;

// Student Budgeting Page Component
const StudentBudgetingPage = () => (
  <div style={{ backgroundColor: modernTheme.background }}>
    {/* Hero Section */}
    <HeroSection>
      <HeroTitle>Master Your Budget with Ease</HeroTitle>
      <HeroSubtitle>Streamline your expenses, set goals, and take control of your finances.</HeroSubtitle>
      <CallToAction href="#get-started">Get Started</CallToAction>
    </HeroSection>

    {/* Basic Expense Tracking Section */}
    <Section id="expense-tracking">
      <SectionTitle>Track Your Expenses</SectionTitle>
      <SectionGrid>
        <FeatureCard>
          <h3>Manual Entry</h3>
          <p>Log your daily expenses quickly and easily.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Budget Snapshot</h3>
          <p>Get a clear view of your budget and spending.</p>
        </FeatureCard>
      </SectionGrid>
    </Section>

    {/* Budget Planning Section */}
    <Section alt id="budget-planning">
      <SectionTitle>Simple Budget Planning</SectionTitle>
      <SectionGrid>
        <FeatureCard>
          <h3>Create Budgets</h3>
          <p>Set up and manage your custom budgets.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Spending Alerts</h3>
          <p>Receive alerts to help you stay within your budget.</p>
        </FeatureCard>
      </SectionGrid>
    </Section>

    {/* Financial Education Section */}
    <Section id="financial-education">
      <SectionTitle>Enhance Your Financial Knowledge</SectionTitle>
      <SectionGrid>
        <FeatureCard>
          <h3>Budgeting Tips</h3>
          <p>Learn practical tips for effective budgeting.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Financial Resources</h3>
          <p>Access resources to boost your financial literacy.</p>
        </FeatureCard>
      </SectionGrid>
    </Section>

    {/* Call to Action Section */}
    <Section id="get-started">
      <SectionTitle>Take Control of Your Finances</SectionTitle>
      <CallToAction href="#sign-up">Sign Up Now</CallToAction>
    </Section>
  </div>
);

export default StudentBudgetingPage;
