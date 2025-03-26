import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus { border-color: #007bff; }
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus { border-color: #007bff; }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus { border-color: #007bff; }
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover { background-color: #0056b3; }
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EventItem = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;

  &:hover { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
`;

const EventTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 10px;
`;

const EventDetail = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
`;

const ActionButton = styled.button`
  padding: 8px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  ${({ type }) =>
    type === 'edit' ? `
      background-color: #28a745;
      &:hover { background-color: #218838; }
    ` : `
      background-color: #dc3545;
      &:hover { background-color: #c82333; }
    `}
  color: white;
`;

const categories = ['Tech', 'Cultural', 'Sports'];

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    image: '',
    category: 'Tech',
    formLink: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setEvents(response.data);
      console.log('Fetched events:', response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editId) {
        const response = await axios.put(`http://localhost:8080/api/events/${editId}`, formData);
        setEvents(events.map(event => (event.id === editId ? response.data : event)));
        setSuccess('Event updated successfully!');
        setEditId(null);
      } else {
        const response = await axios.post('http://localhost:8080/api/events', formData);
        setEvents([...events, response.data]);
        setSuccess('Event created successfully!');
      }
      setFormData({ title: '', date: '', description: '', image: '', category: 'Tech', formLink: '' });
    } catch (error) {
      console.error('Error saving event:', error);
      setError('Failed to save event.');
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      date: event.date,
      description: event.description,
      image: event.image,
      category: event.category,
      formLink: event.formLink,
    });
    setEditId(event.id);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:8080/api/events/${id}`);
        setEvents(events.filter(event => event.id !== id));
        setSuccess('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        setError('Failed to delete event.');
      }
    }
  };

  return (
    <DashboardContainer>
      <Title>Event Dashboard</Title>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: '#28a745', textAlign: 'center' }}>{success}</p>}

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="image"
          placeholder="Event Image URL"
          value={formData.image}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="formLink"
          placeholder="Google Form Link"
          value={formData.formLink}
          onChange={handleInputChange}
          required
        />
        <Select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Select>
        <Button type="submit">{editId ? 'Update Event' : 'Create Event'}</Button>
      </Form>

      <EventList>
        {events.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No events yet.</p>
        ) : (
          events.map(event => (
            <EventItem key={event.id}>
              <EventTitle>{event.title}</EventTitle>
              <EventDetail>Date: {event.date}</EventDetail>
              <EventDetail>{event.description}</EventDetail>
              <EventDetail>Category: {event.category}</EventDetail>
              <EventDetail>Image: <a href={event.image} target="_blank" rel="noopener noreferrer">{event.image}</a></EventDetail>
              <EventDetail>Form: <a href={event.formLink} target="_blank" rel="noopener noreferrer">{event.formLink}</a></EventDetail>
              <div>
                <ActionButton type="edit" onClick={() => handleEdit(event)}>Edit</ActionButton>
                <ActionButton type="delete" onClick={() => handleDelete(event.id)}>Delete</ActionButton>
              </div>
            </EventItem>
          ))
        )}
      </EventList>

      <Button style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} onClick={() => navigate('/events')}>
        View Event Portal
      </Button>
      <Button style={{ marginTop: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} onClick={() => navigate('/home')}>
        Back to Home
      </Button>
    </DashboardContainer>
  );
};

export default EventDashboard;