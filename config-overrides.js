const webpack = require("webpack")

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
    "crypto": require.resolve("crypto-browserify"),
    "assert": require.resolve("assert"),
    "zlib": require.resolve("browserify-zlib"),
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "constants": require.resolve("constants-browserify"),
    "fs": false
  }
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
    }),
  ]
  // console.log(config.resolve)
  // console.log(config.plugins)

  return config
}
