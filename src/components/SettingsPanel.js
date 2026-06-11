import React, { useState } from 'react';
import { FiX, FiMoon, FiSun, FiGithub } from 'react-icons/fi';
import '../styles/SettingsPanel.css';

const SettingsPanel = ({ onClose }) => {
  const [settings, setSettings] = useState({
    theme: localStorage.getItem('claude-code-theme') || 'dark',
    autoUpdate: localStorage.getItem('claude-code-auto-update') !== 'false',
    telemetry: localStorage.getItem('claude-code-telemetry') !== 'false',
    fontSize: parseInt(localStorage.getItem('claude-code-font-size') || '14'),
    lineHeight: parseFloat(localStorage.getItem('claude-code-line-height') || '1.5'),
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    if (key === 'theme') {
      localStorage.setItem('claude-code-theme', value);
      document.documentElement.setAttribute('data-theme', value);
    } else if (key === 'autoUpdate') {
      localStorage.setItem('claude-code-auto-update', value);
    } else if (key === 'telemetry') {
      localStorage.setItem('claude-code-telemetry', value);
    } else if (key === 'fontSize') {
      localStorage.setItem('claude-code-font-size', value);
    } else if (key === 'lineHeight') {
      localStorage.setItem('claude-code-line-height', value);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container settings-panel">
        <div className="dialog-header">
          <h2>Settings</h2>
          <button className="dialog-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="settings-content">
          <section className="settings-section">
            <h3>Appearance</h3>
            <div className="settings-group">
              <label className="settings-label">
                <span>Theme</span>
              </label>
              <div className="theme-buttons">
                <button
                  className={`theme-button ${settings.theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleSettingChange('theme', 'light')}
                >
                  <FiSun size={18} />
                  Light
                </button>
                <button
                  className={`theme-button ${settings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleSettingChange('theme', 'dark')}
                >
                  <FiMoon size={18} />
                  Dark
                </button>
              </div>
            </div>

            <div className="settings-group">
              <label htmlFor="fontSize" className="settings-label">
                Font Size
                <span className="value">{settings.fontSize}px</span>
              </label>
              <input
                id="fontSize"
                type="range"
                min="12"
                max="18"
                value={settings.fontSize}
                onChange={(e) =>
                  handleSettingChange('fontSize', parseInt(e.target.value))
                }
                className="slider"
              />
            </div>

            <div className="settings-group">
              <label htmlFor="lineHeight" className="settings-label">
                Line Height
                <span className="value">{settings.lineHeight.toFixed(1)}</span>
              </label>
              <input
                id="lineHeight"
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) =>
                  handleSettingChange('lineHeight', parseFloat(e.target.value))
                }
                className="slider"
              />
            </div>
          </section>

          <section className="settings-section">
            <h3>Behavior</h3>
            <div className="settings-group checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.autoUpdate}
                  onChange={(e) =>
                    handleSettingChange('autoUpdate', e.target.checked)
                  }
                />
                <span>Enable automatic updates</span>
              </label>
              <small>Claude Code will check for updates automatically</small>
            </div>

            <div className="settings-group checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.telemetry}
                  onChange={(e) =>
                    handleSettingChange('telemetry', e.target.checked)
                  }
                />
                <span>Help improve Claude Code by sending telemetry data</span>
              </label>
              <small>We only collect non-identifying usage statistics</small>
            </div>
          </section>

          <section className="settings-section">
            <h3>About</h3>
            <div className="about-info">
              <p>
                <strong>Claude Code</strong> v1.0.0
              </p>
              <p>An AI-powered code editor powered by Anthropic's Claude</p>
              <div className="about-links">
                <a href="https://github.com/anthropic/claude-code" target="_blank" rel="noopener noreferrer">
                  <FiGithub size={16} />
                  GitHub
                </a>
                <a href="https://claudecode.dev" target="_blank" rel="noopener noreferrer">
                  Website
                </a>
                <a href="https://docs.claudecode.dev" target="_blank" rel="noopener noreferrer">
                  Documentation
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="dialog-footer">
          <button className="button primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
