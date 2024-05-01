<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside width="200px">
        <mainMenu />
      </el-aside>
      <el-container>
        <el-header height="30px">
          <mainHeader />
        </el-header>
        <el-main><Button /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import Button from '@/components/button/button.vue'
</script>

<style scoped lang="less">
// .main {
//   color: red;
//   // height: 100vh;
//   // width: 100vw;
//   height: 100%;
//   .container {
//     height: 100%;
//     .el-aside {
//       background-color: #001529;
//       height: 100%;
//     }
//     .el-header {
//       background-color: aliceblue;
//     }
//     .el-main {
//       background-color: aqua;
//     }
//   }
// }
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

    // transition: width 0.3s linear;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
