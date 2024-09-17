import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBriefcase, FaCalendarCheck, FaUserTie, FaRobot } from 'react-icons/fa';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  backdrop-filter: blur(10px);
  color: #ffffff;
`;

const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: url('https://images.pexels.com/photos/8101929/pexels-photo-8101929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') no-repeat center center;
  background-size: cover;
  border-radius: 8px;
  padding: 5.9rem;
  margin: 0rem 0;
  width: 100%;
  color: #ffffff;

  /* Pseudo-element for overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.493); /* Adjust overlay color and opacity here */
    z-index: 1; /* Ensure overlay is above background image but below text */
  }

  /* Adjust z-index for text to be above overlay */
  & > * {
    position: relative;
    z-index: 2;
  }
`;


const HeroHeading = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  color: #ffffff;
  font-weight: bold;
`;

const HeroTagline = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #e0e0e0;
`;



const Section = styled.section`
  width: 90%;
  max-width: 1200px;
  margin: 2rem 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #16325B;
  color: #ffffff;
`;

const IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  margin-left: 1rem;

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background-color: #16325B;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.02);
  }
`;

const Card = styled.div`
  background: rgba(92, 92, 92, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 0.8rem 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    color: black;
  }
`;

const MapSection = styled.div`
  height: 400px;
  width: 100%;
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const CareerResources = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 1rem;
  gap: 1rem;
  margin: 2rem 0;

  .resource {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    padding: 1rem;
    min-width: 200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    flex: 0 0 auto;
    
    &:hover {
      transform: scale(1.02);
    }

    h4 {
      margin: 0;
      color: black;
    }

    p {
      color: grey;
    }
  }
`;

const CampusJobBoard = () => {
    const [showJobs, setShowJobs] = useState(false);
    const [showTracking, setShowTracking] = useState(false);
    const [showResources, setShowResources] = useState(false);
    const [showEngagement, setShowEngagement] = useState(false);

    return (
        <whole>
            <HeroSection>
                <HeroHeading>Welcome To Internship/Job Portal</HeroHeading>
                <HeroTagline>Find Your Dream Job and Connect with Employers</HeroTagline>
                
            </HeroSection>
            <Container>
                {/* Hero Section */}

                {/* Job Listings */}
                <Section>
                    <Header>
                        <IconWrapper>
                            <FaBriefcase size={40} color="#ffffff" />
                        </IconWrapper>
                        <Info>
                            <h2>Job Listings</h2>
                            <p>Explore tailored job opportunities.</p>
                        </Info>
                    </Header>
                    <Button onClick={() => setShowJobs(!showJobs)}>
                        {showJobs ? 'Hide Job Listings' : 'Show Job Listings'}
                    </Button>
                    {showJobs && (
                        <div>
                            <Card>
                                <h4>Software Engineer at TechCorp</h4>
                                <p>Location: San Francisco, CA</p>
                                <p>Salary: $120,000 - $150,000</p>
                            </Card>
                            <Card>
                                <h4>Data Scientist at DataWorks</h4>
                                <p>Location: New York, NY</p>
                                <p>Salary: $110,000 - $140,000</p>
                            </Card>
                        </div>
                    )}
                </Section>

                {/* Application Tracking */}
                <Section>
                    <Header>
                        <IconWrapper>
                            <FaCalendarCheck size={40} color="#ffffff" />
                        </IconWrapper>
                        <Info>
                            <h2>Application Tracking</h2>
                            <p>Track and manage your job applications.</p>
                        </Info>
                    </Header>
                    <Button onClick={() => setShowTracking(!showTracking)}>
                        {showTracking ? 'Hide Application Tracking' : 'Show Application Tracking'}
                    </Button>
                    {showTracking && (
                        <div>
                            <Card>
                                <h4>Application to TechCorp</h4>
                                <p>Status: Under Review</p>
                            </Card>
                            <Card>
                                <h4>Application to DataWorks</h4>
                                <p>Status: Interview Scheduled</p>
                            </Card>
                        </div>
                    )}
                </Section>

                {/* Career Resources */}
                <Section>
                    <Header>
                        <IconWrapper>
                            <FaRobot size={40} color="#ffffff" />
                        </IconWrapper>
                        <Info>
                            <h2>Career Resources</h2>
                            <p>Utilize tools to enhance your career prospects.</p>
                        </Info>
                    </Header>
                    <Button onClick={() => setShowResources(!showResources)}>
                        {showResources ? 'Hide Career Resources' : 'Show Career Resources'}
                    </Button>
                    {showResources && (
                        <CareerResources>
                            <div className="resource">
                                <h4>Virtual Mock Interviews</h4>
                                <p>Practice with AI-powered feedback.</p>
                            </div>
                            <div className="resource">
                                <h4>Resume Builder</h4>
                                <p>Create and optimize your resume with our tool.</p>
                            </div>
                            <div className="resource">
                                <h4>Notes</h4>
                                <p>Detailed notes of your subject.</p>
                            </div>
                        </CareerResources>
                    )}
                </Section>

                {/* Employer Engagement */}
                <Section>
                    <Header>
                        <IconWrapper>
                            <FaUserTie size={40} color="#ffffff" />
                        </IconWrapper>
                        <Info>
                            <h2>Employer Engagement</h2>
                            <p>Connect with employers and explore career opportunities.</p>
                        </Info>
                    </Header>
                    <Button onClick={() => setShowEngagement(!showEngagement)}>
                        {showEngagement ? 'Hide Employer Engagement' : 'Show Employer Engagement'}
                    </Button>
                    {showEngagement && (
                        <div>
                            <Card>
                                <h4>Company Profiles</h4>
                                <p>Learn about companies and their culture.</p>
                            </Card>
                            <Card>
                                <h4>Virtual Career Fairs</h4>
                                <p>Attend career fairs remotely.</p>
                            </Card>
                        </div>
                    )}
                </Section>

                {/* Map Section */}
                <MapSection>
                    <iframe
                        title="JIS College of Engineering Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.123756759511!2d88.4466723!3d22.9596335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02723f6bb5ebfb%3A0x18bce52cb73b36a!2sJIS%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1633508536231!5m2!1sen!2sin"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </MapSection>
            </Container>
        </whole>
    );
};

export default CampusJobBoard;
