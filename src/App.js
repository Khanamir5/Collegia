import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import ScrollToTop from './Extras/ScrollToTop';
import './styles/GlobalStyles.css';
import Home from './Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUsPage from './components/AboutUsPage';
import ResearchCollaborationPage from './components/ResearchCollaborationPage';
import SafetyAwarenessPage from './components/SafetyAwarenessPage';
import PeerMentorshipPage from './components/PeerMentorshipPage';
import StudentBudgetingPage from './components/StudentBudgetingPage';
import StudentSocialPage from './components/StudentSocialPage';
import CampusJobBoard from './components/CampusJobBoard';
import JobDashboard from './components/JobDashboard';
import EventManagement from './components/EventManagement';
import EventDashboard from './components/EventDashboard';
import UserManagementDashboard from './components/UserManagementDashboard';
import AIPage from './components/AIPage';
import UserProfilePage from './components/UserProfilePage';
import Leaderboard from './components/Leaderboard';
import TimelinePage from './components/TimelinePage';
import ChatPage from './components/ChatPage';
import BlogPage from './components/BlogPage';
import ContactUsPage from './components/ContactUsPage';
import StudyMaterialsPage from './components/StudyMaterialsPage';
import Settings from './components/Settings';
import Help from './components/Help';
import MobileNavigation from './components/MobileNavigation';
import Tools from './components/Tools';
import Login from './components/Login';
import Signup from './components/Signup';
import AIVideoSummarizer from './components/AIVideoSummarizer';
import FlashcardGenerator from './components/FlashcardGenerator';
import StudyPlanner from './components/StudyPlanner';
import AdminDashboard from './components/AdminDashboard';

// Authentication check based on username
const isAuthenticated = () => {
  const username = localStorage.getItem('username');
  return username !== null;
};

// Role check for Admin
const isAdmin = () => {
  const role = localStorage.getItem('role');
  return role === 'Admin';
};

// Custom component to handle conditional rendering
const Layout = ({ children, showPopup }) => {
  const location = useLocation();
  const isAuthPage = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
      {!isAuthPage && <MobileNavigation showPopup={showPopup} />}
    </>
  );
};

// PrivateRoute component for general authenticated routes
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// AdminRoute component for Admin-only access with popup
const AdminRoute = ({ element, showPopup }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if (!isAdmin()) {
    showPopup("You don't have access to the Admin Dashboard!");
    return <Navigate to="/home" />;
  }
  return element;
};

const App = () => {
  const [popupMessage, setPopupMessage] = useState(null);

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000); // Hide after 3 seconds
  };

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Layout showPopup={showPopup}>
          <Routes>
            <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Login />} />
            <Route path="/login" element={isAuthenticated() ? <Navigate to="/home" /> : <Login />} />
            <Route path="/signup" element={isAuthenticated() ? <Navigate to="/home" /> : <Signup />} />
            <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} showPopup={showPopup} />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/about" element={<PrivateRoute element={<AboutUsPage />} />} />
            <Route path="/ResearchCollaboration" element={<PrivateRoute element={<ResearchCollaborationPage />} />} />
            <Route path="/SafetyAwareness" element={<PrivateRoute element={<SafetyAwarenessPage />} />} />
            <Route path="/PeerMentorship" element={<PrivateRoute element={<PeerMentorshipPage />} />} />
            <Route path="/StudentBudgeting" element={<PrivateRoute element={<StudentBudgetingPage />} />} />
            <Route path="/StudentSocial" element={<PrivateRoute element={<StudentSocialPage />} />} />
            <Route path="/Tools" element={<PrivateRoute element={<Tools />} />} />
            <Route path="/CampusJobBoard" element={<PrivateRoute element={<CampusJobBoard />} />} />
            <Route path="/JobDashboard" element={<PrivateRoute element={<JobDashboard />} />} />
            <Route path="/UserManagement" element={<PrivateRoute element={<UserManagementDashboard />} />} />
            <Route path="/EventManagement" element={<PrivateRoute element={<EventManagement />} />} />
            <Route path="/EventDashboard" element={<PrivateRoute element={<EventDashboard />} />} />
            <Route path="/AIPage" element={<PrivateRoute element={<AIPage />} />} />
            <Route path="/AIVideoSummarizer" element={<PrivateRoute element={<AIVideoSummarizer />} />} />
            <Route path="/FlashcardGenerator" element={<PrivateRoute element={<FlashcardGenerator />} />} />
            <Route path="/StudyPlanner" element={<PrivateRoute element={<StudyPlanner />} />} />
            <Route path="/UserProfilePage" element={<PrivateRoute element={<UserProfilePage />} />} />
            <Route path="/Leaderboard" element={<PrivateRoute element={<Leaderboard />} />} />
            <Route path="/TimelinePage" element={<PrivateRoute element={<TimelinePage />} />} />
            <Route path="/chat" element={<PrivateRoute element={<ChatPage />} />} />
            <Route path="/blogs" element={<PrivateRoute element={<BlogPage />} />} />
            <Route path="/ContactUs" element={<PrivateRoute element={<ContactUsPage />} />} />
            <Route path="/StudyMaterials" element={<PrivateRoute element={<StudyMaterialsPage />} />} />
            <Route path="/Settings" element={<PrivateRoute element={<Settings />} />} />
            <Route path="/Help" element={<PrivateRoute element={<Help />} />} />
          </Routes>
        </Layout>
      </Router>

      {/* Popup Message */}
      {popupMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 0, 0, 0.9)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 2000,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInOut 3s ease-in-out',
          }}
        >
          {popupMessage}
        </div>
      )}

      {/* CSS Animation for Popup */}
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -20px); }
            10% { opacity: 1; transform: translate(-50%, 0); }
            90% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
          }
        `}
      </style>
    </div>
  );
};

export default App;