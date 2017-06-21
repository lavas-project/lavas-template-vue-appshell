<template>
    <div class="home-wrapper"></div>
</template>

<script>
import {mapActions} from 'vuex';
import EventBus from '@/event-bus';

export default {
    name: 'home',
    props: {},
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav'
        ])
    },
    async asyncData() {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 500);
        });
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
