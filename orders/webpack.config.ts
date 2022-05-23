import path from "path";
import { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const production = process.env.NODE_ENV === "production";
const mode = production ? "production" : "development";

const config: Configuration = {
  entry: {
    server: path.resolve(process.cwd(), "src/index.ts"),
  },
  target: "node",
  mode,
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.ya?ml$/,
        type: "json",
        use: "yaml-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
  },
  node: {
    __dirname: true,
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};

export default config;
