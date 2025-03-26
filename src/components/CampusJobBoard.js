import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        // Initially fetch all jobs without filters
        const initialResponse = await axios.get('http://localhost:8080/api/jobs');
        console.log('Initial jobs fetched:', initialResponse.data);
        setJobs(initialResponse.data);

        // Then apply search and filters if present
        const response = await axios.get('http://localhost:8080/api/jobs/search', {
          params: {
            title: searchQuery || null,
            company: searchQuery || null,
            type: filters.jobType || null,
            location: filters.location || null,
          },
        });
        console.log('Filtered jobs fetched:', response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error.response?.data || error.message);
        setError('Failed to load jobs. Check console for details.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [searchQuery, filters.jobType, filters.location]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle "Apply Now" button click
  const handleApply = (jobLink) => {
    if (jobLink) {
      window.open(jobLink, '_blank', 'noopener,noreferrer');
    } else {
      setError('No application link provided for this job.');
    }
  };

  // Styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px 7vw',
      maxWidth: '100vw',
      background: darkMode ? 'rgb(30, 30, 30)' : 'rgb(232, 232, 232)',
      margin: '0 auto',
      minHeight: '100vh',
      color: darkMode ? '#fff' : '#333',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    banner: {
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: '25px',
      margin: '5%',
      width: '90%',
      height: '300px',
      backgroundImage: `url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 1,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: '25px',
      margin: '5%',
      width: '90%',
      height: '300px',
      background: darkMode ? 'rgba(0, 0, 0, 0.52)' : 'rgba(0, 0, 0, 0.52)',
      zIndex: 1,
    },
    header: {
      textAlign: 'center',
      marginBottom: window.innerWidth <= 768 ? '50px' : '100px',
      paddingTop: window.innerWidth <= 768 ? '50px' : '100px',
      position: 'relative',
      zIndex: 1,
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#fff',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#ccc',
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap',
      position: 'sticky',
      top: '75px',
      zIndex: 2,
      backgroundColor: darkMode ? 'rgba(26, 26, 26, 0.97)' : 'rgba(249, 249, 249, 0.97)',
      padding: '15px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    searchInput: {
      flex: 1,
      padding: '12px',
      borderRadius: '5px',
      border: `1px solid ${darkMode ? '#444' : '#ccc'}`,
      fontSize: '1rem',
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#333',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    filterSelect: {
      padding: '12px',
      borderRadius: '5px',
      border: `1px solid ${darkMode ? '#444' : '#ccc'}`,
      fontSize: '1rem',
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#333',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    jobList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    jobCard: {
      backgroundColor: darkMode ? '#333' : '#fff',
      border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.3s ease',
    },
    jobTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: darkMode ? '#fff' : '#333',
    },
    jobCompany: {
      fontSize: '1.2rem',
      color: '#007bff',
      marginBottom: '10px',
    },
    jobLocation: {
      fontSize: '1rem',
      color: darkMode ? '#ccc' : '#666',
      marginBottom: '10px',
    },
    jobType: {
      fontSize: '1rem',
      color: '#28a745',
      marginBottom: '10px',
    },
    jobDescription: {
      fontSize: '1rem',
      color: darkMode ? '#ccc' : '#444',
      marginBottom: '20px',
    },
    jobPostedDate: {
      fontSize: '0.9rem',
      color: darkMode ? '#999' : '#666',
      marginBottom: '10px',
    },
    jobLink: {
      fontSize: '0.9rem',
      color: '#007bff',
      marginBottom: '10px',
      wordBreak: 'break-all',
    },
    applyButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
    },
    darkModeToggle: {
      position: 'absolute',
      top: window.innerWidth <= 768 ? '80px' : '85px',
      right: window.innerWidth <= 768 ? '40px' : '20px',
      padding: '10px',
      backgroundColor: darkMode ? '#444' : '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
      zIndex: 3,
    },
    errorMessage: {
      color: 'red',
      margin: '15px 0',
      fontSize: '1rem',
    },
    backButton: {
      padding: '12px 25px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Banner Image */}
      <div style={styles.banner}></div>
      <div style={styles.overlay}></div>

      {/* Dark Mode Toggle */}
      <button
        style={styles.darkModeToggle}
        onClick={toggleDarkMode}
        onMouseOver={(e) => e.target.style.backgroundColor = darkMode ? '#666' : '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = darkMode ? '#444' : '#007bff'}
      >
        {darkMode ? '🌕' : '🌜'}
      </button>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Job & Internship Portal</h1>
        <p style={styles.subtitle}>Find your next opportunity with us!</p>
      </div>

      {/* Search and Filters */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = darkMode ? '#444' : '#ccc'}
        />
        <select
          value={filters.jobType}
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          style={styles.filterSelect}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = darkMode ? '#444' : '#ccc'}
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
        <input
          type="text"
          placeholder="Filter by location..."
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          style={styles.filterSelect}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = darkMode ? '#444' : '#ccc'}
        />
      </div>

      {/* Error Message */}
      {error && <p style={styles.errorMessage}>{error}</p>}

      {/* Job Listings */}
      {loading ? (
        <p style={{ color: darkMode ? '#fff' : '#333', fontSize: '1rem' }}>Loading jobs...</p>
      ) : (
        <div style={styles.jobList}>
          {jobs.length === 0 ? (
            <p style={{ color: darkMode ? '#fff' : '#333', fontSize: '1rem' }}>
              No jobs found. Try adjusting your search or filters.
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                style={styles.jobCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                <h2 style={styles.jobTitle}>{job.title}</h2>
                <p style={styles.jobCompany}>{job.company}</p>
                <p style={styles.jobLocation}>{job.location}</p>
                <p style={styles.jobType}>{job.type}</p>
                <p style={styles.jobDescription}>{job.description}</p>
                <p style={styles.jobPostedDate}>Posted on: {job.postedDate}</p>
                {job.link && (
                  <p style={styles.jobLink}>
                    Link:{' '}
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#007bff', textDecoration: 'underline' }}
                    >
                      {job.link}
                    </a>
                  </p>
                )}
                <button
                  style={styles.applyButton}
                  onClick={() => handleApply(job.link)}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  Apply Now
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Back to Home Button */}
      <button
        style={styles.backButton}
        onClick={() => navigate('/home')}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        Back to Home
      </button>
    </div>
  );
};

export default JobInternshipPortal;