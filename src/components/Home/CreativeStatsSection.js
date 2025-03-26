import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const statsData = [
  { label: 'Active Users', value: '2K+', icon: '👥' },
  { label: 'Projects Completed', value: '50+', icon: '🔧' },
  { label: 'Events Hosted', value: '30+', icon: '📅' },
  { label: 'Mentors Available', value: '30+', icon: '🎓' },
];

const platformData = [
  { month: 'Dec', users: 0, projects: 0, events: 0 },
  { month: 'Jan', users: 3, projects: 1, events: 1 },
  { month: 'Feb', users: 12, projects: 4, events: 2 },
  { month: 'Mar', users: 32, projects: 9, events: 4 },
];

const CreativeStatsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <StatsContainer id="creative-stats">
      <StatsHeading data-aos="zoom-in">Our Platform Stats</StatsHeading>
      <StatsGrid>
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <StatCircle>
              <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
                <StatIcon>{stat.icon}</StatIcon>
              </motion.div>
            </StatCircle>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>
      <GraphSection>
        <GraphContainer>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
              <XAxis dataKey="month" stroke="#a5b4fc" />
              <YAxis stroke="#a5b4fc" />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(30, 30, 30, 0.9)',
                  border: '1px solid rgba(165, 180, 252, 0.3)',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="projects"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#a5b4fc"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphContainer>
      </GraphSection>
    </StatsContainer>
  );
};

export default CreativeStatsSection;

// Styled components
const StatsContainer = styled.section`
  padding: 80px 20px;
  background: black;
  background-size: 400% 400%;
  animation: gradientFlow 15s ease infinite;
  color: #fff;
  text-align: center;
  
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const StatsHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  background: linear-gradient(90deg, #a5b4fc, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #a5b4fc);
    border-radius: 2px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  max-width: 900px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 30px 20px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
    background: rgba(99, 102, 241, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(165, 180, 252, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const StatCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(165, 180, 252, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px;
  border: 1px solid rgba(165, 180, 252, 0.2);
`;

const StatIcon = styled.span`
  font-size: 2rem;
  color: #a5b4fc;
`;

const StatValue = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 5px;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const GraphSection = styled.div`
  margin-top: 60px;
`;

const GraphContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;