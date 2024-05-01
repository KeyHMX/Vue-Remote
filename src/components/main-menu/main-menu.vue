<template>
  <div class="main-menu">
    <div class="logo-header">
      <img class="logo" src="@/assets/img/logo.svg" alt="" />

      <div class="title">Key_H管理系统</div>
    </div>

    <div class="menu">
      <!-- 在这里加上el-menu的默认颜色和样式 -->
      <el-menu
        background-color="#001529"
        text-color="#b7bdc3"
        active-text-color="#fff"
        default-active="3"
      >
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>1</span>
          </template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>2</span>
          </template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item one</el-menu-item>
          <el-menu-item index="2-4">item two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon>
            <span>3</span>
          </template>
          <el-menu-item index="3-1">item one</el-menu-item>
          <el-menu-item index="3-2">item two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><location /></el-icon>
            <span>4</span>
          </template>
          <el-menu-item index="4-1">item one</el-menu-item>
          <el-menu-item index="4-2">item two</el-menu-item>
        </el-sub-menu> -->
        <!-- 遍历整个菜单 -->
        <template v-for="item in menuList" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <!-- 动态组件 -->
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
//拿到menulist
const loginStore = useLoginStore()
const menuList = loginStore.userMenus
</script>

<style lang="less" scoped>
.main-menu {
  background-color: #001529;
  height: 100vh;
}

.logo-header {
  display: flex;
  justify-content: flex-start;
  padding: 12px 10px 8px 10px;
  height: 28px;
  align-items: center;
  overflow: hidden;
  .logo {
    margin: 0px 8px;
    height: 100%;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
