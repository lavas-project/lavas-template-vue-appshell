/**
 * @file theme-loader
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

var loaderUtils = require('loader-utils');
var STYLE_TAG_REG = /(\<style.*?lang="styl(?:us)?".*?\>)([\S\s]*?)(\<\/style\>)/g;
var defaultVuetifyVariables = {
    themeColor: {
        primary: '$blue.darken-2',
        accent: '$blue.accent-2',
        secondary: '$grey.darken-3',
        info: '$blue.base',
        warning: '$amber.base',
        error: '$red.accent-2',
        success: '$green.base'
    },
    materialDesign: {
        'bg-color': '#fff',
        'fg-color': '#000',
        'text-color': '#000',
        'primary-text-percent': .87,
        'secondary-text-percent': .54,
        'disabledORhints-text-percent': .38,
        'divider-percent': .12,
        'active-icon-percent': .54,
        'inactive-icon-percent': .38
    }
};
// extract vuetify theme variables
var theme = require('../../config').theme;
var themeColor = Object.assign({},
    defaultVuetifyVariables.themeColor, theme.theme.themeColor);
var themeColorTemplate = [
    '$theme := {\n',
        'primary: ' + themeColor.primary + '\n',
        'accent: ' + themeColor.accent + '\n',
        'secondary: ' + themeColor.secondary + '\n',
        'info: ' + themeColor.info + '\n',
        'warning: ' + themeColor.warning + '\n',
        'error: ' + themeColor.error + '\n',
        'success: ' + themeColor.success + '\n',
    '}\n'
].join('');

var materialDesign = Object.assign({},
    defaultVuetifyVariables.materialDesign, theme.theme.materialDesign);
var materialDesignTemplate = [
    '$material-custom := {\n',
        'bg-color: ' + materialDesign['bg-color'] + '\n',
        'fg-color: ' + materialDesign['fg-color'] + '\n',
        'text-color: ' + materialDesign['text-color'] + '\n',
        'primary-text-percent: ' + materialDesign['primary-text-percent'] + '\n',
        'secondary-text-percent: ' + materialDesign['secondary-text-percent'] + '\n',
        'disabledORhints-text-percent: ' + materialDesign['disabledORhints-text-percent'] + '\n',
        'divider-percent: ' + materialDesign['divider-percent'] + '\n',
        'active-icon-percent: ' + materialDesign['active-icon-percent'] + '\n',
        'inactive-icon-percent: ' + materialDesign['inactive-icon-percent'] + '\n',
    '}\n',
    '$material-theme := $material-custom \n'
].join('');

// import global variables
var importVariablesTemplate = '@import "~@/assets/styles/variables";\n';
// add to global variables
var injectedTemplate = importVariablesTemplate
    + themeColorTemplate + materialDesignTemplate;

module.exports = function (source) {
    this.cacheable();
    var options = loaderUtils.getOptions(this);
    if (options && options.injectInVueFile) {
        // inject variables into <style> tag in every '.vue' file
        return source.replace(STYLE_TAG_REG, '$1' + injectedTemplate + '$2$3');
    }
    return injectedTemplate + source;
};
