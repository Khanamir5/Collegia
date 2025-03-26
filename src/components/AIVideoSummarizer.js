import React, { useState } from 'react';

const AIVideoSummarizer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = () => {
    if (!videoUrl) {
      setError('Please enter a video URL');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setSummary(
        "Key lecture points: 1) Introduction to core concepts with real-world applications, 2) Step-by-step problem solving, 3) Exam-focused revision tips. Study smart!"
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #1a2a6c, #b21f1f, #fdbb2d)',
      padding: '20px',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Header Section */}
      <header style={{
        textAlign: 'center',
        padding: '30px 20px',
        color: 'white',
        maxWidth: '800px',
        width: '100%',
        animation: 'fadeIn 1s ease-in'
      }}>
        <h1 style={{
          margin: '0',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          background: 'linear-gradient(to right, #fff, #a8edea)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          AI Video Summarizer
        </h1>
        <p style={{
          margin: '10px 0 0',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          opacity: 0.9
        }}>
          Transform lectures into concise, actionable study notes
        </p>
      </header>

      {/* Main Content */}
      <main style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '20px',
        width: '100%',
        maxWidth: '800px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Input Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%'
        }}>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter video URL (YouTube, etc.)"
            style={{
              padding: '15px',
              borderRadius: '12px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              width: '100%',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1a2a6c';
              e.target.style.boxShadow = '0 0 10px rgba(26, 42, 108, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />
          {error && (
            <span style={{ color: '#b21f1f', fontSize: '0.9rem' }}>{error}</span>
          )}
          <button
            onClick={handleSummarize}
            disabled={isLoading}
            style={{
              padding: '15px',
              background: isLoading ? '#ccc' : 'linear-gradient(to right, #1a2a6c, #b21f1f)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => !isLoading && (e.target.style.transform = 'scale(1)')}
          >
            {isLoading && (
              <span style={{
                width: '20px',
                height: '20px',
                border: '3px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></span>
            )}
            {isLoading ? 'Summarizing...' : 'Generate Summary'}
          </button>
        </div>

        {/* Summary Section */}
        {summary && (
          <div style={{
            background: 'linear-gradient(135deg, #f5f6f5, #e8ecef)',
            padding: '20px',
            borderRadius: '15px',
            animation: 'slideIn 0.5s ease',
            marginTop: '20px'
          }}>
            <h2 style={{
              margin: '0 0 15px',
              color: '#1a2a6c',
              fontSize: '1.5rem'
            }}>
              Your Study Summary
            </h2>
            <p style={{ color: '#333', lineHeight: '1.6' }}>{summary}</p>
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              <button style={{
                padding: '10px 20px',
                background: '#fdbb2d',
                color: '#1a2a6c',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = '#e0a824'}
              onMouseOut={(e) => e.target.style.background = '#fdbb2d'}
              >
                Copy Notes
              </button>
              <button style={{
                padding: '10px 20px',
                background: 'transparent',
                color: '#b21f1f',
                border: '2px solid #b21f1f',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#b21f1f';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#b21f1f';
              }}
              >
                Save to Study Hub
              </button>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '15px',
          marginTop: '20px'
        }}>
          <h3 style={{ color: '#b21f1f', margin: '0 0 15px', fontSize: '1.3rem' }}>
            Study Smarter Tips
          </h3>
          <ul style={{ paddingLeft: '20px', color: '#333', lineHeight: '1.8' }}>
            <li>Break videos into 15-min chunks</li>
            <li>Pair with flashcards for retention</li>
            <li>Use summaries for quick reviews</li>
          </ul>
        </div>
      </main>

      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (min-width: 600px) {
          main {
            padding: 40px;
          }
          .input-section {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AIVideoSummarizer;