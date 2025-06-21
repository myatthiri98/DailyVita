module.exports = function (api) {
  api.cache(true);
  
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-typescript',
    ],
    plugins: [
      // Required for react-native-reanimated
      'react-native-reanimated/plugin',
      
      // Optional: Add module resolver if you want to use absolute imports
      // [
      //   'module-resolver',
      //   {
      //     root: ['./src'],
      //     extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      //     alias: {
      //       '@': './src',
      //       '@components': './src/components',
      //       '@screens': './src/screens',
      //       '@store': './src/store',
      //       '@types': './src/types',
      //       '@utils': './src/utils',
      //       '@hooks': './src/hooks',
      //       '@constants': './src/constants',
      //       '@data': './src/data',
      //     },
      //   },
      // ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
}; 