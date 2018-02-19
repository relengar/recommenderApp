import webpack from 'webpack';
import path from 'path';

export default {
  entry: './frontReact/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'frontReact'),
        exclude: [/\.ejs$/],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
    ],
  }
};
