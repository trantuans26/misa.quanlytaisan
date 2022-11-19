<template>
<div class="loading">
    <div class="loader"></div>
</div>
</template>


<script>

</script>

<style scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.55);
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid rgb(26, 164, 200); 
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>