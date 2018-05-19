const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const PreloadWebpackPlugin = require("preload-webpack-plugin")
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const entryPoints = [
  "inline",
  "styles",
  "main"
]

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  "entry": {
    "main": "./src/main.ts",
    "styles": "./src/assets/css/styles.styl"
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js"
  },
  "plugins": [
    new ExtractTextPlugin({
      "filename": "[name].bundle.css",
      "allChunks": true
    }),
    new HtmlWebpackPlugin({
      "template": "./src/index.pug",
      "filename": "./index.html",
      "hash": false,
      "inject": "head",
      "compile": true,
      "favicon": false,
      "cache": false,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "xhtml": true,
      "minify": {
        "caseSensitive": true,
        "collapseWhitespace": true,
        "keepClosingSlash": true
      },
      "excludeAssets": [/styles.*.js/],
      "chunksSortMode": function sort (left, right) {
        const leftIndex = entryPoints.indexOf(left.names[0])
        const rightindex = entryPoints.indexOf(right.names[0])

        if (leftIndex > rightindex) {
          return 1
        } else if (leftIndex < rightindex) {
          return -1
        } else {
          return 0
        }
      }
    }),
    new PreloadWebpackPlugin({
      "rel": "preload",
      "include": [
        "styles"
      ],
      "fileBlacklist": [
        /styles.*.js/
      ]
    }),
    new HtmlWebpackExcludeAssetsPlugin()
  ]
}