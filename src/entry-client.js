/**
 * @file client entry
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import Vue from 'vue';
import 'es6-promise/auto';
import FastClick from 'fastclick';
import {createApp} from './app';
import ProgressBar from '@/components/ProgressBar.vue'

import 'normalize.css';
import '@/assets/styles/global.styl';

// global progress bar
const loading = Vue.prototype.$loading = new Vue(ProgressBar).$mount();
document.body.appendChild(loading.$el);

FastClick.attach(document.body);

const {app, router, store} = createApp();

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
    beforeRouteUpdate (to, from, next) {
        const {asyncData} = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next);
        }
        else {
            next();
        }
    }
});

// after async components have been resolved
router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c));
    })

    if (!activated.length) {
        return next();
    }

    loading.start();
    Promise.all(activated.map(c => {
        if (c.asyncData && (!c.asyncDataFetched || to.meta.notKeepAlive)) {
            return c.asyncData({ store, route: to })
                .then(() => {
                    c.asyncDataFetched = true;
                });
        }
    })).then(() => {
        loading.finish();
        next();
    }).catch(next);
});

router.onReady(() => {
    app.$mount('#app');
});
