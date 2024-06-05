<template>
  <div>
    <Login></Login>
  </div>
</template>

<script setup>
import Login from '@/components/Login.vue';
import { useStore } from '@/stores/counter.js';

const store = useStore()

</script>

<style scoped>

</style>