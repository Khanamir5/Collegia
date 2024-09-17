// src/components/Home/LatestNewsSection.js
import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaBookOpen, FaMicrophone, FaBriefcase, FaHandsHelping } from 'react-icons/fa';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const newsItems = [
  {
    title: 'Campus Cultural Fest 2024',
    date: 'Jan 25, 2024',
    description: 'Join us for the annual cultural fest featuring music, arts, and more!',
    icon: <FaMicrophone />,
  },
  {
    title: 'AI Workshop for Beginners',
    date: 'Feb 12, 2024',
    description: 'A hands-on AI workshop that explores the basics of machine learning and data science.',
    icon: <FaBookOpen />,
  },
  {
    title: 'Career Fair 2024',
    date: 'March 5, 2024',
    description: 'Connect with top companies for internships, part-time jobs, and full-time careers.',
    icon: <FaBriefcase />,
  },
  {
    title: 'Community Service Drive',
    date: 'April 22, 2024',
    description: 'Join our campus-wide community service initiative and make a difference!',
    icon: <FaHandsHelping />,
  },
];

// Styled components for Latest News Section
const NewsSectionWrapper = styled.section`
  padding: 80px 20px;
  background: url('/images/abc.jpg') no-repeat center center fixed;
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
    background: rgba(0, 0, 0, 0.2); /* Optional dark overlay */
    z-index: 0;
  }
`;

const NewsHeading = styled.h2`
  font-size: 3rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  margin-bottom: 40px;
  z-index: 2;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const NewsCard = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #fff;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  }
`;

const NewsIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffcc00;
`;

const NewsCardTitle = styled.h3`
  font-size: 1.8rem;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 10px;
`;

const NewsDate = styled.div`
  font-size: 1rem;
  color: #ffcc00;
  margin-bottom: 10px;
`;

const NewsDescription = styled.p`
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  color: #ddd;
`;

const LatestNewsSection = () => {
  return (
    <NewsSectionWrapper>
      <NewsHeading data-aos="fade-up">Latest News & Events</NewsHeading>
      <NewsGrid>
        {newsItems.map((item, index) => (
          <NewsCard key={index} data-aos="fade-up" data-aos-delay={`${index * 100}`}>
            <NewsIcon>{item.icon}</NewsIcon>
            <NewsDate>{item.date}</NewsDate>
            <NewsCardTitle>{item.title}</NewsCardTitle>
            <NewsDescription>{item.description}</NewsDescription>
          </NewsCard>
        ))}
      </NewsGrid>
    </NewsSectionWrapper>
  );
};

export default LatestNewsSection;
