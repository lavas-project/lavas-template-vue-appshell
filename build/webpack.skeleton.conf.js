/**
 * @file skeleton webpack 配置文件
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

/* eslint-disable no-console */

var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    target: 'node',
    devtool: false,
    entry: './src/entry-skeleton.js',
    output: Object.assign({}, baseWebpackConfig.output, {
        filename: 'skeleton-bundle.js',
        libraryTarget: 'commonjs2'
    }),
    externals: Object.keys(require('../package.json').dependencies),
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        })
    ]
});
