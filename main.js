"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const isDev = process.env.NODE_ENV !== 'production';
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        // preload: path.join(__dirname, 'preload.js') // if we have one
        },
    });
    if (isDev) {
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools();
    }
    else {
        // In production, load the built React app
        win.loadFile(path_1.default.join(__dirname, 'renderer/build/index.html'));
    }
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
