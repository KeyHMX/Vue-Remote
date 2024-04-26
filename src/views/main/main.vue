<template>
  <div class="main">
    <h2>main;{{ counterStore.counter }}-{{ counterStore.doubleCounter }}</h2>
    <button @click="changeCounter">Click to Change</button>
  </div>
</template>

<script setup lang="ts">

import useCounterStore from '@/stores/counter';

const counterStore = useCounterStore()

function changeCounter(){
  counterStore.changeCounterActions(999)
}
</script>

<style lang="less" scoped>
.main{
    color:red
}
</style>