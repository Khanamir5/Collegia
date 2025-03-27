import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const pinDrop = keyframes`
  0% { transform: translateY(-50px) rotate(-10deg); opacity: 0; }
  70% { transform: translateY(5px) rotate(5deg); opacity: 1; }
  100% { transform: translateY(0) rotate(0); opacity: 1; }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(-45deg, #1e1e2f, #3b3b6b, #2a2a4e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
  position: relative;
  overflow: hidden;
`;

const CorkBoard = styled.div`
  background: url('https://www.transparenttextures.com/patterns/cork-wallet.png');
  border: 10px solid #8b4513;
  border-radius: 8px;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 80vh;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(90deg, #fff, #f4d03f);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const NoticePin = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #ef4444;
  border-radius: 50%;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover { transform: translateX(-50%) scale(1.2); }
`;

const NoticeCard = styled.div`
  background: rgba(255, 245, 200, 0.9);
  border-radius: 8px;
  padding: 1.5rem;
  width: 280px;
  position: absolute;
  transform: ${({ x, y }) => `translate(${x}px, ${y}px) rotate(${Math.random() * 10 - 5}deg)`};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: ${pinDrop} 0.5s ease forwards;
  animation-delay: ${({ delay }) => delay}s;
  cursor: pointer;
  transition: transform 0.3s ease, z-index 0s;
  z-index: 1;
  &:hover {
    transform: ${({ x, y }) => `translate(${x}px, ${y}px) rotate(0deg) scale(1.05)`};
    z-index: 10;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const NoticeTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e1e2f;
  margin: 0 0 0.5rem;
`;

const NoticeDescription = styled.p`
  font-size: 0.9rem;
  color: #3b3b6b;
  margin: 0.5rem 0;
`;

const NoticeMeta = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 0.25rem 0;
`;

const PriorityBadge = styled.span`
  background: ${({ priority }) =>
    priority === 'High' ? '#ef4444' : '#10b981'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.7rem;
  display: inline-block;
  margin-top: 0.5rem;
`;

const Timeline = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 1rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TimelineSlider = styled.input`
  width: 300px;
  -webkit-appearance: none;
  height: 8px;
  background: #a5b4fc;
  border-radius: 4px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #6366f1;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const SpotlightCarousel = styled.div`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  max-width: 90%;
  overflow: hidden;
`;

const CarouselItem = styled.div`
  background: rgba(255, 200, 200, 0.9);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  animation: ${spin} 10s linear infinite;
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

const ToggleButton = styled.button`
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  position: fixed;
  top: 1rem;
  right: 1rem;
`;

// Dummy notice data (8 entries)
const dummyNotices = [
  { id: 1, title: "Tech Fest 2025", category: "Event", description: "Hackathons and workshops!", date: "2025-04-10", postedBy: "Tech Club", priority: "High" },
  { id: 2, title: "Exam Schedule", category: "Academic", description: "Finals start April 15.", date: "2025-03-28", postedBy: "Registrar", priority: "High" },
  { id: 3, title: "Book Return Deadline", category: "Announcement", description: "Due by April 4.", date: "2025-04-04", postedBy: "Library", priority: "Medium" },
  { id: 4, title: "Sports Day", category: "Event", description: "Register now!", date: "2025-04-15", postedBy: "Sports Committee", priority: "Medium" },
  { id: 5, title: "AI Guest Lecture", category: "Academic", description: "Industry expert talk.", date: "2025-03-30", postedBy: "CSE Dept", priority: "High" },
  { id: 6, title: "Clean-Up Drive", category: "Event", description: "Join us this weekend.", date: "2025-04-05", postedBy: "Eco Club", priority: "Medium" },
  { id: 7, title: "Hostel Fee Reminder", category: "Announcement", description: "Due April 10.", date: "2025-04-01", postedBy: "Admin", priority: "High" },
  { id: 8, title: "Cultural Night Auditions", category: "Event", description: "Show your talent!", date: "2025-04-08", postedBy: "Cultural Club", priority: "Medium" },
];

// Main Component
const CampusNoticeBoard = () => {
  const [timelineDate, setTimelineDate] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Random positions for notices
  const positions = dummyNotices.map(() => ({
    x: Math.random() * 1000,
    y: Math.random() * 400,
  }));

  const dates = dummyNotices.map(n => new Date(n.date)).sort((a, b) => a - b);
  const minDate = dates[0];
  const maxDate = dates[dates.length - 1];
  const dateRange = (maxDate - minDate) / (dates.length - 1);

  const filteredNotices = dummyNotices.filter(n => {
    const noticeDate = new Date(n.date);
    const selectedDate = new Date(minDate.getTime() + timelineDate * dateRange);
    return noticeDate <= selectedDate || Math.abs(noticeDate - selectedDate) < 24 * 60 * 60 * 1000;
  });

  // Carousel for high-priority notices
  const highPriorityNotices = dummyNotices.filter(n => n.priority === 'High');
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % highPriorityNotices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [highPriorityNotices.length]);

  // Simulate pin sound
  const playPinSound = () => {
    if (soundEnabled) {
      const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
      audio.play();
    }
  };

  // Confetti effect for new notices (simplified)
  const triggerConfetti = () => {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.top = '0';
    confetti.style.left = '0';
    confetti.style.width = '100%';
    confetti.style.height = '100%';
    confetti.style.pointerEvents = 'none';
    confetti.innerHTML = Array(50).fill().map(() => `
      <div style="
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${['#ef4444', '#10b981', '#a5b4fc'][Math.floor(Math.random() * 3)]};
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: fall 2s linear forwards;
      "></div>
    `).join('');
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  };

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <Container>
      <CorkBoard>
        <Header>
          <Title>Campus Notice Board</Title>
        </Header>

        {filteredNotices.map((notice, index) => (
          <NoticeCard
            key={notice.id}
            x={positions[index].x}
            y={positions[index].y}
            delay={index * 0.1}
            onClick={playPinSound}
          >
            <NoticePin />
            <NoticeTitle>{notice.title}</NoticeTitle>
            <NoticeDescription>{notice.description}</NoticeDescription>
            <NoticeMeta><strong>Date:</strong> {notice.date}</NoticeMeta>
            <NoticeMeta><strong>Posted By:</strong> {notice.postedBy}</NoticeMeta>
            <PriorityBadge priority={notice.priority}>{notice.priority}</PriorityBadge>
          </NoticeCard>
        ))}
      </CorkBoard>

      {/* Spotlight Carousel */}
      <SpotlightCarousel>
        {highPriorityNotices.map((notice, index) => (
          <CarouselItem key={notice.id} active={index === carouselIndex}>
            <NoticeTitle>{notice.title}</NoticeTitle>
            <NoticeDescription>{notice.description}</NoticeDescription>
          </CarouselItem>
        ))}
      </SpotlightCarousel>

      {/* Timeline Slider */}
      <Timeline>
        <span>{new Date(minDate.getTime() + timelineDate * dateRange).toLocaleDateString()}</span>
        <TimelineSlider
          type="range"
          min="0"
          max={dates.length - 1}
          value={timelineDate}
          onChange={e => setTimelineDate(parseInt(e.target.value))}
        />
      </Timeline>

      {/* Sound Toggle */}
      <ToggleButton onClick={() => setSoundEnabled(!soundEnabled)}>
        {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
      </ToggleButton>

      {/* Confetti Animation */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </Container>
  );
};

export default CampusNoticeBoard;