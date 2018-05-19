const path = require("path")
const webpack = require("webpack")

const { CommonsChunkPlugin } = require("webpack").optimize

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].[chunkhash:5].bundle.js",
    "chunkFilename": "[id].[chunkhash:5].chunk.js"
  },
  "target": "web",
  "plugins": [
    new webpack.optimize.CommonsChunkPlugin({
      "name": "main",
      "async": "common",
      "children": true,
      "minChunks": 2
    }),
    new CommonsChunkPlugin({
      "name": "inline",
      "minChunks": null
    })
  ]
}