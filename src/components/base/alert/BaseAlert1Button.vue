<template>
    <div class="dialog-container">
        <div class="dialog dialog--warning">
            <div class="dialog__content">
                <div 
                    tabindex="201" 
                    ref="first" 
                    class="warning-icon"
                    @keyup="focusNext()" 
                />
                <div class="dialog__content-text">{{text}}</div>
            </div>
            <div class="dialog__footer">
                <DButton 
                    tabindex="201" 
                    text="Đóng"
                    :id="'dialog1btn'" 
                    @click="closeNotify" 
                    @keydown.tab="focusFirst()" 
                />
            </div>
        </div>
    </div>
    <div class="alert__box" :class="{'alert__box--open': this.isDisplayValidate}">
            <div class="alert__content">
                <div class="alert__body">
                    <i class="icon icon--alert"></i>
                    <div class="alert__title">{{this.textValidate}}!</div>
                </div>
                <div class="alert__footer">
                    <button class="btn btn__save alert__button--space" @click="this.isDisplayValidate = false">Đóng</button>
                </div>
            </div>
        </div>  
</template>

<script>
import DButton from './DButton.vue';
export default {
    props: ["text"],
    components: { DButton },
    mounted() {
        this.focusFirst()
    },
    methods: {
        /**
         * Phát ra tín hiệu cho component cha về sự kiện closeNotify
         * NDDAT (19/09/2022)
         */
        closeNotify() {
            this.$emit("closeNotify")
        },

        /**
         * Focus vào phần tử đầu tiên
         * NDDAT (15/09/2022)
         */
        focusFirst() {
            this.$refs.first.focus()
        },

        /**
         * Chuyển focus đến phần tử thứ 2
         * NDDAT (15/09/2022)
         */
        focusNext() {
            document.getElementById('dialog1btn').focus()
        },
    },
}
</script>

<style scoped>
    @import url('../../css/base/dialog.css');
</style>