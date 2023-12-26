'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, shell, globalShortcut, session } from 'electron'
import {
  createProtocol
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
const fs = require('fs');
const path = require('path');
const os = require('os');




// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow;

Menu.setApplicationMenu(null)

// Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true, allowServiceWorkers:true, supportFetchAPI:true, corsEnabled:true } }])

protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true, allowServiceWorkers:true, supportFetchAPI:true, corsEnabled:true, bypassCSP: true } }])



require('@treverix/remote/main').initialize();



function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 1024, height: 768, frame: false, resizable: false, titleBarStyle: 'hiddenInset', maximizable: false, webPreferences: {
    // Use pluginOptions.nodeIntegration, leave this alone
    // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
    nodeIntegration: true,
    nodeIntegrationInSubFrames: true,
    nodeIntegrationInWorker: true,
    enableRemoteModule: true,
    preload: `${__dirname}/preload.js`,
    // preload: path.join(__dirname, "preload.js"),
    webSecurity: false,
    contextIsolation: false,
    sandbox: false,
    javascript: true
  } })




  win.on('blur', () => {
    //unregister shortcuts
    globalShortcut.unregisterAll()
  });

  win.on('focus', () => {
    //register shortcuts
    globalShortcut.register('CommandOrControl+V', () => {
      win.webContents.paste();
    });
    globalShortcut.register('CommandOrControl+A', () => {
      win.webContents.selectAll();
    });
  });

  win.webContents.on("did-finish-load", () => {
    win!.webContents.send('user-os', process.platform)
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools() 

  } else {
    
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    //change win = null
    win.removeAllListeners();
    win = new BrowserWindow();

  })
}

// Quit when all windows are closed.
app.on('window-all-closed', async () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
  
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }



})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.;d
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }


  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {

    if(process.platform === 'win32') return callback({});
    if(details.url.endsWith('/monero_wallet_full.wasm')){
      const wasm_path = path.join(path.join(__dirname, 'public'), 'monero_wallet_full.wasm');
      callback({redirectURL: wasm_path})
    }else {
      callback({})
    }
    // console.log(details)
    // const correctURL = 'http://localhost:8080/monero_wallet_full.wasm';     
    // let regex =  /Contents\/Resources\/electron.asar\/renderer\/monero_wallet_full.wasm/gi;

    // if(!isDevelopment){
    //   regex = /dist_electron\/monero_wallet_full.wasm/gi;
    // }

    // if (details.url.match(regex)) {
    //     callback({ redirectURL: correctURL });
    // } else {
    //     callback({ cancel: false });  // Allow other requests to proceed as normal
    // }

});

  if(process.platform == 'win32') {
    app.setAppUserModelId("Bitcoin Wallet");
  }
  createWindow()


  globalShortcut.register('CommandOrControl+V', () => {
    win.webContents.paste();

  });
  globalShortcut.register('CommandOrControl+A', () => {
    win.webContents.selectAll();
  });
})


ipcMain.on('openLink', function(event, arg) {
  shell.openExternal(arg)
})



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
