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
  { month: 'Jan', users: 200, projects: 10, events: 5 },
  { month: 'Feb', users: 400, projects: 15, events: 8 },
  { month: 'Mar', users: 600, projects: 20, events: 12 },
  { month: 'Apr', users: 800, projects: 25, events: 15 },
  { month: 'May', users: 1000, projects: 30, events: 20 },
  { month: 'Jun', users: 1200, projects: 35, events: 22 },
  { month: 'Jul', users: 1400, projects: 40, events: 25 },
  { month: 'Aug', users: 1600, projects: 45, events: 28 },
  { month: 'Sep', users: 2000, projects: 50, events: 30 },
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
              <XAxis dataKey="month" stroke="#bfbfbf" />
              <YAxis stroke="#bfbfbf" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="projects"
                stroke="#82ca9d"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#ffc658"
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
  background: radial-gradient(circle, rgba(20, 20, 20, 1) 0%, rgba(0, 0, 0, 1) 100%);
  color: #fff;
  text-align: center;
  
`;

const StatsHeading = styled.h2`
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  margin-bottom: 40px;
  color: #f1f1f1;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
   background: rgba(106, 105, 105, 0.595);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  

  &:hover {
    transform: translateY(-10px);
  }
`;

const StatCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px;
`;

const StatIcon = styled.span`
  font-size: 2rem;
  color: #fff;
`;

const StatValue = styled.h3`
  font-size: 1.8rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #f1f1f1;
`;

const StatLabel = styled.p`
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
  color: #b3b3b3;
`;

const GraphSection = styled.div`
  margin-top: 50px;
`;

const GraphContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

