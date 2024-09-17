// src/components/Leaderboard.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FaShareAlt } from 'react-icons/fa';

// Set up modal accessibility
Modal.setAppElement('#root');

// Styled components for the leaderboard
const LeaderboardContainer = styled.div`
  background: #f4f4f4;
  color: #333;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
`;

const LeaderboardHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    color: #0056b3;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;

  button {
    background-color: #ffffff;
    color: #0056b3;
    border: 2px solid #0056b3;
    padding: 12px 24px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      background-color: #0056b3;
      color: #ffffff;
    }

    &.active {
      background-color: #0056b3;
      color: #ffffff;
    }
  }
`;

const Filters = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;

  select {
    padding: 12px;
    border: 2px solid #0056b3;
    border-radius: 20px;
    background-color: #ffffff;
    color: #0056b3;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #003d7a;
      outline: none;
    }
  }
`;

const SearchBar = styled.input`
  padding: 12px;
  border: 2px solid #0056b3;
  border-radius: 20px;
  background-color: #ffffff;
  color: #333;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;

  &::placeholder {
    color: #999;
  }
`;

const Table = styled.table`
  width: 100%;
  max-width: 1000px;
  border-collapse: collapse;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #0056b3;
    color: #ffffff;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;

    th, td {
      padding: 10px;
    }
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 12px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003d7a;
  }
`;

// Main Leaderboard component
const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [timeFilter, setTimeFilter] = useState('allTime');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  // Dummy data
  const data = [...Array(10)].map((_, index) => ({
    rank: index + 1,
    student: `Student ${index + 1}`,
    score: Math.floor(Math.random() * 1000),
    category: categoryFilter === 'all' ? activeTab : categoryFilter,
  }));

  // Filter and search logic
  const filteredData = data.filter(item =>
    item.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <LeaderboardContainer>
      <LeaderboardHeader>
        <h1>Leaderboard</h1>
        <p>Check out the top achievers and see how you rank!</p>
      </LeaderboardHeader>

      <SearchBar
        type="text"
        placeholder="Search by student name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <Filters>
        <select value={timeFilter} onChange={handleTimeFilterChange}>
          <option value="allTime">All Time</option>
          <option value="thisMonth">This Month</option>
          <option value="thisWeek">This Week</option>
        </select>

        <select value={categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="all">All Categories</option>
          <option value="academic">Academic Achievement</option>
          <option value="involvement">Campus Involvement</option>
          <option value="career">Career Readiness</option>
          <option value="research">Research Contributions</option>
          <option value="mentorship">Mentorship</option>
          <option value="community">Community Service</option>
        </select>
      </Filters>

      <Tabs>
        {['overall', 'academic', 'involvement', 'career', 'research', 'mentorship', 'community'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </Tabs>

      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>Score</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.rank}</td>
              <td>{item.student}</td>
              <td>{item.score}</td>
              <td>{item.category}</td>
              <td>
                <Button onClick={handleOpenModal}>
                  <FaShareAlt /> Share
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            backgroundColor: '#ffffff',
            color: '#333',
            borderRadius: '10px',
            padding: '20px',
            width: '80%',
            maxWidth: '500px',
            margin: 'auto',
          },
        }}
      >
        <ModalContent>
          <h2>Share Leaderboard</h2>
          <p>Share this leaderboard with your friends and colleagues!</p>
          <Button onClick={handleCloseModal}>Close</Button>
        </ModalContent>
      </Modal>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
