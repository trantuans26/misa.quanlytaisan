<template>
    <div class="header">
        <div class="header__data-title">Danh sách tài sản</div>

        <div class="header__list">
            <div class="header__item header__item--text"><b>Sở tài chính</b></div>
            
            <div class="header__item header__item--date" @click="this.year.show = !this.year.show">
                <div class="header__date">
                    Năm 
                    <b>{{this.year.value}}</b>
                    <i class="icon icon--multidrop"></i>
                </div>
                <div class="drilldown drilldown__normal drilldown--year" v-show="this.year.show">
                    <ul class="drilldown__box" >
                        <li 
                            class="drilldown__item" 
                            tabindex="0" 
                            :class="{'drilldown__item--selected': item == this.year.value}"
                            v-for='item in this.year.list'
                            @click="selectYear(item)"
                            v-on:keyup.enter="selectYear(item), this.year.show = false"
                            :key="item"
                        >
                            <div class="drilldown__check"><i class="fa-solid fa-check"></i></div>
                            <div class="drilldown__name">{{item}}</div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="header__item header__item--icon">
                <div class="header__icon" data-title="Thông báo">
                    <i class="icon icon--notify"></i>
                </div>

                <div class="header__icon" data-title="Hệ thống">
                    <i class="icon icon--system"></i>
                </div>
                
                <div class="header__icon" data-title="Hỗ trợ">
                    <i class="icon icon--support"></i>
                </div>

                <div class="header__icon" data-title="Thông tin cá nhân">
                    <i class="icon icon--user"></i>
                </div>

                <div class="header__icon header__icon--dropdown">
                    <i class="icon icon--dropdown"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                year: {
                    show: false,
                    value: 2022,
                    list: [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]
                }
            }
        },
        methods: {
            /* Chọn năm hiển thị
                @param {year}
                @returns void
                Author: Tuan 
                Date: 7/11/2022 
            */
            selectYear(option) {
                this.year.value = option;
            },

        },
    }
</script>

<style scoped>

</style>