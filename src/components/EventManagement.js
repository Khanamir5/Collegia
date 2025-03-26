import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const HeroSection = styled.section`
  background-image: url('https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?q=80&w=2533&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: bottom;
  padding: 120px 20px;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) { font-size: 3rem; }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1.5s ease-out;

  @media (max-width: 768px) { font-size: 1.2rem; }
`;

const EventContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const EventCard = styled.div`
  background: #2c3e50;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const EventImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: rgb(255, 255, 255);
`;

const EventDate = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 10px;
`;

const EventDescription = styled.p`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 15px;
`;

const RegisterButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover { background: #2980b9; }
`;

const FilterSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${({ active }) => (active ? '#3498db' : '#ecf0f1')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #3498db;
    color: white;
  }
`;

const CountdownTimer = styled.div`
  background: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 40px;
`;

const TimerText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const TimerNumbers = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const BackButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover { background: #2980b9; }
`;

const categories = ['All', 'Tech', 'Cultural', 'Sports'];

const EventManagementPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:8080/api/events/filter', {
          params: { category: selectedCategory === 'All' ? null : selectedCategory },
        });
        setEvents(response.data);
        console.log('Fetched events:', response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedCategory]);

  // Countdown timer logic (uses earliest event date)
  useEffect(() => {
    const calculateTimeLeft = () => {
      if (events.length === 0) return;
      const earliestEvent = events.reduce((earliest, current) =>
        new Date(current.date) < new Date(earliest.date) ? current : earliest
      );
      const targetDate = new Date(earliestEvent.date);
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call
    return () => clearInterval(timer);
  }, [events]);

  return (
    <div>
      <HeroSection>
        <HeroTitle>Event Management</HeroTitle>
        <HeroSubtitle>Discover and register for exciting college events.</HeroSubtitle>
      </HeroSection>

      <EventContainer>
        <CountdownTimer>
          <TimerText>Time until the next event:</TimerText>
          <TimerNumbers>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </TimerNumbers>
        </CountdownTimer>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}

        <FilterSection>
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterSection>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#333' }}>Loading events...</p>
        ) : (
          <EventGrid>
            {events.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#333' }}>No events found.</p>
            ) : (
              events.map((event) => (
                <EventCard key={event.id}>
                  <EventImage src={event.image} alt={event.title} />
                  <EventTitle>{event.title}</EventTitle>
                  <EventDate>{event.date}</EventDate>
                  <EventDescription>{event.description}</EventDescription>
                  <RegisterButton onClick={() => window.open(event.formLink, '_blank')}>
                    Register Now
                  </RegisterButton>
                </EventCard>
              ))
            )}
          </EventGrid>
        )}

        <BackButton onClick={() => navigate('/home')}>Back to Home</BackButton>
      </EventContainer>
    </div>
  );
};

export default EventManagementPage;