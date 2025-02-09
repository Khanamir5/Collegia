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

// Hero Section Styles
const HeroSection = styled.section`
  background-image: url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
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

const PanicButton = styled.button`
  background:rgb(233, 5, 5);
  color: white;
  padding: 20px 40px;
  border: none;
  border-radius: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  z-index: 1;
  animation: ${pulse} 2s infinite;
  transition: background 0.3s ease;

  &:hover {
    background:rgb(3, 150, 38);
    animation: none;
  }
`;

// Main Safety Component
const Safety = () => {
  const [report, setReport] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Mock emergency contacts
  const emergencyContacts = [
    { name: 'Campus Security', number: '123-456-7890' },
    { name: 'Local Police', number: '911' },
    { name: 'Health Center', number: '987-654-3210' },
    { name: 'Counseling Services', number: '555-123-4567' },
  ];

  // Mock safety tips
  const safetyTips = [
    'Always be aware of your surroundings.',
    'Avoid walking alone at night. Use the campus shuttle service.',
    'Keep your personal belongings secure at all times.',
    'Report any suspicious activity to campus security immediately.',
    'Save emergency contacts on your phone for quick access.',
  ];

  // Handle report submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate report submission (you can replace this with an API call)
    setTimeout(() => {
      setSubmitted(true);
      setReport('');
    }, 1000);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>Your Safety is Our Priority</HeroTitle>
        <HeroSubtitle>Comprehensive resources and tools to ensure a safer campus experience.</HeroSubtitle>
        <PanicButton onClick={() => alert('Help is on the way!')}>Panic Button</PanicButton>
      </HeroSection>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Emergency Contacts Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Emergency Contacts</h2>
          <div style={styles.contactsGrid}>
            {emergencyContacts.map((contact, index) => (
              <div key={index} style={styles.contactCard}>
                <h3 style={styles.contactName}>{contact.name}</h3>
                <p style={styles.contactNumber}>{contact.number}</p>
                <button
                  style={styles.callButton}
                  onClick={() => alert(`Calling ${contact.number}`)}
                >
                  Call Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Safety Tips</h2>
          <ul style={styles.tipsList}>{safetyTips.map((tip, index) => (
            <li key={index} style={styles.tipItem}>
              <span style={styles.tipIcon}>{['👀   -  ', '🚶‍♂️  -  ', '🎒  -  ', '🚨  -  ', '📱  -  '][index]}</span>
              {tip}
            </li>
          ))}
          </ul>
        </div>

        {/* Report Incident Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Report an Incident</h2>
          <form onSubmit={handleSubmit} style={styles.reportForm}>
            <textarea
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Describe the incident..."
              style={styles.reportTextarea}
              required
            />
            <button type="submit" style={styles.submitButton}>
              {submitted ? 'Report Submitted!' : 'Submit Report'}
            </button>
          </form>
          {submitted && (
            <p style={styles.successMessage}>Thank you for reporting. We will take appropriate action.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  section: {
    marginBottom: '60px',
  },
  sectionTitle: {
    fontSize: '2rem',
    color: 'rgba(242, 58, 16, 0.86)',
    marginBottom: '30px',
    textAlign: 'center',
  },
  contactsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  contactCard: {
    background: 'rgba(65, 65, 65, 0.52)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(248, 248, 248, 0.35)',
    transition: 'transform 0.3s ease',
  },
  contactName: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#fff',
  },
  contactNumber: {
    fontSize: '1rem',
    color: 'rgba(154, 153, 153, 0.85)',
  },
  callButton: {
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '10px',
    transition: 'background 0.3s ease',
  },
  tipsList: {
    listStyleType: 'none',
    paddingLeft: '20px',
  },
  tipItem: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#fff',
  },
  reportForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  reportTextarea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    border: '1px solid #bdc3c7',
    borderRadius: '5px',
    fontSize: '1rem',
    resize: 'vertical',
  },
  submitButton: {
    background: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s ease',
  },
  successMessage: {
    color: '#27ae60',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default Safety;