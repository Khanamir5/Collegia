import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaSmile, FaFileUpload, FaUserFriends, FaUsers, FaChalkboardTeacher, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

// Styled Components
const ChatAppContainer = styled.div`
  display: flex;
  height: 93vh;
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  z-index: 10;

  @media (min-width: 768px) {
    transform: none;
    position: static;
    width: 300px;
  }
`;

const SidebarOverlay = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 5;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #0078d4;
  color: #ffffff;
`;

const SidebarToggle = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  
@media (min-width: 768px) {
    display: none;
  }


`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-left: 8px;
    outline: none;
  }
`;

const CategoryTitle = styled.h3`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

const ContactList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => props.isSelected ? '#e1e1e1' : 'transparent'};

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }
`;

const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-left: 1px solid #ddd;
  margin-left: ${props => props.isSidebarOpen ? '300px' : '0'};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ChatHeader = styled.div`
  background-color: #0078d4;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #005a9e;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Message = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  max-width: 60%;
  background-color: ${props => props.isOwn ? '#0078d4' : '#ffffff'};
  color: ${props => props.isOwn ? '#ffffff' : '#000000'};
  align-self: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid ${props => props.isOwn ? '#0078d4' : '#ffffff'};
    border-right: 10px solid transparent;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    left: ${props => props.isOwn ? 'auto' : '10px'};
    right: ${props => props.isOwn ? '10px' : 'auto'};
    bottom: -10px;
  }

  span {
    font-size: 14px;
  }
`;

const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #ffffff;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
  outline: none;

  &:focus {
    border-color: #0078d4;
  }
`;

const SendButton = styled.button`
  background-color: #0078d4;
  border: none;
  color: #ffffff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #005a9e;
  }
`;

const EmojiButton = styled.button`
  background-color: #0078d4;
  border: none;
  color: #ffffff;
  padding: 10px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #005a9e;
  }
`;

const FileUploadButton = styled.label`
  background-color: #0078d4;
  border: none;
  color: #ffffff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;

  input {
    display: none;
  }

  &:hover {
    background-color: #005a9e;
  }
`;

// Dummy data with individual message histories and Indian names
const dummyContacts = {
  friends: [
    { id: '1', name: 'Aarav Sharma', profilePicture: 'https://via.placeholder.com/50', messages: [{ id: 1, text: 'Hey there!', isOwn: false }, { id: 2, text: 'Hi!', isOwn: true }] },
    { id: '2', name: 'Isha Patel', profilePicture: 'https://via.placeholder.com/50', messages: [{ id: 3, text: 'How’s it going?', isOwn: false }, { id: 4, text: 'Good, and you?', isOwn: true }] },
    { id: '3', name: 'Rohan Kumar', profilePicture: 'https://via.placeholder.com/50', messages: [{ id: 5, text: 'What’s up?', isOwn: false }, { id: 6, text: 'Just working on a project.', isOwn: true }] },
    { id: '4', name: 'Neha Gupta', profilePicture: 'https://via.placeholder.com/50', messages: [{ id: 7, text: 'Are we meeting tomorrow?', isOwn: false }] },
  ],
  groups: [
    { id: '1', name: 'Study Group', profilePicture: 'https://via.placeholder.com/50', messages: [{ id: 8, text: 'Let’s study together!', isOwn: false }, { id: 9, text: 'Sure, what time?', isOwn: true }] },
    { id: '2', name: 'Fitness Club', profilePicture: 'https://via.placeholder.com/50', messages: [{ id: 10, text: 'Workout session at 7 AM.', isOwn: false }, { id: 11, text: 'Got it!', isOwn: true }] },
  ],
  mentors: [
    { id: '1', name: 'Rajesh Mehta', profilePicture: 'https://via.placeholder.com/50', messages: [{ id: 12, text: 'How’s your project going?', isOwn: false }, { id: 13, text: 'Great, thanks for asking!', isOwn: true }] },
    { id: '2', name: 'Pooja Singh', profilePicture: 'https://via.placeholder.com/50', messages: [{ id: 14, text: 'Any updates on the assignment?', isOwn: false }, { id: 15, text: 'Almost done, will send by tomorrow.', isOwn: true }] },
  ],
};


const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('friends');
  const [selectedContact, setSelectedContact] = useState(dummyContacts.friends[0] || {});
  const [messages, setMessages] = useState(selectedContact.messages || []);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(selectedContact.messages || []);
  }, [selectedContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setMessages(contact.messages);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), text: input, isOwn: true }]);
      setInput('');
    }
  };

  return (
    <ChatAppContainer>
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarHeader>
          <h2>Contacts</h2>
          <SidebarToggle onClick={() => setIsSidebarOpen(false)}>
            <FaTimes />
          </SidebarToggle>
        </SidebarHeader>

        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Search..." />
        </SearchBar>

        <CategoryTitle><FaUserFriends /> Friends</CategoryTitle>
        <ContactList>
          {dummyContacts.friends.map(friend => (
            <ContactItem
              key={friend.id}
              isSelected={selectedContact.id === friend.id}
              onClick={() => handleSelectContact(friend)}
            >
              <img src={friend.profilePicture} alt="Profile" />
              <span>{friend.name}</span>
            </ContactItem>
          ))}
        </ContactList>

        <CategoryTitle><FaUsers /> Groups</CategoryTitle>
        <ContactList>
          {dummyContacts.groups.map(group => (
            <ContactItem
              key={group.id}
              isSelected={selectedContact.id === group.id}
              onClick={() => handleSelectContact(group)}
            >
              <img src={group.profilePicture} alt="Profile" />
              <span>{group.name}</span>
            </ContactItem>
          ))}
        </ContactList>

        <CategoryTitle><FaChalkboardTeacher /> Mentors</CategoryTitle>
        <ContactList>
          {dummyContacts.mentors.map(mentor => (
            <ContactItem
              key={mentor.id}
              isSelected={selectedContact.id === mentor.id}
              onClick={() => handleSelectContact(mentor)}
            >
              <img src={mentor.profilePicture} alt="Profile" />
              <span>{mentor.name}</span>
            </ContactItem>
          ))}
        </ContactList>
      </Sidebar>

      <SidebarOverlay isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />

      <ChatWindow isSidebarOpen={isSidebarOpen}>
        <ChatHeader>
          <img src={selectedContact.profilePicture} alt="Profile" />
          <h2>{selectedContact.name}</h2>
          <SidebarToggle onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </SidebarToggle>
        </ChatHeader>

        <MessagesContainer>
          {messages.map(msg => (
            <Message key={msg.id} isOwn={msg.isOwn}>
              {msg.text}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <MessageInputContainer>
          <FileUploadButton>
            <FaFileUpload size={20} />
            <input type="file" />
          </FileUploadButton>
          <EmojiButton>
            <FaSmile size={20} />
          </EmojiButton>
          <MessageInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <SendButton onClick={handleSendMessage}>
            <FaPaperPlane size={20} />
          </SendButton>
        </MessageInputContainer>
      </ChatWindow>
    </ChatAppContainer>
  );
};

export default ChatPage;
