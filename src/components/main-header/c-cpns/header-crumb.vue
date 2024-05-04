<template>
  <div class="left">
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
// import useLoginStore from '@/stores/login/login';
import { ArrowRight } from '@element-plus/icons-vue'
import { menuToBreadCrumbs } from '../../../utils/map-manus'
import { useRoute } from 'vue-router'
import useLoginStore from '@/stores/login/login'
import { computed } from 'vue'
const userMenus = useLoginStore().userMenus
const route = useRoute()
const breadcrumbs = computed(() => {
  return menuToBreadCrumbs(route.path, userMenus)
})
</script>

<style scoped>
.left {
}
</style>
