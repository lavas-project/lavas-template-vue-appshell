<template>
    <div class="home-wrapper">
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import EventBus from '@/event-bus';

export default {
    name: 'home',
    props: {},
    data() {
        return {};
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav'
        ])
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: 'Lavas',
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
    }
};
</script>

<style lang="stylus" scoped>
</style>
