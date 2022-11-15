<template>
  <div id="container" class="container">
    <TheSidebar/>

    <TheMain/>
  </div>
</template>

<script>
/* 1. Import components */
import TheSidebar from './components/layout/TheSidebar.vue';
import TheMain from './components/layout/TheMain.vue';

export default {
  name: 'App',
  components: {
    /* 2. Register components */
    TheSidebar,
    TheMain,
  },
}
</script>

<style>
@import url(./style/base.css);
@import url(./style/main.css);
</style>
