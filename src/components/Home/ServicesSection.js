import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUsers, FaBriefcase, FaCalendarAlt, FaWallet, FaFlask, FaShieldAlt, FaHandsHelping, FaRobot } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const services = [
  {
    title: 'Social Networking',
    description: 'Connect with peers, form study groups, and engage in campus discussions.',
    icon: <FaUsers />,
    link: '/StudentSocial',
  },
  {
    title: 'Job Board',
    description: 'Find part-time jobs, internships, and career opportunities tailored to your field.',
    icon: <FaBriefcase />,
    link: '/CampusJobBoard',
  },
  {
    title: 'Event Management',
    description: 'Stay updated on campus events, manage RSVPs, and get tickets effortlessly.',
    icon: <FaCalendarAlt />,
    link: '/EventManagement',
  },
  {
    title: 'Student Budgeting',
    description: 'Track expenses and manage finances with ease, ensuring financial stability.',
    icon: <FaWallet />,
    link: '/StudentBudgeting',
  },
  {
    title: 'Research Collaboration',
    description: 'Work on research projects with faculty and peers seamlessly.',
    icon: <FaFlask />,
    link: '/ResearchCollaboration',
  },
  {
    title: 'Safety Awareness',
    description: 'Access emergency resources and safety reporting tools.',
    icon: <FaShieldAlt />,
    link: '/SafetyAwareness',
  },
  {
    title: 'Peer Mentorship',
    description: 'Get guidance and support from experienced peers and mentors.',
    icon: <FaHandsHelping />,
    link: '/PeerMentorship',
  },
  {
    title: 'AI-driven Insights',
    description: 'Receive personalized recommendations and summaries of key academic content.',
    icon: <FaRobot />,
    link: '/AIPage',
  },
];

const ServicesSection = () => {
  return (
    <ServicesContainer id="services">
      <ServicesHeading data-aos="fade-up">Our Services</ServicesHeading>
      <ServicesGrid>
        {services.map((service, index) => (
          <Link to={service.link} key={index} data-aos="fade-up" data-aos-delay={`${index * 100}`} style={{ textDecoration: 'none' }}>
            <ServiceCard>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          </Link>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

export default ServicesSection;

const ServicesContainer = styled.section`
  padding: 80px 20px;
  background: url('/images/hero-bg.jpg') no-repeat center center fixed;
  background-size: cover;
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 0;
  }
`;

const ServicesHeading = styled.h2`
  font-size: 3rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  margin-bottom: 40px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 300px; /* Fixed height for uniformity */

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  }
`;

const ServiceIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 10px;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  color: #ddd;
`;
