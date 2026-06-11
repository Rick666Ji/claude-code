import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import NewProjectDialog from './components/NewProjectDialog';
import CreateProjectDialog from './components/CreateProjectDialog';
import SettingsPanel from './components/SettingsPanel';
import AboutModal from './components/AboutModal';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [showCreateProjectDialog, setShowCreateProjectDialog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onMenuNewProject(() => {
        setShowCreateProjectDialog(true);
      });

      window.electronAPI.onMenuOpenProject(() => {
        setShowNewProjectDialog(true);
      });

      window.electronAPI.onOpenDocumentation(() => {
        window.open('https://docs.claudecode.dev', '_blank');
      });

      window.electronAPI.onShowAbout(() => {
        setShowAbout(true);
      });
    }
  }, []);

  return (
    <div className="app">
      {currentView === 'home' && (
        <HomePage
          onNewProject={() => setShowCreateProjectDialog(true)}
          onOpenProject={() => setShowNewProjectDialog(true)}
          onSettings={() => setShowSettings(true)}
        />
      )}

      {showNewProjectDialog && (
        <NewProjectDialog onClose={() => setShowNewProjectDialog(false)} />
      )}

      {showCreateProjectDialog && (
        <CreateProjectDialog onClose={() => setShowCreateProjectDialog(false)} />
      )}

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}

      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}
    </div>
  );
}

export default App;
