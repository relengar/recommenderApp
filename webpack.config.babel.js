import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
 template: './dist/index.html',
 filename: 'index.html',
 inject: 'body'
});

export default {
  entry: './frontReact/index.js',
  output: {
    path: path.resolve('dist'),
    publicPath: "/",
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
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig
  ]
};
