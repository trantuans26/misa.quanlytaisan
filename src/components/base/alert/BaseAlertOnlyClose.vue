<template>
    <div class="alert__box" :class="{'alert__box--open': validateShow}">
        <div class="alert__content alert__content--validate">
            <div class="alert__body alert__body--validate" :style="{height: this.heightAlertValidate + 'px'}">
                <i class="icon icon--alert"></i>
                <div class="alert__title alert__title--validate">{{text}}</div>
            </div>
            <div class="alert__footer">
                <button class="btn btn__save alert__button--space" @click="validateShow = false">Đóng</button>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    props: ["text"],
    components: { DButton },
    mounted() {
        this.focusFirst()
    },
    methods: {
 
    },
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>

</style>