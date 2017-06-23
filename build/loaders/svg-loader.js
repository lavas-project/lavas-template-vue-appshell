/* eslint-disable */
const fs = require('fs');
const path = require('path');
const {icon} = require('../../config');
const {svgDir, icons, prefix} = icon;

module.exports = source => {
    if (icons) {
        // 从vue-awesome中导入
        icons.forEach(iconName => {
            source += `import 'vue-awesome/icons/${iconName}';`;
        });
    }
    // 从svg文件夹中取
    fs.readdirSync(svgDir).forEach(file => {
        let svg = fs.readFileSync(path.resolve(svgDir, file), 'utf8');
        let sizeMatch = svg.match(/ viewBox="0 0 (\d+) (\d+)"/);
        let dMatch = svg.match(/ d="([^"]+)"/);
        if (!sizeMatch || !dMatch) {
            return;
        }
        let svgName = prefix + file.replace(/\.svg$/, '');
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
}
