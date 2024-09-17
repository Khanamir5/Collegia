// src/components/TimelinePage.js

import React from 'react';
import styled from 'styled-components';

const TimelinePage = () => {
  return (
    <PageContainer>
      <Background />
      <Timeline>
        <Path />
        <Milestones>
          <Milestone
            className="milestone"
            style={{ left: '10%', top: '50%' }}
            data-tooltip="Graduated with honors - June 2024"
          >
            🎓
            <Tooltip className="tooltip">Graduated with honors - June 2024</Tooltip>
          </Milestone>
          <Milestone
            className="milestone"
            style={{ left: '40%', top: '60%' }}
            data-tooltip="Completed Internship - Summer 2023"
          >
            💼
            <Tooltip className="tooltip">Completed Internship - Summer 2023</Tooltip>
          </Milestone>
          <Milestone
            className="milestone"
            style={{ left: '70%', top: '40%' }}
            data-tooltip="Published Research Paper - Spring 2022"
          >
            📄
            <Tooltip className="tooltip">Published Research Paper - Spring 2022</Tooltip>
          </Milestone>
          {/* Add more milestones here */}
        </Milestones>
        <FutureGoals>
          <FutureGoalsTitle>Future Aspirations</FutureGoalsTitle>
          <FutureGoalsContent>
            <GoalIcon>🚀</GoalIcon>
            <GoalDescription>Become a Software Engineer at a leading tech company</GoalDescription>
          </FutureGoalsContent>
        </FutureGoals>
      </Timeline>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #f0f0f0;
  color: #333;
  padding: 20px;
  overflow-x: auto;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #fff, #f0f0f0);
  z-index: -1;
`;

const Timeline = styled.div`
  position: relative;
  width: 2000px; /* Large width to accommodate the winding path */
  height: 400px;
  margin: 0 auto;
`;

const Path = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transform: translateY(-50%);
`;

const Milestones = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Milestone = styled.div`
  position: absolute;
  font-size: 24px;
  cursor: pointer;
  display: inline-block;
  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 14px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s;
`;

const FutureGoals = styled.div`
  position: absolute;
  bottom: 20px;
  left: 10%;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const FutureGoalsTitle = styled.h2`
  margin-top: 0;
  color: #4caf50;
`;

const FutureGoalsContent = styled.div`
  display: flex;
  align-items: center;
`;

const GoalIcon = styled.span`
  font-size: 36px;
  margin-right: 10px;
`;

const GoalDescription = styled.p`
  margin: 0;
`;

export default TimelinePage;
