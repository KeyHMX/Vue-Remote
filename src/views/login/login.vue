<template>
 <div class="login">
    <login-panel/>
 </div>
</template>

<script setup lang="ts">
import loginPanel from './c-cpns/login-panel.vue';

</script>

<style lang="less" scoped>
.login{
    
    display: flex;
    align-items: center;
    justify-content: center;
    width:100vw;
    height: 100vh;
    background: url('@/assets/img/login-bg.svg');
}

</style>