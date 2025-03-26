import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';
  const role = localStorage.getItem('role') || 'User';

  // Dummy data (replace with real data from API/backend in a real app)
  const userData = {
    academic: { gpa: '7.8', courses: 'Data Structures, Algorithms, Machine Learning' },
    social: { events: 5, friends: 200 },
    career: { internships: 2, applications: 10 },
    research: { projects: 3, publications: 1 },
    achievements: ['Dean\'s List', 'Best Research Paper'],
    notifications: [
      'New message from Jane Doe',
      'Meeting scheduled with Professor Smith',
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <PageContainer>
      <Header>
        <ProfilePicture src="/images/profile-placeholder.jpg" alt="Profile" />
        <UserInfo>
          <UserName>{username}</UserName>
          <UserRole>{role}</UserRole>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfo>
      </Header>
      <Content>
        <Section>
          <SectionTitle>Academic</SectionTitle>
          <Details>
            <DetailItem>GPA: {userData.academic.gpa}</DetailItem>
            <DetailItem>Courses: {userData.academic.courses}</DetailItem>
          </Details>
        </Section>
        <Section>
          <SectionTitle>Social</SectionTitle>
          <Details>
            <DetailItem>Events Attended: {userData.social.events}</DetailItem>
            <DetailItem>Friends: {userData.social.friends}</DetailItem>
          </Details>
        </Section>
        <Section>
          <SectionTitle>Career</SectionTitle>
          <Details>
            <DetailItem>Internships: {userData.career.internships}</DetailItem>
            <DetailItem>Job Applications: {userData.career.applications}</DetailItem>
          </Details>
        </Section>
        <Section>
          <SectionTitle>Research</SectionTitle>
          <Details>
            <DetailItem>Projects: {userData.research.projects}</DetailItem>
            <DetailItem>Publications: {userData.research.publications}</DetailItem>
          </Details>
        </Section>
        <Achievements>
          <AchievementsTitle>Achievements</AchievementsTitle>
          <AchievementsList>
            {userData.achievements.map((achievement, index) => (
              <AchievementItem key={index}>{achievement}</AchievementItem>
            ))}
          </AchievementsList>
        </Achievements>
        <Notifications>
          <NotificationTitle>Notifications</NotificationTitle>
          {userData.notifications.map((notification, index) => (
            <NotificationItem key={index}>{notification}</NotificationItem>
          ))}
        </Notifications>
      </Content>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
  color: #f0f0f0;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-right: 20px;
  border: 2px solid #a78bfa;
  object-fit: cover;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserName = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  background: linear-gradient(90deg, #fff, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const UserRole = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ef4444, #f87171);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(239, 68, 68, 0.3);
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  margin: 0 0 15px;
  font-size: 1.5rem;
  color: #a5b4fc;
  font-weight: 600;
`;

const Details = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DetailItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Achievements = styled(Section)`
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const AchievementsTitle = styled(SectionTitle)``;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AchievementItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Notifications = styled(Section)`
  grid-column: span 2;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const NotificationTitle = styled(SectionTitle)``;

const NotificationItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;

  &:last-of-type {
    border-bottom: none;
  }
`;

export default UserProfilePage;