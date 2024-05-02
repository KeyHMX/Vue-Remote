<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px' : '210px'">
        <mainMenu :is-fold="isFold" />
        <!-- 这个is-fold怎么出来的，还是说可以随便起名 -->
        <!-- 我记得这个是v-bind缩写 -->
      </el-aside>
      <el-container>
        <el-header height="30px">
          <mainHeader @fold-change="handleFoldChange" />
        </el-header>
        <el-main>yo </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
// import Button from '@/components/button/button.vue'
import { ref } from 'vue'

const isFold = ref(false)
//自定义事件，接收子传来的props
function handleFoldChange(flag: boolean) {
  isFold.value = flag
  console.log(isFold.value)
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}
.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 2s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
