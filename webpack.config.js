
var path = require('path')

var htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode:'development',
  entry:'./src/main.js',//入口文件
  output:{//指定输出项
    path:path.resolve(__dirname,'./dist'),//输出路径
    filename:'bundle.js'//输出文件名

  },
  /* devServer: {
    contentBase: "src",
    open: true,
    hot: true,
    port: 3000
  }, */
  plugins:[//所有webpack插件的配置结点
    new htmlWebpackPlugin({
      template:path.resolve(__dirname,'./src/index.html'),//指定模板文件路径
      filename:'index.html'//生成内存页面的名称
    }),
    new VueLoaderPlugin()
  ],
  module:{//配置所有第三方模块loader模块
    rules:[//第三方模块的匹配规则
      {test:/\.css$/,use:['style-loader','css-loader']},//处理css文件的loader
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},

      {test:/\.(jpg|gif|jpeg|png|bmp)$/,use:'url-loader?limit=40000&name=[hash:8]-[name].[ext]'},

      {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},

      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
      {test:/\.vue$/,use:'vue-loader'}//处理vue文件
    ]
  },
  resolve:{
    alias:{//修改vue导入的路径
      "vue$":"vue/dist/vue.js"
    }
  }
}