<template>
  <div class="main-menu">
    <div class="logo-header">
      <img class="logo" src="@/assets/img/logo.svg" alt="" />

      <div class="title" v-show="!isFold">Key_H管理系统</div>
    </div>

    <div class="menu">
      <!-- 在这里加上el-menu的默认颜色和样式 -->
      <el-menu
        :collapse="isFold"
        background-color="#001529"
        text-color="#b7bdc3"
        active-text-color="#fff"
        :default-active="defaultActive"
      >
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
              <el-menu-item :index="subitem.id + ''" @click="hanleItemClick(subitem)">
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
import { menuToPath } from '@/utils/map-manus'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

//拿到menulist
const loginStore = useLoginStore()
const menuList = loginStore.userMenus
//注意这里名字和coderwhy取的不一样

//监听item的点击
const router = useRouter()
function hanleItemClick(item: any) {
  // console.log(item.url)
  const url = item.url
  router.push(url)
}

// console.log(route)
// const path = menuToPath(route.path, menuList) //其实实现了，但是这个刷新简直会让我疯掉 嘿嘿已解决
// console.log(path)
// const defaultActive = ref(path.id + '')

//绑定一下默认值(菜单)
const route = useRoute()

const defaultActive = computed(() => {
  const path = menuToPath(route.path, menuList)
  return path.id + ''
})
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
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
