<template>
    <div class="message--hasError" hidden>{{text}} không thể để trống!</div>
</template>

<script>
export default {
    props:["text"]
}
</script>

<style scoped>
    @import url('../../../style/component/messageError.css');
</style>