import React, { useState, useEffect } from 'react';

const ResearchCollaboration = () => {
  const [activeSection, setActiveSection] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [researchers, setResearchers] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px 7vw',
      maxWidth: '100vw',
      margin: '0 auto',
      backgroundColor: 'rgb(232, 232, 232)',
      minHeight: '100vh',
      boxSizing: 'border-box',
    },
    banner: {
      backgroundImage: 'url(https://images.unsplash.com/photo-1501290741922-b56c0d0884af?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      padding: '40px 20px',
      height:'300px',
      textAlign: 'center',
      borderRadius: '10px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
      position: 'relative',
    },
    bannerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.52)',
      borderRadius: '10px',
    },
    bannerContent: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '600px',
    },
    bannerTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    bannerSubtitle: {
      fontSize: '1.2rem',
      opacity: '0.9',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    navButtons: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px',
      flexWrap: 'wrap',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    activeButton: {
      backgroundColor: '#0056b3',
    },
    search: {
      padding: '10px',
      width: '100%',
      maxWidth: '300px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '20px',
    },
    section: {
      marginBottom: '40px',
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
    },
    particularCard: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row', // Dynamic flex direction
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      width: isMobile ? '100%' : 'calc(50% - 20px)', // Dynamic width
      boxSizing: 'border-box',
      marginBottom: '20px',
      transition: 'box-shadow 0.3s ease',
      backgroundColor: '#fff',
      ':hover': {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
    shareResource: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#fff',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
  };

  return (
    <div style={styles.container}>
      {/* Banner Section */}
      <div style={styles.banner}>
        <div style={styles.bannerOverlay}></div>
        <div style={styles.bannerContent}>
          <h1 style={styles.bannerTitle}>Research Collaboration</h1>
          <p style={styles.bannerSubtitle}>Connecting researchers and resources for innovative solutions</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={styles.header}>
        <div style={styles.navButtons}>
          {['projects', 'researchers', 'resources'].map((section) => (
            <button
              key={section}
              style={activeSection === section ? { ...styles.button, ...styles.activeButton } : styles.button}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading and Error Handling */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <div style={styles.section}>
          <input type="text" placeholder="Search projects..." style={styles.search} />
          <div style={styles.particularCard}>
            <div style={styles.cardContainer}>
              {projects.map((project) => (
                <div key={project.id} style={styles.card}>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <p><strong>Keywords:</strong> {project.keywords.join(', ')}</p>
                  <p><strong>Collaborators:</strong> {project.collaborators}</p>
                  <p><strong>Deadline:</strong> {project.deadline}</p>
                  <button style={styles.button}>Join Project</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Researchers Section */}
      {activeSection === 'researchers' && (
        <div style={styles.section}>
          <input type="text" placeholder="Search researchers..." style={styles.search} />
          <div style={styles.cardContainer}>
            {researchers.map((researcher) => (
              <div key={researcher.id} style={styles.card}>
                <h2>{researcher.name}</h2>
                <p>{researcher.title}</p>
                <p><strong>Institution:</strong> {researcher.institution}</p>
                <p><strong>Publications:</strong> {researcher.publications}</p>
                <p><strong>Expertise:</strong> {researcher.expertise.join(', ')}</p>
                <button style={styles.button}>Connect</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources Section */}
      {activeSection === 'resources' && (
        <div style={styles.section}>
          <h2>Shared Resources</h2>
          <div style={styles.cardContainer}>
            {resources.map((resource) => (
              <div key={resource.id} style={styles.card}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <button style={styles.button}>Access Resource</button>
              </div>
            ))}
          </div>
          <div style={styles.shareResource}>
            <h2>Share a Resource</h2>
            <input type="text" placeholder="Resource Title" style={styles.input} />
            <textarea placeholder="Brief description of the resource" style={styles.input} />
            <input type="text" placeholder="Link to resource" style={styles.input} />
            <button style={styles.button}>Share Resource</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchCollaboration;