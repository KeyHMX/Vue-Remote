<template>
  <div class="user">
    <user-search />
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from './c-cpns/user-search.vue'
</script>

<style scoped>
::v-deep(.user) {
  background-color: #134590 !important;
  /* border-radius: 20px; */
}
</style>
