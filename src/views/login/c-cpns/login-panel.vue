<template>
  <div class="login-panel">
    <h1 class="title">Key_H后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 账号登录的pane -->
        <el-tab-pane name="account">
          <template #label>
            <!-- 插槽 -->
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <!-- 手机登录的pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pan-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="link-bar">
      <el-checkbox v-model="checked1" label="记住密码" size="large" />
      <el-link type="info">忘记密码</el-link>
    </div>

    <el-button class="login-btn" size="large" type="primary" @click="handleBtnClick">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'

import paneAccount from './pane-account.vue'
import panPhone from './pan-phone.vue'
import PaneAccount from './pane-account.vue'

const activeName = ref<string>('account')

const accountRef = ref<InstanceType<typeof PaneAccount>>() //构造器

const checked1 = ref<boolean>(localCache.getCache('checked1') ?? false)

watch(checked1, (newValue) => {
  localCache.setCache('checked1', newValue)
})
//showmenu 是初始定义的 目的是展示当前选中的子组件
//这里改名为handleLoginBtnClick
function handleBtnClick() {
  if (activeName.value === 'account') {
    console.log('执行用户登陆')
    accountRef.value?.loginAction(checked1.value)
    // 这里是父传子 把是否登录的值传给子组件，在子组件中
    // 判断是否需要存储账号密码
  } else {
    console.log('执行手机登陆')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .link-bar {
    display: flex;
    margin-top: 12px;

    justify-content: space-between;
  }
}
.login-btn {
  margin-top: 10px;
  width: 100%;
}
</style>
