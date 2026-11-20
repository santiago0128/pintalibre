// PintaLibre - envoltorio de escritorio (Electron)
const { app, BrowserWindow, Menu, protocol, session, shell } = require('electron');
const path = require('path');
const fs = require('fs');

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }
]);

if (!app.requestSingleInstanceLock()) { app.quit(); }

const WEB = path.join(__dirname, 'web');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };
let win = null;
let allowClose = false;

function createWindow() {
  win = new BrowserWindow({
    width: 1366, height: 860, minWidth: 800, minHeight: 560,
    show: false, backgroundColor: '#b3b3b7', title: 'PintaLibre',
    icon: path.join(__dirname, 'icon.png'), autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false }
  });
  win.once('ready-to-show', () => { win.maximize(); win.show(); });
  win.webContents.on('did-finish-load', () => { win.webContents.setVisualZoomLevelLimits(1, 1).catch(() => {}); });
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/i.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('app://')) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); } });
  // Guarda el dibujo (autoguardado) antes de cerrar la ventana
  win.on('close', (e) => {
    if (allowClose) return;
    e.preventDefault();
    const done = () => { allowClose = true; win.close(); };
    const t = setTimeout(done, 4000);
    win.webContents.executeJavaScript('window.__plFlush ? window.__plFlush() : null', true)
      .catch(() => {}).finally(() => { clearTimeout(t); done(); });
  });
  win.loadURL('app://pintalibre/index.html');
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  protocol.handle('app', (req) => {
    let p = decodeURIComponent(new URL(req.url).pathname);
    if (!p || p === '/') p = '/index.html';
    const file = path.normalize(path.join(WEB, p));
    if (!file.startsWith(WEB)) return new Response('No encontrado', { status: 404 });
    try {
      const data = fs.readFileSync(file);
      return new Response(data, { headers: { 'content-type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' } });
    } catch (err) {
      return new Response('No encontrado', { status: 404 });
    }
  });
  // Descargas (PNG / proyecto): pregunta dónde guardar, empezando en "Descargas"
  session.defaultSession.on('will-download', (e, item) => {
    item.setSaveDialogOptions({ title: 'Guardar', defaultPath: path.join(app.getPath('downloads'), item.getFilename()) });
  });
  createWindow();
});

app.on('window-all-closed', () => app.quit());
