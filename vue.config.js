const path = require('path')
module.exports = {
    devServer: {
        open: false,
        host: '0.0.0.0', //服务器域名ip ,设置为0.0.0.0则所有的地址均能访问
        port: 8900,
        https: false,
        disableHostCheck: true,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {
            '/api': {
                target:'http://localhost:9010',
                ws: true,//允许跨域
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }
            /*,
            '/apis':{
                target:'https://api.coolapk.com',
                changOrigin: true,
                pathRewrite: {
                    '^/apis':''
                }
            }*/
        }
    },
    configureWebpack:{
        // externals: {
        //     'BMap': 'BMap'
        // }
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [path.resolve(__dirname, 'src/assets/css/index.less')]
      }
    }
}
