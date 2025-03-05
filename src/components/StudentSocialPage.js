import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiMessageCircle,
  FiUsers,
  FiHeart,
  FiMessageSquare,
  FiShare,
  FiPlus,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const SocialNetworkPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "Nishant",
      content: "Enjoying the beautiful weather today! 🌞",
      image: "https://images.unsplash.com/photo-1561915511-0184090c2bdb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 12,
      comments: [],
      shares: 1,
      liked: false,
    },
    {
      id: 2,
      username: "Udity",
      content: "Just finished a great book! 📚",
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhZGluZyUyMGJvb2tzfGVufDB8fDB8fHww",
      likes: 8,
      comments: [],
      shares: 0,
      liked: false,
    },
    {
      id: 3,
      username: "Tripti",
      content: 'Watching Pakistani-drama "KMKT❤️"',
      image: "https://m.media-amazon.com/images/M/MV5BODU1NmViMjQtZWMxMC00YTg2LTg3NGYtMWMzYTZkNjY4ODFmXkEyXkFqcGc@._V1_QL75_UX804_.jpg",
      likes: 12,
      comments: [],
      shares: 1,
      liked: false,
    },
    {
      id: 4,
      username: "Uddalok",
      content: "Going to gym 💪",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww",
      likes: 8,
      comments: [],
      shares: 0,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [commentInput, setCommentInput] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const username = localStorage.getItem("username");


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
          username: username,
          content: newPost,
          image: "",
          likes: 0,
          comments: [],
          shares: 0,
          liked: false,
        };
        setPosts([post, ...posts]);
        setNewPost("");
        setIsPosting(false);
      }, 1000); // Simulate API delay
    }
  };

  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleCommentSubmit = (postId) => {
    if (commentInput.trim()) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, { id: post.comments.length + 1, text: commentInput }] }
            : post
        )
      );
      setCommentInput("");
      setActivePostId(null);
    }
  };

  const suggestedConnections = [
    { id: 1, name: "Gaurav", avatar: "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg" },
    { id: 2, name: "Aditya", avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png" },
    { id: 3, name: "Gourav", avatar: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid" },
    { id: 4, name: "Subham", avatar: "https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" },
  ];

  const renderContent = () => {
    switch (activeNav) {
      case "Home":
        return (
          <>
            {/* Post Creation Interface */}
            <motion.form
              onSubmit={handlePostSubmit}
              style={{ ...styles.postForm, backgroundColor: isDarkMode ? "#444" : "#fff" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                style={{ ...styles.postInput, backgroundColor: isDarkMode ? "#555" : "#f0f2f5", color: isDarkMode ? "#fff" : "#333" }}
              />
              <button
                type="submit"
                style={{ ...styles.postButton, backgroundColor: isDarkMode ? "#6a11cb" : "#2575fc" }}
                disabled={isPosting}
              >
                {isPosting ? "Posting..." : "Post"}
              </button>
            </motion.form>

            {/* Feed of Posts */}
            <div style={styles.feed}>
              <AnimatePresence>
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    style={{ ...styles.postCard, backgroundColor: isDarkMode ? "#444" : "#fff" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 style={{ ...styles.postUsername, color: isDarkMode ? "#fff" : "#333" }}>{post.username}</h3>
                    <p style={{ ...styles.postContent, color: isDarkMode ? "#ddd" : "#555" }}>{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="Post" style={styles.postImage} />
                    )}
                    <div style={styles.postActions}>
                      <button
                        style={{ ...styles.actionButton, color: post.liked ? "#ff4757" : isDarkMode ? "#fff" : "#555" }}
                        onClick={() => handleLike(post.id)}
                      >
                        <FiHeart size={18} /> {post.likes}
                      </button>
                      <button
                        style={{ ...styles.actionButton, color: isDarkMode ? "#fff" : "#555" }}
                        onClick={() => setActivePostId(post.id === activePostId ? null : post.id)}
                      >
                        <FiMessageSquare size={18} /> {post.comments.length}
                      </button>
                      <button style={{ ...styles.actionButton, color: isDarkMode ? "#fff" : "#555" }}>
                        <FiShare size={18} /> {post.shares}
                      </button>
                    </div>

                    {/* Comment Section */}
                    {activePostId === post.id && (
                      <motion.div
                        style={styles.commentSection}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <textarea
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Write a comment..."
                          style={{ ...styles.commentInput, backgroundColor: isDarkMode ? "#555" : "#f0f2f5", color: isDarkMode ? "#fff" : "#333" }}
                        />
                        <button
                          style={{ ...styles.commentButton, backgroundColor: isDarkMode ? "#6a11cb" : "#2575fc" }}
                          onClick={() => handleCommentSubmit(post.id)}
                        >
                          Comment
                        </button>
                        {post.comments.map((comment) => (
                          <div key={comment.id} style={{ ...styles.comment, backgroundColor: isDarkMode ? "#555" : "#f0f2f5" }}>
                            <p style={{ color: isDarkMode ? "#ddd" : "#555" }}>{comment.text}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        );
      case "Profile":
        return <div style={{ color: isDarkMode ? "#fff" : "#333" }}>Profile Content</div>;
      case "Messages":
        return <div style={{ color: isDarkMode ? "#fff" : "#333" }}>Messages Content</div>;
      case "Groups":
        return <div style={{ color: isDarkMode ? "#fff" : "#333" }}>Groups Content</div>;
      default:
        return null;
    }
  };

  return (
    <div style={{ ...styles.page, backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f2f5" }}>
      {/* Header */}
      <motion.header
        style={{ ...styles.header, backgroundColor: isDarkMode ? "#333" : "#fff" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ ...styles.heading, color: isDarkMode ? "#fff" : "#333" }}>College Social Network</h1>
        <button
          style={styles.themeToggle}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <FiSun size={24} color="#fff" /> : <FiMoon size={24} color="#333" />}
        </button>
      </motion.header>

      {/* Top Navbar */}
      {!isLargeScreen && (
        <motion.div
          style={{
            position: "sticky",
            top: 75,
            borderRadius: 20,
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px 0",
            backgroundColor: isDarkMode ? "#333" : "#fff",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="top-navbar"
        >
          {[
            { icon: <FiHome size={24} />, label: "Home" },
            { icon: <FiUser size={24} />, label: "Profile" },
            { icon: <FiMessageCircle size={24} />, label: "Messages" },
            { icon: <FiUsers size={24} />, label: "Groups" },
          ].map((item, index) => (
            <motion.div
              key={index}
              style={{
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: activeNav === item.label ? (isDarkMode ? "#444" : "#f0f2f5") : "transparent",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveNav(item.label)}
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Three-column layout */}
      <div style={styles.layout}>
        {/* Left Sidebar */}
        {isLargeScreen && (
          <motion.div
            style={{ ...styles.sidebar, backgroundColor: isDarkMode ? "#333" : "#fff" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="left-sidebar"
          >
            <nav style={styles.nav}>
              <ul style={styles.navList}>
                {[
                  { icon: <FiHome size={24} />, label: "Home" },
                  { icon: <FiUser size={24} />, label: "Profile" },
                  { icon: <FiMessageCircle size={24} />, label: "Messages" },
                  { icon: <FiUsers size={24} />, label: "Groups" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    style={{
                      ...styles.navItem,
                      color: isDarkMode ? "#fff" : "#333",
                      backgroundColor: activeNav === item.label ? (isDarkMode ? "#444" : "#f0f2f5") : "transparent",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveNav(item.label)}
                  >
                    {item.icon} {item.label}
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}

        {/* Main Content Area */}
        <div style={styles.mainContent}>{renderContent()}</div>

        {/* Right Sidebar */}
        {isLargeScreen && (
          <motion.div
            style={{ ...styles.sidebar, backgroundColor: isDarkMode ? "#333" : "#fff" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="right-sidebar"
          >
            <h3 style={{ ...styles.suggestionsHeading, color: isDarkMode ? "#fff" : "#333" }}>Suggested Connections</h3>
            {suggestedConnections.map((user) => (
              <motion.div
                key={user.id}
                style={{
                  ...styles.connectionCard,
                  backgroundColor: isDarkMode ? "#444" : "#f0f2f5",
                  background: isDarkMode
                    ? "linear-gradient(145deg, #444, #333)"
                    : "linear-gradient(145deg, #f0f2f5, #e0e2e5)",
                  boxShadow: isDarkMode
                    ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                    : "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                whileHover={{ scale: 1.03, boxShadow: isDarkMode ? "0 8px 12px rgba(0, 0, 0, 0.5)" : "0 8px 12px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Avatar with Bounce Animation */}
                <motion.img
                  src={user.avatar}
                  alt={user.name}
                  style={styles.connectionAvatar}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Name and Connect Button Container */}
                <div style={styles.nameButtonContainer}>
                  {/* User Name */}
                  <p style={{ ...styles.connectionName, color: isDarkMode ? "#fff" : "#333" }}>{user.name}</p>

                  {/* Connect Button with Loading State */}
                  <motion.button
                    style={{
                      ...styles.connectButton,
                      backgroundColor: isDarkMode ? "#6a11cb" : "#2575fc",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Simulate a connection request
                      setTimeout(() => {
                        alert(`Sent connection request to ${user.name}`);
                      }, 1000);
                    }}
                  >
                    Connect
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        style={{ ...styles.floatingButton, backgroundColor: isDarkMode ? "#6a11cb" : "#2575fc" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FiPlus size={24} color="#fff" />
      </motion.button>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
    minHeight: "100vh",
    transition: "background 0.3s",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    background: "#2575FC",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  themeToggle: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  layout: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    '@media (max-width: 1024px)': {
      flexDirection: "column",
    },
  },
  sidebar: {
    width: "250px",
    borderRadius: "15px",
    padding: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: "80px",
    height: "fit-content",
    '@media (max-width: 1024px)': {
      display: "none",
    },
  },
  nav: {
    marginBottom: "20px",
  },
  navList: {
    listStyle: "none",
    padding: "0",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    fontSize: "1.1rem",
    padding: "10px",
    borderRadius: "10px",
    transition: "background 0.3s",
  },
  mainContent: {
    flex: 1,
    borderRadius: "15px",
    padding: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    '@media (max-width: 1024px)': {
      width: "100%",
    },
  },
  postForm: {
    marginBottom: "20px",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  postInput: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    resize: "none",
    fontSize: "1rem",
    transition: "background 0.3s, color 0.3s",
  },
  postButton: {
    marginTop: "10px",
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  feed: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  postCard: {
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s",
  },
  postUsername: {
    margin: "0 0 10px 0",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  postContent: {
    margin: "0 0 10px 0",
    fontSize: "1rem",
  },
  postImage: {
    width: "100%",
    borderRadius: "10px",
  },
  postActions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 10px",
    background: "none",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "color 0.3s",
  },
  commentSection: {
    marginTop: "10px",
  },
  commentInput: {
    width: "100%",
    height: "60px",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    resize: "none",
    fontSize: "1rem",
    transition: "background 0.3s, color 0.3s",
  },
  commentButton: {
    marginTop: "10px",
    padding: "5px 10px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background 0.3s",
  },
  comment: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "10px",
  },
  suggestionsHeading: {
    margin: "0 0 10px 0",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  connectionCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "10px",
    padding: "15px",
    borderRadius: "15px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  connectionAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    transition: "all 0.3s ease",
  },
  nameButtonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  connectionName: {
    margin: "0",
    fontSize: "1rem",
    fontWeight: "500",
  },
  connectButton: {
    padding: "8px 16px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    width: "100%",
  },
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "15px",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default SocialNetworkPage;