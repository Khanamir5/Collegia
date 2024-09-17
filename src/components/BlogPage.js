import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTags, FaCalendarAlt, FaUserCircle, FaFilter } from 'react-icons/fa';

// Styled Components
const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url('https://images.pexels.com/photos/5323520/pexels-photo-5323520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-position: center;
  padding: 20px;
  min-height: 100vh;
  backdrop-filter: blur(5px);
`;

const Header = styled.div`
  text-align: center;
  padding: 20px 0;
  color: white;
  h1 {
    font-size: 36px;
    color: #fff;
  }
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  input {
    padding: 10px;
    width: 300px;
    border-radius: 20px;
    border: 1px solid #ccc;
    margin-left: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
    color: #333;
  }

  button {
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 20px;
    background-color: #4a90e2;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #357abd;
    }
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  select {
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
    color: #333;
    cursor: pointer;
  }

  .filter-icon {
    margin-right: 10px;
  }
`;

const BlogPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const BlogPost = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background 0.3s;
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.3);
  }
`;

const BlogThumbnail = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const BlogTitle = styled.h3`
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  color: #ddd;
  margin-bottom: 10px;

  span {
    margin-right: 10px;
    display: flex;
    align-items: center;

    .meta-icon {
      margin-right: 5px;
    }
  }
`;

const BlogDescription = styled.p`
  color: #e0e0e0;
  font-size: 16px;
`;

const DummyPosts = [
  {
    id: 1,
    title: 'How to Ace Coding Interviews',
    description: 'Prepare effectively for coding interviews with these strategies...',
    date: '2023-08-25',
    author: 'John Doe',
    image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Career',
  },
  {
    id: 2,
    title: 'Top 5 JavaScript Frameworks in 2024',
    description: 'A detailed comparison of the top JavaScript frameworks...',
    date: '2023-09-10',
    author: 'Jane Smith',
    image: 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Technology',
  },
  {
    id: 3,
    title: 'The Importance of Mental Health for Students',
    description: 'Understand why mental health is crucial during your college years...',
    date: '2023-07-30',
    author: 'Emily Johnson',
    image: 'https://via.placeholder.com/300x180',
    category: 'Health',
  },
  {
    id: 4,
    title: '5 Research Papers Every Student Should Read',
    description: 'Learn about groundbreaking research papers that can inspire your academic career...',
    date: '2023-09-01',
    author: 'Dr. Alan Smith',
    image: 'https://via.placeholder.com/300x180',
    category: 'Academics',
  },
  {
    id: 5,
    title: 'Networking Tips for College Students',
    description: 'Build a strong network of contacts during your time at university...',
    date: '2023-06-15',
    author: 'Sophia Lee',
    image: 'https://via.placeholder.com/300x180',
    category: 'Career',
  },
  {
    id: 6,
    title: 'The Importance of Mental Health for Students',
    description: 'Understand why mental health is crucial during your college years...',
    date: '2023-07-30',
    author: 'Emily Johnson',
    image: 'https://via.placeholder.com/300x180',
    category: 'Health',
  },
  {
    id: 7,
    title: '5 Research Papers Every Student Should Read',
    description: 'Learn about groundbreaking research papers that can inspire your academic career...',
    date: '2023-09-01',
    author: 'Dr. Alan Smith',
    image: 'https://via.placeholder.com/300x180',
    category: 'Academics',
  },
  {
    id: 8,
    title: 'Networking Tips for College Students',
    description: 'Build a strong network of contacts during your time at university...',
    date: '2023-06-15',
    author: 'Sophia Lee',
    image: 'https://via.placeholder.com/300x180',
    category: 'Career',
  },
  {
    id: 9,
    title: 'Exploring Data Science',
    description: 'Get started with data science with these practical tips...',
    date: '2023-09-12',
    author: 'Alex Kim',
    image: 'https://via.placeholder.com/300x180',
    category: 'Technology',
  },
  {
    id: 10,
    title: 'Managing Stress During Exams',
    description: 'Effective techniques to reduce stress during exam season...',
    date: '2023-08-18',
    author: 'Rachel Green',
    image: 'https://via.placeholder.com/300x180',
    category: 'Health',
  },
  
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleSearch = () => {
    // This will be used to filter the blogs based on search term in the future
  };

  const filteredPosts = DummyPosts.filter(post =>
    (filter === 'All' || post.category === filter) &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <BlogContainer>
      <Header>
        <h1>Blog Posts</h1>
      </Header>

      <SearchBar>
        <FaSearch size={20} color="white" />
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </SearchBar>

      <FiltersContainer>
        <div>
          <FaFilter className="filter-icon" size={20} color="white" />
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="All">All Categories</option>
            <option value="Career">Career</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Academics">Academics</option>
          </select>
        </div>
      </FiltersContainer>

      <BlogPostsContainer>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogPost key={post.id}>
              <BlogThumbnail src={post.image} alt={post.title} />
              <BlogTitle>{post.title}</BlogTitle>
              <BlogMeta>
                <span>
                  <FaCalendarAlt className="meta-icon" size={14} /> {post.date}
                </span>
                <span>
                  <FaUserCircle className="meta-icon" size={14} /> {post.author}
                </span>
              </BlogMeta>
              <BlogDescription>{post.description}</BlogDescription>
            </BlogPost>
          ))
        ) : (
          <p>No blog posts found for the selected filter.</p>
        )}
      </BlogPostsContainer>
    </BlogContainer>
  );
};

export default BlogPage;
