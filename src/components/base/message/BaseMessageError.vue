<template>
    <div class="message--hasError" hidden>{{text}} không được để trống!</div>
</template>

<script>
export default {
    props:["text"]
}
</script>

<style scoped>
    @import url('../../../style/component/messageError.css');
</style>