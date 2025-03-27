import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaMicrophone, FaBell, FaUserCircle, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(2, 2, 2, 0.93);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  
  @media (max-width: 768px) {
    padding: 10px;
  }

.notification-text {
  display: none; /* Hidden on large screens */
}

@media (max-width: 768px) {
  .notification-text {
    display: inline; /* Shown only on small screens */
  }
}
`;

const Logo = styled.div`
  font-size: 1.8rem;
  color: #fff;
`;

const HamburgerIcon = styled.div`
  display: none;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 60px;
    width: 100%;
    border-radius: 0 0 18px 18px;
    background-color: rgb(0, 0, 0);
    backdrop-filter: blur(90px);
    padding: 20px;
  }
`;

const MenuItem = styled.li`
  position: relative;
  margin-left: 10px;

  a {
    color: #fff;
    text-decoration: none;
    padding: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #f75c7e;
    }
  }

  svg {
    font-size: 1.6rem;
    margin-left: 10px;
    padding-top: 10px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #f75c7e;
    }
  }

  &:hover > ul {
    display: block;
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const Dropdown = styled.ul`
  display: none;
  position: absolute;
  top: 40px;
  left: -50px;
  background-color: rgba(0, 0, 0, 1);
  backdrop-filter: blur(105px);
  padding: 50px 0px;
  border-radius: 18px;
  list-style: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    padding: 0;
    left: 3px;
    background: rgba(32, 32, 32, 0.81);
  }
`;

const DropdownItem = styled.li`
  a {
    display: block;
    width: 200px;
    padding: 10px 20px;
    color: #fff;
    font-size: 1rem;
    transition: background-color 0.5s ease;

    &:hover {
      background-color: rgba(247, 92, 126, 0.2);
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  margin-left: 10px;
  margin-top: 5px;
  padding: 5px 10px;
  color: #fff;
  height: 80%;

  input {
    background: none;
    border: none;
    color: #fff;
    outline: none;
    font-size: 0.4rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  svg {
    margin-left: 10px;
    cursor: pointer;
    transition: color 0.3s ease;
    font-size: 0.8rem;

    &:hover {
      color: #f75c7e;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NotificationIcon = styled(FaBell)`
  font-size: 1.8rem; /* Increased size */
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: rgb(16, 173, 29);
  }

  @media (max-width: 768px) {
    font-size: 2rem; /* Larger size on small screens */
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 1.8rem; /* Increased size */
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f75c7e;
  }

  @media (max-width: 768px) {
    font-size: 4rem; /* Larger size on small screens */
  }
`;

const ProfileDropdownContainer = styled.div`
  position: relative;

  &:hover > ul {
    display: block;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileMenu = styled.ul`
  display: none;
  position: absolute;
  right: 0;
  top: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 10px 0;
  border-radius: 8px;
  list-style: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  min-width: 200px;
`;

const ProfileItem = styled.li`
  a {
    display: block;
    padding: 10px 20px;
    color: #fff;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(247, 92, 126, 0.2);
    }
  }
`;

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
    toggleMenu(); // Close the menu after logout
  };

  return (
    <NavbarContainer>
      <Logo className="rubik-glitch-pop-regular">
        <Link to="/home" onClick={toggleMenu}>Collegia.</Link>
      </Logo>

      <HamburgerIcon onClick={toggleMenu}>
        <FaBars />
      </HamburgerIcon>

      <Menu open={menuOpen}>
        <SearchContainer>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
          <FaSearch />
          <FaMicrophone />
        </SearchContainer>

        <MenuItem>
          <Link to="/about" onClick={toggleMenu}>About Us</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/ContactUs" onClick={toggleMenu}>Contact Us</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/blogs" onClick={toggleMenu}>Blogs</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/CampusNoticeBoard" style={{ marginTop: '-1px', display: 'flex', alignItems: 'center' }} onClick={toggleMenu}>
            <FaBell style={{ fontSize: '27px', marginLeft: '0px', marginTop: '-10px', color: '#f75c7e', transition: 'color 0.3s ease-in-out' }} />
            <span className="notification-text">Notification</span>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="#Profile" style={{ marginTop: '-7px', display: 'flex', alignItems: 'center' }}>
            <FaUserCircle style={{ fontSize: '27px', marginLeft: '0px', marginTop: '-10px', color: '#f75c7e', transition: 'color 0.3s ease-in-out' }} />
            Profile
          </Link>
          <Dropdown>
            <ProfileItem>
              <Link to="/UserProfilePage" onClick={toggleMenu}>User Profile</Link>
            </ProfileItem>
            <ProfileItem>
              <Link to="/Leaderboard" onClick={toggleMenu}>Leaderboard</Link>
            </ProfileItem>
            <ProfileItem>
              <Link to="/Settings" onClick={toggleMenu}>Settings</Link>
            </ProfileItem>
            <ProfileItem>
              <Link to="/Help" onClick={toggleMenu}>Help</Link>
            </ProfileItem>
          </Dropdown>
        </MenuItem>
        <button onClick={handleLogout} style={{ padding: '10px', background: 'red', color: 'white', border: 'none', borderRadius: '15px' }}>
          Logout
        </button>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;