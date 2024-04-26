<template>
  <!-- <div>Yo Central Cee</div> -->
  <div class="app">

  
  
    <router-link to="/main">主要</router-link>
    <router-link to="/login">登录</router-link>
    <router-view></router-view>
  </div>
 
  
</template>

<script setup lang="ts">
interface Ikun {
  name:string
}
const ikun: Ikun ={
  name:'kobe'
}
console.log(ikun)
</script>

<style scoped></style>
