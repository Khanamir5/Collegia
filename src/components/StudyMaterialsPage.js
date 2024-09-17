import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components for the page
const Container = styled.div`
  padding: 50px 20px;
  background: #f9f9f9;
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const Banner = styled.div`
  background: url('https://images.pexels.com/photos/5472309/pexels-photo-5472309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') no-repeat center center/cover;
  height: 350px;
  width: 100%;
  border-radius:25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    font-size: 2rem;
    height: 250px;
  }
`;

const Heading = styled.h1`
  color: #333;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 2.5rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionHeading = styled.h2`
  color: #f75c7e;
  margin-bottom: 30px;
  font-size: 2rem;
  text-align: center;
  border-bottom: 3px solid #f75c7e;
  display: inline-block;
  padding-bottom: 10px;
`;

const UploadSection = styled.section`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 60px;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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

const FileInput = styled.input`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background: #fff;
  &:focus {
    border-color: #f75c7e;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background: #fff;
  &:focus {
    border-color: #f75c7e;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  height: 150px;
  resize: none;
  background: #fff;
  &:focus {
    border-color: #f75c7e;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: #f75c7e;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.125rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: #e64a73;
    transform: scale(1.05);
  }
`;

const MaterialsSection = styled.section`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 60px;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const MaterialList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MaterialItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 15px;
  border: 2px solid #ddd;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const MaterialTitle = styled.div`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
`;

const MaterialMeta = styled.div`
  color: #666;
  margin-bottom: 10px;
`;

const MaterialEmbed = styled.div`
  margin-top: 10px;
  iframe {
    width: 100%;
    height: 200px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  background: #fff;
  &:focus {
    border-color: #f75c7e;
    outline: none;
  }
  @media (min-width: 769px) {
    width: auto;
    max-width: 300px;
  }
`;

const FilterDropdown = styled.select`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  background: #fff;
  &:focus {
    border-color: #f75c7e;
    outline: none;
  }
  @media (min-width: 769px) {
    width: auto;
    max-width: 200px;
  }
`;

const DateFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DatePicker = styled.input`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  background: #fff;
  &:focus {
    border-color: #f75c7e;
    outline: none;
  }
`;

const CommentsSection = styled.section`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin-top: 60px;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CommentInput = styled.textarea`
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 100%;
  height: 120px;
  resize: none;
  margin-bottom: 20px;
  background: #fff;
  &:focus {
    border-color: #f75c7e;
    outline: none;
  }
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 20px;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const CommentText = styled.p`
  color: #666;
`;

// Main component
const StudyMaterialsPage = () => {
  const [materials, setMaterials] = useState([
    { id: 1, title: 'Introduction to Algebra', type: 'Document', category: 'Class Notes', uploadedBy: 'John Doe', subject: 'Math', date: '2024-09-10', url: '' },
    { id: 2, title: 'Physics Chapter 1', type: 'Document', category: 'Class Notes', uploadedBy: 'Jane Smith', subject: 'Physics', date: '2024-09-09', url: '' },
    { id: 3, title: 'Organic Chemistry PDF', type: 'Document', category: 'Books PDF', uploadedBy: 'Emma Johnson', subject: 'Chemistry', date: '2024-09-08', url: '' },
    { id: 4, title: 'History of Ancient Rome', type: 'Document', category: 'Books PDF', uploadedBy: 'Michael Brown', subject: 'History', date: '2024-09-07', url: '' },
    { id: 5, title: 'Introduction to Computer Science', type: 'Video', category: 'Class Videos', uploadedBy: 'Robert Wilson', subject: 'Computer Science', date: '2024-09-06', url: 'https://www.youtube.com/embed/video-id-1' },
    { id: 6, title: 'Advanced Calculus Lecture', type: 'Video', category: 'Class Videos', uploadedBy: 'Lisa Davis', subject: 'Math', date: '2024-09-05', url: 'https://www.youtube.com/embed/video-id-2' },
    { id: 7, title: 'Modern Physics - Lecture Series', type: 'Playlist', category: 'YouTube Videos', uploadedBy: 'Michael Brown', subject: 'Physics', date: '2024-09-04', url: 'https://www.youtube.com/embed/modern-physics-playlist-id' },
    { id: 8, title: 'Data Structures and Algorithms Playlist', type: 'Playlist', category: 'YouTube Videos', uploadedBy: 'James Taylor', subject: 'Computer Science', date: '2024-09-03', url: 'https://www.youtube.com/embed/data-structures-playlist-id' },
    { id: 9, title: 'English Literature Overview', type: 'Document', category: 'Class Notes', uploadedBy: 'Sophia Martinez', subject: 'English', date: '2024-09-02', url: '' }
  ]);

  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { author: 'Gourav', text: 'Great resources! Thank you!' },
    { author: 'Aditya', text: 'I found the history lecture very insightful.' },
  ]);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    filterMaterials(e.target.value, searchQuery, startDate, endDate);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterMaterials(categoryFilter, e.target.value, startDate, endDate);
  };

  const handleDateChange = () => {
    filterMaterials(categoryFilter, searchQuery, startDate, endDate);
  };

  const filterMaterials = (category, query, start, end) => {
    let filtered = materials.filter(material => {
      return (
        (category ? material.category === category : true) &&
        (query ? material.title.toLowerCase().includes(query.toLowerCase()) : true) &&
        (start ? new Date(material.date) >= new Date(start) : true) &&
        (end ? new Date(material.date) <= new Date(end) : true)
      );
    });
    setFilteredMaterials(filtered);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { author: 'Anonymous', text: newComment }]);
    setNewComment('');
  };

  return (
    <Container>
      <Banner>Study Materials</Banner>
      <Heading>Upload Study Material</Heading>
      <UploadSection>
        <UploadForm>
          <FileInput type="file" />
          <Select>
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Computer Science">Computer Science</option>
            <option value="History">History</option>
          </Select>
          <TextArea placeholder="Enter description of the material" />
          <Button type="submit">Upload Material</Button>
        </UploadForm>
      </UploadSection>

      <MaterialsSection>
        <SectionHeading>Available Materials</SectionHeading>
        <FilterSection>
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search materials..."
          />
          <FilterDropdown onChange={handleCategoryChange}>
            <option value="">Filter by Category</option>
            <option value="Class Notes">Class Notes</option>
            <option value="Books PDF">Books PDF</option>
            <option value="Class Videos">Class Videos</option>
            <option value="YouTube Videos">YouTube Videos</option>
          </FilterDropdown>
          <DateFilter>
            <DatePicker
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <DatePicker
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            <Button onClick={handleDateChange}>Filter by Date</Button>
          </DateFilter>
        </FilterSection>
        <MaterialList>
          {filteredMaterials.map((material) => (
            <MaterialItem key={material.id}>
              <MaterialTitle>{material.title}</MaterialTitle>
              <MaterialMeta>Uploaded by {material.uploadedBy} on {material.date}</MaterialMeta>
              {material.type === 'Video' && (
                <MaterialEmbed>
                  <iframe src={material.url} title={material.title} allowFullScreen />
                </MaterialEmbed>
              )}
              {material.type === 'Playlist' && (
                <MaterialEmbed>
                  <iframe src={material.url} title={material.title} allowFullScreen />
                </MaterialEmbed>
              )}
            </MaterialItem>
          ))}
        </MaterialList>
      </MaterialsSection>

      <CommentsSection>
        <SectionHeading>Comments</SectionHeading>
        <form onSubmit={handleCommentSubmit}>
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button type="submit">Submit Comment</Button>
        </form>
        <CommentList>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
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
