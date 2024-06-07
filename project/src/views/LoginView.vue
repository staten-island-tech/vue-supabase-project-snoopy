<template>
    <div>
      <h1> Playlist Maker</h1>
      <h2> Login </h2>
      <Login></Login>
    </div>
  </template>
  
  <script setup>

  import Login from '@/components/Login.vue';
</script>
  
<style scoped>
h1{
  align-items: center;
  text-align: center;
  margin-bottom: 8%;
  margin-top: 2%;
  text-decoration: underline;
  font-size: 3rem;
}
h2 {
  align-items: center;
  font-size: 2.2rem;
  text-align: center;
}
</style>