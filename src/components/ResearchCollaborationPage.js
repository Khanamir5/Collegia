import React from 'react';
import styled from 'styled-components';

// Hero Section
const HeroSection = styled.section`
  background-image: url('https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); // Update to your new background image
  background-size: cover;
  background-position: center;
  padding: 120px 30px;
  text-align: center;
  color: #fefefe;
  position: relative;
  overflow: hidden;


/* Pseudo-element for overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.593); /* Adjust overlay color and opacity here */
    z-index: 1; /* Ensure overlay is above background image but below text */
  }

  /* Adjust z-index for text to be above overlay */
  & > * {
    position: relative;
    z-index: 2;
  }


  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 40px;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CallToAction = styled.a`
  padding: 16px 32px;
  background-color: #28a745;
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;

// What We Offer Section
const OfferSection = styled.section`
  padding: 60px 30px;
  text-align: center;
  background: linear-gradient(135deg, #f7f7f7 50%, #e0e0e0 50%);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

const OfferTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const OfferGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const OfferItem = styled.div`
  flex-basis: 30%;
  padding: 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-basis: 45%;
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
  }

  h3 {
    font-size: 1.6rem;
    color: #28a745;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    color: #555;
  }
`;

// How It Works Section
const StepsSection = styled.section`
  padding: 60px 30px;
  background: #f4f4f4;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

const StepsTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StepsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const StepItem = styled.div`
  flex-basis: 30%;
  text-align: center;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-basis: 45%;
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

const StepNumber = styled.div`
  font-size: 3.5rem;
  color: #28a745;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StepDescription = styled.p`
  font-size: 1.1rem;
  color: #666;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Our Key Researchers Section
const ResearchersSection = styled.section`
  padding: 60px 30px;
  background: linear-gradient(135deg, #f4f4f4 50%, #e0e0e0 50%);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

const ResearchersTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ResearchersGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const ResearcherCard = styled.div`
  flex-basis: 30%;
  text-align: center;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-basis: 45%;
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`;

const ResearcherImage = styled.img`
  width: 100%;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const ResearcherName = styled.h3`
  font-size: 1.6rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ResearcherTitle = styled.p`
  font-size: 1.1rem;
  color: #777;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Research Partners Section
const PartnersSection = styled.section`
  padding: 60px 30px;
  background: #fff;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

const PartnersTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const PartnersLogos = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const PartnerLogo = styled.img`
  max-width: 150px;
  height: auto;

  @media (max-width: 768px) {
    max-width: 120px;
  }

  @media (max-width: 480px) {
    max-width: 100px;
  }
`;

// Call to Action Section
const ContactSection = styled.section`
  padding: 60px 30px;
  text-align: center;
  background: #021526;
  

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

const ContactTitle = styled.h2`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ContactButton = styled.a`
  padding: 16px 32px;
  background-color: #28a745;
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;

// Main Component
const ResearchCollaborationPage = () => (
  <div>
    {/* Hero Section */}
    <HeroSection>
      <HeroTitle>Welcome to Our Research Collaboration Platform</HeroTitle>
      <HeroSubtitle>Partner with us to drive innovation and make a difference.</HeroSubtitle>
      <CallToAction href="#contact">Get Started</CallToAction>
    </HeroSection>

    {/* What We Offer Section */}
    <OfferSection>
      <OfferTitle>What We Offer</OfferTitle>
      <OfferGrid>
        <OfferItem>
          <h3>Advanced Research Tools</h3>
          <p>Access to cutting-edge research tools and technology to support your work.</p>
        </OfferItem>
        <OfferItem>
          <h3>Expert Guidance</h3>
          <p>Receive expert advice and guidance from seasoned professionals in your field.</p>
        </OfferItem>
        <OfferItem>
          <h3>Collaborative Opportunities</h3>
          <p>Engage in collaborative projects with top researchers and institutions.</p>
        </OfferItem>
      </OfferGrid>
    </OfferSection>

    {/* How It Works Section */}
    <StepsSection>
      <StepsTitle>How It Works</StepsTitle>
      <StepsGrid>
        <StepItem>
          <StepNumber>1</StepNumber>
          <StepDescription>Submit your research proposal and objectives.</StepDescription>
        </StepItem>
        <StepItem>
          <StepNumber>2</StepNumber>
          <StepDescription>Our team will review and provide feedback on your proposal.</StepDescription>
        </StepItem>
        <StepItem>
          <StepNumber>3</StepNumber>
          <StepDescription>Collaborate with our dedicated researchers.</StepDescription>
        </StepItem>
      </StepsGrid>
    </StepsSection>

    {/* Our Key Researchers Section */}
    <ResearchersSection>
      <ResearchersTitle>Meet Our Leading Researchers</ResearchersTitle>
      <ResearchersGrid>
        <ResearcherCard>
          <ResearcherImage src="researcher1.jpg" alt="Researcher 1" />
          <ResearcherName>Dr. Shubhankar Roy</ResearcherName>
          <ResearcherTitle>Data Scientist</ResearcherTitle>
        </ResearcherCard>
        <ResearcherCard>
          <ResearcherImage src="researcher2.jpg" alt="Researcher 2" />
          <ResearcherName>Dr. Pushan Banerjee</ResearcherName>
          <ResearcherTitle>Climate Expert</ResearcherTitle>
        </ResearcherCard>
        <ResearcherCard>
          <ResearcherImage src="researcher3.jpg" alt="Researcher 3" />
          <ResearcherName>Dr. Kartick Malik	</ResearcherName>
          <ResearcherTitle>Healthcare Specialist</ResearcherTitle>
        </ResearcherCard>
      </ResearchersGrid>
    </ResearchersSection>

    {/* Research Partners Section */}
    <PartnersSection>
      <PartnersTitle>Our Research Partners</PartnersTitle>
      <PartnersLogos>
        <PartnerLogo src="partner1-logo.png" alt="Partner 1" />
        <PartnerLogo src="partner2-logo.png" alt="Partner 2" />
        <PartnerLogo src="partner3-logo.png" alt="Partner 3" />
      </PartnersLogos>
    </PartnersSection>

    {/* Call to Action Section */}
    <ContactSection>
      <ContactTitle>Ready to Collaborate?</ContactTitle>
      <ContactButton href="mailto:itsnishu445@gmail.com">Contact Us</ContactButton>
    </ContactSection>
  </div>
);

export default ResearchCollaborationPage;
