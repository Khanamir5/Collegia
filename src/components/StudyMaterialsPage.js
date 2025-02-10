import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Container = styled.div`
  padding: 20px;
  background: ${({ theme }) => (theme === 'dark' ? '#1e1e1e' : '#f9f9f9')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
`;

const HeroSection = styled.section`
  background: url('https://images.pexels.com/photos/5472309/pexels-photo-5472309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') no-repeat center center/cover;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SearchBar = styled.input`
  padding: 15px;
  width: 80%;
  max-width: 600px;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1.5s ease-out;
`;

const UploadSection = styled.section`
  background: ${({ theme }) => (theme === 'dark' ? '#2c2c2c' : '#fff')};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  transition: background 0.3s, box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DragDropArea = styled.div`
  border: 2px dashed ${({ theme }) => (theme === 'dark' ? '#555' : '#ddd')};
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => (theme === 'dark' ? '#f75c7e' : '#f75c7e')};
  }
`;

const MaterialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const MaterialCard = styled.div`
  background: ${({ theme }) => (theme === 'dark' ? '#2c2c2c' : '#fff')};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const MaterialTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
`;

const MaterialMeta = styled.p`
  color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#666')};
  margin-bottom: 10px;
`;

const MaterialTags = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background: ${({ theme }) => (theme === 'dark' ? '#444' : '#f75c7e')};
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.875rem;
`;

const MaterialActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: ${({ theme }) => (theme === 'dark' ? '#444' : '#f75c7e')};
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => (theme === 'dark' ? '#555' : '#e64a73')};
  }
`;

const CommentsSection = styled.section`
  background: ${({ theme }) => (theme === 'dark' ? '#2c2c2c' : '#fff')};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
  transition: background 0.3s, box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 2px solid ${({ theme }) => (theme === 'dark' ? '#555' : '#ddd')};
  border-radius: 15px;
  background: ${({ theme }) => (theme === 'dark' ? '#1e1e1e' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  margin-bottom: 20px;
  resize: none;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #f75c7e;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background: ${({ theme }) => (theme === 'dark' ? '#1e1e1e' : '#f9f9f9')};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  margin-bottom: 10px;
`;

const CommentText = styled.p`
  color: ${({ theme }) => (theme === 'dark' ? '#bbb' : '#666')};
`;

const ThemeToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #f75c7e;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #e64a73;
  }
`;

// Main Component
const StudyMaterialsPage = () => {
  const [theme, setTheme] = useState('light');
  const [materials, setMaterials] = useState([
    { id: 1, title: 'Introduction to Algebra', type: 'Document', category: 'Class Notes', uploadedBy: 'John Doe', subject: 'Math', date: '2024-09-10', url: '', tags: ['Math', 'Notes'], rating: 4.5 },
    { id: 2, title: 'Physics Chapter 1', type: 'Document', category: 'Class Notes', uploadedBy: 'Jane Smith', subject: 'Physics', date: '2024-09-09', url: '', tags: ['Physics', 'Notes'], rating: 4.0 },
    { id: 3, title: 'Organic Chemistry PDF', type: 'Document', category: 'Books PDF', uploadedBy: 'Emma Johnson', subject: 'Chemistry', date: '2024-09-08', url: '', tags: ['Chemistry', 'Books'], rating: 4.7 },
    { id: 4, title: 'History of Ancient Rome', type: 'Document', category: 'Books PDF', uploadedBy: 'Michael Brown', subject: 'History', date: '2024-09-07', url: '', tags: ['History', 'Books'], rating: 4.2 },
    { id: 5, title: 'Introduction to Computer Science', type: 'Video', category: 'Class Videos', uploadedBy: 'Robert Wilson', subject: 'Computer Science', date: '2024-09-06', url: 'https://www.youtube.com/embed/video-id-1', tags: ['CS', 'Videos'], rating: 4.8 },
  ]);
  const [comments, setComments] = useState([
    { id: 1, author: 'Gourav', text: 'Great resources! Thank you!' },
    { id: 2, author: 'Aditya', text: 'I found the history lecture very insightful.' },
  ]);
  const [newComment, setNewComment] = useState('');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { id: comments.length + 1, author: 'Anonymous', text: newComment }]);
    setNewComment('');
  };

  return (
    <Container theme={theme}>
      <ThemeToggle onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </ThemeToggle>

      <HeroSection>
        <HeroContent>
          <HeroTitle>Study Materials</HeroTitle>
          <SearchBar type="text" placeholder="Search for materials..." />
        </HeroContent>
      </HeroSection>

      <UploadSection theme={theme}>
        <h2>Upload Study Material</h2>
        <UploadForm>
          <DragDropArea theme={theme}>
            <p>Drag & Drop files here or click to upload</p>
          </DragDropArea>
          <ActionButton type="submit">Upload</ActionButton>
        </UploadForm>
      </UploadSection>

      <MaterialGrid>
        {materials.map((material) => (
          <MaterialCard key={material.id} theme={theme}>
            <MaterialTitle>{material.title}</MaterialTitle>
            <MaterialMeta>Uploaded by {material.uploadedBy} on {material.date}</MaterialMeta>
            <MaterialTags>
              {material.tags.map((tag, index) => (
                <Tag key={index} theme={theme}>{tag}</Tag>
              ))}
            </MaterialTags>
            <MaterialActions>
              <ActionButton theme={theme}>Download</ActionButton>
              <ActionButton theme={theme}>View</ActionButton>
            </MaterialActions>
          </MaterialCard>
        ))}
      </MaterialGrid>

      <CommentsSection theme={theme}>
        <h2>Comments</h2>
        <form onSubmit={handleCommentSubmit}>
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            theme={theme}
          />
          <ActionButton type="submit" theme={theme}>Submit</ActionButton>
        </form>
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id} theme={theme}>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentText>{comment.text}</CommentText>
            </CommentItem>
          ))}
        </CommentList>
      </CommentsSection>
    </Container>
  );
};

export default StudyMaterialsPage;