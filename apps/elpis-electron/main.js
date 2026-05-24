import { app, BrowserWindow } from 'electron/main';

/* 创建一个窗口 */
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 允许在渲染进程中 使用nodejs
      contextIsolation: false // 关闭上下文隔离
    }
  });
  win.loadFile('index.html');
  win.webContents.openDevTools();
}

// whenReady是 生命周期钩子
app.whenReady().then(() => {
  createWindow();
});
