const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: "development",

    entry: {
        app: './src/index.js',
    
    },
    devtool: 'inline-source-map',
    
    output:{
        path: path.resolve(__dirname, "dist/"),
        filename: "[name].bundle.js"
    },
    devServer: {
          contentBase: './dist',
    },
    module:{

        rules:[
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
            },
      
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                'file-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ]

      
    },

    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title : "Space Game",
          template: "src/index.html"
        }),
        new BundleAnalyzerPlugin()
        
     ],

     optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false
              }
            }
          })
        ]
      }
    
}