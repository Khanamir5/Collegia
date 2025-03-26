import React, { useState } from 'react';

const StudyPlanner = () => {
  const [aiSubject, setAiSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [manualSubject, setManualSubject] = useState('');
  const [manualTask, setManualTask] = useState('');
  const [manualDate, setManualDate] = useState('');
  const [manualTime, setManualTime] = useState('');
  const [manualPriority, setManualPriority] = useState('Medium');
  const [studyPlan, setStudyPlan] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulated AI to generate study plan
  const generateStudyPlan = () => {
    if (!aiSubject || !deadline) {
      setError('Please enter a subject and deadline');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const deadlineDate = new Date(deadline);
      const today = new Date();
      const daysUntilDeadline = Math.max(1, Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)));
      const tasksPerDay = Math.ceil(5 / daysUntilDeadline); // Aim for ~5 tasks total

      const newTasks = [];
      for (let i = 0; i < Math.min(5, daysUntilDeadline * tasksPerDay); i++) {
        const taskDate = new Date(today);
        taskDate.setDate(today.getDate() + Math.floor(i / tasksPerDay));
        const dateStr = taskDate.toISOString().split('T')[0];
        const timeStr = `${String(9 + (i % 3) * 2).padStart(2, '0')}:00`; // Spread across 9-13:00
        const priority = i < 2 ? 'High' : i < 4 ? 'Medium' : 'Low';

        newTasks.push({
          task: `${aiSubject} - Task ${i + 1} (e.g., ${['Review', 'Practice', 'Read', 'Quiz', 'Revise'][i % 5]})`,
          date: dateStr,
          time: timeStr,
          priority
        });
      }

      setStudyPlan(prev => ({
        ...prev,
        [aiSubject]: [...(prev[aiSubject] || []), ...newTasks]
      }));
      setAiSubject('');
      setDeadline('');
      setIsLoading(false);
    }, 1500);
  };

  // Add manual task
  const handleAddManualTask = () => {
    if (!manualSubject || !manualTask || !manualDate || !manualTime) {
      setError('Please fill all manual fields');
      return;
    }

    const taskDetails = { task: manualTask, date: manualDate, time: manualTime, priority: manualPriority };
    setStudyPlan(prev => ({
      ...prev,
      [manualSubject]: [...(prev[manualSubject] || []), taskDetails]
    }));
    setManualSubject('');
    setManualTask('');
    setManualDate('');
    setManualTime('');
    setManualPriority('Medium');
    setError('');
  };

  // Remove task
  const handleRemoveTask = (subject, index) => {
    setStudyPlan(prev => ({
      ...prev,
      [subject]: prev[subject].filter((_, i) => i !== index)
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
          AI Study Planner
        </h1>
        <p style={{
          margin: '10px 0 0',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          opacity: 0.9
        }}>
          Let AI craft your perfect study schedule
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
          {/* AI Generation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ color: '#1a2a6c', margin: '0', fontSize: '1.3rem' }}>
              AI-Powered Plan
            </h3>
            <input
              type="text"
              value={aiSubject}
              onChange={(e) => setAiSubject(e.target.value)}
              placeholder="Subject (e.g., Physics)"
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
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
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
              onClick={generateStudyPlan}
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
                'Generate AI Plan'
              )}
            </button>
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
              Manual Task
            </h3>
            <input
              type="text"
              value={manualSubject}
              onChange={(e) => setManualSubject(e.target.value)}
              placeholder="Subject (e.g., Calculus)"
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
              value={manualTask}
              onChange={(e) => setManualTask(e.target.value)}
              placeholder="Task (e.g., Review Chapter 3)"
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
              type="date"
              value={manualDate}
              onChange={(e) => setManualDate(e.target.value)}
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
              type="time"
              value={manualTime}
              onChange={(e) => setManualTime(e.target.value)}
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
            <select
              value={manualPriority}
              onChange={(e) => setManualPriority(e.target.value)}
              style={{
                padding: '15px',
                borderRadius: '12px',
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: '#fff',
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
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              onClick={handleAddManualTask}
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
              Add Manual Task
            </button>
          </div>

          {error && <span style={{ color: '#b21f1f', fontSize: '0.9rem' }}>{error}</span>}
        </div>

        {/* Study Plan Display by Subject */}
        {Object.keys(studyPlan).length > 0 && (
          <div style={{ marginTop: '20px' }}>
            {Object.entries(studyPlan).map(([subject, tasks]) => (
              <div key={subject} style={{ marginBottom: '30px' }}>
                <h2 style={{
                  color: '#1a2a6c',
                  fontSize: '1.5rem',
                  margin: '0 0 15px',
                  borderBottom: '2px solid #fdbb2d',
                  paddingBottom: '5px'
                }}>
                  {subject}
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '20px'
                }}>
                  {tasks.map((taskDetails, index) => (
                    <div key={index} style={{
                      background: 'linear-gradient(135deg, #f5f6f5, #e8ecef)',
                      borderRadius: '15px',
                      padding: '20px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      <div style={{ color: '#1a2a6c', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {taskDetails.task}
                      </div>
                      <div style={{ color: '#333', fontSize: '1rem' }}>
                        Date: {taskDetails.date}
                      </div>
                      <div style={{ color: '#333', fontSize: '1rem' }}>
                        Time: {taskDetails.time}
                      </div>
                      <div style={{
                        color: taskDetails.priority === 'High' ? '#b21f1f' : taskDetails.priority === 'Medium' ? '#fdbb2d' : '#1a2a6c',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}>
                        Priority: {taskDetails.priority}
                      </div>
                      <button
                        onClick={() => handleRemoveTask(subject, index)}
                        style={{
                          padding: '10px',
                          background: 'transparent',
                          color: '#b21f1f',
                          border: '2px solid #b21f1f',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease',
                          marginTop: '10px'
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
                        Remove
                      </button>
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
            AI Planning Tips
          </h3>
          <ul style={{ paddingLeft: '20px', color: '#333', lineHeight: '1.8' }}>
            <li>Set realistic deadlines for AI to optimize</li>
            <li>Add manual tasks for specific needs</li>
            <li>Adjust priorities as exams approach</li>
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
          .ai-input, .manual-input {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default StudyPlanner;