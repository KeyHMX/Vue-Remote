<template>
  <div class="user">
    <user-search />
    <user-content />
    <div class="content"></div>
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
</script>

<style scoped>
::v-deep(.user) {
  background-color: #134590 !important;
  /* border-radius: 20px; */
}
</style>
