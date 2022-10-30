<template>
    <div id="main" class="main">
        <TheHeader/>

        <router-view></router-view>
    </div>
</template>

<script>

/* 1. Import components */
import TheHeader from './TheHeader.vue';

export default {
  name: 'App',
  components: {
    /* 2. Register components */
    TheHeader
  }
}
</script>


<style>
</style>