const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = (env, options) => {
  const config = {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
      extensions: ['*', '.js', '.vue', '.json'],
    },
    entry: ['@babel/polyfill', resolve('./src/main.js')],
    output: {
      filename: 'bundle.js',
      path: resolve('./dist'),
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true,
                  },
                },
              ],
            },
            postLoaders: {
              html: 'babel-loader?sourceMap',
            },
            sourceMap: true,
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            sourceMap: true,
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            'vue-style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          loader: 'url-loader?limit=8192',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        filename: './index.html',
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      new VueLoaderPlugin(),
    ],
  };

  if (options.mode === 'development') {
    config.devServer = {
      contentBase: '/',
      hot: true,
      inline: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      port: '8888',
    };
    config.devtool = 'inline-source-map';
  } else {
    config.plugins.push(new CleanWebpackPlugin());
  }

  return config;
};
