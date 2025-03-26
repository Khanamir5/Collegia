import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

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
  0% { box-shadow: 0 0 0 0 rgba(100, 108, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(100, 108, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(100, 108, 255, 0); }
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

const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #fff, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
  @media (max-width: 768px) { font-size: 2.5rem; }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  max-width: 600px;
`;

const SearchFilterWrapper = styled(GlassContainer)`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;
  justify-content: center;
`;

const FilterButton = styled.button`
  background: ${({ active }) => (active ? 'rgba(165, 180, 252, 0.2)' : 'rgba(255, 255, 255, 0.1)')};
  color: ${({ active }) => (active ? '#a5b4fc' : 'rgba(255, 255, 255, 0.8)')};
  border: ${({ active }) => (active ? '1px solid rgba(165, 180, 252, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)')};
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(165, 180, 252, 0.2);
    color: #a5b4fc;
    border-color: rgba(165, 180, 252, 0.5);
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
  }
  &:active { transform: translateY(0); }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const Card = styled(GlassContainer)`
  padding: 1.5rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: white;
  flex: 1;
`;

const CardCategory = styled.span`
  background: rgba(165, 180, 252, 0.2);
  color: #a5b4fc;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0.5rem 0 1.5rem;
  flex: 1;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: auto;
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
  aspect-ratio: 16/9;
  object-fit: cover;
`;

const CountdownTimer = styled(GlassContainer)`
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const TimerText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const TimerNumbers = styled.div`
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #a5b4fc, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  grid-column: 1 / -1;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
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
    <Container>
      <Header>
        <Title>College Events</Title>
        <Subtitle>Discover and register for exciting college events</Subtitle>
        
        <CountdownTimer>
          <TimerText>Time until the next event:</TimerText>
          <TimerNumbers>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </TimerNumbers>
        </CountdownTimer>

        <SearchFilterWrapper>
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </SearchFilterWrapper>
      </Header>

      {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}

      {loading ? (
        <EmptyState>
          <EmptyIcon>⏳</EmptyIcon>
          <h3>Loading events...</h3>
        </EmptyState>
      ) : (
        <Grid>
          {events.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📅</EmptyIcon>
              <h3>No events found</h3>
              <p>Try adjusting your filters</p>
            </EmptyState>
          ) : (
            events.map((event) => (
              <Card key={event.id}>
                <CardImage src={event.image} alt={event.title} />
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardCategory>{event.category}</CardCategory>
                </CardHeader>
                <CardDescription>{event.description}</CardDescription>
                <CardMeta>
                  <span>{event.date}</span>
                </CardMeta>
                <PrimaryButton 
                  onClick={() => window.open(event.formLink, '_blank')}
                  style={{ marginTop: '1rem' }}
                >
                  Register Now
                </PrimaryButton>
              </Card>
            ))
          )}
        </Grid>
      )}

      <SecondaryButton 
        onClick={() => navigate('/home')}
        style={{ margin: '2rem auto', display: 'block' }}
      >
        Back to Home
      </SecondaryButton>
    </Container>
  );
};

export default EventManagementPage;