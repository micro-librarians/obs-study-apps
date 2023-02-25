const name = "OBS Study App";
const ignore = [ // files/folders to not copy to app (in regex format)
  '^/.idea',
  '^/.vscode',
  '^/apps',
  '^/libs',
  '^/out',
  '^/tools',
  '/obs-study/.next',
];

module.exports = {
  packagerConfig: {
    ignore
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: { },
    },
    {
      name: '@electron-forge/maker-deb',
      config: { },
   },
    {
      name: '@electron-forge/maker-rpm',
      config: { },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: './dist/apps/obs-study/exported/favicon-32x32.png',
        format: 'ULFO',
        name
      }
    },
  ],
};

console.log('module.exports', JSON.stringify(module.exports));
