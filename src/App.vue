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

@media only screen and (min-width: 1024px) {
  /* For desktop: */
  .col-1 {width: 8.33%;}
  .col-2 {width: 16.66%;}
  .col-3 {width: 25%;}
  .col-4 {width: 33.33%;}
  .col-5 {width: 41.66%;}
  .col-6 {width: 50%;}
  .col-7 {width: 58.33%;}
  .col-8 {width: 66.66%;}
  .col-9 {width: 75%;}
  .col-10 {width: 83.33%;}
  .col-11 {width: 91.66%;}
  .col-12 {width: 100%;}
}
</style>
