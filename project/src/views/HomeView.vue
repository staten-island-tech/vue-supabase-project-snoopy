<template>
  <div>
    <button @click="route">Login</button>
  </div>
</template>

<script setup>
import router from '@/router';
router.push({ path: 'login'})

</script>

<style scoped>

</style>