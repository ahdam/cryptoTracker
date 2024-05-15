module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@app/configs': './src/configs/',
          '@app/utils': './src/utils/',
          '@app/atoms': './src/atoms/',
          '@app/queryHooks': './src/queryHooks/',
          '@app/hooks': './src/hooks/',
          '@app/screens': './src/screens/',
          '@app/components': './src/components/',
        },
      },
    ],
  ],
};
