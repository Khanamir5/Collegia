import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Animations
const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

// Styled Components
const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const AdminDashboardContainer = styled.div`
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #fff, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(GlassContainer)`
  padding: 1.5rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const StatTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  font-size: 0.9rem;
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ServiceCard = styled(GlassContainer)`
  padding: 1.5rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
  cursor: pointer;
  text-decoration: none;
  display: block;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: white;
`;

const ServiceDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1.5rem;
`;

const ServiceButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: none; /* Prevent button from interfering with card click */

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem;
  color: white;
`;

const AdminDashboard = () => {
  const [stats] = useState([
    { id: 1, title: 'Total Users', value: '12', change: 12.5, positive: true },
    { id: 2, title: 'Active Services', value: '1', change: 3.2, positive: true },
    // { id: 3, title: 'Pending Requests', value: '3', change: -5.7, positive: false },
    { id: 4, title: 'System Alerts', value: '0', change: 0, positive: true },
  ]);

  const [services] = useState([
    { 
      id: 1, 
      title: 'User Management', 
      description: 'Manage all user accounts, roles and permissions', 
      icon: '👥',
      color: 'rgba(99, 102, 241, 0.2)',
      action: 'Manage Users',
      path: '/UserManagement'
    },
    { 
      id: 2, 
      title: 'Job/Internship', 
      description: 'Create, edit and publish website content', 
      icon: '📝',
      color: 'rgba(16, 185, 129, 0.2)',
      action: 'Manage Content',
      path: '/JobDashboard'
    },
    { 
      id: 3, 
      title: 'Blogs', 
      description: 'View detailed analytics and reports', 
      icon: '📊',
      color: 'rgba(245, 158, 11, 0.2)',
      action: 'Manage Blogs',
      path: '/blogs'
    },
    { 
      id: 4, 
      title: 'Events', 
      description: 'Manage and optimize database operations', 
      icon: '🗃️',
      color: 'rgba(236, 72, 153, 0.2)',
      action: 'Manage Events',
      path: '/EventDashboard'
    },
  ]);

  return (
    <AdminDashboardContainer>
      <Header>
        <DashboardTitle>Admin Dashboard</DashboardTitle>
        <UserProfile>
          <ProfileImage>AD</ProfileImage>
          <span>Admin User</span>
        </UserProfile>
      </Header>

      <DashboardGrid>
        {stats.map(stat => (
          <StatCard key={stat.id}>
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>{stat.value}</StatValue>
            <StatChange positive={stat.positive}>
              {stat.change > 0 ? '↑' : stat.change < 0 ? '↓' : '→'} 
              {stat.change !== 0 ? `${Math.abs(stat.change)}%` : 'No change'}
            </StatChange>
          </StatCard>
        ))}
      </DashboardGrid>

      <SectionTitle>Service Management</SectionTitle>
      <ServicesGrid>
        {services.map(service => (
          <ServiceCard 
            key={service.id} 
            as={Link} 
            to={service.path}
          >
            <ServiceIcon color={service.color}>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceButton>{service.action}</ServiceButton>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;