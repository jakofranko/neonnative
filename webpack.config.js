const path = require("path");
const webpack = require("webpack");

const publicPath = 'public/';
const buildPath = 'dist/';

module.exports = function(env, args) {
    return {
        mode: args.mode || 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: { presets: ["@babel/env"] }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        output: {
            path: path.resolve(__dirname, buildPath),
            publicPath: "/dist/",
            filename: "bundle.js"
        },
        devServer: {
            contentBase: path.join(__dirname, publicPath),
            port: 3000,
            publicPath: "http://localhost:3000/" + buildPath,
            hotOnly: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'build.mode': JSON.stringify(args.mode)
            })
        ]
    };
}
