const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出的文件路径
    filename: 'bundle.js', // 输出的文件名
    // path: __dirname + '/dist/[hash]',
  },
  module: {
    rules: [
      { // css规则
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader',
        }),
      },
      { // 图片处理规则
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          }
        ]
      },
      { // js、jsx文件处理规则
        test: /\.jsx?/, // 支持js和jsx
        include: [
          path.resolve(__dirname, 'src'), // src目录下的才需要经过Babel处理
        ]
      }
    ]
  },
  // watch: true   // 监听修改自动打包
  plugins: [
    new UglifyPlugin(), // 压缩代码
    new ExtractTextPlugin('index.css'), // 输出css文件
    new HtmlWebpackPlugin({ // 配置html文件
      filename: 'index.html', // 配置输出文件名和路径
      template: 'assets/index.html', // 配置文件模板
    }),
  ],
}