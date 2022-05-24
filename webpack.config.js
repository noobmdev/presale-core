const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const production = process.env.NODE_ENV === "production";

module.exports = {
  mode: production ? "production" : "development",
  entry: ["./src/index.ts"],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new NodePolyfillPlugin()],
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "dist"),
    globalObject: "this",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})],
  },
};
