<template>
    <input :type="type" class="input" :class="[className, {borderred: borderRed}]" :placeholder="placeholder"
        :tabindex="tabindex" :value="modelValue" @input="(event)=> $emit('update:modelValue',event.target.value)"
        @blur="validateInputBlur()"
        :style="style"
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