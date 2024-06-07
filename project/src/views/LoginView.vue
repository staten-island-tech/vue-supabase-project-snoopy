<template>
    <div>
      <h1> Playlist Maker</h1>
      <h2> Login </h2>
      <p> Sign in or sign up below to view your playlist! </p>
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
  margin-bottom: 7%;
  margin-top: 3.5%;
  text-decoration: underline;
  font-size: 3rem;
}
h2 {
  align-items: center;
  font-size: 2.2rem;
  text-decoration: underline;
  text-align: center;
}
p {
  text-align: center;
  margin-bottom: 3%;  
  margin-top: -0.5%;
}
</style>