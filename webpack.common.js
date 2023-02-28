const path = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Glob entries
const entries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, './src/js/**/*.js')], {
  ignore: path.resolve(__dirname, './src/js/**/_*.js'),
})();

const htmlGlobPlugins = (entryList, srcPath) => Object.keys(entryList).map(
    (key) =>
      new HtmlWebpackPlugin({
        inject: 'body',
        filename: `${key}.html`,
        template: `${srcPath}/${key}.html`,
        chunks: [key],
      })
  );

module.exports = ({ outputFile, assetFile }) => ({
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${outputFile}.js`,
    chunkFilename: `${outputFile}.js`,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg?g|gif|png|svg|woff2?|ttf|eot)$/i,
        generator: {
          filename: `./img/${assetFile}.[ext]`,
        },
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`,
    }),
    new EslintWebpackPlugin({
      extensions: ['js'],
      fix: true,
    }),
    new StylelintPlugin({
      fix: true,
    }),
    ...htmlGlobPlugins(entries, 'src'),
  ],
  resolve: {
    extensions: ['.js', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
});
