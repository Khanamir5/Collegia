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

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const UserCard = styled(GlassContainer)`
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

const UserTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: white;
`;

const UserMeta = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.25rem 0;
`;

const UserActions = styled.div`
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

const roles = ['User', 'Admin'];

const UserManagementDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'User',
    createdAt: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
      console.log('Fetched users:', response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const userData = {
      ...formData,
      createdAt: formData.createdAt || new Date().toISOString().split('T')[0],
    };

    try {
      if (editId) {
        const response = await axios.put(`http://localhost:8080/api/users/${editId}`, userData);
        setUsers(users.map(user => (user.id === editId ? response.data : user)));
        setSuccess('User updated successfully!');
        setEditId(null);
      } else {
        const response = await axios.post('http://localhost:8080/api/users', userData);
        setUsers([...users, response.data]);
        setSuccess('User created successfully!');
      }
      setFormData({ username: '', email: '', role: 'User', createdAt: '' });
    } catch (error) {
      console.error('Error saving user:', error);
      setError('Failed to save user.');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
    setEditId(user.id);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
        setSuccess('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user.');
      }
    }
  };

  return (
    <Container>
      <Header>
        <Title>User Management Dashboard</Title>
        <Subtitle>Manage user accounts and roles</Subtitle>
      </Header>

      <FormContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Username*</FormLabel>
            <FormInput
              type="text"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Email*</FormLabel>
            <FormInput
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Role*</FormLabel>
            <FormSelect
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Created At (optional)</FormLabel>
            <FormInput
              type="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleInputChange}
            />
          </FormGroup>

          <PrimaryButton type="submit" style={{ width: '100%' }}>
            {editId ? 'Update User' : 'Create User'}
          </PrimaryButton>
        </form>
      </FormContainer>

      <Header>
        <Title>Your Users</Title>
        <Subtitle>View and manage existing users</Subtitle>
      </Header>

      {users.length === 0 ? (
        <EmptyState>
          <EmptyIcon>👤</EmptyIcon>
          <h3>No users yet</h3>
          <p>Create your first user using the form above</p>
        </EmptyState>
      ) : (
        <UserGrid>
          {users.map(user => (
            <UserCard key={user.id}>
              <UserTitle>{user.username}</UserTitle>
              <UserMeta><strong>Email:</strong> {user.email}</UserMeta>
              <UserMeta><strong>Role:</strong> {user.role}</UserMeta>
              <UserMeta><strong>Created:</strong> {user.createdAt}</UserMeta>
              <UserActions>
                <SuccessButton onClick={() => handleEdit(user)}>
                  Edit
                </SuccessButton>
                <DangerButton onClick={() => handleDelete(user.id)}>
                  Delete
                </DangerButton>
              </UserActions>
            </UserCard>
          ))}
        </UserGrid>
      )}

      <ButtonGroup>
        <SecondaryButton onClick={() => navigate('/home')}>
          Back to Home
        </SecondaryButton>
      </ButtonGroup>
    </Container>
  );
};

export default UserManagementDashboard;