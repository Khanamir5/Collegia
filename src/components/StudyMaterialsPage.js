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

// Styled Components with Enhanced Responsiveness
const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  padding: 1rem;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
  @media (min-width: 640px) { padding: 1.5rem; }
  @media (min-width: 1024px) { padding: 2rem; }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  @media (min-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 3rem;
    max-width: 1400px;
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
  @media (min-width: 640px) { font-size: 2.5rem; }
  @media (min-width: 1024px) { font-size: 3.5rem; }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 768px) {
    font-size: 1.25rem;
    max-width: 600px;
  }
`;

const SearchFilterWrapper = styled(GlassContainer)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  width: 100%;
  @media (min-width: 640px) {
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
  }
`;

const SearchBar = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  transition: all 0.3s ease;
  &::placeholder { color: rgba(255, 255, 255, 0.5); }
  &:focus {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(165, 180, 252, 0.5);
  }
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    min-width: 250px;
  }
`;

const FilterDropdown = styled.select`
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  width: 100%;
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
  @media (min-width: 640px) {
    padding: 0.75rem 2.5rem 0.75rem 1.5rem;
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
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
  }
  &:active { transform: translateY(0); }
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
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
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: translateY(-2px);
  }
  @media (min-width: 640px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    max-width: 1400px;
  }
`;

const Card = styled(GlassContainer)`
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  @media (min-width: 768px) { padding: 1.5rem; }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: white;
  flex: 1;
  @media (min-width: 768px) { font-size: 1.25rem; }
`;

const CardCategory = styled.span`
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

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin: 0.5rem 0 1rem;
  flex: 1;
  @media (min-width: 768px) { font-size: 0.9rem; }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: auto;
  flex-wrap: wrap;
  gap: 0.5rem;
  @media (min-width: 768px) { font-size: 0.8rem; }
`;

const CardTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.75rem 0;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  font-size: 0.7rem;
  @media (min-width: 768px) {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 640px) { gap: 0.75rem; }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ active }) => (active ? '#a5b4fc' : 'rgba(255, 255, 255, 0.5)')};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ active }) => (active ? '#a5b4fc' : 'white')};
  }
  @media (min-width: 768px) {
    font-size: 1.25rem;
    width: 36px;
    height: 36px;
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
  padding: 0.5rem;
  animation: ${fadeIn} 0.3s ease;
  @media (min-width: 640px) { padding: 1rem; }
`;

const ModalContent = styled(GlassContainer)`
  width: 100%;
  max-width: 90%;
  padding: 1rem;
  max-height: 90vh;
  overflow-y: auto;
  @media (min-width: 640px) {
    padding: 1.5rem;
    max-width: 800px;
  }
  @media (min-width: 1024px) { padding: 2rem; }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: white;
  flex: 1;
  @media (min-width: 768px) { font-size: 1.75rem; }
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.25rem;
  &:hover { color: white; }
  @media (min-width: 768px) {
    font-size: 1.5rem;
    padding: 0.5rem;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) { gap: 1.5rem; }
`;

const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #a5b4fc;
  margin: 0;
  @media (min-width: 768px) { font-size: 1rem; }
`;

const SectionContent = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
  @media (min-width: 768px) { font-size: 0.95rem; }
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
  bottom: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 0;
  box-shadow: 0 4px 12px rgba(241, 168, 99, 0.3);
  animation: ${pulse} 2s infinite;
  z-index: 100;
  span:first-child { display: none; }
  @media (min-width: 640px) {
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
  }
  @media (min-width: 1024px) {
    width: auto;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    span:first-child { display: inline; }
    span:last-child { display: none; }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  @media (min-width: 768px) { margin-bottom: 1rem; }
`;

const FormLabel = styled.label`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  @media (min-width: 768px) { font-size: 0.9rem; }
`;

const FormInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
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
  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  min-height: 100px;
  resize: vertical;
  width: 100%;
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    min-height: 120px;
  }
`;

const FormSelect = styled(FilterDropdown)`
  width: 100%;
  margin-bottom: 0.75rem;
  @media (min-width: 768px) { margin-bottom: 1rem; }
`;

const CommentsSection = styled(GlassContainer)`
  margin-top: 2rem;
  padding: 1rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 768px) {
    margin-top: 3rem;
    padding: 1.5rem;
    max-width: 1400px;
  }
`;

const CommentsTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem;
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  @media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  @media (min-width: 768px) { gap: 1rem; }
`;

const Comment = styled(GlassContainer)`
  padding: 0.75rem;
  border-radius: 8px;
  @media (min-width: 768px) { padding: 1rem; }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CommentAuthor = styled.p`
  font-size: 0.85rem;
  font-weight: 600;
  color: #a5b4fc;
  margin: 0;
  @media (min-width: 768px) { font-size: 0.9rem; }
`;

const CommentDate = styled.p`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  @media (min-width: 768px) { font-size: 0.75rem; }
`;

const CommentText = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  @media (min-width: 768px) { font-size: 0.9rem; }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  @media (min-width: 768px) { padding: 3rem; }
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

const DashboardSection = styled(ModalSection)`
  margin-bottom: 1.5rem;
  @media (min-width: 768px) { margin-bottom: 2rem; }
`;

const DashboardSubtitle = styled(SectionTitle)`
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

// Dummy study materials (unchanged)
const dummyMaterials = [
  {
    id: 1,
    title: "Introduction to Calculus",
    category: "Mathematics",
    description: "Comprehensive guide to basic calculus concepts including derivatives and integrals.",
    tags: ["calculus", "math", "derivatives"],
    uploadedBy: "demoUser",
    date: "2025-03-20",
    url: "https://example.com/calculus-guide",
    pdfPath: "https://example.com/calculus.pdf"
  },
  {
    id: 2,
    title: "Data Structures Notes",
    category: "Computer Science",
    description: "Detailed notes on common data structures like arrays, linked lists, and trees.",
    tags: ["data structures", "programming", "cs"],
    uploadedBy: "demoUser",
    date: "2025-03-21",
    url: "https://example.com/ds-guide",
    pdfPath: "https://example.com/ds.pdf"
  },
  {
    id: 3,
    title: "Organic Chemistry Basics",
    category: "Chemistry",
    description: "Fundamental concepts of organic chemistry with examples and practice problems.",
    tags: ["organic", "chemistry", "science"],
    uploadedBy: "demoUser",
    date: "2025-03-22",
    url: "https://example.com/chem-guide",
    pdfPath: "https://example.com/chem.pdf"
  },
  {
    id: 4,
    title: "World History Timeline",
    category: "History",
    description: "Chronological overview of major historical events from ancient to modern times.",
    tags: ["history", "timeline", "events"],
    uploadedBy: "demoUser",
    date: "2025-03-23",
    url: "https://example.com/history-guide",
    pdfPath: "https://example.com/history.pdf"
  }
];

// Main Component (unchanged logic, styled components updated)
const ModernStudyHub = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
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
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) {
      navigate('/login');
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
      setError('Failed to load materials. Showing sample data instead.');
      let filteredDummy = dummyMaterials;
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredDummy = filteredDummy.filter(m => 
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      if (activeFilter !== 'All' && activeFilter !== 'Favorites') {
        filteredDummy = filteredDummy.filter(m => m.category === activeFilter);
      } else if (activeFilter === 'Favorites') {
        filteredDummy = filteredDummy.filter(m => favorites.includes(m.id));
      }
      
      setMaterials(filteredDummy);
      const uniqueCategories = [...new Set(filteredDummy.map(m => m.category))];
      setCategories(['All', ...uniqueCategories, 'Favorites']);
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
    formData.append('userId', username);

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
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
      <ModalContent onClick={(e) => e.stopPropagation()}>
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
              
              <PrimaryButton type="submit" style={{ width: '100%', marginTop: '0.75rem' }}>
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

  if (!username) return null;

  return (
    <Container>
      <Header>
        <div>
          <Title>Collegia Study Hub</Title>
          <Subtitle>Find and share educational resources with a community of learners</Subtitle>
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

      {error && (
        <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {error}
        </p>
      )}

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
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
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                '@media (min-width: 768px)': { flexDirection: 'row', gap: '2rem' }
              }}>
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
                style={{ marginTop: '0.75rem', width: '100%' }}
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