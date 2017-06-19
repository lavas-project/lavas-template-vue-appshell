/**
 * @file app shell store
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import * as types from '../mutation-types';

const state = {

    /**
     * 是否需要页面切换动画
     *
     * @type {boolean}
     */
    needPageTransition: true,

    /**
     * 多个页面是否处于切换中
     *
     * @type {boolean}
     */
    isPageSwitching: false,

    /**
     * 多个页面切换效果名称
     *
     * @type {string}
     */
    pageTransitionName: '',

    /**
     * 当前页面是否处于加载中
     *
     * @type {boolean}
     */
    isPageLoading: false,

    /**
     * 顶部导航栏的数据
     *
     * @type {Object}
     */
    appHeader: {

        /**
         * 是否展示顶部导航栏
         *
         * @type {boolean}
         */
        show: true,

        /**
         * 标题内容
         *
         * @type {string}
         */
        title: 'Lavas',

        /**
         * logo图标名称
         *
         * @type {string}
         */
        logoIcon: '',

        /**
         * 是否展示左侧菜单图标
         *
         * @type {boolean}
         */
        showMenu: true,

        /**
         * 是否展示左侧返回图标
         *
         * @type {boolean}
         */
        showBack: false,

        /**
         * 是否展示左侧logo
         *
         * @type {boolean}
         */
        showLogo: true,

        /**
         * 右侧操作按钮数组
         *
         * @type {Array}
         */
        actions: []

    },

    /**
     * 左侧侧边栏的数据
     *
     * @type {Object}
     */
    appSidebar: {
        show: false, // 是否显示sidebar
        slideFrom: 'left', // 划出的方向
        // 头部条的相关配置
        title: {
            imageLeft: '',
            altLeft: '',
            svgLeft: '',
            iconLeft: 'home',
            text: 'Home',
            imageRight: '',
            altRight: '',
            svgRight: '',
            iconRight: '',
        },
        // 分块组
        blocks: [
            {
                // 子列表1
                sublistTitle: 'Sublist1',
                list: [
                    {
                        text: 'Detail Page One',
                        icon: 'sentiment_satisfied',
                        route: '/detail'
                    },
                    {
                        text: 'Detail Page Two',
                        image: 'https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_mood_bad_black_48dp.png?raw=true',
                        alt: 'mood-bad',
                        route: '/detail'
                    },
                    {
                        text: 'Detail Page Three',
                        svg: 'svg-sentiment-very-satisfied',
                        route: '/detail'
                    }
                ]
            },
            {
                // 子列表2
                sublistTitle: 'Sublist2',
                list: [
                    {
                        text: 'Detail Page One',
                        svg: '',
                        icon: 'sentiment_satisfied',
                        image: '',
                        route: '/detail'
                    },
                    {
                        text: 'Detail Page Two',
                        svg: '',
                        icon: '',
                        image: 'https://github.com/google/material-design-icons/blob/master/social/2x_web/ic_mood_bad_black_48dp.png?raw=true',
                        alt: 'mood-bad',
                        route: '/detail'
                    },
                    {
                        text: 'Detail Page Three',
                        svg: 'svg-sentiment-very-satisfied',
                        icon: '',
                        image: '',
                        route: '/detail'
                    }
                ]
            }
        ]
    },

    /**
     * app shell 底部导航栏的数据
     *
     * @type {Object}
     */
    appBottomNavigator: {

        /**
         * 是否展示底部导航栏
         *
         * @type {boolean}
         */
        show: true,

        /**
         * 导航按钮列表
         *
         * @type {Array.<Object>}
         */
        navs: [
            {
                // 按钮的名字
                name: 'home',
                // 显示的 icon
                icon: 'home',
                // 显示的文字
                text: '主页',
                // 是否是当前激活的
                active: true,
                // 路由
                route: {
                    name: 'home',
                    path: '/'
                }
            },
            {
                // 按钮的名字
                name: 'user',
                // 显示的 icon
                icon: 'person',
                // 显示的文字
                text: '个人中心',
                // 路由信息
                route: '/user'
            }
        ]
    }

};

const getters = {
    needPageTransition: state => state.needPageTransition,
    isPageSwitching: state => state.isPageSwitching,
    isPageLoading: state => state.isPageLoading,
    pageTransitionName: state => state.pageTransitionName,
    appHeader: state => state.appHeader,
    appSidebar: state => state.appSidebar,
    appBottomNavigator: state => state.appBottomNavigator
};

const actions = {

    /**
     * 开启页面切换动画
     *
     * @param {Function} commit commit
     */
    enablePageTransition({commit}) {
        commit(tpes.ENABLE_PAGE_TRANSITION, true);
    },

    /**
     * 关闭页面切换动画
     *
     * @param {Function} commit commit
     */
    disablePageTransition({commit}) {
        commit(types.DISABLE_PAGE_TRANSITION, false);
    },

    /**
     * 设置页面是否处于切换中
     */
    setPageSwitching({commit}, isPageSwitching) {
        commit(types.SET_PAGE_SWITCHING, isPageSwitching);
    },

    /**
     * 设置页面是否处于载入中
     */
    setPageLoading({commit}, isPageLoading) {
        commit(types.SET_PAGE_LOADING, isPageLoading);
    },

    /**
     * 设置顶部导航条
     */
    setAppHeader({commit}, appHeader) {
        commit(types.SET_APP_HEADER, appHeader);
    },

    /**
     * 隐藏底部导航
     */
    hideBottomNav({commit}) {
        commit(types.SET_APP_BOTTOM_NAV, {show: false});
    },

    /**
     * 显示底部导航
     */
    showBottomNav({commit}) {
        commit(types.SET_APP_BOTTOM_NAV, {show: true});
    },

    /**
     * 激活底部导航
     */
    activateBottomNav({commit}, name) {
        commit(types.ACTIVATE_APP_BOTTOM_NAV, name);
    },

    /**
     * 展示侧边栏
     */
    showSidebar({commit}) {
        commit(types.SET_SIDEBAR_VISIBILITY, true);
    },

    /**
     * 隐藏侧边栏
     */
    hideSidebar({commit}) {
        commit(types.SET_SIDEBAR_VISIBILITY, false);
    }
};

const mutations = {
    [types.SET_PAGE_SWITCHING] (state, isPageSwitching) {
        state.isPageSwitching = isPageSwitching;
    },
    [types.SET_PAGE_LOADING] (state, isPageLoading) {
        state.isPageLoading = isPageLoading;
    },
    [types.SET_PAGE_TRANSITION_NAME] (state, {pageTransitionName}) {
        state.pageTransitionName = pageTransitionName;
    },
    [types.SET_APP_HEADER] (state, appHeader) {
        state.appHeader = Object.assign(state.appHeader, appHeader);
    },
    [types.ACTIVATE_APP_BOTTOM_NAV] (state, name) {
        state.appBottomNavigator.navs = state.appBottomNavigator.navs.map(nav => {
            if (nav.name === name) {
                nav.active = true;
            }
            else {
                nav.active = false;
            }
            return nav;
        });
    },
    [types.SET_APP_BOTTOM_NAV] (state, appBottomNavigator) {
        state.appBottomNavigator = Object.assign(state.appBottomNavigator, appBottomNavigator);
    },
    [types.SET_SIDEBAR_VISIBILITY] (state, sidebarVisibility) {
        state.appSidebar.show = sidebarVisibility;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
