import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

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
  0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

// Styled Components with Enhanced Responsiveness
const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ResearchContainer = styled.div`
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
  padding: 1rem;
  @media (min-width: 640px) { padding: 1.5rem; }
  @media (min-width: 1024px) { padding: 2rem; }
`;

const Banner = styled(GlassContainer)`
  height: 200px;
  background-image: url('https://images.unsplash.com/photo-1501290741922-b56c0d0884af?q=80&w=2532&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(7, 6, 9, 0.62), rgba(29, 28, 48, 0.77));
    z-index: 1;
  }
  @media (min-width: 768px) { height: 250px; }
  @media (min-width: 1024px) {
    height: 300px;
    margin-bottom: 2rem;
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 1rem;
  width: 100%;
  max-width: 800px;
`;

const BannerTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #fff, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.75rem;
  line-height: 1.2;
  @media (min-width: 640px) { font-size: 2rem; }
  @media (min-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  @media (min-width: 640px) { font-size: 1rem; }
  @media (min-width: 1024px) { font-size: 1.25rem; }
`;

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  @media (min-width: 640px) {
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
`;

const NavButton = styled.button`
  background: ${({ active }) => 
    active ? 'rgba(165, 180, 252, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ active }) => 
    active ? '#a5b4fc' : 'rgba(255, 255, 255, 0.8)'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  &:hover {
    background: rgba(165, 180, 252, 0.2);
  }
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  margin: 0 auto 1.5rem;
  display: block;
  transition: all 0.3s ease;
  &::placeholder { color: rgba(255, 255, 255, 0.5); }
  &:focus {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(165, 180, 252, 0.5);
  }
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    max-width: 500px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 100%;
  margin: 0 auto;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1400px;
  }
`;

const Card = styled(GlassContainer)`
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  @media (min-width: 768px) { padding: 1.5rem; }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: white;
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const CardText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0 0 1rem;
  flex: 1;
  @media (min-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  @media (min-width: 768px) { margin-bottom: 1.5rem; }
`;

const Tag = styled.span`
  background: rgba(165, 180, 252, 0.2);
  color: #a5b4fc;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 600;
  @media (min-width: 768px) {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
  @media (min-width: 768px) { margin-bottom: 1.5rem; }
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
  }
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ResourceForm = styled(GlassContainer)`
  padding: 1rem;
  margin-top: 2rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 640px) {
    padding: 1.5rem;
    margin-top: 2.5rem;
  }
  @media (min-width: 1024px) {
    padding: 2rem;
    margin-top: 3rem;
    max-width: 800px;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: white;
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FormInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  &::placeholder { color: rgba(255, 255, 255, 0.5); }
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  min-height: 100px;
  margin-bottom: 0.75rem;
  resize: vertical;
  transition: all 0.3s ease;
  &::placeholder { color: rgba(255, 255, 255, 0.5); }
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    min-height: 120px;
    margin-bottom: 1rem;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  @media (min-width: 768px) {
    padding: 2rem;
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 12px;
  max-width: 100%;
  margin: 0 auto 1.5rem;
  font-size: 0.9rem;
  @media (min-width: 640px) {
    padding: 2rem;
    max-width: 800px;
    font-size: 1rem;
  }
`;

// Main Component
const ResearchCollaboration = () => {
  const [activeSection, setActiveSection] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [researchers, setResearchers] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate fetching projects from an API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          title: 'AI-Powered Climate Change Mitigation',
          description: 'Developing machine learning models to predict and mitigate the effects of climate change on urban environments.',
          keywords: ['AI', 'Climate Change', 'Urban Planning'],
          collaborators: 8,
          deadline: '2024-06-30',
        },
        {
          id: 2,
          title: 'Quantum Computing for Drug Discovery',
          description: 'Utilizing quantum algorithms to accelerate the process of identifying potential drug candidates for various diseases.',
          keywords: ['Quantum Computing', 'Drug Discovery', 'Bioinformatics'],
          collaborators: 5,
          deadline: '2023-12-31',
        },
        {
          id: 3,
          title: 'Renewable Energy Integration',
          description: 'Developing strategies to integrate renewable energy sources into existing power grids for sustainable energy solutions.',
          keywords: ['Renewable Energy', 'Power Grid', 'Sustainability'],
          collaborators: 7,
          deadline: '2024-09-30',
        },
        {
          id: 4,
          title: 'Blockchain for Supply Chain Management',
          description: 'Using blockchain technology to enhance transparency and efficiency in global supply chain operations.',
          keywords: ['Blockchain', 'Supply Chain', 'Transparency'],
          collaborators: 9,
          deadline: '2024-08-20',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Simulate fetching researchers from an API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setResearchers([
        {
          id: 1,
          name: 'Dr. Emily Chen',
          title: 'Associate Professor of Environmental Science',
          institution: 'Green University',
          publications: 45,
          expertise: ['Climate Modeling', 'Machine Learning', 'Data Analysis'],
        },
        {
          id: 2,
          name: 'Prof. Michael Johnson',
          title: 'Professor of Quantum Physics',
          institution: 'Tech Institute',
          publications: 79,
          expertise: ['Quantum Computing', 'Algorithm Design', 'Molecular Modeling'],
        },
        {
          id: 3,
          name: 'Dr. Aisha Patel',
          title: 'Professor of Biomedical Engineering',
          institution: 'Innovate University',
          publications: 62,
          expertise: ['Biomedical Devices', 'Tissue Engineering', 'Medical Imaging'],
        },
        {
          id: 4,
          name: 'Dr. Carlos Rodriguez',
          title: 'Associate Professor of Cybersecurity',
          institution: 'SecureTech Institute',
          publications: 55,
          expertise: ['Cybersecurity', 'Network Security', 'Cryptography'],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Simulate fetching resources from an API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setResources([
        {
          id: 1,
          title: 'Large-scale Climate Data Set',
          description: 'A comprehensive dataset of global climate patterns over the past 50 years.',
        },
        {
          id: 2,
          title: 'Quantum Algorithm Library',
          description: 'Open-source library of quantum algorithms for various computational problems.',
        },
        {
          id: 3,
          title: 'Genomic Data Repository',
          description: 'A repository of genomic data from various species for biological research.',
        },
        {
          id: 4,
          title: 'AI Model Zoo',
          description: 'A collection of pre-trained machine learning models for various applications.',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredResearchers = researchers.filter(researcher =>
    researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    researcher.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    researcher.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    researcher.expertise.some(expertise => expertise.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ResearchContainer>
      <Banner>
        <BannerContent>
          <BannerTitle>Research Collaboration Hub</BannerTitle>
          <BannerSubtitle>Connecting researchers and resources for innovative solutions</BannerSubtitle>
        </BannerContent>
      </Banner>

      <NavContainer>
        {['projects', 'researchers', 'resources'].map((section) => (
          <NavButton
            key={section}
            active={activeSection === section}
            onClick={() => setActiveSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </NavButton>
        ))}
      </NavContainer>

      <SearchInput
        type="text"
        placeholder={`Search ${activeSection}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading && <Loading>Loading...</Loading>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {activeSection === 'projects' && (
        <CardGrid>
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardTitle>{project.title}</CardTitle>
              <CardText>{project.description}</CardText>
              <TagContainer>
                {project.keywords.map((keyword, index) => (
                  <Tag key={index}>{keyword}</Tag>
                ))}
              </TagContainer>
              <MetaInfo>
                <span>Collaborators: {project.collaborators}</span>
                <span>Deadline: {project.deadline}</span>
              </MetaInfo>
              <ActionButton>Join Project</ActionButton>
            </Card>
          ))}
        </CardGrid>
      )}

      {activeSection === 'researchers' && (
        <CardGrid>
          {filteredResearchers.map((researcher) => (
            <Card key={researcher.id}>
              <CardTitle>{researcher.name}</CardTitle>
              <CardText>{researcher.title}</CardText>
              <CardText><strong>Institution:</strong> {researcher.institution}</CardText>
              <TagContainer>
                {researcher.expertise.map((expertise, index) => (
                  <Tag key={index}>{expertise}</Tag>
                ))}
              </TagContainer>
              <MetaInfo>
                <span>Publications: {researcher.publications}</span>
              </MetaInfo>
              <ActionButton>Connect</ActionButton>
            </Card>
          ))}
        </CardGrid>
      )}

      {activeSection === 'resources' && (
        <>
          <CardGrid>
            {filteredResources.map((resource) => (
              <Card key={resource.id}>
                <CardTitle>{resource.title}</CardTitle>
                <CardText>{resource.description}</CardText>
                <ActionButton>Access Resource</ActionButton>
              </Card>
            ))}
          </CardGrid>
          <ResourceForm>
            <FormTitle>Share a Resource</FormTitle>
            <FormInput type="text" placeholder="Resource Title" />
            <FormTextarea placeholder="Brief description of the resource" />
            <FormInput type="text" placeholder="Link to resource" />
            <ActionButton>Share Resource</ActionButton>
          </ResourceForm>
        </>
      )}
    </ResearchContainer>
  );
};

export default ResearchCollaboration;