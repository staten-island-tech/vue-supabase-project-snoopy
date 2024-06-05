<template>
    <div>
      <h4>{{ result.name }} by {{ result.artists[0].name }}</h4>
      <button>Add</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    result: Object
  })
  </script>
  
  <style scoped>

  </style>
  