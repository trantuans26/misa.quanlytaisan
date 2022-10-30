<template>
    <div id="sidebar">
        <!-- BEGIN: Sidebar ở trạng thái thu nhỏ -->
       <div class="sidebar sidebar--minimize" :class="{ display: isDisplay, hide: isHide }">
            <div class="sidebar__top">
                <div class="icon icon--logo sidebar__logo"></div>
            
                <ul class="sidebar__list">
                    <li class="sidebar__item">
                        <router-link to="/">
                            <i class="icon icon--trangchu"></i>
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/product">
                            <i class="icon icon--taisan"></i>
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/">
                        <i class="icon icon--hdtb"></i>              
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/">
                            <i class="icon icon--ccdc"></i>                        
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/">
                            <i class="icon icon--danhmuc"></i>                        
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/">
                            <i class="icon icon--tracuu"></i>                        
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/">
                            <i class="icon icon--baocao"></i>                        
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="sidebar__bottom" >
                <i class="icon icon--zoomout" @click="zoomMax()"></i>
            </div>
        </div>
        <!-- END: Sidebar ở trạng thái thu nhỏ -->

        <!-- BEGIN:  Sidebar ở trạng thái mở rộng -->
        <div class="sidebar sidebar--maximum" :class="{ display: isHide, hide: isDisplay }">
            <div class="sidebar__top">
                <div class="sidebar__logo">
                    <i class="icon icon--logo"></i>
                    <h1>MISA QLTS</h1>
                </div>

                <ul class="sidebar__list">
                    <li class="sidebar__item">
                        <router-link to="/">
                            <i class="icon icon--trangchu"></i>
                            <p>Tổng quan</p>
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/product">
                            <i class="icon icon--taisan"></i>
                            <p>Tài sản</p>
                            <i class="icon icon--angle-down"></i>
                        </router-link>
                    </li>
                    <li class="sidebar__item" data-title="Tài sản hạ tầng/đường bộ">
                        <router-link to="/">
                            <i class="icon icon--hdtb"></i>
                            <p>Tài sản HT-ĐB</p>
                            <i class="icon icon--angle-down"></i>
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/">
                            <i class="icon icon--ccdc"></i>
                            <p>Công cụ dụng cụ</p>
                            <i class="icon icon--angle-down"></i>
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/">
                            <i class="icon icon--danhmuc"></i>
                        <p>Danh mục</p>
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="/">
                            <i class="icon icon--tracuu"></i>
                            <p>Tra cứu</p>
                            <i class="icon icon--angle-down"></i>
                        </router-link>
                    </li>
                    <li class="sidebar__item">
                        <router-link to="#">
                            <i class="icon icon--baocao"></i>
                            <p>Báo cáo</p>
                            <i class="icon icon--angle-down"></i>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="sidebar__bottom" >
                <i class="icon icon--zoomin" @click="zoomMin()"></i>
            </div> 
        </div>
        <!-- END Sidebar ở trạng thái mở rộng -->
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isDisplay: false,
                isHide: true,
            }
        },
        methods: {
            /* Phóng to sidebar
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
            */
            zoomMax() {
                this.isDisplay = false;
                this.isHide = true;
            },
            /* Thu nhỏ sidebar
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
            */
            zoomMin() {
                this.isDisplay = true;
                this.isHide = false;
            }
        }
    }
</script>

<style scoped>

</style>