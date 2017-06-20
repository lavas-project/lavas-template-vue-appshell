<template>
    <div class="app-sidebar-wrapper">
        <!-- 引入app-mask组件-->
        <app-mask
            :show="show || isDragging"
            @close-mask="close"
        ></app-mask>

        <v-touch 
            @panmove="handlePanMove"
            @panend="handlePanEnd"
            :enabled="{ pan: true, tap: false }"
            :pan-options="panOptions">
            <div
                class="app-sidebar-swipe"
                :class="{'app-sidebar-swipe-right': slideFrom !== 'left'}"></div>
        </v-touch>

        <!-- sidebar 内容部分 -->
        <div
            class="app-sidebar-content"
            :class="classList"
            :style="inlineStyle">
            <!-- 头部 -->
            <div v-if="title" class="app-sidebar-title" @click.stop="close">
                <span class="app-sidebar-title-left-icon">
                    <img v-if="title.imageLeft" :src="title.imageLeft" :alt="title.altLeft" />
                    <icon v-else-if="title.svgLeft" :name="title.svgLeft"></icon>
                    <v-icon light v-else-if="title.iconLeft">{{ title.iconLeft }}</v-icon>
                </span>
                <span>{{ title.text }}</span>
                <slot name="logo" class="app-sidebar-title-right-logo">
                    <span class="app-sidebar-title-right-logo">
                        <img v-if="title.imageRight" :src="title.imageRight" :alt="title.altRight" />
                        <icon v-else-if="title.svgRight" :name="title.svgRight"></icon>
                        <v-icon v-else-if="title.iconRight">{{ title.iconRight }}</v-icon>
                    </span>
                </slot>
            </div>

            <!-- 导航列表分区块 -->
            <div v-if="blocks" class="app-sidebar-blocks">
                <ul>
                    <!-- 单个区块 -->
                    <li v-for="block in blocks" class="app-sidebar-block">
                        <div v-if="block.sublistTitle" class="sub-list-title">{{ block.sublistTitle }}</div>
                        <ul v-if="block.list">
                            <li v-for="item in block.list" @click.stop="closeAndGo(item.route)">
                                <span v-if="item.icon || item.image || item.svg " class="app-sidebar-block-left-icon">
                                    <img v-if="item.image" :src="item.image" :alt="item.alt" />
                                    <icon v-else-if="item.svg" :name="item.svg"></icon>
                                    <v-icon v-else-if="item.icon">{{ item.icon }}</v-icon>
                                </span>
                                <span v-if="item.text" class="app-sidebar-block-text">{{ item.text }}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import AppMask from './AppMask.vue';

// hammer.js 方向常量
const DIRECTION_LEFT = 2;
const DIRECTION_RIGHT = 4;

// 左/右阴影宽度
const BOX_SHADOW_WIDTH = 12;

export default {
    components: {
        AppMask
    },
    data() {
        return {
            isDragging: false, // 是否处于拖拽状态
            translateX: 0, // 当前水平位移
            clientWidth: 0, // 窗口宽度
            widthInPx: 0, // sidebar以px为单位的宽度
            showWidthThresholdInPx: 0, // 展示阈值以px为单位
            panOptions: { // hammer.js pan手势配置对象
                direction: 'horizontal',
                threshold: 10
            }
        };
    },
    computed: {
        ...mapState('appShell/appSidebar', [
            'show',
            'slideFrom',
            'title',
            'blocks',
            'width',
            'showWidthThreshold'
        ]),
        classList() {
            return {
                'app-sidebar-content-right': this.slideFrom !== 'left'
            };
        },
        inlineStyle() {
            // 拖拽时取消transition
            let transition = this.isDragging ? 'none' : 'transform .5s ease';
            // 隐藏状态时的位置
            let initTranslateX = this.widthInPx + BOX_SHADOW_WIDTH;
            if (this.slideFrom === 'left') {
                initTranslateX = -initTranslateX;
            }
            // 当前水平方向平移距离
            let currentTranslateX = (this.isDragging ?
                this.translateX : (this.show ? 0 : initTranslateX));
            let styleObj = {
                width: `${this.widthInPx}px`,
                transition: transition,
                '-webkit-transition': transition,
                transform: `translate3d(${currentTranslateX}px, 0, 0)`,
                '-webkit-transform': `translate3d(${currentTranslateX}px, 0, 0)`
            }
            // 展示状态绝对定位靠左/右
            styleObj[this.slideFrom] = 0;
            return styleObj;
        },
        closeDirection() {
            return this.slideFrom === 'left' ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
    },
    methods: {
        caclWidth() {
            if (document) {
                this.clientWidth = document.body.clientWidth;
            }
            if (this.width > 1) {
                this.widthInPx = this.width;
            }
            else {
                this.widthInPx = Math.round(this.clientWidth * this.width);
            }
            if (this.showWidthThreshold > 1) {
                this.showWidthThresholdInPx = this.showWidthThreshold;
            }
            else {
                this.showWidthThresholdInPx = this.widthInPx * this.showWidthThreshold;
            }
        },
        close() {
            this.$emit('hide-sidebar');
            this.translateX = Math.round(-this.widthInPx);
        },
        closeAndGo(route) {
            this.$router.push(route);
            this.close();
        },
        open() {
            this.$emit('show-sidebar');
            this.translateX = 0;
        },
        handlePanMove(event) {
            let {deltaX} = event;
            let translateX = deltaX + (this.slideFrom === 'left' ? -this.widthInPx : this.widthInPx);
            this.isDragging = true;
            if (this.widthInPx < Math.abs(deltaX)) { // 滑动超过了sidebar宽度
                return;
            }
            this.translateX = Math.round(translateX);
        },
        handlePanEnd(event) {
            let {direction, deltaX} = event;
            this.isDragging = false;
            if (direction === this.closeDirection) {
                this.close();
            }
            else if (Math.abs(deltaX) > this.showWidthThresholdInPx) { // 停止时滑动距离超过阈值，认为需要展示
                this.open();
            }
            else {
                this.close();
            }
        }
    },
    created() {
        this.caclWidth();
    }
};
</script>

<style lang="stylus" scoped>

// 左侧触发滑动宽度
$swipe-width = 20px

ul,li
    padding 0
    margin 0
    list-style none
a
    text-decoration none
    color #333

.app-sidebar-wrapper
    z-index 9999
    
    .app-sidebar-swipe
        position fixed
        top 0
        bottom 0
        left 0
        width $swipe-width
        user-select none

        &.app-sidebar-swipe-right
            left initial
            right 0

.app-sidebar-content
    position fixed
    top 0
    height 100%
    background: $material-theme.bg-color
    box-shadow 3px 0 8px 1px rgba(0, 0, 0, 0.4)
    overflow-y auto
    z-index 9999
    
    &.app-sidebar-content-right
        box-shadow -3px 0 8px 1px rgba(0, 0, 0, 0.4)
        
        &.app-sidebar-title,
        &.app-sidebar-blocks
            text-align right

    .app-sidebar-title-left-icon,
    .app-sidebar-block-left-icon
        display inline-block
        width ($app-sidebar-left-icon-size + 10)px
        height 100%

        img
            vertical-align middle
            width ($app-sidebar-left-icon-size)px
            height ($app-sidebar-left-icon-size)px
        svg
            position relative
            left 0
            top 0
            transform none
            vertical-align middle
            height ($app-sidebar-left-icon-size)px
            width ($app-sidebar-left-icon-size)px

        .material-icons
            font-size ($app-sidebar-left-icon-size)px

    .app-sidebar-block-text
        display inline-block
        height 100%
        vertical-align middle

    .app-sidebar-title-right-logo,
    .app-sidebar-block-right-logo
        float right

        img
            width 20px
            height 20px
            margin-right 10px


    .app-sidebar-title
        color #fff
        padding 0 10px
        font-size 16px
        font-weight bold
        height $app-sidebar-title-height
        line-height $app-sidebar-title-height
        background: $theme.primary
        text-align left

    .app-sidebar-blocks
        text-align left
            
        .app-sidebar-block
            padding 10px 0
            border-bottom 1px solid #e0e0e0
            color #333

            .sub-list-title
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height
                text-indent ($app-sidebar-left-icon-size + 28)px
                font-weight bold
                color #888

            li
                padding-left 15px
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height


                &:last-child
                    border none

            &:last-child
                border-bottom none

</style>
