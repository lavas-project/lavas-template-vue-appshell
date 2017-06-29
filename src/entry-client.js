/**
 * @file client entry
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import 'babel-polyfill';
import Vue from 'vue';
import FastClick from 'fastclick';
import {createApp} from './app';
import ProgressBar from '@/components/ProgressBar.vue';

import '@/assets/styles/global.styl';

// global progress bar
let loading = Vue.prototype.$loading = new Vue(ProgressBar).$mount();
document.body.appendChild(loading.$el);

FastClick.attach(document.body);

let {app, router, store} = createApp();

// 当 router 的 component 参数发生变化的时候执行
Vue.mixin({
    beforeRouteUpdate(to, from, next) {

        let asyncData = this.$options.asyncData;

        if (asyncData) {
            loading.start();
            asyncData.call(this, {
                store: this.$store,
                route: to
            }).then(() => {
                loading.finish();
                next();
            }).catch(next);
        }
        else {
            next();
        }
    },

    // 路由切换时，保存页面滚动位置
    beforeRouteEnter(to, from, next) {
        next(vm => {

            // 通过 `vm` 访问组件实例
            vm.$el.scrollTop = vm.$store.state.appShell.lastPage[to.fullPath] || 0;
        });
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch('appShell/saveScrollTop', {path: from.fullPath, scrollTop: this.$el.scrollTop});
        next();
    }
});

// after async components have been resolved
router.beforeResolve((to, from, next) => {

    let matched = router.getMatchedComponents(to);
    let prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    let activated = matched.filter((c, i) => {
        let ret = diffed || (diffed = (prevMatched[i] !== c));
        return ret;
    });

    if (!activated.length) {
        return next();
    }

    loading.start();
    Promise.all(activated.map(c => {
        if (c.asyncData && (!c.asyncDataFetched || to.meta.notKeepAlive)) {
            return c.asyncData.call(c, {
                store,
                route: to
            }).then(() => {
                c.asyncDataFetched = true;
            });
        }
    })).then(() => {
        loading.finish();
        next();
    }).catch(next);
});

router.onReady(() => app.$mount('#app'));
