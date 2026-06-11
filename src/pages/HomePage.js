import React, { useState, useEffect } from 'react';
import {
  FiPlus,
  FiFolderOpen,
  FiSettings,
  FiBook,
  FiClock,
  FiTrash2,
  FiCode,
  FiDatabase,
  FiLayout,
} from 'react-icons/fi';
import '../styles/HomePage.css';

const HomePage = ({ onNewProject, onOpenProject, onSettings }) => {
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentProjects();
  }, []);

  const loadRecentProjects = async () => {
    try {
      if (window.electronAPI) {
        const projects = await window.electronAPI.getRecentProjects();
        setRecentProjects(projects);
      }
    } catch (error) {
      console.error('Error loading recent projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectPath) => {
    try {
      if (window.electronAPI) {
        await window.electronAPI.deleteRecentProject(projectPath);
        setRecentProjects(recentProjects.filter(p => p.path !== projectPath));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const templates = [
    {
      id: 'react',
      name: 'React App',
      description: 'Create a new React application with Vite',
      icon: <FiCode />,
      color: '#61DAFB',
    },
    {
      id: 'nextjs',
      name: 'Next.js Project',
      description: 'Full-stack React framework with SSR',
      icon: <FiLayout />,
      color: '#000000',
    },
    {
      id: 'fullstack',
      name: 'Full Stack',
      description: 'Node.js backend + React frontend',
      icon: <FiDatabase />,
      color: '#68A063',
    },
    {
      id: 'vanilla',
      name: 'Vanilla JS',
      description: 'Plain JavaScript project setup',
      icon: <FiCode />,
      color: '#F7DF1E',
    },
  ];

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span className="logo-icon">⚡</span>
              <h1>Claude Code</h1>
            </div>
            <p className="tagline">AI-Powered Code Editor</p>
          </div>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={onSettings}
              title="Settings"
            >
              <FiSettings size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="home-main">
        <section className="quick-actions">
          <button className="action-button primary" onClick={onNewProject}>
            <FiPlus size={24} />
            <div>
              <div className="button-title">Create New Project</div>
              <div className="button-subtitle">Start from scratch or use a template</div>
            </div>
          </button>
          <button className="action-button secondary" onClick={onOpenProject}>
            <FiFolderOpen size={24} />
            <div>
              <div className="button-title">Open Project</div>
              <div className="button-subtitle">Browse your computer</div>
            </div>
          </button>
        </section>

        <section className="recent-projects">
          <div className="section-header">
            <h2>
              <FiClock size={20} />
              Recent Projects
            </h2>
            {recentProjects.length > 0 && (
              <span className="project-count">{recentProjects.length}</span>
            )}
          </div>

          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : recentProjects.length > 0 ? (
            <div className="projects-grid">
              {recentProjects.map((project) => (
                <div key={project.path} className="project-card">
                  <div className="project-info">
                    <h3>{project.name}</h3>
                    <p className="project-path">{project.path}</p>
                    <p className="project-date">
                      Last opened: {new Date(project.lastOpened).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="project-actions">
                    <button
                      className="card-action-button primary"
                      onClick={() => window.open(project.path)}
                    >
                      Open
                    </button>
                    <button
                      className="card-action-button danger"
                      onClick={() => handleDeleteProject(project.path)}
                      title="Remove from recent"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No recent projects yet.</p>
              <p>Create or open a project to get started!</p>
            </div>
          )}
        </section>

        <section className="templates">
          <div className="section-header">
            <h2>Project Templates</h2>
          </div>
          <div className="templates-grid">
            {templates.map((template) => (
              <button
                key={template.id}
                className="template-card"
                onClick={() => onNewProject()}
              >
                <div className="template-icon" style={{ color: template.color }}>
                  {template.icon}
                </div>
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="help-section">
          <div className="section-header">
            <h2>
              <FiBook size={20} />
              Get Started
            </h2>
          </div>
          <div className="help-links">
            <a
              href="https://docs.claudecode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="help-link"
            >
              <span>📖</span>
              <div>
                <h4>Documentation</h4>
                <p>Learn how to use Claude Code</p>
              </div>
            </a>
            <a
              href="https://github.com/anthropic/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="help-link"
            >
              <span>🔗</span>
              <div>
                <h4>GitHub Repository</h4>
                <p>View source code and contribute</p>
              </div>
            </a>
            <a
              href="https://claudecode.dev/support"
              target="_blank"
              rel="noopener noreferrer"
              className="help-link"
            >
              <span>💬</span>
              <div>
                <h4>Support</h4>
                <p>Get help and report issues</p>
              </div>
            </a>
            <a
              href="https://claudecode.dev/community"
              target="_blank"
              rel="noopener noreferrer"
              className="help-link"
            >
              <span>👥</span>
              <div>
                <h4>Community</h4>
                <p>Join our community forum</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>Claude Code v1.0.0 • Powered by Anthropic</p>
      </footer>
    </div>
  );
};

export default HomePage;
