<template>
    <div class="detail-wrapper">
        <v-layout row wrap>
            <v-flex xs10 offset-xs1>
                <article class="detail-content text-xs-center">
                    <header class="detail-title text-xs-center">
                        Detail
                    </header>
                    <p>
                    Progressive Web Apps are user experiences that have the reach of the web, and are:
Reliable - Load instantly and never show the downasaur, even in uncertain network conditions.
Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
Engaging - Feel like a natural app on the device, with an immersive user experience.
This new level of quality allows Progressive Web Apps to earn a place on the user's home screen.
                    </p>
                </article>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import types from '@/store/mutation-types';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';

export default {
    name: 'detail',
    mixins: [pageLoadingMixin],
    props: {},
    data() {
        return {}
    },
    methods: {
        ...mapActions([
            'setPageLoading'
        ])
    },
    async mounted() {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
        });
        this.setPageLoading(false);
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$store.commit(types.SET_APP_HEADER, {
                title: 'Detail Page',
                show: true,
                showMenu: false,
                showBack: true,
                showLogo: false,
                actions: [
                    {
                        icon: 'home',
                        route: {
                            name: 'home'
                        }
                    }
                ]
            });

            // 隐藏底部导航栏
            vm.$store.commit(types.SET_APP_BOTTOM_NAV, {
                show: false
            });
        });
    }
};
</script>

<style lang="stylus" scoped>

.detail-content
    font-size 16px
    line-height 30px
    margin-top 30px

    .detail-title
        margin-bottom 20px
        padding 10px 0
        font-size 36px
        font-weight bold


</style>
