import React, { useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { FaSave, FaTrash, FaLock, FaLanguage, FaRegClock, FaUserCog } from 'react-icons/fa';

// Styled components
const SettingsContainer = styled.div`
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const SettingsHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    color: #333;
  }
`;

const Section = styled.section`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    color: #007bff;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DropzoneArea = styled.div`
  border: 2px dashed #007bff;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;

  p {
    margin: 0;
    font-size: 1rem;
    color: #007bff;
  }

  img {
    max-width: 100%;
    max-height: 200px;
    margin-top: 10px;
    border-radius: 5px;
  }
`;

const NotificationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input[type="checkbox"] {
    cursor: pointer;
  }
`;

const DeleteAccountButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 2px solid #ddd;
  }
`;

const Settings = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    profilePicture: null,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });
  const [accountSettings, setAccountSettings] = useState({
    language: 'en',
    timezone: 'GMT',
    visibility: 'public',
  });

  const onDrop = (acceptedFiles) => {
    setProfileData({
      ...profileData,
      profilePicture: URL.createObjectURL(acceptedFiles[0]),
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({ ...notificationSettings, [name]: checked });
  };

  const handleAccountSettingsChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings({ ...accountSettings, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Data:', profileData);
    console.log('Notification Settings:', notificationSettings);
    console.log('Account Settings:', accountSettings);
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <h1>Settings</h1>
      </SettingsHeader>

      <Section>
        <SectionTitle><FaUserCog /> Profile</SectionTitle>
        <form onSubmit={handleSubmit}>
          <ProfilePicture>
            {profileData.profilePicture ? (
              <img src={profileData.profilePicture} alt="Profile" />
            ) : (
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#ddd' }}></div>
            )}
            <div {...getRootProps()} style={{ cursor: 'pointer', border: '2px dashed #007bff', borderRadius: '50%', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <input {...getInputProps()} />
              {!profileData.profilePicture && <p>Upload</p>}
            </div>
          </ProfilePicture>

          <InputGroup>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={profileData.password}
              onChange={handleInputChange}
            />
          </InputGroup>

          <Button type="submit"><FaSave /> Save Changes</Button>
        </form>
      </Section>

      <Section>
        <SectionTitle><FaLock /> Security Settings</SectionTitle>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="twoFactorAuth">
              <input
                type="checkbox"
                id="twoFactorAuth"
                name="twoFactorAuth"
                checked={false} // Placeholder, manage actual state
              />
              Enable Two-Factor Authentication
            </label>
          </InputGroup>

          <Button type="submit"><FaSave /> Save Changes</Button>
        </form>
      </Section>

      <Section>
        <SectionTitle><FaLanguage /> Account Settings</SectionTitle>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="language">Preferred Language</label>
            <select
              id="language"
              name="language"
              value={accountSettings.language}
              onChange={handleAccountSettingsChange}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              {/* Add more languages as needed */}
            </select>
          </InputGroup>

          <InputGroup>
            <label htmlFor="timezone">Timezone</label>
            <select
              id="timezone"
              name="timezone"
              value={accountSettings.timezone}
              onChange={handleAccountSettingsChange}
            >
              <option value="GMT">GMT</option>
              <option value="IST">IST</option>
              <option value="PST">PST</option>
              {/* Add more timezones as needed */}
            </select>
          </InputGroup>

          <InputGroup>
            <label htmlFor="visibility">Account Visibility</label>
            <select
              id="visibility"
              name="visibility"
              value={accountSettings.visibility}
              onChange={handleAccountSettingsChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="custom">Custom</option>
            </select>
          </InputGroup>

          <Button type="submit"><FaSave /> Save Changes</Button>
        </form>
      </Section>

      <Section>
        <SectionTitle><FaRegClock /> Notification Settings</SectionTitle>
        <NotificationSection>
          <NotificationItem>
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              checked={notificationSettings.emailNotifications}
              onChange={handleNotificationChange}
            />
            <label htmlFor="emailNotifications">Email Notifications</label>
          </NotificationItem>

          <NotificationItem>
            <input
              type="checkbox"
              id="smsNotifications"
              name="smsNotifications"
              checked={notificationSettings.smsNotifications}
              onChange={handleNotificationChange}
            />
            <label htmlFor="smsNotifications">SMS Notifications</label>
          </NotificationItem>

          <NotificationItem>
            <input
              type="checkbox"
              id="pushNotifications"
              name="pushNotifications"
              checked={notificationSettings.pushNotifications}
              onChange={handleNotificationChange}
            />
            <label htmlFor="pushNotifications">Push Notifications</label>
          </NotificationItem>

          <Button type="submit"><FaSave /> Save Changes</Button>
        </NotificationSection>
      </Section>

      <Section>
        <SectionTitle><FaTrash /> Account</SectionTitle>
        <DeleteAccountButton>Delete Account</DeleteAccountButton>
      </Section>
    </SettingsContainer>
  );
};

export default Settings;
