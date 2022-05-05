const path  = require("path");
const subPath = './tip-calculator-app-main'

module.exports = [
    {
        entry: `${subPath}/js/app.js`,
        output: {
            filename: `out.js`,
            path: path.resolve(__dirname, `${subPath}/build`)
        },
        mode: 'development',
        watch: true, 
        devServer: {
            static: path.join(__dirname, `${subPath}`),
            compress: true,
            port: 3002
        },
        module: {
            rules: [ {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                  }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
              },
              {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
              }]
        }
    }

]