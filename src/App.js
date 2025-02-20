import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './Extras/ScrollToTop';
import './styles/GlobalStyles.css';
import Home from './Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginSignupPage from './components/LoginSignupPage';
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




const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/ResearchCollaboration" element={<ResearchCollaborationPage />} />
          <Route path="/SafetyAwareness" element={<SafetyAwarenessPage />} />
          <Route path="/PeerMentorship" element={<PeerMentorshipPage />} />
          <Route path="/StudentBudgeting" element={<StudentBudgetingPage />} />
          <Route path="/StudentSocial" element={<StudentSocialPage />} />
          <Route path="/Tools" element={<Tools />} />
          <Route path="/CampusJobBoard" element={<CampusJobBoard />} />
          <Route path="/EventManagement" element={<EventManagement />} />
          <Route path="/AIPage" element={<AIPage />} />
          <Route path="/UserProfilePage" element={<UserProfilePage />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/TimelinePage" element={<TimelinePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/ContactUs" element={<ContactUsPage />} />
          <Route path="/StudyMaterials" element={<StudyMaterialsPage />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Help" element={<Help />} />
          

          {/* Add other routes here */}

        </Routes>

        <Footer />
        <MobileNavigation />
      </Router>




    </div>
  );
};


export default App;
