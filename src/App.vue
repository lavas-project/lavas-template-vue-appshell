<template>
    <div id="app">
        <div class="app-shell app-shell-bottom-navigation">
            <app-header
                class="app-shell-header"
                :show="appHeader.show"
                :showMenu="appHeader.showMenu"
                :showBack="appHeader.showBack"
                :showLogo="appHeader.showLogo"
                :title="appHeader.title"
                :actions="appHeader.actions"
                :loading="isPageSwitching"
                @click-menu="handleClickHeaderMenu"
                @click-back="handleClickHeaderBack">
                <template slot="logo"></template>
            </app-header>
            <app-sidebar
                :show="appSidebar.show"
                :slideFrom="appSidebar.slideFrom"
                :title="appSidebar.title"
                :blocks="appSidebar.blocks"
                @hide-sidebar = "handleHideSidebar"
                @show-sidebar = "handleShowSidebar"
            >
                <template slot="logo"><span></span></template>
            </app-sidebar>
            <div class="app-view-wrapper">
                <v-progress-circular
                    indeterminate
                    :size="50"
                    v-show="isPageLoading"
                    class="app-view-loading"/>
                <transition
                    :name="pageTransitionName"
                    @before-enter="handleBeforeEnter"
                    @after-enter="handleAfterEnter">
                    <keep-alive>
                        <router-view
                            v-if="!$route.meta.notKeepAlive"
                            class="app-view"
                            :class="{
                                'app-view-with-header': appHeader.show,
                                'app-view-with-footer': appBottomNavigator.show
                            }"></router-view>
                    </keep-alive>
                </transition>
                <transition
                    :name="pageTransitionName"
                    @before-enter="handleBeforeEnter"
                    @after-enter="handleAfterEnter">
                    <router-view
                        v-if="$route.meta.notKeepAlive"
                        class="app-view"
                        :class="{
                            'app-view-with-header': appHeader.show,
                            'app-view-with-footer': appBottomNavigator.show
                        }"></router-view>
                </transition>
            </div>
            <app-bottom-navigator
                class="app-shell-footer"
                :show="appBottomNavigator.show"
                :navs="appBottomNavigator.navs"
                @click-nav="handleClickBottomNav"/>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import AppHeader from './components/appHeader';
import AppSidebar from './components/appSidebar';
import AppBottomNavigator from './components/appBottomNavigator';

export default {
    name: 'app',
    components: {
        AppHeader,
        AppSidebar,
        AppBottomNavigator
    },
    data () {
        return {};
    },
    computed: {
        ...mapGetters([
            'appHeader',
            'appSidebar',
            'appBottomNavigator',
            'isPageLoading',
            'isPageSwitching',
            'pageTransitionName'
        ])
    },
    methods: {
        ...mapActions([
            'setPageSwitching',
            'showSidebar',
            'hideSidebar',
            'activateBottomNav'
        ]),
        handleBeforeEnter() {
            this.setPageSwitching(true);
        },
        handleAfterEnter() {
            this.setPageSwitching(false);
        },
        handleClickHeaderBack() {
            this.$router.go(-1);
        },
        handleClickHeaderMenu() {
            this.showSidebar();
        },
        handleHideSidebar() {
            this.hideSidebar();
        },
        handleShowSidebar() {
            this.showSidebar();
        },
        handleClickBottomNav({name}) {
            this.activateBottomNav(name);
        }
    }
};
</script>

<style lang="stylus">
#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
</style>

<style lang="stylus" scoped>
.app-shell
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    width 100%
    height 100%
    display flex
    flex-direction column

    .app-shell-header
        position fixed
        top 0
        left 0
        right 0

    .app-shell-footer
        position fixed
        bottom 0
        left 0
        right 0

    .app-view-wrapper
        flex 1
        position relative
        overflow hidden
        .app-view-loading
            position fixed
            top 50%
            left 50%
            transform translate(-50%, -50%)
            z-index 100
            color: $theme.primary
        .app-view
            position absolute
            top 0
            right 0
            bottom 0
            left 0
            overflow-x hidden
            overflow-y auto
            transition transform 0.4s cubic-bezier(.55, 0, .1, 1)
            background: $material-theme.bg-color
            color: $material-theme.text-color

            &.app-view-with-header
                top $app-header-height

            &.app-view-with-footer
                bottom $app-footer-height

            &.slide-left-enter
                transform translate(100%, 0)

            &.slide-right-enter
                transform translate(-100%, 0)

            &.slide-right-leave-active
                transform translate(100%, 0)

            &.slide-left-leave-active
                transform translate(-100%, 0)
</style>
