import React from 'react';
import styled from 'styled-components';

// Styled components for the section
const PartnersSection = styled.section`
  padding: 60px 20px;
  background-color: black;
  text-align: center;
  padding-top: 70px;
  padding-bottom: 50px;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`;

const PartnersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 90px;
  gap: 20px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const PartnerCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 150px;
    padding: 15px;
  }
`;

const PartnerLogo = styled.img`
  max-width: 150px;
  max-height: 60px;
  object-fit: contain;

  @media (max-width: 768px) {
    max-width: 120px;
    max-height: 50px;
  }
`;

// Styled components for Call to Action
const CallToAction = styled.div`
  margin-top: 40px;
  padding: 20px;
  margin-left: 200px;
  margin-right: 200px;
  background-color: rgba(49, 49, 49, 0.572);
  border-radius: 10px;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    margin: 20px 10px;
    padding: 15px;
  }
`;

const CallToActionHeading = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const CallToActionButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #f75c7e;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e64a77;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 16px;
  }
`;

// Array of partner details
const partners = [
  { name: 'GNIT', logo: './images/AMITY_Logo.png' },
  { name: 'Innovate Inc.', logo: './images/JIS_logo.png' },
  { name: 'FutureTech', logo: './images/GNIT_Logo.png' },
  { name: 'Creative Solutions', logo: './images/NIT_logo.png' },
];

const OurPartners = () => {
  return (
    <PartnersSection>
      <Heading>Our Partners</Heading>
      <PartnersGrid>
        {partners.map((partner, index) => (
          <PartnerCard key={index}>
            <PartnerLogo src={partner.logo} alt={partner.name} />
          </PartnerCard>
        ))}
      </PartnersGrid>
      <CallToAction>
        <CallToActionHeading>Want to Become a Partner?</CallToActionHeading>
        <CallToActionButton href="/become-a-partner">Apply Now</CallToActionButton>
      </CallToAction>
    </PartnersSection>
  );
};

export default OurPartners;
