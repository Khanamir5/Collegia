import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Animations
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

const Banner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background-image: url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  
  background-position: center;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  padding-top: 100px;
  padding-bottom: 30px;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
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
  justify-content: center;
  flex-wrap: wrap;
  padding: 1.5rem;
  margin-bottom: 2rem;
  position: sticky;
  top: 70px;
  z-index: 10;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  min-width: 250px;
  &::placeholder { color: rgba(255, 255, 255, 0.5); }
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
  option {
    background: #24243e;
    color: white;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
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

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const JobCard = styled(GlassContainer)`
  padding: 1.5rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: ${fadeIn} 0.5s ease;
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const JobTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: white;
`;

const JobCompany = styled.p`
  font-size: 1.1rem;
  color: #a5b4fc;
  margin: 0 0 0.5rem;
`;

const JobMeta = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.25rem 0;
`;

const JobType = styled.span`
  display: inline-block;
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const JobDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 1rem 0;
  flex: 1;
`;

const JobLink = styled.a`
  color: #a5b4fc;
  text-decoration: none;
  font-size: 0.9rem;
  word-break: break-all;
  &:hover {
    text-decoration: underline;
  }
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

const ErrorMessage = styled.p`
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const LoadingMessage = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  grid-column: 1 / -1;
`;

const ThemeToggle = styled(PrimaryButton)`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const JobInternshipPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
  });
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:8080/api/jobs/search', {
          params: {
            title: searchQuery || null,
            company: searchQuery || null,
            type: filters.jobType || null,
            location: filters.location || null,
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [searchQuery, filters.jobType, filters.location]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleApply = (jobLink) => {
    if (jobLink) {
      window.open(jobLink, '_blank', 'noopener,noreferrer');
    } else {
      setError('No application link provided for this job.');
    }
  };

  return (
    <Container>
      <Banner />
      <Overlay />
      
      <ThemeToggle onClick={toggleDarkMode}>
        {darkMode ? '🌕' : '🌜'}
      </ThemeToggle>

      <Header>
        <Title>Job & Internship Portal</Title>
        <Subtitle>Find your next opportunity with us!</Subtitle>
      </Header>

      <SearchFilterWrapper>
        <SearchInput
          type="text"
          placeholder="Search by job title or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterSelect
          value={filters.jobType}
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </FilterSelect>
        <SearchInput
          type="text"
          placeholder="Filter by location..."
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </SearchFilterWrapper>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <LoadingMessage>Loading jobs...</LoadingMessage>
      ) : (
        <JobGrid>
          {jobs.length === 0 ? (
            <EmptyState>
              <EmptyIcon>🔍</EmptyIcon>
              <h3>No jobs found</h3>
              <p>Try adjusting your search or filters</p>
            </EmptyState>
          ) : (
            jobs.map((job) => (
              <JobCard key={job.id}>
                <JobTitle>{job.title}</JobTitle>
                <JobCompany>{job.company}</JobCompany>
                <JobMeta><strong>Location:</strong> {job.location}</JobMeta>
                <JobType>{job.type}</JobType>
                <JobDescription>
                  {job.description.length > 150 
                    ? `${job.description.substring(0, 150)}...` 
                    : job.description}
                </JobDescription>
                <JobMeta><strong>Posted:</strong> {job.postedDate}</JobMeta>
                {job.link && (
                  <JobMeta>
                    <strong>Link:</strong> <JobLink href={job.link} target="_blank" rel="noopener noreferrer">Apply Now</JobLink>
                  </JobMeta>
                )}
                <PrimaryButton onClick={() => handleApply(job.link)}>
                  Apply Now
                </PrimaryButton>
              </JobCard>
            ))
          )}
        </JobGrid>
      )}

      <ButtonGroup>
        <SecondaryButton onClick={() => navigate('/home')}>
          Back to Home
        </SecondaryButton>
      </ButtonGroup>
    </Container>
  );
};

export default JobInternshipPortal;