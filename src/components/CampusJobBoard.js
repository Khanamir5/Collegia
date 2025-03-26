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

// Styled Components with Responsive Design
const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  padding: 1rem;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Banner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background-image: url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  z-index: 0;
  @media (min-width: 768px) {
    height: 400px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
  @media (min-width: 768px) {
    height: 400px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding-top: 80px;
  padding-bottom: 20px;
  position: relative;
  z-index: 2;
  text-align: center;
  @media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 3rem;
    padding-top: 100px;
    padding-bottom: 30px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(90deg, #fff, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  max-width: 90%;
  @media (min-width: 768px) {
    font-size: 1.25rem;
    max-width: 600px;
  }
`;

const SearchFilterWrapper = styled(GlassContainer)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  position: sticky;
  top: 60px;
  z-index: 10;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    margin-bottom: 2rem;
    top: 70px;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  &::placeholder { color: rgba(255, 255, 255, 0.5); }
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
  @media (min-width: 768px) {
    flex: 1;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    min-width: 250px;
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
  option {
    background: #24243e;
    color: white;
  }
  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    width: auto;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
  }
  &:active { transform: translateY(0); }
  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 100%;
  margin: 0 auto;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    max-width: 1400px;
  }
`;

const JobCard = styled(GlassContainer)`
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: ${fadeIn} 0.5s ease;
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  @media (min-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

const JobTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: white;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const JobCompany = styled.p`
  font-size: 1rem;
  color: #a5b4fc;
  margin: 0 0 0.5rem;
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const JobMeta = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.25rem 0;
  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const JobType = styled.span`
  display: inline-block;
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 0.5rem;
  @media (min-width: 768px) {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  }
`;

const JobDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  margin: 0.75rem 0;
  flex: 1;
  @media (min-width: 768px) {
    font-size: 0.9rem;
    margin: 1rem 0;
  }
`;

const JobLink = styled.a`
  color: #a5b4fc;
  text-decoration: none;
  font-size: 0.85rem;
  word-break: break-all;
  &:hover {
    text-decoration: underline;
  }
  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  grid-column: 1 / -1;
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const EmptyIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.75rem;
  opacity: 0.5;
  @media (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
  @media (min-width: 768px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
`;

const LoadingMessage = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  grid-column: 1 / -1;
  font-size: 1rem;
  padding: 2rem 0;
`;

const ThemeToggle = styled(PrimaryButton)`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 100;
  padding: 0;
  animation: ${pulse} 2s infinite;
  @media (min-width: 768px) {
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    gap: 1rem;
    margin-top: 2rem;
  }
`;

// Dummy job data (unchanged)
const dummyJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Infosys",
    location: "Bengaluru, Karnataka, India",
    type: "Full-time",
    description: "Work on developing and maintaining software applications, collaborating with cross-functional teams to deliver high-quality solutions.",
    postedDate: "2025-03-15",
    link: "https://www.linkedin.com/jobs/view/3839254712/"
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    company: "Tata Consultancy Services (TCS)",
    location: "Mumbai, Maharashtra, India",
    type: "Internship",
    description: "Drive digital marketing campaigns, optimize online presence, and analyze performance metrics to enhance brand visibility.",
    postedDate: "2025-03-18",
    link: "https://www.linkedin.com/jobs/view/3840125839/"
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Wipro",
    location: "Hyderabad, Telangana, India",
    type: "Part-time",
    description: "Leverage data analytics and machine learning to solve complex business problems and provide actionable insights.",
    postedDate: "2025-03-20",
    link: "https://www.linkedin.com/jobs/view/3829471023/"
  },
  {
    id: 4,
    title: "Customer Success Associate",
    company: "Zoho Corporation",
    location: "Chennai, Tamil Nadu, India",
    type: "Full-time",
    description: "Support customers in using Zoho products, ensuring satisfaction and fostering long-term relationships.",
    postedDate: "2025-03-22",
    link: "https://www.linkedin.com/jobs/view/3838569201/"
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "Flipkart",
    location: "Bengaluru, Karnataka, India",
    type: "Full-time",
    description: "Design intuitive and visually appealing user interfaces for Flipkart’s e-commerce platform to enhance user experience.",
    postedDate: "2025-03-23",
    link: "https://www.linkedin.com/jobs/view/3841032947/"
  },
  {
    id: 6,
    title: "Business Development Executive",
    company: "BYJU’S",
    location: "Delhi, India",
    type: "Full-time",
    description: "Identify new business opportunities, build client relationships, and contribute to the growth of BYJU’S educational offerings.",
    postedDate: "2025-03-24",
    link: "https://www.linkedin.com/jobs/view/3839945710/"
  }
];

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
        setError('Failed to load jobs. Showing sample data instead.');
        let filteredDummy = dummyJobs;
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredDummy = filteredDummy.filter(job =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query)
          );
        }
        
        if (filters.jobType) {
          filteredDummy = filteredDummy.filter(job => 
            job.type === filters.jobType
          );
        }
        
        if (filters.location) {
          const locationQuery = filters.location.toLowerCase();
          filteredDummy = filteredDummy.filter(job =>
            job.location.toLowerCase().includes(locationQuery)
          );
        }
        
        setJobs(filteredDummy);
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