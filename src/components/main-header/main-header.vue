<!-- import Components from 'unplugin-vue-components/vite'; -->
<template>
  <div class="main-header">
    <div class="menu-icon" @click="hanleMenuIconClick">
      <el-icon size="28px">
        <!-- 这个component -->
        <!-- 笑死了 这种活动组件可以随意指定要用的组件 -->
        <!-- 还蛮智能的 -->
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <header-crumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerCrumb from './c-cpns/header-crumb.vue'
import headerInfo from './c-cpns/header-info.vue'
function hanleMenuIconClick() {}
const isFold = ref(false)
</script>

<style scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 50px;
  justify-content: space-between;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 28px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
