const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: congfig => {
    congfig.when(process.env.NODE_ENV === 'production', congfig => {
      congfig.entry('app').clear().add('./src/main-prod.js')

      congfig.set('externals', {
        vue: 'Vue',
        lodash: '_',
        'vue-quill-editor': 'VueQuillEditor'
      })

      congfig.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    congfig.when(process.env.NODE_ENV === 'development', congfig => {
      congfig.entry('app').clear().add('./src/main-dev.js')

      congfig.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
})
