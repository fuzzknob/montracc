module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10.15.3',
        },
        loose: true,
        useBuiltIns: 'usage',
        corejs: 3,
        ignoreBrowserslistConfig: true,
      },
    ],
  ],
  sourceMaps: 'inline',
};
