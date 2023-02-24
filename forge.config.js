module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "OBS Study App",
        dir: './dist/apps/obs-study/exported'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        dir: './dist/apps/obs-study/exported'
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        dir: './dist/apps/obs-study/exported'
      },
   },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        dir: './dist/apps/obs-study/exported'
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: './dist/apps/obs-study/exported/favicon-32x32.png',
        format: 'ULFO',
        name: 'OBS Study App',
        dir: './dist/apps/obs-study/exported'
      }
    },
  ],
};
