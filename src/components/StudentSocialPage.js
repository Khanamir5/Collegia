import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaUserGraduate, FaProjectDiagram, FaBook, FaUsers, FaCalendarAlt } from "react-icons/fa";

const backgroundStyle = {
  background: "url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center fixed",
  backgroundSize: "cover",
  width: "100vw",
  minHeight: "100vh",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #000;

  @media (max-width: 768px) {
    padding: 2rem 1.6rem;
  }
`;

const Section = styled(motion.div)`
  background: #DFD3C3;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-right: 0;
  }
`;

const ProfileDetails = styled.div`
  h2 {
    margin: 0;
    font-size: 2.2rem;
    color: #000;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #000;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.8rem;

    span {
      background: #2575fc;
      padding: 0.4rem 1rem;
      border-radius: 50px;
      font-size: 1rem;
      color: #000;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background: #6a11cb;
      }

      @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 0.3rem 0.8rem;
      }
    }
  }
`;

const PortfolioItems = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1.5rem;

  .item {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    flex: 1 1 calc(50% - 0.75rem);

    &:hover {
      transform: translateY(-7px);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
    }

    h4 {
      margin: 0.5rem 0;
      font-size: 1.5rem;
      color: #000;
    }

    @media (max-width: 768px) {
      flex: 1 1 100%;
      padding: 1.5rem;

      h4 {
        font-size: 1.2rem;
      }
    }
  }
`;

const GroupSection = styled(motion.div)`
  h3 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    color: #000;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  .groups {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .group {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    padding: 1.2rem;
    border-radius: 12px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1.2rem;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    p {
      margin: 0;
      font-size: 1.2rem;
      color: #000;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  padding: 1.2rem;
  border-radius: 12px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.2rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  h4 {
    margin: 0;
    color: #000;
  }

  p {
    margin: 0;
    color: #000;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;

    h4 {
      font-size: 1.2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const ResourceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  padding: 1.2rem;
  border-radius: 12px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.2rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  p {
    margin: 0;
    color: #000;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #295F98, #16325B);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 1.5rem;

  &:hover {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const StudentSocialPage = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showResources, setShowResources] = useState(false);

  return (
    <div style={backgroundStyle}>
      <Container>
        {/* Profile Section */}
        <Section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Header>
            <ProfilePicture src="/images/profile.jpeg" alt="Profile" />
            <ProfileDetails>
              <h2>Kumar Nishant</h2>
              <p>Full-Stack Developer | Computer Science</p>
              <div className="tags">
                <span>Java</span> <span>React.js</span> <span>Web Development</span>
              </div>
            </ProfileDetails>
          </Header>
          <Button onClick={() => setShowPortfolio(!showPortfolio)}>View Portfolio</Button>
          {showPortfolio && (
            <PortfolioItems initial={{ x: "-100vw" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120 }}>
              <div className="item">
                <FaProjectDiagram size={40} color="#ffffff" />
                <h4>Alumni Interaction Platform</h4>
              </div>
              <div className="item">
                <FaProjectDiagram size={40} color="#ffffff" />
                <h4>Cultural Circuit</h4>
              </div>
            </PortfolioItems>
          )}
        </Section>

        {/* Group Chats and Communities */}
        <GroupSection whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <h3>Communities</h3>
          <Button onClick={() => setShowGroups(!showGroups)}>View Groups</Button>
          {showGroups && (
            <div className="groups">
              <div className="group">
                <FaUsers size={30} color="#2575fc" />
                <p>Tech Enthusiasts</p>
              </div>
              <div className="group">
                <FaUsers size={30} color="#2575fc" />
                <p>Web Developers</p>
              </div>
            </div>
          )}
        </GroupSection>

        {/* Events */}
        <Section>
          <h3>Upcoming Events</h3>
          <Button onClick={() => setShowEvents(!showEvents)}>View Events</Button>
          {showEvents && (
            <EventCard>
              <FaCalendarAlt size={30} color="#2575fc" />
              <div>
                <h4>Tech Talk on AI</h4>
                <p>September 20, 2024</p>
              </div>
            </EventCard>
          )}
        </Section>

        {/* Resources */}
        <Section>
          <h3>Resources</h3>
          <Button onClick={() => setShowResources(!showResources)}>View Resources</Button>
          {showResources && (
            <ResourceCard>
              <FaBook size={30} color="#2575fc" />
              <div>
                <p>Learning Java Programming</p>
              </div>
            </ResourceCard>
          )}
        </Section>
      </Container>
    </div>
  );
};

export default StudentSocialPage;