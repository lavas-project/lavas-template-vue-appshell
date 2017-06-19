/**
 * @file store index
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import Vue from 'vue';
import Vuex from 'vuex';
import appShell from './modules/app-shell';

// 生产环境使用 cdn，此时引入 vuex 会自动注册，无需调用
if (process.env.NODE_ENV !== 'production') {
    Vue.use(Vuex);
}

export default new Vuex.Store({
    getters: {},
    modules: {
        appShell
    }
});
