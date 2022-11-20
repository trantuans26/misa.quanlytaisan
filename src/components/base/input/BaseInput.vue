<template>
    <input class="input input--modal"
        reft="inputTxt" 
        type="text" 
        :class="[className, {'input--error': hasError}]" 
        v-model="content"
        @input="bindingDataInput"
        @blur="checkNullValue"
        :style="style"
        :placeholder="placeholder"
        >
</template>

<script>
export default {
    name: "BaseInput",
    props: ["controlledContent","title","placeholder","tag","fieldName"],

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
            borderRed:false,
            hasError: false,
        }
    },
}
</script>

<style scoped>

</style>