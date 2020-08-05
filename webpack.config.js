const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: false,
    port: 1337,
    historyApiFallback: true,
    proxy: {
      '/films/*': {
        target: `http://localhost:1337/`,
        pathRewrite: {'^/films/*': ``},
      },
      '/player/*': {
        target: `http://localhost:1337/`,
        pathRewrite: {'^/player/*': ``},
      },
      '/add-review': {
        target: `http://localhost:1337/`,
        pathRewrite: {'^/add-review/*': ``},
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  devtool: `source-map`,
};
