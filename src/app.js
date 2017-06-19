/**
 * @file entry
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueTouch from 'vue-touch';
import App from './App.vue';
import {createRouter} from './router.js';
import store from './store';
import Icon from 'vue-awesome/components/Icon.vue';

Vue.component('icon', Icon);

Vue.use(Vuetify);

// 基于hammer.js的手势库
Vue.use(VueTouch);

Vue.config.productionTip = false;

/* eslint-disable no-new */

export function createApp() {
    const router = createRouter();
    const app = new Vue({
        router,
        store,
        ...App
    });
    return {app, router, store};
}
