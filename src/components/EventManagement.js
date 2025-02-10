import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
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

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1.5s ease-out;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
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
  color:rgb(255, 255, 255);
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

  &:hover {
    background: #2980b9;
  }
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

const CreateEventButton = styled.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
  margin-bottom: 20px;
  display: block; /* Make it a block-level element */
  margin-left: auto;
  margin-right: auto; /* Center horizontally */

  &:hover {
    background: #219653;
  }
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
`;

const ModalButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
  }
`;

// Mock Data
const initialEvents = [
  {
    id: 1,
    title: 'Tech Fest 2023',
    date: '2023-12-15',
    description: 'Join us for the biggest tech event of the year!',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Tech',
    formLink: 'https://forms.gle/example1',
  },
  {
    id: 2,
    title: 'Cultural Fest',
    date: '2023-11-20',
    description: 'Experience the diversity of cultures at our annual fest.',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Cultural',
    formLink: 'https://forms.gle/example2',
  },
  {
    id: 3,
    title: 'Sports Day',
    date: '2023-10-25',
    description: 'Get ready for an exciting day of sports and competitions.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Sports',
    formLink: 'https://forms.gle/example3',
  },
];

const categories = ['All', 'Tech', 'Cultural', 'Sports'];

// Main Component
const EventManagementPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    image: '',
    category: 'Tech',
    formLink: '',
  });

  // Countdown timer logic
  const calculateTimeLeft = () => {
    const targetDate = new Date('2023-12-15');
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter events by category
  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const event = { ...newEvent, id: events.length + 1 };
    setEvents([...events, event]);
    setIsModalOpen(false);
    setNewEvent({
      title: '',
      date: '',
      description: '',
      image: '',
      category: 'Tech',
      formLink: '',
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>Event Management</HeroTitle>
        <HeroSubtitle>Discover and register for exciting college events.</HeroSubtitle>
      </HeroSection>

      {/* Main Content */}
      <EventContainer>
        {/* Countdown Timer */}
        <CountdownTimer>
          <TimerText>Time until the next big event:</TimerText>
          <TimerNumbers>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </TimerNumbers>
        </CountdownTimer>

        {/* Create Event Button */}
        
        <CreateEventButton onClick={() => setIsModalOpen(true)}>
          Create Event
        </CreateEventButton>

        {/* Filter Section */}
        <FilterSection>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterSection>

        {/* Event Grid */}
        <EventGrid>
          {filteredEvents.map(event => (
            <EventCard key={event.id}>
              <EventImage src={event.image} alt={event.title} />
              <EventTitle>{event.title}</EventTitle>
              <EventDate>{event.date}</EventDate>
              <EventDescription>{event.description}</EventDescription>
              <RegisterButton onClick={() => window.open(event.formLink, '_blank')}>
                Register Now
              </RegisterButton>
            </EventCard>
          ))}
        </EventGrid>
      </EventContainer>

      {/* Create Event Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Create New Event</ModalTitle>
            <form onSubmit={handleSubmit}>
              <ModalInput
                type="text"
                name="title"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={handleInputChange}
                required
              />
              <ModalInput
                type="date"
                name="date"
                placeholder="Event Date"
                value={newEvent.date}
                onChange={handleInputChange}
                required
              />
              <ModalTextarea
                name="description"
                placeholder="Event Description"
                value={newEvent.description}
                onChange={handleInputChange}
                required
              />
              <ModalInput
                type="text"
                name="image"
                placeholder="Event Image URL"
                value={newEvent.image}
                onChange={handleInputChange}
                required
              />
              <ModalInput
                type="text"
                name="formLink"
                placeholder="Google Form Link"
                value={newEvent.formLink}
                onChange={handleInputChange}
                required
              />
              <ModalButton type="submit">Create Event</ModalButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default EventManagementPage;