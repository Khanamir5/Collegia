import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHome, FiUser, FiMessageCircle, FiUsers, 
  FiHeart, FiMessageSquare, FiShare2, FiPlus, 
  FiMoon, FiSun, FiImage, FiLink, FiMoreHorizontal 
} from "react-icons/fi";
import styled, { keyframes } from 'styled-components';

// Animations
const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(165, 180, 252, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(165, 180, 252, 0); }
  100% { box-shadow: 0 0 0 0 rgba(165, 180, 252, 0); }
`;

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
  padding: 1rem;
  
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  transition: all 0.3s ease;
`;

const Header = styled(GlassCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  position: sticky;
  top: 1rem;
  z-index: 100;
`;

const AppTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(90deg,rgb(208, 215, 248),rgb(139, 141, 247));
  -webkit-background-clip: text;
  background-clip: text;
  
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 380px;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled(GlassCard)`
  position: sticky;
  top: calc(1rem + 80px);
  height: fit-content;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ active }) => (active ? '#a5b4fc' : 'rgba(255, 255, 255, 0.8)')};
  background: ${({ active }) => (active ? 'rgba(165, 180, 252, 0.1)' : 'transparent')};
  
  &:hover {
    background: rgba(165, 180, 252, 0.1);
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
`;

const CreatePostCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  
`;

const PostInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  outline: none;
  resize: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MediaButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const MediaButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #a5b4fc;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FeedContainer = styled.div`
  display: flex;
  
  flex-direction: column;
  gap: 1.5rem;
`;

const PostCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled(motion.img)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(165, 180, 252, 0.3);
`;

const Username = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: white;
`;

const PostTime = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

const PostContent = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

const PostImage = styled(motion.img)`
  width: 100%;
  border-radius: 12px;
  max-height: 500px;
  object-fit: cover;
  cursor: pointer;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ReactionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-radius: 50px;
  color: ${({ active }) => (active ? '#a5b4fc' : 'rgba(255, 255, 255, 0.7)')};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #a5b4fc;
  }
`;

const CommentSection = styled(motion.div)`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #a5b4fc;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CommentButton = styled(PrimaryButton)`
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CommentAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentContent = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 12px;
`;

const CommentAuthor = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
`;

const CommentText = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const SuggestionsCard = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: white;
`;

const ConnectionCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ConnectionAvatar = styled(UserAvatar)`
  width: 48px;
  height: 48px;
`;

const ConnectionInfo = styled.div`
  flex: 1;
`;

const ConnectionName = styled(Username)`
  font-size: 0.95rem;
`;

const ConnectionMeta = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

const ConnectButton = styled(PrimaryButton)`
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
`;

const MobileNav = styled(GlassCard)`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-around;
  padding: 0.75rem;
  border-radius: 50px;
  z-index: 100;
  
  @media (min-width: 1025px) {
    display: none;
  }
`;

const NavIcon = styled(motion.div)`
  padding: 0.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active }) => (active ? '#a5b4fc' : 'rgba(255, 255, 255, 0.7)')};
  background: ${({ active }) => (active ? 'rgba(165, 180, 252, 0.1)' : 'transparent')};
  cursor: pointer;
`;

const FloatingButton = styled(PrimaryButton)`
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${pulse} 2s infinite;
  
  @media (min-width: 1025px) {
    display: none;
  }
`;

const ThemeToggle = styled(PrimaryButton)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialNetworkPage = () => {
  // Sample data
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Nishant",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      content: "Enjoying the beautiful weather today! 🌞",
      image: "https://images.unsplash.com/photo-1561915511-0184090c2bdb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 12,
      comments: [
        { id: 1, user: { name: "Aditya", avatar: "https://randomuser.me/api/portraits/men/2.jpg" }, text: "Looks amazing!" },
        { id: 2, user: { name: "Gourav", avatar: "https://randomuser.me/api/portraits/men/3.jpg" }, text: "Where is this?" }
      ],
      shares: 1,
      liked: false,
      time: "2 hours ago"
    },
    {
      id: 2,
      user: {
        name: "Udity",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
      },
      content: "Just finished a great book! 📚 Highly recommend 'Atomic Habits' by James Clear. It's transformed how I think about building good habits and breaking bad ones.",
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhZGluZyUyMGJvb2tzfGVufDB8fDB8fHww",
      likes: 8,
      comments: [],
      shares: 0,
      liked: false,
      time: "5 hours ago"
    },
    {
      id: 3,
      user: {
        name: "Tripti",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      content: 'Watching Pakistani-drama "KMKT❤️" - the storyline is so engaging!',
      image: "https://m.media-amazon.com/images/M/MV5BODU1NmViMjQtZWMxMC00YTg2LTg3NGYtMWMzYTZkNjY4ODFmXkEyXkFqcGc@._V1_QL75_UX804_.jpg",
      likes: 24,
      comments: [
        { id: 1, user: { name: "Subham", avatar: "https://randomuser.me/api/portraits/men/4.jpg" }, text: "I love this drama too!" }
      ],
      shares: 3,
      liked: true,
      time: "1 day ago"
    },
    {
      id: 4,
      user: {
        name: "Uddalok",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg"
      },
      content: "Just hit a new PR at the gym today! 💪 Consistency is key. 6 months ago I could barely bench 135lbs, now I'm up to 225lbs!",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww",
      likes: 18,
      comments: [],
      shares: 2,
      liked: false,
      time: "2 days ago"
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [commentInput, setCommentInput] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [showImageModal, setShowImageModal] = useState(null);

  const suggestedConnections = [
    { 
      id: 1, 
      name: "Gaurav", 
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      mutualConnections: 5,
      bio: "Software Developer"
    },
    { 
      id: 2, 
      name: "Aditya", 
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      mutualConnections: 3,
      bio: "UI/UX Designer"
    },
    { 
      id: 3, 
      name: "Gourav", 
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      mutualConnections: 8,
      bio: "Data Scientist"
    },
    { 
      id: 4, 
      name: "Subham", 
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
      mutualConnections: 2,
      bio: "Product Manager"
    },
    { 
      id: 5, 
      name: "Rahul", 
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      mutualConnections: 4,
      bio: "Marketing Specialist"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setIsPosting(true);
      setTimeout(() => {
        const post = {
          id: posts.length + 1,
          user: {
            name: "You",
            avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
          },
          content: newPost,
          image: "",
          likes: 0,
          comments: [],
          shares: 0,
          liked: false,
          time: "Just now"
        };
        setPosts([post, ...posts]);
        setNewPost("");
        setIsPosting(false);
      }, 1000);
    }
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } 
        : post
    ));
  };

  const handleCommentSubmit = (postId) => {
    if (commentInput.trim()) {
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [
                ...post.comments, 
                { 
                  id: post.comments.length + 1, 
                  user: { 
                    name: "You", 
                    avatar: "https://randomuser.me/api/portraits/lego/1.jpg" 
                  }, 
                  text: commentInput 
                }
              ] 
            } 
          : post
      ));
      setCommentInput("");
      setActivePostId(null);
    }
  };

  const handleShare = (postId) => {
    const post = posts.find(p => p.id === postId);
    alert(`Shared post by ${post.user.name}: "${post.content.substring(0, 30)}..."`);
  };

  const handleConnect = (userId) => {
    alert(`Connection request sent to ${suggestedConnections.find(u => u.id === userId).name}`);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    switch (activeNav) {
      case "Home":
        return (
          <>
            <CreatePostCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PostInput
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
              />
              <PostActions>
                <MediaButtons>
                  <MediaButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FiImage /> Photo
                  </MediaButton>
                  <MediaButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FiLink /> Link
                  </MediaButton>
                </MediaButtons>
                <PrimaryButton
                  onClick={handlePostSubmit}
                  disabled={isPosting || !newPost.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPosting ? "Posting..." : "Post"}
                </PrimaryButton>
              </PostActions>
            </CreatePostCard>

            <FeedContainer>
              <AnimatePresence>
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PostHeader>
                      <UserInfo>
                        <UserAvatar 
                          src={post.user.avatar} 
                          alt={post.user.name}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        />
                        <div>
                          <Username>{post.user.name}</Username>
                          <PostTime>{post.time}</PostTime>
                        </div>
                      </UserInfo>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)' }}
                      >
                        <FiMoreHorizontal />
                      </motion.button>
                    </PostHeader>

                    <PostContent>{post.content}</PostContent>

                    {post.image && (
                      <PostImage
                        src={post.image}
                        alt="Post"
                        onClick={() => setShowImageModal(post.image)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      />
                    )}

                    <PostFooter>
                      <ReactionButton
                        onClick={() => handleLike(post.id)}
                        active={post.liked}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiHeart /> {post.likes}
                      </ReactionButton>
                      <ReactionButton
                        onClick={() => setActivePostId(post.id === activePostId ? null : post.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiMessageSquare /> {post.comments.length}
                      </ReactionButton>
                      <ReactionButton
                        onClick={() => handleShare(post.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiShare2 /> {post.shares}
                      </ReactionButton>
                    </PostFooter>

                    {activePostId === post.id && (
                      <CommentSection
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CommentInputWrapper>
                          <CommentInput
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Write a comment..."
                          />
                          <CommentButton
                            onClick={() => handleCommentSubmit(post.id)}
                            disabled={!commentInput.trim()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Post
                          </CommentButton>
                        </CommentInputWrapper>

                        {post.comments.length > 0 && (
                          <CommentList>
                            {post.comments.map((comment) => (
                              <CommentItem key={comment.id}>
                                <CommentAvatar src={comment.user.avatar} alt={comment.user.name} />
                                <CommentContent>
                                  <CommentAuthor>{comment.user.name}</CommentAuthor>
                                  <CommentText>{comment.text}</CommentText>
                                </CommentContent>
                              </CommentItem>
                            ))}
                          </CommentList>
                        )}
                      </CommentSection>
                    )}
                  </PostCard>
                ))}
              </AnimatePresence>
            </FeedContainer>
          </>
        );
      case "Profile":
        return (
          <GlassCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Profile Page</h2>
            <p>Coming soon with more features!</p>
          </GlassCard>
        );
      case "Messages":
        return (
          <GlassCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Messages</h2>
            <p>Your conversations will appear here.</p>
          </GlassCard>
        );
      case "Groups":
        return (
          <GlassCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Groups</h2>
            <p>Join or create groups to connect with like-minded people.</p>
          </GlassCard>
        );
      default:
        return null;
    }
  };

  return (
    <AppContainer>
      {/* Header */}
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AppTitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Campus Connect
        </AppTitle>
        
      </Header>

      {/* Mobile Navigation */}
      {!isLargeScreen && (
        <MobileNav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: <FiHome />, label: "Home" },
            { icon: <FiUser />, label: "Profile" },
            { icon: <FiMessageCircle />, label: "Messages" },
            { icon: <FiUsers />, label: "Groups" },
          ].map((item) => (
            <NavIcon
              key={item.label}
              active={activeNav === item.label}
              onClick={() => setActiveNav(item.label)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.icon}
            </NavIcon>
          ))}
        </MobileNav>
      )}

      {/* Main Layout */}
      <LayoutGrid>
        {/* Left Sidebar */}
        {isLargeScreen && (
          <Sidebar
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <NavList>
              {[
                { icon: <FiHome />, label: "Home" },
                { icon: <FiUser />, label: "Profile" },
                { icon: <FiMessageCircle />, label: "Messages" },
                { icon: <FiUsers />, label: "Groups" },
              ].map((item) => (
                <NavItem
                  key={item.label}
                  active={activeNav === item.label}
                  onClick={() => setActiveNav(item.label)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.icon} {item.label}
                </NavItem>
              ))}
            </NavList>
          </Sidebar>
        )}

        {/* Main Content */}
        <MainContent>{renderContent()}</MainContent>

        {/* Right Sidebar */}
        {isLargeScreen && (
          <SuggestionsCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SectionTitle>Suggested Connections</SectionTitle>
            {suggestedConnections.map((user) => (
              <ConnectionCard
                key={user.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ConnectionAvatar 
                  src={user.avatar} 
                  alt={user.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
                <ConnectionInfo>
                  <ConnectionName>{user.name}</ConnectionName>
                  <ConnectionMeta>
                    {user.mutualConnections} mutual connections • {user.bio}
                  </ConnectionMeta>
                </ConnectionInfo>
                <ConnectButton
                  onClick={() => handleConnect(user.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect
                </ConnectButton>
              </ConnectionCard>
            ))}
          </SuggestionsCard>
        )}
      </LayoutGrid>

      {/* Floating Action Button (Mobile) */}
      {!isLargeScreen && (
        <FloatingButton
          onClick={() => setActiveNav("Home")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiPlus />
        </FloatingButton>
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(null)}
          >
            <motion.img
              src={showImageModal}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                borderRadius: '12px'
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </AppContainer>
  );
};

export default SocialNetworkPage;