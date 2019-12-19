const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  addWebpackAlias
} = require('customize-cra')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

const config = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    modules: true,
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#f9c700'}
  }),
  useEslintRc(),
  addWebpackAlias({
    '@': resolve("src")
  })
)

module.exports = config
