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
  transition: all 0.3s ease;
`;

const MainHeader = styled(GlassContainer)`
  text-align: center;
  width: 100%;
  jistify-content: center;
  align-items: center;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(15, 12, 41, 0.8), rgba(36, 34, 62, 0.9));
    z-index: -1;
  }
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
  animation: ${fadeIn} 0.8s ease;
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
  letter-spacing: -0.05em;
  @media (max-width: 768px) { 
    font-size: 2.5rem; 
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 70px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  line-height: 1.6;
`;

const SearchFilterWrapper = styled(GlassContainer)`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.25rem;
  justify-content: center;
  margin-top: 0rem;
  width: fit-content;
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FilterButton = styled.button`
  background: ${({ active }) => (active ? 'rgba(165, 180, 252, 0.2)' : 'rgba(255, 255, 255, 0.1)')};
  color: ${({ active }) => (active ? '#a5b4fc' : 'rgba(255, 255, 255, 0.8)')};
  border: ${({ active }) => (active ? '1px solid rgba(165, 180, 252, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)')};
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(165, 180, 252, 0.2);
    color: #a5b4fc;
    border-color: rgba(165, 180, 252, 0.5);
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 0.85rem 1.75rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(99, 102, 241, 0.3);
  }
  &:active { 
    transform: translateY(0); 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem 0;
`;

const Card = styled(GlassContainer)`
  padding: 1.75rem;
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  cursor: pointer;
  animation: ${fadeIn} 0.6s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
`;

const CardTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
  color: white;
  flex: 1;
  line-height: 1.4;
`;

const CardCategory = styled.span`
  background: rgba(165, 180, 252, 0.2);
  color: #a5b4fc;
  padding: 0.35rem 0.9rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0.75rem 0 1.75rem;
  flex: 1;
  line-height: 1.6;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: transform 0.3s ease;
  ${Card}:hover & {
    transform: scale(1.02);
  }
`;

const CountdownTimer = styled(GlassContainer)`
  padding: 1.75rem;
  text-align: center;
  margin-bottom: 0rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  animation: ${pulse} 2s infinite;
`;

const TimerText = styled.p`
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

const TimerNumbers = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #a5b4fc, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.05em;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  grid-column: 1 / -1;
  animation: ${fadeIn} 0.6s ease;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.7;
  animation: ${float} 3s ease-in-out infinite;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  margin: 1.5rem auto;
  padding: 1rem;
  max-width: 600px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  animation: ${fadeIn} 0.5s ease;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #a5b4fc;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const categories = ['All', 'Tech', 'Cultural', 'Sports'];

// Dummy data for when backend fails
const dummyEvents = [
  {
    id: 1,
    title: "Tech Symposium 2025",
    category: "Tech",
    description: "Annual technology symposium featuring workshops, keynote speakers, and hands-on tech demonstrations with industry leaders.",
    date: "2025-04-15",
    image: "https://source.unsplash.com/random/600x400/?tech,conference",
    formLink: "https://example.com/register/tech-symposium"
  },
  {
    id: 2,
    title: "Cultural Fest",
    category: "Cultural",
    description: "Celebrate our diverse community with performances, food, and cultural exhibits from around the world.",
    date: "2025-04-20",
    image: "https://source.unsplash.com/random/600x400/?festival,culture",
    formLink: "https://example.com/register/cultural-fest"
  },
  {
    id: 3,
    title: "Inter-College Sports Tournament",
    category: "Sports",
    description: "Annual sports competition featuring basketball, soccer, volleyball and more. Show your school spirit!",
    date: "2025-04-25",
    image: "https://source.unsplash.com/random/600x400/?sports,basketball",
    formLink: "https://example.com/register/sports-day"
  },
  {
    id: 4,
    title: "Hackathon 2025",
    category: "Tech",
    description: "48-hour coding marathon where students collaborate to build innovative projects. Prizes for top teams!",
    date: "2025-04-30",
    image: "https://source.unsplash.com/random/600x400/?hackathon,programming",
    formLink: "https://example.com/register/hackathon"
  },
  {
    id: 5,
    title: "Art Exhibition",
    category: "Cultural",
    description: "Showcase of student artwork including paintings, sculptures, and digital media creations.",
    date: "2025-05-05",
    image: "https://source.unsplash.com/random/600x400/?art,exhibition",
    formLink: "https://example.com/register/art-exhibition"
  },
  {
    id: 6,
    title: "Startup Pitch Competition",
    category: "Tech",
    description: "Entrepreneurial students present their business ideas to a panel of investors for funding opportunities.",
    date: "2025-05-10",
    image: "https://source.unsplash.com/random/600x400/?startup,meeting",
    formLink: "https://example.com/register/pitch-competition"
  }
];

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
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Showing sample data instead.');
        // Filter dummy events based on selected category
        const filteredDummy = selectedCategory === 'All' 
          ? dummyEvents 
          : dummyEvents.filter(event => event.category === selectedCategory);
        setEvents(filteredDummy);
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
      <MainHeader>
        <Title>College Events</Title>
        <Subtitle>
          Discover, register, and participate in exciting events across campus. 
          Find something that matches your interests!
        </Subtitle>
        
        <CountdownTimer>
          <TimerText>Time until the next event:</TimerText>
          <TimerNumbers>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </TimerNumbers>
        </CountdownTimer>
        </MainHeader>

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

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <EmptyState>
          <LoadingSpinner />
          <h3 style={{ marginTop: '1.5rem' }}>Loading Events...</h3>
          <p style={{ opacity: 0.7 }}>Please wait while we fetch the latest events</p>
        </EmptyState>
      ) : (
        <Grid>
          {events.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📅</EmptyIcon>
              <h3>No events found in this category</h3>
              <p>Try selecting a different filter or check back later</p>
              <SecondaryButton 
                onClick={() => setSelectedCategory('All')}
                style={{ marginTop: '1.5rem' }}
              >
                Show All Events
              </SecondaryButton>
            </EmptyState>
          ) : (
            events.map((event) => (
              <Card key={event.id} onClick={() => window.open(event.formLink, '_blank')}>
                <CardImage src={event.image} alt={event.title} />
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardCategory>{event.category}</CardCategory>
                </CardHeader>
                <CardDescription>{event.description}</CardDescription>
                <CardMeta>
                  <span>📅 {new Date(event.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </CardMeta>
                <PrimaryButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(event.formLink, '_blank');
                  }}
                  style={{ marginTop: '1.5rem' }}
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
        style={{ margin: '3rem auto', display: 'block' }}
      >
        ← Back to Home
      </SecondaryButton>
    </Container>
  );
};

export default EventManagementPage;