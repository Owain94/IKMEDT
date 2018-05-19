const webpackMerge = require("webpack-merge")
const commonPartial = require("./webpack/webpack.common")
const clientPartial = require("./webpack/webpack")
const clientDevPartial = require("./webpack/webpack.dev")
const clientProdPartial = require("./webpack/webpack.prod")

module.exports = function (options, webpackOptions) {
  options = options || {}

  console.log(`Running ${options.prod ? "prod" : "dev"} build`)

  if (options.prod) {
    config = webpackMerge(commonPartial, clientPartial, clientProdPartial)
  } else {
    config = webpackMerge(commonPartial, clientPartial, clientDevPartial)
  }

  const configs = []

  configs.push(config)

  return configs
}