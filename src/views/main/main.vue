<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>系统总览
            </template>
            <el-menu-item index="1-1">Option 1</el-menu-item>
            <el-menu-item index="1-2">Option 1</el-menu-item>
            <!-- <el-sub-menu index="1-4">
              <template #title>Option4</template>
            </el-sub-menu> -->
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>系统管理
            </template>

            <el-menu-item index="2-1">Option 1</el-menu-item>
            <el-menu-item index="2-2">Option 1</el-menu-item>
            <el-menu-item index="2-3">Option 1</el-menu-item>
            <el-menu-item index="2-4">Option 1</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon><icon-menu /></el-icon>商品中心
            </template>

            <el-menu-item index="3-1">Option 1</el-menu-item>
            <el-menu-item index="3-2">Option 1</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon><icon-menu /></el-icon>随便聊聊
            </template>

            <el-menu-item index="4-1">Option 1</el-menu-item>
            <el-menu-item index="4-2">Option 1</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <!-- 分体 -->
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles'
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #fff; /* 设置背景颜色为白色 */
  color: #000; /* 设置字体颜色为黑色 */
}
.layout-container-demo .el-aside {
  color: #fff; /* 设置字体颜色为白色 */
  background-color: #000; /* 设置背景颜色为黑色 */
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
