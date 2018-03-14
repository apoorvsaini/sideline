const path = require("path");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = env => {
  return {
    target: "node",
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    resolve: {
      alias: {
        env: path.resolve(__dirname, `../config/env_${env}.json`)
      }
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?limit=100000' }
      ], loaders: [
        // Pass *.jsx files through jsx-loader transform
        { test: /\.js$/, loaders: ['react-hot','jsx?harmony'] },
  
        { test: /\.css$/, loader: "style-loader!css-loader?importLoaders=1" }
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: env === "development" })
    ]
  };
};
