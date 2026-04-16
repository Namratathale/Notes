import { useState, useEffect } from 'react';
import './App.css';

// Replace with your EC2 Public IP!
const API_URL = 'http://34.224.31.9:3000/api/notes';

const FloatingBackground = () => {
  const shapes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 5 + 5}s`,
    animationDelay: `${Math.random() * 5}s`,
    fontSize: `${Math.random() * 20 + 10}px`
  }));

  return (
    <div className="floating-bg">
      {shapes.map((shape) => (
        <span 
          key={shape.id} 
          className="floating-shape"
          style={{
            left: shape.left,
            animationDuration: shape.animationDuration,
            animationDelay: shape.animationDelay,
            fontSize: shape.fontSize
          }}
        >
          {['✨', '☁️', '🚀', '💡', '📝'][Math.floor(Math.random() * 5)]}
        </span>
      ))}
    </div>
  );
};

export default function App() {
  const [notes, setNotes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null); // Tracks which note we are editing
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const cardColors = ['#f4e87c', '#f5b0b5', '#6fb1df', '#e2eaf5', '#fae1c3'];

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      if (editingId) {
        // UPDATE Existing Note
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
      } else {
        // CREATE New Note
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
      }
      
      resetForm();
      fetchNotes(); 
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await fetch(`${API_URL}/${noteId}`, { method: 'DELETE' });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEditClick = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.noteId);
    setIsCreating(true);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
    setIsCreating(false);
  };

  // Converts the noteId (which is a timestamp) into a readable date/time
  const formatTime = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleString([], { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div className="app-wrapper">
      <FloatingBackground />

      {/* CLEANED UP SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-icon">N</div>
          <h2>NOTES</h2>
        </div>
        
        <div className="add-new-section">
          <p className="add-new-title">Theme Colors</p>
          <div className="color-dots">
            <span className="dot yellow"></span>
            <span className="dot blue"></span>
            <span className="dot red"></span>
          </div>
        </div>

        <nav className="nav-menu">
          {/* Removed dead links as requested */}
        </nav>

        <div className="promo-box">
          <p>Want to access unlimited notes taking experience & lot's of features?</p>
          <div className="promo-illustration">👩‍💻</div>
          <button className="upgrade-btn">Upgrade pro</button>
        </div>
      </aside>

      <main className="main-content">
        
        <header className="top-header">
          <h1>MY NOTES</h1>
          <div className="header-right">
            <div className="search-bar">
              <span>🔍</span>
              <input type="text" placeholder="Search" />
            </div>
            <div className="user-profile">
              <span>AWS Cloud Dev</span>
              <div className="avatar">👨‍🚀</div>
              <span className="menu-icon">☰</span>
            </div>
          </div>
        </header>

        {/* RECENT FOLDERS SECTION ENTIRELY REMOVED */}

        <section className="section-block">
          <div className="tabs">
            <span className="active-tab">All Notes</span>
            {/* Removed This Week / This Month */}
          </div>

          <div className="notes-grid">
            
            {notes.map((note, index) => (
              <div 
                key={note.noteId} 
                className="note-card"
                style={{ backgroundColor: cardColors[index % cardColors.length] }}
              >
                <div className="note-header">
                  <span className="date">{formatTime(note.noteId)}</span>
                  <div className="action-icons">
                    <span className="edit-icon" onClick={() => handleEditClick(note)} style={{cursor: 'pointer', marginRight: '10px'}}>✏️</span>
                    <span className="delete-icon" onClick={() => handleDelete(note.noteId)} style={{cursor: 'pointer'}}>🗑️</span>
                  </div>
                </div>
                <h3>{note.title}</h3>
                <p className="note-preview">{note.content}</p>
              </div>
            ))}

            {isCreating ? (
              <form onSubmit={handleSubmit} className="create-note-form note-card" style={{backgroundColor: 'white'}}>
                <input 
                  autoFocus
                  placeholder="Note Title..." 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                  placeholder="Content..." 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="form-actions">
                  <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>
                  <button type="submit" className="save-btn">{editingId ? 'Update' : 'Save'}</button>
                </div>
              </form>
            ) : (
              <div className="folder-card dashed-card" onClick={() => setIsCreating(true)} style={{cursor: 'pointer'}}>
                <div className="folder-icon black-icon">➕</div>
                <p>Create Note</p>
              </div>
            )}

          </div>
        </section>
      </main>
    </div>
  );
}