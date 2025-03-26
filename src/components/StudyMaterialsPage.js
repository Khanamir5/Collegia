import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

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
  gap: 1.5rem;
  margin-bottom: 3rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
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
  flex-wrap: wrap;
  padding: 1rem;
`;

const SearchBar = styled.input`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  outline: none;
  min-width: 250px;
  transition: all 0.3s ease;
  &::placeholder { color: rgba(255, 255, 255, 0.5); }
  &:focus {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(165, 180, 252, 0.5);
  }
`;

const FilterDropdown = styled.select`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  &:hover, &:focus {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(165, 180, 252, 0.5);
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
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

const DeleteButton = styled(SecondaryButton)`
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
  &:hover { background: rgba(239, 68, 68, 0.2); }
`;

const DeleteCommentButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: translateY(-2px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const Card = styled(GlassContainer)`
  padding: 1.5rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: white;
  flex: 1;
`;

const CardCategory = styled.span`
  background: rgba(165, 180, 252, 0.2);
  color: #a5b4fc;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0.5rem 0 1.5rem;
  flex: 1;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: auto;
`;

const CardTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ active }) => (active ? '#a5b4fc' : 'rgba(255, 255, 255, 0.5)')};
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ active }) => (active ? '#a5b4fc' : 'white')};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled(GlassContainer)`
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: white;
  flex: 1;
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  &:hover { color: white; }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #a5b4fc;
  margin: 0;
`;

const SectionContent = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ResourceLink = styled.a`
  color: #a5b4fc;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const FloatingActionButton = styled(PrimaryButton)`
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(241, 168, 99, 0.3);
  animation: ${pulse} 2s infinite;
  z-index: 100;
  span { display: none; }
  @media (min-width: 768px) {
    width: auto;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    span { display: inline; }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
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

const FormSelect = styled(FilterDropdown)`
  width: 100%;
  margin-bottom: 1rem;
`;

const CommentsSection = styled(GlassContainer)`
  margin-top: 3rem;
  padding: 1.5rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const CommentsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1.5rem;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Comment = styled(GlassContainer)`
  padding: 1rem;
  border-radius: 8px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: #a5b4fc;
  margin: 0;
`;

const CommentDate = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;

const CommentText = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const DashboardSection = styled(ModalSection)`
  margin-bottom: 2rem;
`;

const DashboardSubtitle = styled(SectionTitle)`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

// Main Component
const ModernStudyHub = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // Get username from localStorage
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState(['All', 'Favorites']);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!username) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      fetchMaterials();
      fetchComments();
      fetchFavorites();
    }
  }, [username, navigate]);

  const fetchMaterials = async () => {
    try {
      const category = activeFilter === 'All' || activeFilter === 'Favorites' ? null : activeFilter;
      const response = await axios.get('http://localhost:8080/api/materials/search', {
        params: { category, query: searchQuery },
      });
      let filteredMaterials = response.data;
      if (activeFilter === 'Favorites') {
        filteredMaterials = response.data.filter(m => favorites.includes(m.id));
      }
      setMaterials(filteredMaterials);
      const uniqueCategories = [...new Set(response.data.map(m => m.category))];
      setCategories(['All', ...uniqueCategories, 'Favorites']);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/favorites/${username}`);
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    if (username) fetchMaterials();
  }, [activeFilter, searchQuery, favorites, username]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate('/login');
  };

  const toggleFavorite = async (id) => {
    try {
      await axios.post('http://localhost:8080/api/favorites', null, {
        params: { userId: username, materialId: id },
      });
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const openModal = (material) => setSelectedMaterial(material);
  const closeModal = () => setSelectedMaterial(null);
  const openDashboard = () => setIsDashboardOpen(true);
  const closeDashboard = () => {
    setIsDashboardOpen(false);
    setEditingMaterial(null);
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customCategory = formData.get('customCategory');
    const selectedCategory = formData.get('category');
    const category = selectedCategory === 'Custom' && customCategory ? customCategory : selectedCategory;

    formData.set('category', category);
    formData.set('date', new Date().toISOString().split('T')[0]);
    formData.set('tags', formData.get('tags'));
    formData.append('userId', username); // Use logged-in username

    try {
      if (editingMaterial) {
        const response = await axios.put(`http://localhost:8080/api/materials/${editingMaterial.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMaterials(materials.map(m => (m.id === editingMaterial.id ? response.data : m)));
      } else {
        const response = await axios.post('http://localhost:8080/api/materials', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMaterials([response.data, ...materials]);
      }
      fetchMaterials();
      closeDashboard();
      e.target.reset();
    } catch (error) {
      console.error('Error saving material:', error.response?.data || error.message);
    }
  };

  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    setIsDashboardOpen(true);
  };

  const handleDeleteMaterial = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await axios.delete(`http://localhost:8080/api/materials/${id}`);
        setMaterials(materials.filter(m => m.id !== id));
        setFavorites(favorites.filter(favId => favId !== id));
      } catch (error) {
        console.error('Error deleting material:', error);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        text: newComment,
        date: new Date().toISOString().split('T')[0],
      };
      try {
        const response = await axios.post('http://localhost:8080/api/comments', comment, {
          params: { userId: username },
        });
        setComments([response.data, ...comments]);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleDeleteComment = async (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`http://localhost:8080/api/comments/${id}`, {
          params: { userId: username },
        });
        setComments(comments.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting comment:', error.response?.data || error.message);
      }
    }
  };

  const renderUserMaterialsSection = () => (
    <DashboardSection>
      <DashboardSubtitle>Your Uploads</DashboardSubtitle>
      {materials.filter(m => m.uploadedBy === username).length > 0 ? (
        <Grid style={{ marginTop: '1rem' }}>
          {materials.filter(m => m.uploadedBy === username).map(material => (
            <Card key={material.id}>
              <CardHeader>
                <CardTitle>{material.title}</CardTitle>
                <CardCategory>{material.category}</CardCategory>
              </CardHeader>
              <CardDescription>{material.description}</CardDescription>
              <CardActions style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <SecondaryButton onClick={() => handleEditMaterial(material)}>
                    Edit
                  </SecondaryButton>
                  <DeleteButton onClick={() => handleDeleteMaterial(material.id)}>
                    Delete
                  </DeleteButton>
                </div>
                <IconButton
                  active={favorites.includes(material.id)}
                  onClick={() => toggleFavorite(material.id)}
                  aria-label={favorites.includes(material.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites.includes(material.id) ? '★' : '☆'}
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Grid>
      ) : (
        <EmptyState style={{ padding: '1rem' }}>
          <EmptyIcon>📤</EmptyIcon>
          <p>You haven't uploaded any resources yet</p>
        </EmptyState>
      )}
    </DashboardSection>
  );

  const renderDashboardModal = () => (
    <ModalOverlay onClick={closeDashboard}>
      <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        <ModalHeader>
          <ModalTitle>{editingMaterial ? 'Edit Resource' : 'Dashboard'}</ModalTitle>
          <ModalClose onClick={closeDashboard} aria-label="Close modal">×</ModalClose>
        </ModalHeader>
        <ModalBody>
          {!editingMaterial && renderUserMaterialsSection()}
          
          <DashboardSection>
            <DashboardSubtitle>
              {editingMaterial ? 'Edit Resource' : 'Add New Resource'}
            </DashboardSubtitle>
            <form onSubmit={handleAddMaterial}>
              <FormGroup>
                <FormLabel>Title*</FormLabel>
                <FormInput 
                  name="title" 
                  placeholder="Resource title" 
                  required 
                  defaultValue={editingMaterial?.title}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Category*</FormLabel>
                <FormSelect 
                  name="category" 
                  required
                  defaultValue={editingMaterial?.category || ''}
                >
                  <option value="" disabled>Select a category</option>
                  {categories.filter(c => c !== 'All' && c !== 'Favorites').map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                  <option value="Custom">Custom Category</option>
                </FormSelect>
                <FormInput 
                  name="customCategory" 
                  placeholder="Enter custom category name" 
                  defaultValue={
                    editingMaterial && !categories.includes(editingMaterial.category) 
                      ? editingMaterial.category 
                      : ''
                  }
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Tags* (comma separated)</FormLabel>
                <FormInput 
                  name="tags" 
                  placeholder="e.g., algebra, vectors, math" 
                  required 
                  defaultValue={editingMaterial?.tags.join(', ')}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Description*</FormLabel>
                <FormTextarea 
                  name="description" 
                  placeholder="Detailed description of the resource" 
                  required 
                  defaultValue={editingMaterial?.description}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>External URL (optional)</FormLabel>
                <FormInput 
                  name="url" 
                  placeholder="https://example.com" 
                  type="url" 
                  defaultValue={editingMaterial?.url}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Upload PDF (optional)</FormLabel>
                <FormInput type="file" name="pdf" accept=".pdf" />
                {editingMaterial?.pdfPath && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <ResourceLink href={editingMaterial.pdfPath} target="_blank">
                      Current PDF: {editingMaterial.pdfPath.split('/').pop()}
                    </ResourceLink>
                  </div>
                )}
              </FormGroup>
              
              <PrimaryButton type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                {editingMaterial ? 'Update Resource' : 'Submit Resource'}
              </PrimaryButton>
              
              {editingMaterial && (
                <SecondaryButton 
                  type="button"
                  onClick={() => {
                    setEditingMaterial(null);
                    closeDashboard();
                  }}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  Cancel
                </SecondaryButton>
              )}
            </form>
          </DashboardSection>

          {!editingMaterial && (
            <DashboardSection>
              <DashboardSubtitle>Your Stats</DashboardSubtitle>
              <SectionContent>
                <p><strong>Materials Uploaded:</strong> {materials.filter(m => m.uploadedBy === username).length}</p>
                <p><strong>Favorites:</strong> {favorites.length}</p>
              </SectionContent>
            </DashboardSection>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );

  if (!username) return null; // Render nothing until redirected

  return (
    <Container>
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title>Modern Study Hub</Title>
            <Subtitle>Find and share educational resources with a community of learners</Subtitle>
          </div>
          <SecondaryButton onClick={handleLogout}>Logout ({username})</SecondaryButton>
        </div>
        
        <SearchFilterWrapper>
          <SearchBar
            type="text"
            placeholder="Search materials, descriptions, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterDropdown value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </FilterDropdown>
        </SearchFilterWrapper>
      </Header>

      {materials.length > 0 ? (
        <Grid>
          {materials.map((material) => (
            <Card key={material.id} onClick={() => openModal(material)}>
              <CardHeader>
                <CardTitle>{material.title}</CardTitle>
                <CardCategory>{material.category}</CardCategory>
              </CardHeader>
              <CardDescription>{material.description}</CardDescription>
              <CardTags>
                {material.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </CardTags>
              <CardMeta>
                <span>By {material.uploadedBy}</span>
                <span>{material.date}</span>
              </CardMeta>
              <CardActions>
                <IconButton
                  active={favorites.includes(material.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(material.id);
                  }}
                  aria-label={favorites.includes(material.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites.includes(material.id) ? '★' : '☆'}
                </IconButton>
                <SecondaryButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (material.pdfPath) window.open(material.pdfPath, '_blank');
                  }}
                >
                  Download
                </SecondaryButton>
              </CardActions>
            </Card>
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <EmptyIcon>📚</EmptyIcon>
          <h3>No materials found</h3>
          <p>Try adjusting your search or filters</p>
        </EmptyState>
      )}

      <CommentsSection>
        <CommentsTitle>Community Discussions</CommentsTitle>
        <CommentForm onSubmit={handleAddComment}>
          <FormTextarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts or ask a question..."
            required
          />
          <PrimaryButton type="submit">Post Comment</PrimaryButton>
        </CommentForm>
        <CommentList>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <CommentHeader>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <CommentDate>{comment.date}</CommentDate>
                  {comment.author === username && (
                    <DeleteCommentButton
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </DeleteCommentButton>
                  )}
                </div>
              </CommentHeader>
              <CommentText>{comment.text}</CommentText>
            </Comment>
          ))}
        </CommentList>
      </CommentsSection>

      <FloatingActionButton onClick={openDashboard}>
        <span>Add Resource</span>
        <span>+</span>
      </FloatingActionButton>

      {selectedMaterial && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedMaterial.title}</ModalTitle>
              <ModalClose onClick={closeModal} aria-label="Close modal">×</ModalClose>
            </ModalHeader>
            <ModalBody>
              <ModalSection>
                <SectionTitle>Description</SectionTitle>
                <SectionContent>{selectedMaterial.description}</SectionContent>
              </ModalSection>
              
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <ModalSection style={{ flex: 1 }}>
                  <SectionTitle>Details</SectionTitle>
                  <SectionContent>
                    <p><strong>Category:</strong> {selectedMaterial.category}</p>
                    <p><strong>Uploaded By:</strong> {selectedMaterial.uploadedBy}</p>
                    <p><strong>Date:</strong> {selectedMaterial.date}</p>
                  </SectionContent>
                </ModalSection>
                
                <ModalSection style={{ flex: 1 }}>
                  <SectionTitle>Tags</SectionTitle>
                  <CardTags>
                    {selectedMaterial.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </CardTags>
                </ModalSection>
              </div>
              
              {(selectedMaterial.url || selectedMaterial.pdfPath) && (
                <ModalSection>
                  <SectionTitle>Resources</SectionTitle>
                  <SectionContent>
                    {selectedMaterial.url && (
                      <p>
                        <ResourceLink href={selectedMaterial.url} target="_blank" rel="noopener noreferrer">
                          <span>🔗</span> External Link
                        </ResourceLink>
                      </p>
                    )}
                    {selectedMaterial.pdfPath && (
                      <p>
                        <ResourceLink href={selectedMaterial.pdfPath} target="_blank" rel="noopener noreferrer">
                          <span>📄</span> View PDF
                        </ResourceLink>
                      </p>
                    )}
                  </SectionContent>
                </ModalSection>
              )}
              
              <PrimaryButton 
                onClick={() => {
                  if (selectedMaterial.pdfPath) window.open(selectedMaterial.pdfPath, '_blank');
                }}
                style={{ marginTop: '1rem' }}
              >
                Download Resource
              </PrimaryButton>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {isDashboardOpen && renderDashboardModal()}
    </Container>
  );
};

export default ModernStudyHub;