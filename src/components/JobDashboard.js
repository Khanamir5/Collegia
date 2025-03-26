import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      console.log('Fetched jobs:', response.data); // Debug log
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
        console.log('Updating job with ID:', editId, 'Data:', jobData); // Debug log
        const response = await axios.put(`http://localhost:8080/api/jobs/${editId}`, jobData);
        console.log('Update response:', response.data); // Debug log
        setSuccess('Job updated successfully!');
        setEditId(null);
      } else {
        console.log('Creating job with Data:', jobData); // Debug log
        const response = await axios.post('http://localhost:8080/api/jobs', jobData);
        console.log('Create response:', response.data); // Debug log
        setSuccess('Job created successfully!');
      }
      setTitle('');
      setCompany('');
      setLocation('');
      setType('');
      setDescription('');
      setPostedDate('');
      setLink('');
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error.response?.data || error.message);
      setError(error.response?.data || 'Failed to save job. Check console for details.');
    }
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
    console.log('Editing job with ID:', job.id); // Debug log
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        console.log('Deleting job with ID:', id); // Debug log
        await axios.delete(`http://localhost:8080/api/jobs/${id}`);
        setSuccess('Job deleted successfully!');
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error.response?.data || error.message);
        setError('Failed to delete job. Check console for details.');
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
    <div style={{
      maxWidth: '700px',
      margin: '50px auto',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{
        color: '#007bff',
        marginBottom: '20px',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>Manage Job Postings</h1>

      {error && <p style={{
        color: 'red',
        marginBottom: '15px',
        fontSize: '1rem'
      }}>{error}</p>}
      {success && <p style={{
        color: '#28a745',
        marginBottom: '15px',
        fontSize: '1rem'
      }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            outline: 'none',
            backgroundColor: '#fff',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={MAX_DESCRIPTION_LENGTH}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            height: '120px',
            resize: 'vertical',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
          {description.length}/{MAX_DESCRIPTION_LENGTH} characters
        </p>
        <input
          type="date"
          value={postedDate}
          onChange={(e) => setPostedDate(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <input
          type="url"
          placeholder="Job Application Link (e.g., https://example.com/apply)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <button
          type="submit"
          style={{
            padding: '12px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          {editId ? 'Update Job' : 'Create Job'}
        </button>
      </form>

      <h2 style={{
        color: '#007bff',
        margin: '30px 0 20px',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>Your Job Postings</h2>
      {jobs.length === 0 ? (
        <p style={{ color: '#666', fontSize: '1rem' }}>No jobs yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            margin: '10px 0',
            borderRadius: '5px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'box-shadow 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)'}
          >
            <h3 style={{ margin: '0 0 10px', color: '#333', fontSize: '1.2rem', fontWeight: 'bold' }}>{job.title}</h3>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '1rem' }}>Company: {job.company}</p>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '1rem' }}>Location: {job.location}</p>
            <p style={{ margin: '5px 0', color: '#28a745', fontSize: '1rem' }}>Type: {job.type}</p>
            <p style={{ margin: '5px 0', color: '#444', fontSize: '1rem' }}>{job.description}</p>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '0.9rem' }}>Posted: {job.postedDate}</p>
            {job.link && (
              <p style={{ margin: '5px 0', color: '#007bff', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                Link: <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>{job.link}</a>
              </p>
            )}
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => handleEdit(job)}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Delete
              </button>
              <button
                onClick={() => handleApply(job.link)}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))
      )}

      <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/jobs')}
          style={{
            padding: '12px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          View Job Portal
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '12px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Manage Blogs
        </button>
        <button
          onClick={() => navigate('/home')}
          style={{
            padding: '12px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default JobDashboard;