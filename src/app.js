/**
 * @file entry
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import Vue from 'vue';
import {
    Vuetify,
    VBtn,
    VApp,
    VList,
    VIcon,
    VProgressCircular,
    VDivider,
    VBottomNav,
    VGrid,
    VAvatar
} from 'vuetify';
import {createRouter} from './router';
import store from './store';
import App from './App.vue';
import Icon from 'vue-awesome/components/Icon.vue';


Vue.use(Vuetify, {
    components: {
        VApp,
        VBtn,
        VList,
        VIcon,
        VProgressCircular,
        VDivider,
        VBottomNav,
        VGrid,
        VAvatar
    }
});

Vue.component('icon', Icon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
export function createApp() {
    let router = createRouter();
    let app = new Vue({
        router,
        store,
        ...App
    });
    return {app, router, store};
}
