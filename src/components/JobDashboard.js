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

const FormContainer = styled(GlassContainer)`
  padding: 2rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-align: left;
`;

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  min-height: 120px;
  resize: vertical;
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
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

const DangerButton = styled(PrimaryButton)`
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  &:hover {
    background: rgba(239, 68, 68, 0.3);
  }
`;

const SuccessButton = styled(PrimaryButton)`
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  &:hover {
    background: rgba(16, 185, 129, 0.3);
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
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: white;
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

const JobActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
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

const SuccessMessage = styled.p`
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

function JobDashboard() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [postedDate, setPostedDate] = useState('');
  const [link, setLink] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const MAX_DESCRIPTION_LENGTH = 5000;
  const MAX_TITLE_LENGTH = 100;
  const MAX_COMPANY_LENGTH = 100;
  const MAX_LOCATION_LENGTH = 100;

  useEffect(() => {
    if (!username) {
      navigate('/login');
      return;
    }
    fetchJobs();
  }, [username, navigate]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs. Please try again.');
    }
  };

  const validateUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
    return url === '' || urlPattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (title.length > MAX_TITLE_LENGTH) {
      setError(`Title exceeds ${MAX_TITLE_LENGTH} characters.`);
      return;
    }
    if (company.length > MAX_COMPANY_LENGTH) {
      setError(`Company exceeds ${MAX_COMPANY_LENGTH} characters.`);
      return;
    }
    if (location.length > MAX_LOCATION_LENGTH) {
      setError(`Location exceeds ${MAX_LOCATION_LENGTH} characters.`);
      return;
    }
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      setError(`Description exceeds ${MAX_DESCRIPTION_LENGTH} characters.`);
      return;
    }
    if (!validateUrl(link)) {
      setError('Please enter a valid URL (e.g., https://example.com) or leave it blank.');
      return;
    }

    const jobData = {
      title,
      company,
      location,
      type,
      description,
      postedDate: postedDate || new Date().toISOString().split('T')[0],
      link: link || null
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/jobs/${editId}`, jobData);
        setSuccess('Job updated successfully!');
        setEditId(null);
      } else {
        await axios.post('http://localhost:8080/api/jobs', jobData);
        setSuccess('Job created successfully!');
      }
      resetForm();
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      setError(error.response?.data || 'Failed to save job. Please try again.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setCompany('');
    setLocation('');
    setType('');
    setDescription('');
    setPostedDate('');
    setLink('');
  };

  const handleEdit = (job) => {
    setTitle(job.title);
    setCompany(job.company);
    setLocation(job.location);
    setType(job.type);
    setDescription(job.description);
    setPostedDate(job.postedDate);
    setLink(job.link || '');
    setEditId(job.id);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`http://localhost:8080/api/jobs/${id}`);
        setSuccess('Job deleted successfully!');
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
        setError('Failed to delete job. Please try again.');
      }
    }
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
      <Header>
        <Title>Job Management Dashboard</Title>
        <Subtitle>Create and manage job postings for your organization</Subtitle>
      </Header>

      <FormContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Job Title*</FormLabel>
            <FormInput
              type="text"
              placeholder="Software Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <FormLabel style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              {title.length}/{MAX_TITLE_LENGTH} characters
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>Company*</FormLabel>
            <FormInput
              type="text"
              placeholder="Tech Corp Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <FormLabel style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              {company.length}/{MAX_COMPANY_LENGTH} characters
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>Location*</FormLabel>
            <FormInput
              type="text"
              placeholder="San Francisco, CA or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <FormLabel style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              {location.length}/{MAX_LOCATION_LENGTH} characters
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>Job Type*</FormLabel>
            <FormSelect
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Description*</FormLabel>
            <FormTextarea
              placeholder="Detailed job description, requirements, and benefits..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <FormLabel style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              {description.length}/{MAX_DESCRIPTION_LENGTH} characters
            </FormLabel>
          </FormGroup>

          <FormGroup>
            <FormLabel>Posted Date</FormLabel>
            <FormInput
              type="date"
              value={postedDate}
              onChange={(e) => setPostedDate(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Application Link</FormLabel>
            <FormInput
              type="url"
              placeholder="https://yourcompany.com/careers/apply"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </FormGroup>

          <PrimaryButton type="submit" style={{ width: '100%' }}>
            {editId ? 'Update Job Posting' : 'Create Job Posting'}
          </PrimaryButton>
        </form>
      </FormContainer>

      <Header>
        <Title>Your Job Postings</Title>
        <Subtitle>Manage existing job listings</Subtitle>
      </Header>

      {jobs.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📋</EmptyIcon>
          <h3>No job postings yet</h3>
          <p>Create your first job posting using the form above</p>
        </EmptyState>
      ) : (
        <JobGrid>
          {jobs.map(job => (
            <JobCard key={job.id}>
              <JobTitle>{job.title}</JobTitle>
              <JobMeta><strong>Company:</strong> {job.company}</JobMeta>
              <JobMeta><strong>Location:</strong> {job.location}</JobMeta>
              <JobType>{job.type}</JobType>
              <JobDescription>
                {job.description.length > 200 
                  ? `${job.description.substring(0, 200)}...` 
                  : job.description}
              </JobDescription>
              <JobMeta><strong>Posted:</strong> {job.postedDate}</JobMeta>
              {job.link && (
                <JobMeta>
                  <strong>Link:</strong> <JobLink href={job.link} target="_blank" rel="noopener noreferrer">{job.link}</JobLink>
                </JobMeta>
              )}
              <JobActions>
                <SuccessButton onClick={() => handleEdit(job)}>
                  Edit
                </SuccessButton>
                <DangerButton onClick={() => handleDelete(job.id)}>
                  Delete
                </DangerButton>
                <PrimaryButton onClick={() => handleApply(job.link)}>
                  Apply
                </PrimaryButton>
              </JobActions>
            </JobCard>
          ))}
        </JobGrid>
      )}

      <ButtonGroup>
        <SecondaryButton onClick={() => navigate('/jobs')}>
          View Public Job Portal
        </SecondaryButton>
        <SecondaryButton onClick={() => navigate('/dashboard')}>
          Manage Blogs
        </SecondaryButton>
        <SecondaryButton onClick={() => navigate('/home')}>
          Back to Home
        </SecondaryButton>
      </ButtonGroup>
    </Container>
  );
}

export default JobDashboard;