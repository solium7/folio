"use strict";
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    debug: true,
    devtool: 'cheap-inline-module-source-map',
    noInfo: false,
    entry: {
        main_page: ['./src/index'],
        portfolio_owner: ['babel-polyfill', './src/portfolio_owner/portfolio_owner'],
        personal_data: ['./src/personal_data/personal_data']
    },

    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './src'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.DefinePlugin(GLOBALS),
        // new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([
            {from: './src/portfolio_owner/portfolio_owner.php', to: 'portfolio_owner.php'},
            {from: './src/personal_data', to: './'},
            // {from: './src/personal_data/personal_data.php', to: 'personal_data.php'},
            {from: './src/css', to: 'css'},
            {from: './src/fonts', to: 'fonts'},
            {from: './src/viewerjs', to: 'viewerjs'},
            {from: './src/images', to: 'images'},
            {from: './src/lib', to: 'lib'},
            {from: './src/dbqueries', to: './'},
            {from: './src/registration', to: './'},
            {from: './src/index.php', to: 'index.php'},
            {from: './src/login.php', to: 'login.php'},
            {from: './src/register.php', to: 'register.php'},
            // {from: './src/index.js', to: 'index.js'}
        ])
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192'},
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            }
        ]
    },
    watch: true,

    watchOptions: {
        aggregateTimeout: 300
    }
};
