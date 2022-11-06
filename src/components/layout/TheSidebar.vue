<template>
    <div id="sidebar">
        <!-- BEGIN: Sidebar ở trạng thái thu nhỏ -->
        <div class="sidebar sidebar--minimize" 
          :class="{display: !isDisplay}"
        >
            <div class="sidebar__top">
                <div class="icon icon--logo sidebar__logo"></div>
            
                <ul class="sidebar__list"
                    :class="active"
                    @click.prevent
                >
                    <li 
                        class="sidebar__item"
                        v-for='item in this.sidebar.items'
                        @click="makeActive(item.style)"
                        :key="item"
                        :class="item.style"
                    >
                        <router-link :to="item.route">
                            <i class="icon" :class="item.icon"></i>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="sidebar__bottom" >
                <i class="icon icon--zoomout" @click="zoom()"></i>
            </div>
        </div>
        <!-- END: Sidebar ở trạng thái thu nhỏ -->

        <!-- BEGIN:  Sidebar ở trạng thái mở rộng -->
        <div class="sidebar sidebar--maximum" 
            :class="{display: isDisplay}"
        >
            <div class="sidebar__top">
                <div class="sidebar__logo">
                    <i class="icon icon--logo"></i>
                    <h1>MISA QLTS</h1>
                </div>

                <ul class="sidebar__list" 
                    :class="active"
                    @click.prevent
                >
                    <li class="sidebar__item" 
                        v-for='item in this.sidebar.items'
                        @click="makeActive(item.style)"
                        :key="item"
                        :class="item.style"
                    >
                        <router-link :to="item.route">
                            <i class="icon" :class="item.icon"></i>
                            <p>{{item.title}}</p>
                            <i class="icon" :class="item.subicon"></i>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="sidebar__bottom" >
                <i class="icon icon--zoomin" @click="zoom()"></i>
            </div> 
        </div>
        <!-- END Sidebar ở trạng thái mở rộng -->
    </div>
</template>

<script>

    export default {
        data() {
            return {
                active: 'logo',
                isDisplay: true,
                sidebar: {
                    items: [
                        {
                            icon: 'icon--total',
                            title: 'Tổng quan',
                            subicon: 'icon--empty'  ,
                            style: 'total',
                            route: '/total'
                        },
                        {
                            icon: 'icon--asset',
                            title: 'Tài sản',
                            subicon: 'icon--angle-down',
                            style: 'asset',
                            route: '/asset'
                        },
                        {
                            icon: 'icon--infrastructure',
                            title: 'Tài sản HT-ĐB',
                            subicon: 'icon--angle-down',
                            style: 'infrastructure',
                            route: '/infrastructure'
                        },
                        {
                            icon: 'icon--tool',
                            title: 'Công cụ dụng cụ',
                            subicon: 'icon--angle-down',
                            style: 'tool',
                            route: '/tool'
                        },
                        {
                            icon: 'icon--category',
                            title: 'Danh mục',
                            subicon: 'icon--empty',
                            style: 'category',
                            route: '/category'
                        },
                        {
                            icon: 'icon--searchShadow',
                            title: 'Tra cứu',
                            subicon: 'icon--angle-down',
                            style: 'searchShadow',
                            route: '/search'
                        },
                        {
                            icon: 'icon--report',
                            title: 'Báo cáo',
                            subicon: 'icon--angle-down',
                            style: 'report',
                            route: '/report'
                        },
                    ],
                },
            }
        },
        methods: {
            /* Phóng to sidebar
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
            */
            zoom() {
                this.isDisplay = !this.isDisplay;
            },
            
            /* Click sidebar__item
            @param {item}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
            */
            makeActive: function(item) {
                this.active = item;
            }
        }
    }
</script> 

<style scoped>

</style>