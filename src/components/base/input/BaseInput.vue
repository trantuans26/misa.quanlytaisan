<template>
    <input class="input input--modal" 
        v-bind:class="[className, {'input--error': this.checkfixedAssetName.hasError}]" 
        v-model="content"
        @input="(event)=> $emit('update:modelValue',event.target.value)"
        @blur="validateInputBlur()"
        :style="style"
        :placeholder="placeholder"
        type="text" 
        >
</template>

<script>
export default {
    name: "TheInput",
    props: ['type', 'className', 'placeholder', 'tabindex', 'modelValue', 'style'],

    updated() {
        /**
         * Khi điền thông tin vào input thì sẽ hết border đỏ
         */
        if (this.modelValue) {
            this.borderRed = false;
        }
    },
    methods: {
        /**
        * validate dữ liệu
        */
        validateInputBlur(){
            this.borderRed = true;
        }
    },
   
    data() {
        return {
            borderRed:false
        }
    },
}
</script>

<style scoped>

</style>