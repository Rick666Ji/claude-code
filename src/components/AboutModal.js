import React from 'react';
import { FiX, FiGithub, FiGlobe } from 'react-icons/fi';
import '../styles/Dialog.css';

const AboutModal = ({ onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-container about-modal">
        <div className="dialog-header">
          <h2>About Claude Code</h2>
          <button className="dialog-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="dialog-content about-content">
          <div className="about-logo">
            <span className="logo-emoji">⚡</span>
            <h1>Claude Code</h1>
            <p className="version">Version 1.0.0</p>
          </div>

          <div className="about-text">
            <p>
              Claude Code is an AI-powered code editor built with{' '}
              <strong>Electron</strong> and <strong>React</strong>.
            </p>
            <p>
              Powered by Anthropic's <strong>Claude AI</strong>, it provides
              intelligent code completion, analysis, and suggestions to boost
              your productivity.
            </p>
          </div>

          <div className="about-features">
            <h3>Features</h3>
            <ul>
              <li>AI-powered code completion and suggestions</li>
              <li>Multi-language support</li>
              <li>Integrated terminal and debugging</li>
              <li>Real-time collaboration ready</li>
              <li>Customizable editor settings</li>
              <li>Project templates and scaffolding</li>
            </ul>
          </div>

          <div className="about-credits">
            <h3>Credits</h3>
            <p>
              Built by <strong>Anthropic</strong> and the Claude Code community
            </p>
            <p>
              Using technologies like Electron, React, and Node.js
            </p>
          </div>

          <div className="about-links">
            <a
              href="https://github.com/anthropic/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              <FiGithub size={18} />
              View on GitHub
            </a>
            <a
              href="https://claudecode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              <FiGlobe size={18} />
              Official Website
            </a>
          </div>

          <div className="about-legal">
            <p>&copy; 2024 Anthropic. All rights reserved.</p>
            <p>
              Licensed under the{' '}
              <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
                MIT License
              </a>
            </p>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="button primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
