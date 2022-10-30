<template>
  <div id="container" class="container">
    <TheSidebar/>

    <TheMain/>
  </div>

  <TheModal/>
</template>

<script>
/* 1. Import components */
import TheSidebar from './components/layout/TheSidebar.vue';
import TheMain from './components/layout/TheMain.vue';
import TheModal from './components/function/TheModal.vue';

export default {
  name: 'App',
  components: {
    /* 2. Register components */
    TheSidebar,
    TheMain,
    TheModal,
  },
}
</script>

<style>
@import url(./style/base.css);
@import url(./style/main.css);
</style>
