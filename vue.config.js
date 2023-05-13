const {defineConfig} = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
    transpileDependencies: true,
    pwa: {
        name: 'Magpie',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/service-worker.js',
            // ...other Workbox options...
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': path.resolve(__dirname, 'src/assets'),
            },
        },
    },
})
