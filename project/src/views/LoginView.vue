<template>
    <div>
      <h1> Playlist Maker</h1>
      <h2> Login </h2>
      <Login></Login>
    </div>
  </template>
  
  <script setup>
  if (error) {
    alert(error.message)
  }

  import Login from '@/components/Login.vue';
</script>
  
<style scoped>
h1{
  align-items: center;
  text-decoration: underline;
  margin-left: 45%
}
h2 {
  align-items: center;
}
</style>