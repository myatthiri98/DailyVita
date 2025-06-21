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
      
      // Module resolver for absolute imports
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/store': './src/store',
            '@/types': './src/types',
            '@/constants': './src/constants',
            '@/data': './src/data',
            '@/navigation': './src/navigation',
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
}; 