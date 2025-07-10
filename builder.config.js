// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */

const config = {
  appId: 'com.alphacode.sphere',
  // eslint-disable-next-line no-template-curly-in-string
  artifactName: 'sphere_setup_${version}.${ext}',
  productName: 'Sphere',
  asar: true,
  directories: {
    output: 'out',
  },
  files: ['dist/**/*', 'renderer/build/**/*', '.env'],
  mac: {
    icon: 'extra-resources/icon.icns',
    target: ['dmg', 'zip'],
    identity: process.env.CSC_NAME,
    notarize: true,
    hardenedRuntime: true,
    gatekeeperAssess: false,
  },
  dmg: {
    icon: 'extra-resources/icon.icns',
    background: 'extra-resources/dmg_bg.png',
    format: 'ULFO',
    contents: [
      {
        x: 450,
        y: 230,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 160,
        y: 230,
        type: 'file',
      },
    ],
  },
  ...(process.platform === 'win32' ? { win: {
    target: 'nsis',
    icon: 'extra-resources/icon.ico',
  },
  nsis: {
    oneClick: true,
    perMachine: false,
    allowToChangeInstallationDirectory: false,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'Sphere',
    menuCategory: true,
    displayLanguageSelector: false,
    installerIcon: 'extra-resources/icon.ico',
    uninstallerIcon: 'extra-resources/icon.ico',
    }} : {}),  
  protocols: {
    name: 'Sphere',
    schemes: ['sphere'],
  },
  fileAssociations: [
    {
      ext: 'sp',
      name: 'Sphere Document',
      description: 'Sphere Document File',
      icon: process.platform === 'win32' ? 'extra-resources/icon.ico' : 'extra-resources/icon.icns',
    },
  ],
  publish: {
    provider: 'generic',
    url: 'https://sphere-release.storage.googleapis.com',
  },
  electronFuses: {
    runAsNode: false,
    enableCookieEncryption: true,
    enableNodeOptionsEnvironmentVariable: false,
    enableNodeCliInspectArguments: false,
    enableEmbeddedAsarIntegrityValidation: true,
  },
};

module.exports = config;
