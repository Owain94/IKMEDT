const path = require("path")
const glob = require("glob")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const PreloadWebpackPlugin = require("preload-webpack-plugin")
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin")
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin")
const ZopfliPlugin = require("zopfli-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin")
const PurifyCSSPlugin = require("purifycss-webpack")
const SubresourceIntegrityPlugin = require("webpack-subresource-integrity")
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
    "crossOriginLoading": "anonymous",
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].[chunkhash:5].bundle.js",
    "chunkFilename": "[id].[chunkhash:5].chunk.js"
  },
  "plugins": [
    new ExtractTextPlugin({
      "filename": "[name].[contenthash:5].bundle.css",
      "allChunks": true
    }),
    new PurifyCSSPlugin({
      "paths": glob.sync(
        path.join(process.cwd(), "src/**/*.pug")
      ),
      "minimize": true,
      "purifyOptions": {
        "whitelist": [
          
        ]
      }
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
    new HtmlWebpackExcludeAssetsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      "inline": [
        "inline"
      ]
    }),
    new SubresourceIntegrityPlugin({
      "hashFuncNames": [
        "sha256",
        "sha384"
      ]
    }),
    new ZopfliPlugin({
      "asset": "[path].gz[query]",
      "algorithm": "zopfli",
      "test": /\.(html|js|css|svg|ttf)$/
    }),
    new BrotliPlugin({
      "asset": "[path].br[query]",
      "test": /\.(html|js|css|svg|ttf)$/
    }),
  ]
}