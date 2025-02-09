import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaMicrophone, FaBell, FaChevronDown, FaUserCircle, FaBars } from 'react-icons/fa';
import { MdFileUpload, MdFileDownload, MdChat, MdBook, MdLibraryBooks } from 'react-icons/md';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(12, 12, 12, 0.507);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  z-index: 100;
  
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
//   font-weight: bold;
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
    left: 40px;
    top: 60px;
    left: 0;
    width: 100%;
    
    border-radius: 0 0 18px 18px;
    background-color:rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(20px);
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
     background:rgba(26, 25, 25, 0.81);
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
    font-size: .4rem;
    

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  svg {
  
    margin-left: 10px;
    cursor: pointer;
    transition: color 0.3s ease;
    font-size: .8rem;

    &:hover {
      color: #f75c7e;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;


// Highlighted changes for larger icons
const NotificationIcon = styled(FaBell)`
  font-size: 1.8rem; /* Increased size */
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color:rgb(16, 173, 29);
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

  return (
    <NavbarContainer>
      <Logo className="rubik-glitch-pop-regular"><a href='/'>Collegia.</a> </Logo>

      <HamburgerIcon onClick={toggleMenu}>
        <FaBars />
      </HamburgerIcon>

      <Menu open={menuOpen}>


        {/* Search, Notification, Profile Menu inside Hamburger on small screens */}
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



        {/* <MenuItem >
          <a href="#features" >Features <FaChevronDown /></a>
          <Dropdown>
            <DropdownItem><a href="StudentSocial">Social Network</a></DropdownItem>
            <DropdownItem><a href="CampusJobBoard">Job/Internship Board</a></DropdownItem>
            <DropdownItem><a href="EventManagement">Event Management</a></DropdownItem>
            <DropdownItem><a href="StudentBudgeting">Student Budgeting</a></DropdownItem>
            <DropdownItem><a href="ResearchCollaboration">Research Collaboration</a></DropdownItem>
            <DropdownItem><a href="SafetyAwareness">Safety Awareness</a></DropdownItem>
            <DropdownItem><a href="PeerMentorship">Peer Mentorship</a></DropdownItem>
            <DropdownItem><a href="AIPage">AI-driven Insights</a></DropdownItem>
          </Dropdown>
        </MenuItem> */}

        <MenuItem>
          <a href="/about">About Us</a>
        </MenuItem>


        <MenuItem>
          <a href="/blogs">Blogs</a>
        </MenuItem>


        {/* <MenuItem>
          <a href="#pages">Pages <FaChevronDown /></a>
          <Dropdown>
            <DropdownItem><a href="/about">About Us</a></DropdownItem>
            <DropdownItem><a href="/ContactUs">Contact Us</a></DropdownItem>
          </Dropdown>
        </MenuItem> */}

        {/* <MenuItem>
          <a href="#extras">Extras <FaChevronDown /></a>
          <Dropdown>
            <DropdownItem><a href="/StudyMaterials"><MdBook /> Study Material</a></DropdownItem>
            <DropdownItem><a href="/download"><MdFileDownload /> Download</a></DropdownItem>
            <DropdownItem><a href="/chat"><MdChat /> Chat</a></DropdownItem>
            <DropdownItem><a href="/blogs"><MdLibraryBooks />Blogs</a></DropdownItem>
          </Dropdown>
        </MenuItem> */}

        {/* <MenuItem>
          <a href="#login">Login <FaChevronDown /></a>
          <Dropdown>
            <DropdownItem><a href="/login">Student</a></DropdownItem>
            <DropdownItem><a href="/login/faculty">Faculty</a></DropdownItem>
            <DropdownItem><a href="/login/admin">Admin</a></DropdownItem>
          </Dropdown>
        </MenuItem> */}



        <MenuItem>
          <a href="#notifications" style={{ marginTop: "-1px", display: "flex", alignItems: "center" }}>
            <FaBell style={{ fontSize: "27px", marginLeft: "0px", marginTop: "-10px", color: "#f75c7e", transition: "color 0.3s ease-in-out" }} /><span className="notification-text">Notification</span>
          </a>
        </MenuItem>



        <MenuItem>
          <a href="#Profile" style={{ marginTop: "-7px", display: "flex", alignItems: "center" }}>
            <FaUserCircle style={{ fontSize: "27px", marginLeft: "0px", marginTop: "-10px", color: "#f75c7e", transition: "color 0.3s ease-in-out" }} /> Profile
          </a>
          <Dropdown>

            <ProfileItem><a href="/UserProfilePage">User Profile</a></ProfileItem>
            <ProfileItem><a href="/Leaderboard">Leaderboard</a></ProfileItem>
            <ProfileItem><a href="/Settings">Settings</a></ProfileItem>
            <ProfileItem><a href="/Help">Help</a></ProfileItem>
            <DropdownItem><a href="/logout">Login/Logout</a></DropdownItem>
          </Dropdown>
        </MenuItem>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;
