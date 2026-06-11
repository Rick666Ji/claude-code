import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import '../styles/Dialog.css';
import '../styles/CreateProjectDialog.css';

const CreateProjectDialog = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectPath, setProjectPath] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const templates = [
    {
      id: 'react',
      name: 'React App',
      description: 'Create a new React application with Vite',
      icon: '⚛️',
    },
    {
      id: 'nextjs',
      name: 'Next.js Project',
      description: 'Full-stack React framework with SSR',
      icon: '▲',
    },
    {
      id: 'fullstack',
      name: 'Full Stack',
      description: 'Node.js backend + React frontend',
      icon: '🔗',
    },
    {
      id: 'vanilla',
      name: 'Vanilla JS',
      description: 'Plain JavaScript project setup',
      icon: '📝',
    },
    {
      id: 'empty',
      name: 'Empty Project',
      description: 'Start with an empty folder',
      icon: '📁',
    },
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setError('');
  };

  const handleNextStep = () => {
    if (!selectedTemplate) {
      setError('Please select a template');
      return;
    }
    setStep(2);
  };

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    setIsCreating(true);
    setStep(3);

    try {
      if (window.electronAPI) {
        await window.electronAPI.createProject({
          name: projectName,
          path: projectPath || `~/${projectName}`,
          template: selectedTemplate.id,
        });
        setTimeout(() => onClose(), 2000);
      }
    } catch (err) {
      setError(err.message || 'Failed to create project');
      setStep(2);
      setIsCreating(false);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container create-project-dialog">
        <div className="dialog-header">
          <h2>Create New Project</h2>
          <button className="dialog-close" onClick={onClose} disabled={isCreating}>
            <FiX size={24} />
          </button>
        </div>

        <div className="dialog-content">
          {step === 1 && (
            <div className="step-content">
              <h3>Choose a Template</h3>
              <p className="step-description">Select a project template to get started</p>
              <div className="templates-list">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    className={`template-option ${
                      selectedTemplate?.id === template.id ? 'selected' : ''
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <span className="template-option-icon">{template.icon}</span>
                    <div className="template-option-content">
                      <h4>{template.name}</h4>
                      <p>{template.description}</p>
                    </div>
                    {selectedTemplate?.id === template.id && (
                      <FiCheck size={20} className="check-icon" />
                    )}
                  </button>
                ))}
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Project Details</h3>
              <p className="step-description">
                Configure your {selectedTemplate?.name} project
              </p>
              <form className="project-form">
                <div className="form-group">
                  <label htmlFor="projectName">Project Name *</label>
                  <input
                    id="projectName"
                    type="text"
                    placeholder="my-awesome-project"
                    value={projectName}
                    onChange={(e) => {
                      setProjectName(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectPath">Project Location (optional)</label>
                  <input
                    id="projectPath"
                    type="text"
                    placeholder="~/projects"
                    value={projectPath}
                    onChange={(e) => setProjectPath(e.target.value)}
                  />
                  <small>Leave blank to create in home directory</small>
                </div>
              </form>
              {error && <div className="error-message">{error}</div>}
            </div>
          )}

          {step === 3 && (
            <div className="step-content creating">
              <div className="creating-animation">
                <div className="spinner"></div>
              </div>
              <h3>Creating Project...</h3>
              <p>Setting up {selectedTemplate?.name}</p>
              <div className="progress-items">
                <div className="progress-item">
                  <span className="check">✓</span>
                  <span>Project folder created</span>
                </div>
                <div className="progress-item">
                  <span className="spinner-small"></span>
                  <span>Installing dependencies</span>
                </div>
                <div className="progress-item">
                  <span>—</span>
                  <span>Configuring project</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="dialog-footer">
          {step < 3 && (
            <>
              <button
                className="button secondary"
                onClick={() => {
                  if (step === 2) {
                    setStep(1);
                  } else {
                    onClose();
                  }
                }}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </button>
              <button
                className="button primary"
                onClick={() => {
                  if (step === 1) {
                    handleNextStep();
                  } else {
                    handleCreateProject();
                  }
                }}
                disabled={step === 1 ? !selectedTemplate : !projectName.trim()}
              >
                {step === 1 ? 'Next' : 'Create Project'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProjectDialog;
