const webpack = require('webpack');

const path = require("path");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        // Set up all the aliases we use in our app.
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 6
            })
        ]
    },
    pwa: {
        name: 'Vue ZASH',
        themeColor: '#172b4d',
        msTileColor: '#172b4d',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#172b4d',

        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            importWorkboxFrom: 'local',
            swSrc:'public/service-worker.js',
        }
    },
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    }
};
