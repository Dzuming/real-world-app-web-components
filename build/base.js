const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { SRC_PATH, DIST_PATH } = require("./utils");

module.exports = {
  entry: {
    main: path.resolve(SRC_PATH, "main")
  },
  output: {
    path: DIST_PATH,
    filename: "app.[hash:7].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": SRC_PATH
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [SRC_PATH]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        include: [SRC_PATH],
        query: {
          limit: 1024,
          name: "img/[hash:7].[ext]",
          plugins: [
            "transform-decorators-legacy",
          ]
        }
      },
        {
            test: /\.(s*)css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
    ]
  },
  plugins: [
    // Specify output file name and path
    new ExtractTextPlugin({
      filename: "bundle.css"
    })
  ]
};
