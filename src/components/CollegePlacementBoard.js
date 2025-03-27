import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(165, 180, 252, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(165, 180, 252, 0); }
  100% { box-shadow: 0 0 0 0 rgba(165, 180, 252, 0); }
`;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(-45deg, #1e1e2f, #3b3b6b, #2a2a4e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
`;

const Header = styled.header`
  max-width: 1400px;
  margin: 0 auto 2rem;
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
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0 0;
`;

const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FilterWrapper = styled(GlassContainer)`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchBar = styled.input`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  outline: none;
  min-width: 250px;
  &::placeholder { color: rgba(255, 255, 255, 0.5); }
  &:focus { background: rgba(255, 255, 255, 0.15); }
`;

const FilterDropdown = styled.select`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const PlacementCard = styled(GlassContainer)`
  padding: 1.5rem;
  animation: ${fadeIn} 0.5s ease;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(165, 180, 252, 0.5);
  }
`;

const StudentName = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.5rem;
`;

const Company = styled.p`
  color: #a5b4fc;
  font-size: 1rem;
  margin: 0 0 0.5rem;
`;

const Detail = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const Tag = styled.span`
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  margin-right: 0.5rem;
`;

const Leaderboard = styled(GlassContainer)`
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 800px;
`;

const LeaderboardTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin: 0 0 1rem;
`;

const LeaderboardItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ExportButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  margin: 2rem auto;
  display: block;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
  }
`;

const StatCard = styled(GlassContainer)`
  padding: 1rem;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
`;

const StatValue = styled.h3`
  font-size: 2rem;
  color: #a5b4fc;
  margin: 0;
`;

const StatLabel = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0 0;
`;

// Updated Dummy placement data with 8 entries
const dummyPlacements = [
  {
    id: 1,
    studentName: "Aarav Sharma",
    company: "Google",
    package: "32 LPA",
    role: "Software Engineer",
    branch: "CSE",
    year: "2025",
    tags: ["tech", "high-package"],
  },
  {
    id: 2,
    studentName: "Priya Patel",
    company: "Goldman Sachs",
    package: "28 LPA",
    role: "Financial Analyst",
    branch: "ECE",
    year: "2025",
    tags: ["finance", "analyst"],
  },
  {
    id: 3,
    studentName: "Rahul Verma",
    company: "Microsoft",
    package: "30 LPA",
    role: "Data Scientist",
    branch: "IT",
    year: "2024",
    tags: ["tech", "data"],
  },
  {
    id: 4,
    studentName: "Sneha Gupta",
    company: "Deloitte",
    package: "22 LPA",
    role: "Consultant",
    branch: "ME",
    year: "2025",
    tags: ["consulting", "management"],
  },
  {
    id: 5,
    studentName: "Vikram Singh",
    company: "Amazon",
    package: "35 LPA",
    role: "SDE",
    branch: "CSE",
    year: "2024",
    tags: ["tech", "high-package"],
  },
  {
    id: 6,
    studentName: "Anjali Nair",
    company: "Tesla",
    package: "33 LPA",
    role: "Hardware Engineer",
    branch: "EEE",
    year: "2025",
    tags: ["tech", "hardware"],
  },
  {
    id: 7,
    studentName: "Karan Mehra",
    company: "McKinsey",
    package: "26 LPA",
    role: "Business Analyst",
    branch: "CIVIL",
    year: "2024",
    tags: ["consulting", "strategy"],
  },
  {
    id: 8,
    studentName: "Divya Reddy",
    company: "Adobe",
    package: "29 LPA",
    role: "UI/UX Designer",
    branch: "CSE",
    year: "2025",
    tags: ["tech", "design"],
  },
];

// Main Component
const CollegePlacementBoard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBranch, setFilterBranch] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const branches = ['All', ...new Set(dummyPlacements.map(p => p.branch))];
  const years = ['All', ...new Set(dummyPlacements.map(p => p.year))];

  const filteredPlacements = dummyPlacements
    .filter(
      p =>
        (filterBranch === 'All' || p.branch === filterBranch) &&
        (filterYear === 'All' || p.year === filterYear) &&
        (p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.role.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.studentName.localeCompare(b.studentName);
      if (sortBy === 'package') {
        return parseInt(b.package) - parseInt(a.package);
      }
      if (sortBy === 'year') return b.year.localeCompare(a.year);
      return 0;
    });

  const topPlacements = dummyPlacements
    .sort((a, b) => parseInt(b.package) - parseInt(a.package))
    .slice(0, 3);

  const stats = {
    totalPlacements: dummyPlacements.length,
    avgPackage: (
      dummyPlacements.reduce((sum, p) => sum + parseInt(p.package), 0) /
      dummyPlacements.length
    ).toFixed(1) + ' LPA',
    highestPackage: Math.max(...dummyPlacements.map(p => parseInt(p.package))) + ' LPA',
  };

  const exportToCSV = () => {
    const headers = 'Student Name,Company,Package,Role,Branch,Year\n';
    const csv = filteredPlacements
      .map(p => `${p.studentName},${p.company},${p.package},${p.role},${p.branch},${p.year}`)
      .join('\n');
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'placement_board.csv';
    link.click();
  };

  return (
    <Container>
      <Header>
        <Title>College Placement Board</Title>
        <Subtitle>Track student placements and celebrate success!</Subtitle>
      </Header>

      {/* Statistics */}
      <Grid style={{ marginBottom: '2rem' }}>
        <StatCard>
          <StatValue>{stats.totalPlacements}</StatValue>
          <StatLabel>Total Placements</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.avgPackage}</StatValue>
          <StatLabel>Average Package</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.highestPackage}</StatValue>
          <StatLabel>Highest Package</StatLabel>
        </StatCard>
      </Grid>

      {/* Filters */}
      <FilterWrapper>
        <SearchBar
          placeholder="Search by name, company, or role..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <FilterDropdown value={filterBranch} onChange={e => setFilterBranch(e.target.value)}>
          {branches.map(branch => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </FilterDropdown>
        <FilterDropdown value={filterYear} onChange={e => setFilterYear(e.target.value)}>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </FilterDropdown>
        <FilterDropdown value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="package">Sort by Package</option>
          <option value="year">Sort by Year</option>
        </FilterDropdown>
      </FilterWrapper>

      {/* Placement Listings */}
      <Grid>
        {filteredPlacements.map(placement => (
          <PlacementCard key={placement.id}>
            <StudentName>{placement.studentName}</StudentName>
            <Company>{placement.company}</Company>
            <Detail><strong>Package:</strong> {placement.package}</Detail>
            <Detail><strong>Role:</strong> {placement.role}</Detail>
            <Detail><strong>Branch:</strong> {placement.branch}</Detail>
            <Detail><strong>Year:</strong> {placement.year}</Detail>
            <div style={{ marginTop: '0.5rem' }}>
              {placement.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </div>
          </PlacementCard>
        ))}
      </Grid>

      {/* Leaderboard */}
      <Leaderboard>
        <LeaderboardTitle>Top Performers</LeaderboardTitle>
        {topPlacements.map((p, index) => (
          <LeaderboardItem key={p.id}>
            <span>{index + 1}. {p.studentName} ({p.company})</span>
            <span>{p.package}</span>
          </LeaderboardItem>
        ))}
      </Leaderboard>

      {/* Export Button */}
      <ExportButton onClick={exportToCSV}>Export to CSV</ExportButton>
    </Container>
  );
};

export default CollegePlacementBoard;