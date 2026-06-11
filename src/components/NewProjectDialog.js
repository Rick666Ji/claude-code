import React, { useState } from 'react';
import { FiX, FiFolderOpen } from 'react-icons/fi';
import '../styles/Dialog.css';

const NewProjectDialog = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenProject = async () => {
    setIsLoading(true);
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.openProject();
        if (result.filePaths && result.filePaths.length > 0) {
          console.log('Project opened:', result.filePaths[0]);
          onClose();
        }
      }
    } catch (error) {
      console.error('Error opening project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <h2>Open Project</h2>
          <button className="dialog-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="dialog-content">
          <div className="empty-state-large">
            <div className="icon-large">
              <FiFolderOpen size={48} />
            </div>
            <h3>Browse for a project folder</h3>
            <p>Select any folder containing your project files</p>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="button secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="button primary"
            onClick={handleOpenProject}
            disabled={isLoading}
          >
            {isLoading ? 'Opening...' : 'Browse'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProjectDialog;
