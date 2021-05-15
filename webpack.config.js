const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/robinEntry.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    fallback: {
        // util: require.resolve("util/"),
        "path": false ,
        "crypto": false,
        "buffer": false,
        "url": false,
        "vm": false,
        "querystring": false,
        "os": false,
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "assert": false,
        "constants": false
    },
  }
};
