/**
 * @file svg-loader
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

var fs = require('fs');
var path = require('path');
var config = require('../../config');
// svg存放的文件夹
var svgDir = config.icon.svgDir;
// vue-awesome中使用的图标列表
var icons = config.icon.icons;
// 自定义svg前缀
var prefix = config.icon.prefix;

module.exports = function (source) {
    if (icons) {
        // 从vue-awesome中导入
        icons.forEach(function (iconName) {
            source += 'import "vue-awesome/icons/' + iconName + '";';
        });
    }
    // 从svg文件夹中取
    fs.readdirSync(svgDir).forEach(function (file) {
        var svg = fs.readFileSync(path.resolve(svgDir, file), 'utf8');
        var sizeMatch = svg.match(/ viewBox="0 0 (\d+) (\d+)"/);
        var dMatch = svg.match(/ d="([^"]+)"/);
        if (!sizeMatch || !dMatch) {
            return;
        }
        var svgName = prefix + file.replace(/\.svg$/, '');
        // 注册svg
        source += [
            'Icon.register(',
                '{',
                '"' + svgName + '": {',
                    'width: ' + parseInt(sizeMatch[1], 10)  + ',',
                    'height: ' + parseInt(sizeMatch[2], 10) + ',',
                    'd: "' + dMatch[1] + '"',
                '}',
            '});'
        ].join('');
    });

    return source;
};
