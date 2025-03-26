import React, { useState } from 'react';

const FlashcardGenerator = () => {
  const [topic, setTopic] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [numCards, setNumCards] = useState(3);
  const [manualTerm, setManualTerm] = useState('');
  const [manualDefinition, setManualDefinition] = useState('');
  const [manualChapter, setManualChapter] = useState('');
  const [flashcards, setFlashcards] = useState({});
  const [isFlipped, setIsFlipped] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulated AI model to generate flashcards
  const generateFlashcards = (source, chapter = 'General') => {
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const newCards = Array.from({ length: numCards }, (_, i) => {
        return source === 'topic'
          ? { term: `${topic} - Point ${i + 1}`, definition: `Key aspect ${i + 1} of ${topic}` }
          : { term: `PDF Concept ${i + 1}`, definition: `Extracted point ${i + 1} from PDF` };
      });

      setFlashcards(prev => ({
        ...prev,
        [chapter]: [...(prev[chapter] || []), ...newCards]
      }));
      setTopic('');
      setPdfFile(null);
      setIsLoading(false);
    }, 1500);
  };

  // Manual flashcard creation
  const handleManualSubmit = () => {
    if (!manualTerm || !manualDefinition || !manualChapter) {
      setError('Please fill all manual fields');
      return;
    }
    setFlashcards(prev => ({
      ...prev,
      [manualChapter]: [...(prev[manualChapter] || []), { term: manualTerm, definition: manualDefinition }]
    }));
    setManualTerm('');
    setManualDefinition('');
    setManualChapter('');
    setError('');
  };

  const handleTopicSubmit = () => {
    if (!topic) {
      setError('Please enter a topic');
      return;
    }
    generateFlashcards('topic', topic);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      generateFlashcards('pdf', file.name.split('.')[0]);
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const toggleFlip = (chapter, index) => {
    setIsFlipped(prev => ({
      ...prev,
      [`${chapter}-${index}`]: !prev[`${chapter}-${index}`]
    }));
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
      {/* Header */}
      <header style={{
        textAlign: 'center',
        padding: '30px 20px',
        color: 'white',
        maxWidth: '900px',
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
          Flashcard Generator
        </h1>
        <p style={{
          margin: '10px 0 0',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          opacity: 0.9
        }}>
          Create flashcards manually or with AI
        </p>
      </header>

      {/* Main Content */}
      <main style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '20px',
        width: '100%',
        maxWidth: '900px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Input Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderBottom: '1px solid #e0e0e0',
          paddingBottom: '20px'
        }}>
          {/* Number of Cards Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ color: '#1a2a6c', fontSize: '1rem', fontWeight: 'bold' }}>
              Number of AI-Generated Flashcards:
            </label>
            <select
              value={numCards}
              onChange={(e) => setNumCards(parseInt(e.target.value))}
              style={{
                padding: '12px',
                borderRadius: '12px',
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: '#fff',
                width: '100%',
                maxWidth: '200px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1a2a6c';
                e.target.style.boxShadow = '0 0 10px rgba(26, 42, 108, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Topic Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic (e.g., Biology - Cell Structure)"
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
            <button
              onClick={handleTopicSubmit}
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
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => !isLoading && (e.target.style.transform = 'scale(1.02)')}
              onMouseOut={(e) => !isLoading && (e.target.style.transform = 'scale(1)')}
            >
              {isLoading ? (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></span>
                  Generating...
                </span>
              ) : (
                `Generate ${numCards} from Topic`
              )}
            </button>
          </div>

          {/* PDF Upload */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              style={{
                padding: '15px',
                borderRadius: '12px',
                border: '2px dashed #e0e0e0',
                fontSize: '1rem',
                width: '100%',
                boxSizing: 'border-box',
                background: '#f9f9f9'
              }}
            />
            {pdfFile && <span style={{ color: '#1a2a6c', fontSize: '0.9rem' }}>
              Uploaded: {pdfFile.name}
            </span>}
          </div>

          {/* Manual Input */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            borderTop: '1px solid #e0e0e0',
            paddingTop: '20px'
          }}>
            <h3 style={{ color: '#1a2a6c', margin: '0', fontSize: '1.3rem' }}>
              Manual Flashcard
            </h3>
            <input
              type="text"
              value={manualChapter}
              onChange={(e) => setManualChapter(e.target.value)}
              placeholder="Chapter/Topic (e.g., Chemistry Basics)"
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
            <input
              type="text"
              value={manualTerm}
              onChange={(e) => setManualTerm(e.target.value)}
              placeholder="Term (e.g., Atom)"
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
            <textarea
              value={manualDefinition}
              onChange={(e) => setManualDefinition(e.target.value)}
              placeholder="Definition"
              style={{
                padding: '15px',
                borderRadius: '12px',
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                width: '100%',
                boxSizing: 'border-box',
                minHeight: '100px',
                resize: 'vertical'
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
            <button
              onClick={handleManualSubmit}
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
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => !isLoading && (e.target.style.transform = 'scale(1.02)')}
              onMouseOut={(e) => !isLoading && (e.target.style.transform = 'scale(1)')}
            >
              Add Manual Flashcard
            </button>
          </div>

          {error && <span style={{ color: '#b21f1f', fontSize: '0.9rem' }}>{error}</span>}
        </div>

        {/* Flashcard Display by Chapter */}
        {Object.keys(flashcards).length > 0 && (
          <div style={{ marginTop: '20px' }}>
            {Object.entries(flashcards).map(([chapter, cards]) => (
              <div key={chapter} style={{ marginBottom: '30px' }}>
                <h2 style={{
                  color: '#1a2a6c',
                  fontSize: '1.5rem',
                  margin: '0 0 15px',
                  borderBottom: '2px solid #fdbb2d',
                  paddingBottom: '5px'
                }}>
                  {chapter}
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '20px'
                }}>
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      style={{
                        perspective: '1000px',
                        height: '200px',
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleFlip(chapter, index)}
                    >
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.6s',
                        transformStyle: 'preserve-3d',
                        transform: isFlipped[`${chapter}-${index}`] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        borderRadius: '15px'
                      }}>
                        {/* Front */}
                        <div style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          background: 'linear-gradient(135deg, #f5f6f5, #e8ecef)',
                          borderRadius: '15px',
                          padding: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#1a2a6c',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                          textAlign: 'center'
                        }}>
                          {card.term}
                        </div>
                        {/* Back */}
                        <div style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          background: 'linear-gradient(135deg, #e8ecef, #f5f6f5)',
                          borderRadius: '15px',
                          padding: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#333',
                          fontSize: '1rem',
                          textAlign: 'center',
                          transform: 'rotateY(180deg)'
                        }}>
                          {card.definition}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            Flashcard Tips
          </h3>
          <ul style={{ paddingLeft: '20px', color: '#333', lineHeight: '1.8' }}>
            <li>Use AI for quick generation, manual for precision</li>
            <li>Group by chapter for organized study</li>
            <li>Review daily for best retention</li>
          </ul>
        </div>
      </main>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (min-width: 600px) {
          main {
            padding: 40px;
          }
          .input-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .num-cards-selector {
            grid-column: span 2;
          }
          .manual-input {
            grid-column: span 2;
          }
        }
      `}</style>
    </div>
  );
};

export default FlashcardGenerator;