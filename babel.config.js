// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: ['react-native-reanimated/plugin'],
// };
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
