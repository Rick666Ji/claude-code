const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openProject: () => ipcRenderer.invoke('open-project'),
  createProject: (data) => ipcRenderer.invoke('create-project', data),
  getRecentProjects: () => ipcRenderer.invoke('get-recent-projects'),
  deleteRecentProject: (path) => ipcRenderer.invoke('delete-recent-project', path),
  openSettings: () => ipcRenderer.invoke('open-settings'),
  onMenuNewProject: (callback) => ipcRenderer.on('menu-new-project', callback),
  onMenuOpenProject: (callback) => ipcRenderer.on('menu-open-project', callback),
  onOpenDocumentation: (callback) => ipcRenderer.on('open-documentation', callback),
  onShowAbout: (callback) => ipcRenderer.on('show-about', callback),
});
