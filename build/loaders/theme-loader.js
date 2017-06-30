/**
 * @file theme loader
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

// extract vuetify theme variables
const theme = require('../../config/theme');
const loaderUtils = require('loader-utils');

const STYLE_TAG_REG = /(\<style.*?lang="styl(?:us)?".*?\>)([\S\s]*?)(\<\/style\>)/g;

const defaultVuetifyVariables = {
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

const themeColor = Object.assign(
    {},
    defaultVuetifyVariables.themeColor,
    theme.theme.themeColor
);

let themeColorTemplate = `
    $theme := {
        primary: ${themeColor.primary}
        accent: ${themeColor.accent}
        secondary: ${themeColor.secondary}
        info: ${themeColor.info}
        warning: ${themeColor.warning}
        error: ${themeColor.error}
        success: ${themeColor.success}
    }
`;

const materialDesign = Object.assign(
    {},
    defaultVuetifyVariables.materialDesign,
    theme.theme.materialDesign
);

let materialDesignTemplate = `
    $material-custom := {
        bg-color: ${materialDesign['bg-color']}
        fg-color: ${materialDesign['fg-color']}
        text-color: ${materialDesign['text-color']}
        primary-text-percent: ${materialDesign['primary-text-percent']}
        secondary-text-percent: ${materialDesign['secondary-text-percent']}
        disabledORhints-text-percent: ${materialDesign['disabledORhints-text-percent']}
        divider-percent: ${materialDesign['divider-percent']}
        active-icon-percent: ${materialDesign['active-icon-percent']}
        inactive-icon-percent: ${materialDesign['inactive-icon-percent']}
    }
    $material-theme := $material-custom
`;

// import global variables
const importVariablesTemplate = '@import \'~@/assets/styles/variables\';';

// add to global variables
const injectedTemplate = importVariablesTemplate
    + themeColorTemplate + materialDesignTemplate;

module.exports = function (source) {
    this.cacheable();
    const options = loaderUtils.getOptions(this);
    if (options && options.injectInVueFile) {
        // inject variables into <style> tag in every '.vue' file
        return source.replace(STYLE_TAG_REG, '$1' + injectedTemplate + '$2$3');
    }
    return injectedTemplate + source;
};
