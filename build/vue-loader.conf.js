/**
 * @file vue-loader 配置文件
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */


var utils = require('./utils');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction
            ? config.build.productionSourceMap
            : config.dev.cssSourceMap,
        // extract: isProduction
        extract: true
    })
};
