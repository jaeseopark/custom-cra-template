const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.scss/,
        exclude: /node_modules/,
        use: [
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
};
