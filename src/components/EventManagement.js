import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaTicketAlt, FaTools, FaBell } from 'react-icons/fa';

// Theme and Color Definitions
const theme = {
  background: '#f0f4f8',
  sectionBackground: '#ffffff',
  cardBackground: '#ffffff',
  primaryColor: '#3498db',
  secondaryColor: '#2ecc71',
  textColor: '#333333',
  borderColor: '#e0e0e0',
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: ${theme.background};
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const Banner = styled.div`
  width: 100%;
  height: 300px;
  background-image: url('https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=2701&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  border-radius: 0 0 15px 15px;
  margin-bottom: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0 0 15px 15px;
  }

  h1 {
    position: relative;
    z-index: 1;
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    height: 200px;
    font-size: 1.8rem;
    h1 {
      font-size: 1.6rem;
    }
  }
`;

const Section = styled.section`
  width: 90%;
  max-width: 900px;
  margin: 1rem 0;
  background-color: ${theme.sectionBackground};
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  background-color: ${theme.primaryColor};
  border-radius: 50%;
  padding: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const Info = styled.div`
  h2 {
    margin: 0;
    font-size: 1.6rem;
    color: ${theme.primaryColor};
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: ${theme.textColor};
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.4rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const Button = styled.button`
  background-color: ${theme.primaryColor};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 1rem 0;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${theme.secondaryColor};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
`;

const Card = styled.div`
  background-color: ${theme.cardBackground};
  border: 1px solid ${theme.borderColor};
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${theme.borderColor};
    transform: scale(1.02);
  }

  h4 {
    margin: 0;
    font-size: 1.2rem;
    color: ${theme.primaryColor};
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: ${theme.textColor};
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    h4 {
      font-size: 1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

const Calendar = styled.div`
  background-color: ${theme.sectionBackground};
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid ${theme.borderColor};
  color: ${theme.textColor};

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

// EventManagement Component
const EventManagement = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const [showToolkit, setShowToolkit] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Container>
      <Banner>
        <h1>Event Management Dashboard</h1>
      </Banner>

      {/* Event Calendar */}
      <Section>
        <Header>
          <IconWrapper>
            <FaCalendarAlt size={28} />
          </IconWrapper>
          <Info>
            <h2>Event Calendar</h2>
            <p>Explore and manage campus events.</p>
          </Info>
        </Header>
        <Button onClick={() => setShowCalendar(!showCalendar)}>
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </Button>
        {showCalendar && (
          <Calendar>
            <p>Event Calendar will be displayed here with weather updates and social media integration.</p>
          </Calendar>
        )}
      </Section>

      {/* Ticketing System */}
      <Section>
        <Header>
          <IconWrapper>
            <FaTicketAlt size={28} />
          </IconWrapper>
          <Info>
            <h2>Ticketing System</h2>
            <p>Manage tickets and registrations for events.</p>
          </Info>
        </Header>
        <Button onClick={() => setShowTickets(!showTickets)}>
          {showTickets ? 'Hide Tickets' : 'Show Tickets'}
        </Button>
        {showTickets && (
          <>
            <Card>
              <h4>Job Fair</h4>
              <p>Early Bird Ticket - $20</p>
            </Card>
            <Card>
              <h4>Tech Symposium</h4>
              <p>VIP Ticket - $50</p>
            </Card>
          </>
        )}
      </Section>

      {/* Event Organizer Toolkit */}
      <Section>
        <Header>
          <IconWrapper>
            <FaTools size={28} />
          </IconWrapper>
          <Info>
            <h2>Organizer Toolkit</h2>
            <p>Tools for creating and managing events.</p>
          </Info>
        </Header>
        <Button onClick={() => setShowToolkit(!showToolkit)}>
          {showToolkit ? 'Hide Toolkit' : 'Show Toolkit'}
        </Button>
        {showToolkit && (
          <>
            <Card>
              <h4>Event Wizard</h4>
              <p>Templates for creating events.</p>
            </Card>
            <Card>
              <h4>Budget Tools</h4>
              <p>Track event budgets and expenses.</p>
            </Card>
          </>
        )}
      </Section>

      {/* Notifications */}
      <Section>
        <Header>
          <IconWrapper>
            <FaBell size={28} />
          </IconWrapper>
          <Info>
            <h2>Notifications</h2>
            <p>Keep track of important alerts and updates.</p>
          </Info>
        </Header>
        <Button onClick={() => setShowNotifications(!showNotifications)}>
          {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
        </Button>
        {showNotifications && (
          <Card>
            <h4>Upcoming Event</h4>
            <p>Don't forget about the upcoming tech symposium!</p>
          </Card>
        )}
      </Section>
    </Container>
  );
};

export default EventManagement;
