import React from 'react';
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
import EventManagement from './components/EventManagement';
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

// Authentication check based on username
const isAuthenticated = () => {
  const username = localStorage.getItem('username');
  return username !== null;
};

// Custom component to handle conditional rendering
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
      {!isAuthPage && <MobileNavigation />}
    </>
  );
};

// PrivateRoute component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Login />} />
            <Route path="/login" element={isAuthenticated() ? <Navigate to="/home" /> : <Login />} />
            <Route path="/signup" element={isAuthenticated() ? <Navigate to="/home" /> : <Signup />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/about" element={<PrivateRoute element={<AboutUsPage />} />} />
            <Route path="/ResearchCollaboration" element={<PrivateRoute element={<ResearchCollaborationPage />} />} />
            <Route path="/SafetyAwareness" element={<PrivateRoute element={<SafetyAwarenessPage />} />} />
            <Route path="/PeerMentorship" element={<PrivateRoute element={<PeerMentorshipPage />} />} />
            <Route path="/StudentBudgeting" element={<PrivateRoute element={<StudentBudgetingPage />} />} />
            <Route path="/StudentSocial" element={<PrivateRoute element={<StudentSocialPage />} />} />
            <Route path="/Tools" element={<PrivateRoute element={<Tools />} />} />
            <Route path="/CampusJobBoard" element={<PrivateRoute element={<CampusJobBoard />} />} />
            <Route path="/EventManagement" element={<PrivateRoute element={<EventManagement />} />} />
            <Route path="/AIPage" element={<PrivateRoute element={<AIPage />} />} />
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
    </div>
  );
};

export default App;