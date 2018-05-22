const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动引用js地址
const CleanWebpackPlugin = require('clean-webpack-plugin');//在构建前清空文件夹
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//删除未引用代码
module.exports = {
  //入口文件的配置项
  entry:{
    //zygl: './src/zygl/index.js',
    // app: './src/index.js',
    // print: './src/print.js'
    app:'./src/index.js'
  },
  //出口文件的配置项
  output:{
    filename:'[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
    //publicPath: '/'
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.(png|svg|jpg|gif)$/,
        use:[{
             loader:'url-loader',
             options:{
                 limit:500000
             }
         }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use:[
          "file-loader"
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use:[
          "csv-loader"
        ]
      },
      {
        test: /\.xml$/,
        use:[
          "xml-loader"
        ]
      },
      {
        test:/\.(jsx|js)$/,
        use:{
            loader:'babel-loader',
        },
        exclude:/node_modules/
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins:[
    //构建前清理 /dist2 文件夹
    //new CleanWebpackPlugin(['dist2']),
    //将所有js路径自动加到index.html
    new HtmlWebpackPlugin({
      title:'Output Management',
      minify:{
          removeAttributeQuotes:true
      },
      hash:true,
      template:'./src/index.html'
    }),
    //模块热替换相关插件
    new webpack.NamedModulesPlugin(),
    //模块热替换相关插件
    new webpack.HotModuleReplacementPlugin()
    //清除未引用代码
    //,new UglifyJSPlugin()
  ],
  //调试追踪错误和警告
  devtool: 'inline-source-map',
  //配置webpack开发服务功能
  devServer:{
    contentBase: './dist',
    hot: true,
    host:'localhost',
    //服务端压缩是否开启
    compress:true,
    //配置服务端口号
    port:1717
  }
};
