import React, { useState, useEffect } from 'react';

const JobInternshipPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
  });
  const [darkMode, setDarkMode] = useState(false);

  // Simulate fetching jobs from an API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setJobs([
        {
          id: 1,
          title: 'Software Engineer',
          company: 'Tech Innovators Inc.',
          location: 'San Francisco, CA',
          type: 'Full-time',
          description: 'Develop cutting-edge software solutions for global clients.',
          postedDate: '2023-10-01',
        },
        {
          id: 2,
          title: 'Marketing Intern',
          company: 'Creative Minds Agency',
          location: 'New York, NY',
          type: 'Internship',
          description: 'Assist in creating and executing marketing campaigns.',
          postedDate: '2023-10-05',
        },
        {
          id: 3,
          title: 'Data Analyst',
          company: 'Data Insights Co.',
          location: 'Remote',
          type: 'Part-time',
          description: 'Analyze large datasets to provide actionable insights.',
          postedDate: '2023-09-28',
        },
        {
          id: 4,
          title: 'Product Manager',
          company: 'Innovate Tech',
          location: 'Austin, TX',
          type: 'Full-time',
          description: 'Lead product development and strategy.',
          postedDate: '2023-10-10',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJobType = filters.jobType ? job.type === filters.jobType : true;
    const matchesLocation = filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
    return matchesSearch && matchesJobType && matchesLocation;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px 7vw',
      maxWidth: '100vw',
      background: darkMode ? 'rgb(30, 30, 30)': 'rgb(232, 232, 232)',
       
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
      margin:'5%',
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
      margin:'5%',
      width: '90%',
      height: '300px',
      background: darkMode ? 'rgba(0, 0, 0, 0.52)' : 'rgba(0, 0, 0, 0.52)',
      zIndex: 1,
    },
    header: {
      textAlign: 'center',
      marginBottom: window.innerWidth <= 768 ?'50px':'100px',
      paddingTop: window.innerWidth <= 768 ?'50px':'100px',
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
      color:  '#ccc', 
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
      backgroundColor: darkMode ? 'rgba(26, 26, 26, 0.9)' : 'rgba(249, 249, 249, 0.9)',
      padding: '15px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    searchInput: {
      flex: 1,
      padding: '10px',
      borderRadius: '5px',
      border: `1px solid ${darkMode ? '#444' : '#ccc'}`,
      fontSize: '1rem',
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#333',
    },
    filterSelect: {
      padding: '10px',
      borderRadius: '5px',
      border: `1px solid ${darkMode ? '#444' : '#ccc'}`,
      fontSize: '1rem',
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#333',
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
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
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
      ':hover': {
        backgroundColor: '#0056b3',
      },
    },
    darkModeToggle: {
      position: 'absolute',
      top: window.innerWidth <= 768 ? '80px' : '85px',
      right: window.innerWidth <= 768 ? '40px' : '20px',
      
      padding: '10px 10px',
      backgroundColor: darkMode ? '#444' : '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
      ':hover': {
        backgroundColor: darkMode ? '#666' : '#0056b3',
      },
      zIndex: 3,
      
    },
  };

  return (
    <div style={styles.container}>
      {/* Banner Image */}
      <div style={styles.banner}></div>
      <div style={styles.overlay}></div>

      {/* Dark Mode Toggle */}
      <button style={styles.darkModeToggle} onClick={toggleDarkMode}>
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
        />
        <select
          value={filters.jobType}
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          style={styles.filterSelect}
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
        />
      </div>

      {/* Job Listings */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div style={styles.jobList}>
          {filteredJobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <h2 style={styles.jobTitle}>{job.title}</h2>
              <p style={styles.jobCompany}>{job.company}</p>
              <p style={styles.jobLocation}>{job.location}</p>
              <p style={styles.jobType}>{job.type}</p>
              <p style={styles.jobDescription}>{job.description}</p>
              <p style={styles.jobPostedDate}>Posted on: {job.postedDate}</p>
              <button style={styles.applyButton}>Apply Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobInternshipPortal;