// src/components/UserProfilePage.js

import React from 'react';
import styled from 'styled-components';

const UserProfilePage = () => {
  return (
    <PageContainer>
      <Header>
        <ProfilePicture src="/images/profile.jpeg" alt="Profile" />
        <UserName>Kumar Nishant</UserName>
      </Header>
      <Content>
        <Section>
          <SectionTitle>Academic</SectionTitle>
          <Details>
            <DetailItem>GPA: 7.8</DetailItem>
            <DetailItem>Courses: Data Structures, Algorithms, Machine Learning</DetailItem>
          </Details>
        </Section>
        <Section>
          <SectionTitle>Social</SectionTitle>
          <Details>
            <DetailItem>Events Attended: 5</DetailItem>
            <DetailItem>Friends: 200</DetailItem>
          </Details>
        </Section>
        <Section>
          <SectionTitle>Career</SectionTitle>
          <Details>
            <DetailItem>Internships: 2</DetailItem>
            <DetailItem>Job Applications: 10</DetailItem>
          </Details>
        </Section>
        <Section>
          <SectionTitle>Research</SectionTitle>
          <Details>
            <DetailItem>Projects: 3</DetailItem>
            <DetailItem>Publications: 1</DetailItem>
          </Details>
        </Section>
        <Achievements>
          <AchievementsTitle>Achievements</AchievementsTitle>
          <AchievementsList>
            <AchievementItem>Dean's List</AchievementItem>
            <AchievementItem>Best Research Paper</AchievementItem>
          </AchievementsList>
        </Achievements>
      </Content>
      <Notifications>
        <NotificationTitle>Notifications</NotificationTitle>
        <NotificationItem>New message from Jane Doe</NotificationItem>
        <NotificationItem>Meeting scheduled with Professor Smith</NotificationItem>
      </Notifications>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: #3f51b5;
  color: #fff;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
  }
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const UserName = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  color: #3f51b5;
  font-size: 1.5rem;
`;

const Details = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DetailItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Achievements = styled.div`
  grid-column: span 2;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AchievementsTitle = styled.h2`
  margin-top: 0;
  color: #3f51b5;
  font-size: 1.5rem;
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AchievementItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Notifications = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const NotificationTitle = styled.h2`
  margin-top: 0;
  color: #3f51b5;
  font-size: 1.5rem;
`;

const NotificationItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-of-type {
    border-bottom: none;
  }
`;

export default UserProfilePage;
