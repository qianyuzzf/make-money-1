/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      //只包含 icons 目录
      .include.add(dir).end()
      //配置 loader
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
    //extract: false 不要解析出文件

    //配置插件
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])

    //其他 svg loader 排除 icons 目录
    config.module.rule('svg').exclude.add(dir)
  }
}
