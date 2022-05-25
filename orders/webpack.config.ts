import path from "path";
import { Configuration } from "webpack";

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
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
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
};

export default config;
