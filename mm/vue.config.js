const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Multitask Manager',
    themeColor: '#1976D2',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // // configure the workbox plugin
    
    //workboxPluginMode: 'GenerateSW',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/serviceworker/mmServiceWorker.js',
      swDest: 'mmServiceWorker.js'
      // ...other Workbox options...
    }
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../.bundleAnalysis/webpack-bundle-analyzer.html',
        openAnalyzer: false
      })
    ]
  }
}