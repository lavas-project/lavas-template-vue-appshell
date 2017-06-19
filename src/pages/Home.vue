<template>
    <div class="home-wrapper">
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';

export default {
    name: 'home',
    mixins: [pageLoadingMixin],
    props: {},
    data() {
        return {};
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'showBottomNav',
            'setAppHeader',
            'showSidebar'
        ])
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: 'VUE-PWA',
            showMenu: true,
            showBack: false,
            showLogo: true,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                }
            ]
        });
        this.showBottomNav();
        this.setPageLoading(false);
    }
};
</script>

<style lang="stylus" scoped>
</style>
