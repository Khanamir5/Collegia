import React, { useState } from "react";

const BlogPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null); // Track the selected blog for full view
  const blogsPerPage = 3; // Number of blogs to display per page

  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "The Future of AI in Design",
      category: "Technology",
      date: "October 10, 2023",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      excerpt: "Discover how AI is revolutionizing the design industry and what it means for creatives.",
      content: "Artificial Intelligence (AI) is transforming the design industry by automating repetitive tasks, enabling designers to focus on creativity. Tools like Adobe Sensei and Canva's AI features are making design more accessible and efficient. The future of AI in design is bright, with advancements in generative design and personalized user experiences.",
    },
    {
      id: 2,
      title: "Sustainable Living: A Beginner's Guide",
      category: "Lifestyle",
      date: "October 5, 2023",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      excerpt: "Learn simple steps to adopt a sustainable lifestyle and reduce your carbon footprint.",
      content: "Sustainable living involves making choices that reduce your environmental impact. Start by reducing waste, conserving energy, and supporting eco-friendly products. Small changes, like using reusable bags and composting, can make a big difference. Embrace minimalism and prioritize quality over quantity.",
    },
    {
      id: 3,
      title: "Top 10 Travel Destinations for 2024",
      category: "Travel",
      date: "September 28, 2023",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
      excerpt: "Explore the most breathtaking destinations to add to your travel bucket list.",
      content: "2024 is the year to explore new horizons. From the serene landscapes of Iceland to the vibrant culture of Japan, these destinations offer unforgettable experiences. Don't miss the Northern Lights in Norway or the ancient ruins of Machu Picchu in Peru. Start planning your adventure today!",
    },
    {
      id: 4,
      title: "Mastering React Hooks",
      category: "Technology",
      date: "September 20, 2023",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      excerpt: "A comprehensive guide to understanding and using React Hooks effectively.",
      content: "React Hooks revolutionized functional components by enabling state and lifecycle features. Learn how to use useState, useEffect, and custom hooks to build dynamic and efficient applications. Hooks simplify code and improve readability, making them a must-know for modern React developers.",
    },
    {
      id: 5,
      title: "The Art of Minimalism",
      category: "Lifestyle",
      date: "September 15, 2023",
      image: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55",
      excerpt: "Learn how to embrace minimalism and simplify your life.",
      content: "Minimalism is about focusing on what truly matters. Declutter your space, prioritize experiences over possessions, and cultivate mindfulness. By simplifying your life, you can reduce stress and find greater fulfillment. Start your minimalist journey today.",
    },
    {
      id: 6,
      title: "Exploring the Wonders of Space",
      category: "Science",
      date: "September 10, 2023",
      image: "https://images.unsplash.com/photo-1464802686167-b939a6910659",
      excerpt: "Discover the latest advancements in space exploration.",
      content: "Space exploration continues to captivate humanity. From the Mars Rover missions to the James Webb Space Telescope, we are uncovering the mysteries of the universe. Learn about the latest discoveries and what the future holds for space travel.",
    },
  ];

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filter === "all" || blog.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Open full blog view
  const openFullBlog = (blog) => {
    setSelectedBlog(blog);
  };

  // Close full blog view
  const closeFullBlog = () => {
    setSelectedBlog(null);
  };

  // Navigate to the next blog
  const goToNextBlog = () => {
    const currentIndex = filteredBlogs.findIndex((blog) => blog.id === selectedBlog.id);
    if (currentIndex < filteredBlogs.length - 1) {
      setSelectedBlog(filteredBlogs[currentIndex + 1]);
    }
  };

  return (
    <div className={`blog-page ${darkMode ? "dark-mode" : ""}`}>
      {/* Full Blog View */}
      {selectedBlog && (
        <div className="full-blog-view">
          <div className="full-blog-content">
            <button className="back-button" onClick={closeFullBlog}>
              ← Back to Blogs
            </button>
            <h1>{selectedBlog.title}</h1>
            <p className="blog-date">{selectedBlog.date}</p>
            <div className="blog-image-full" style={{ backgroundImage: `url(${selectedBlog.image})` }}></div>
            <p className="blog-content-full">{selectedBlog.content}</p>
            <div className="next-read-suggestion">
              <button onClick={goToNextBlog}>Next Read: {filteredBlogs[filteredBlogs.findIndex((blog) => blog.id === selectedBlog.id) + 1]?.title}</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Blog Page */}
      {!selectedBlog && (
        <>
          {/* Parallax Header */}
          <div className="parallax-header">
            <div className="header-content">
              <h1>Welcome to the Blog</h1>
              <p>Explore the latest trends, insights, and stories.</p>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Search and Filter Section */}
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
              <option value="science">Science</option>
            </select>
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            {currentBlogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <div
                  className="blog-image"
                  style={{ backgroundImage: `url(${blog.image})` }}
                ></div>
                <div className="blog-content">
                  <span className="blog-category">{blog.category}</span>
                  <h2 className="blog-title">{blog.title}</h2>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  <span className="blog-date">{blog.date}</span>
                  <button className="read-more-btn" onClick={() => openFullBlog(blog)}>
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Inline Styles */}
      <style>
        {`
          body {
            margin: 0;
            
            font-family: 'Poppins', sans-serif;
            transition: background-color 0.3s, color 0.3s;
          }

          .blog-page {
            background-color: #f9f9f9;
            color: #333;
            padding: 5px 4vw 20px 4vw;
            min-height: 100vh;
            transition: background-color 0.3s, color 0.3s;
          }

          .blog-page.dark-mode {
            background-color:rgb(38, 38, 38);
            color: #fff;
          }

          /* Parallax Header */
          .parallax-header {
  height: 300px;
  background-image: url('https://images.unsplash.com/photo-1499750310107-5fef28a66643');
  background-attachment: fixed;
  background-position: center;
  border-radius: 25px;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;
}

/* Overlay */
.parallax-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.31); /* Adjust opacity for darker or lighter effect */
  border-radius: 25px;
  z-index: 1;
}

/* Ensuring text remains on top */
.parallax-header h1 {
  position: relative;
  z-index: 2;
  font-size: 2rem;
  font-weight: bold;
}


          .header-content h1 {
            font-size: 3rem;
            margin: 0;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
          }

          .header-content p {
            font-size: 1.2rem;
            margin: 10px 0 0;
            text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
          }

          /* Dark Mode Toggle */
          .dark-mode-toggle {
            position: absolute;
            top: 75px;
            right: 22px;
            padding: 10px 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s;
            z-index: 1000;
          }

          .dark-mode-toggle:hover {
            background-color: #0056b3;
          }

          /* Search and Filter */
          .search-filter-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
            padding: 10px 15px 10px 15px ;
            background-color: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            position: sticky;
            top: 0;
            z-index: 999;
          }

          .search-input, .filter-select {
            padding: 10px;
            border: 3px solid #ccc;
            border-radius: 15px;
            font-size: .9rem;
            width: 300px;
             border-radius: 10px;
          }

          .dark-mode .search-filter-container {
            background-color: rgba(18, 18, 18, 0.9);
          }

          .dark-mode .search-input, .dark-mode .filter-select {
            background-color: #333;
            color: #fff;
            border-color: #444;
          }

          /* Blog Grid */
          .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
          }

          .blog-card {
            background-color: #fff;

            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .dark-mode .blog-card {
            background-color: rgba(18, 18, 18, 0.9);
          }

          .blog-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .blog-image {
            height: 200px;
            background-size: cover;
            background-position: center;
          }

          .blog-content {
            padding: 20px;
          }

          .blog-category {
            display: block;
            font-size: 0.9rem;
            color: #007bff;
            margin-bottom: 10px;
          }

          .blog-title {
            font-size: 1.5rem;
            margin: 0 0 10px;
          }

          .blog-excerpt {
            font-size: 1rem;
            color: #666;
            margin: 0 0 20px;
          }

          .dark-mode .blog-excerpt {
            color: #ccc;
          }

          .blog-date {
            display: block;
            font-size: 0.9rem;
            color: #999;
            margin-bottom: 20px;
          }

          .read-more-btn {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s;
          }

          .read-more-btn:hover {
            background-color: #0056b3;
          }

          /* Pagination */
          .pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            padding: 20px;
          }

          .page-number {
            padding: 10px 15px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .page-number.active {
            background-color: #0056b3;
          }

          .page-number:hover {
            background-color: #0056b3;
          }



          //======================================================================
          
          
          
          
          

          

          /* Full Blog View Styles */
          .full-blog-view {
            position: fixed;
            
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${darkMode ? "#121212" : "#fff"};
            color: ${darkMode ? "#fff" : "#333"};
            z-index: 1000;
            overflow-y: auto;
            padding: 20px;
          }

          .full-blog-content {
            max-width: 800px;
            margin: 0 auto;
          }

          .back-button {
            background: none;
            border: none;
            color: ${darkMode ? "#fff" : "#007bff"};
            cursor: pointer;
            font-size: 1rem;
            margin-bottom: 20px;
          }

          .blog-image-full {
            height: 300px;
            background-size: cover;
            background-position: center;
            margin: 20px 0;
          }

          .blog-content-full {
            font-size: 1.1rem;
            line-height: 1.6;
          }

          .next-read-suggestion {
            margin-top: 40px;
            text-align: center;
          }

          .next-read-suggestion button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s;
          }

          .next-read-suggestion button:hover {
            background-color: #0056b3;
          }
        
        `}
      </style>
    </div>
  );
};

export default BlogPage;