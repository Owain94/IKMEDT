const webpackMerge = require("webpack-merge")
const commonPartial = require("./webpack/webpack.common")
const devPartial = require("./webpack/webpack.dev")
const prodPartial = require("./webpack/webpack.prod")

module.exports = function (options, webpackOptions) {
  options = options || {}

  console.log(`Running ${options.prod ? "prod" : "dev"} build`)

  const configs = []
  if (options.prod) {
    configs.push(webpackMerge(commonPartial, prodPartial))
  } else {
    configs.push(webpackMerge(commonPartial, devPartial))
  }

  return configs
}