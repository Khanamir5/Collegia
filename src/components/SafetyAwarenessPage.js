import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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

const CampusSafety = styled.div`
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
  padding: 2rem;
`;

const Header = styled(GlassContainer)`
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 3rem;
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

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(90deg, #fff, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 auto;
  max-width: 700px;
`;

const WeatherAlert = styled.div`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1300px;
  margin: 0 auto;
`;

const Card = styled(GlassContainer)`
  padding: 2rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #a5b4fc;
  margin: 0 0 1.5rem;
  text-align: center;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: #f0f0f0;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SafetyTips = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Tip = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

const ReportForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: #f0f0f0;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const AlertButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  animation: ${pulse} 2s infinite;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: #dc2626;
    transform: scale(1.1);
    animation: none;
  }
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  background: ${props => 
    props.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => 
    props.type === 'success' ? '#10b981' : '#ef4444'};
`;

const CollegeSafety = () => {
  const [report, setReport] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });
  const [weatherAlert, setWeatherAlert] = useState('');

  const contacts = [
    { name: 'Campus Security', number: '555-0123', emoji: '👮‍♂️' },
    { name: 'Emergency Services', number: '911', emoji: '🚨' },
    { name: 'Health Services', number: '555-4567', emoji: '🏥' },
    { name: 'Counseling Center', number: '555-7890', emoji: '🧠' },
  ];

  const safetyTips = [
    { text: 'Share your location with a trusted friend when out late', emoji: '📍' },
    { text: 'Keep your phone charged and carry a portable charger', emoji: '🔋' },
    { text: 'Memorize key campus emergency numbers, not just 911', emoji: '☎️' },
    { text: 'Avoid shortcuts through isolated areas, stick to main paths', emoji: '🛤️' },
    { text: 'Sign up for campus safety alerts and check them daily', emoji: '📩' },
  ];

  useEffect(() => {
    // Simulate weather updates
    const weatherConditions = [
      { condition: 'Clear', emoji: '☀️' },
      { condition: 'Storm Warning', emoji: '⛈️' },
      { condition: 'Snow Alert', emoji: '❄️' }
    ];
    const interval = setInterval(() => {
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      setWeatherAlert(`${randomWeather.emoji} ${randomWeather.condition}`);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAlert = () => {
    setStatus({ message: 'Emergency alert sent! Help is on the way.', type: 'alert' });
    setTimeout(() => setStatus({ message: '', type: '' }), 5000);
  };

  const handleReport = (e) => {
    e.preventDefault();
    setStatus({ message: 'Submitting report...', type: 'info' });
    
    setTimeout(() => {
      setStatus({ message: 'Report received. Campus security has been notified.', type: 'success' });
      setReport('');
      setTimeout(() => setStatus({ message: '', type: '' }), 3000);
    }, 1500);
  };

  return (
    <CampusSafety>
      <Header>
        <Title>Campus Safety Hub</Title>
        <Subtitle>
          Your one-stop resource for staying safe and connected on campus
        </Subtitle>
        {weatherAlert && (
          <WeatherAlert>
            {weatherAlert}
          </WeatherAlert>
        )}
      </Header>

      <MainGrid>
        {/* Emergency Contacts */}
        <Card>
          <SectionTitle>Emergency Contacts</SectionTitle>
          <ContactList>
            {contacts.map((contact, index) => (
              <ContactItem key={index} href={`tel:${contact.number}`}>
                <ContactInfo>
                  <span style={{ fontSize: '1.5rem' }}>{contact.emoji}</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>{contact.name}</div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                      {contact.number}
                    </div>
                  </div>
                </ContactInfo>
                <span style={{ fontSize: '1.2rem' }}>📞</span>
              </ContactItem>
            ))}
          </ContactList>
        </Card>

        {/* Safety Tips */}
        <Card>
          <SectionTitle>Safety Tips</SectionTitle>
          <SafetyTips>
            {safetyTips.map((tip, index) => (
              <Tip key={index}>
                <span style={{ fontSize: '1.5rem' }}>{tip.emoji}</span>
                <div>{tip.text}</div>
              </Tip>
            ))}
          </SafetyTips>
        </Card>

        {/* Report Incident */}
        <Card>
          <SectionTitle>Report an Incident</SectionTitle>
          <ReportForm onSubmit={handleReport}>
            <Textarea
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Describe the incident with as much detail as possible..."
              required
            />
            <PrimaryButton type="submit" disabled={!report}>
              Submit Report
            </PrimaryButton>
          </ReportForm>
          {status.message && (
            <StatusMessage type={status.type === 'success' ? 'success' : 'alert'}>
              {status.message}
            </StatusMessage>
          )}
        </Card>
      </MainGrid>

      <AlertButton onClick={handleAlert}>
        SOS
      </AlertButton>
    </CampusSafety>
  );
};

export default CollegeSafety;