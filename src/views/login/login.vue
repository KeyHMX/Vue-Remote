<template>
 <div class="login">
    <div class="panel">
        <div>
            panel
        </div>
    </div>
 </div>
</template>

<script setup lang="ts">


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
.panel{
    display: flex;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    
    background-color: yellow
    
}
</style>