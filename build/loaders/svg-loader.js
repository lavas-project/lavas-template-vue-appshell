/**
 * @file svg loader
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

const fs = require('fs');
const path = require('path');
const {svgDir, icons, prefix} = require('../../config/icon');

module.exports = source => {
    // 从vue-awesome中导入
    if (icons) {
        icons.forEach(iconName => source += `import 'vue-awesome/icons/${iconName}';`);
    }

    // 从svg文件夹中取
    fs.readdirSync(svgDir).forEach(file => {
        let svg = fs.readFileSync(path.resolve(svgDir, file), 'utf8');
        let sizeMatch = svg.match(/ viewBox="0 0 (\d+) (\d+)"/);
        let dMatch = svg.match(/ d="([^"]+)"/);
        let svgName = prefix + file.replace(/\.svg$/, '');

        if (!sizeMatch || !dMatch) {
            return;
        }

        // 注册
        source += `Icon.register(
            {
                '${svgName}': {
                    width: ${parseInt(sizeMatch[1], 10)},
                    height: ${parseInt(sizeMatch[2], 10)},
                    d: '${dMatch[1]}'
                }
            });`;
    });

    return source;
};
