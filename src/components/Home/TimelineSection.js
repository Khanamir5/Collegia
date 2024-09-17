// Correct placement of import at the top of the file
import React from 'react';
import styled from 'styled-components';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css'; // Moved this import to the top

// Icons for timeline
import { FaCode, FaRocket, FaUsers, FaGraduationCap } from 'react-icons/fa';

// Data for timeline events
const timelineData = [
  {
    date: 'January 2024',
    title: 'Project Kickoff',
    description: 'We started working on the platform, bringing together a diverse team of designers, developers, and visionaries.',
    icon: <FaRocket />,
    backgroundColor: '#8841f9',
  },
  {
    date: 'March 2024',
    title: 'Beta Launch',
    description: 'Released the first beta version of our platform with initial user access, gathering valuable feedback.',
    icon: <FaUsers />,
    backgroundColor: '#0fbcf9',
  },
  {
    date: 'July 2024',
    title: 'First Milestone',
    description: 'We reached 1,000 active users! The community is growing and the platform is evolving quickly.',
    icon: <FaCode />,
    backgroundColor: '#34e89e',
  },
  {
    date: 'November 2024',
    title: 'Official Launch',
    description: 'The official launch of our platform, with all features implemented and polished.',
    icon: <FaGraduationCap />,
    backgroundColor: '#ff6b6b',
  },
];

// Timeline Section Component
const TimelineSection = () => {
  return (
    <TimelineWrapper>
      <TimelineTitle>Our Journey</TimelineTitle>
      <VerticalTimeline>
        {timelineData.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            date={event.date}
            iconStyle={{ background: event.backgroundColor, color: '#fff' }}
            icon={event.icon}
            contentStyle={{ background: 'rgba(0, 0, 0, 0.7)', color: '#fff', borderRadius: '15px' }}
            contentArrowStyle={{ borderRight: '7px solid rgba(0, 0, 0, 0.7)' }}
          >
            <h3 className="vertical-timeline-element-title">{event.title}</h3>
            <p>{event.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </TimelineWrapper>
  );
};

export default TimelineSection;

// Styled components
const TimelineWrapper = styled.section`
  background: radial-gradient(circle, rgba(30, 30, 30, 1) 0%, rgba(0, 0, 0, 1) 100%);
  padding: 80px 0;
  color: #fff;
`;

const TimelineTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #fff;
  margin-bottom: 50px;
`;
