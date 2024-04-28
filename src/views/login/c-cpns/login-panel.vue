<template>
  <div class="login-panel">
    <h1 class="title">Key_H后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch>
        <!-- 账号登录的pane -->
        <el-tab-pane name="account" >
          <template #label>
            <div class="label">
              <el-icon><UserFilled/></el-icon>
              <span class="text">账号登录</span>
            </div>
            
          </template>
          <pane-account/>
        </el-tab-pane>
        <!-- 手机登录的pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone/></el-icon>
              <span class="text">手机登录</span>
            </div>

          </template>
          <pan-phone/>
          
        </el-tab-pane>
        
        

        
      </el-tabs>
    </div>

    <div class="link-bar">
      <el-checkbox v-model="checked1" label="记住密码" size="large" />
      <el-link type="info">忘记密码</el-link>
    </div>

    <el-button class="login-btn" size="large" type="primary"> 立即登录 </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const checked1 = ref(false)
import paneAccount from './pane-account.vue';
import panPhone from './pan-phone.vue';
</script>

<style  lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title{
    text-align: center;
    margin-bottom: 15px;
  }
  .label{
    display: flex;
    align-items: center;
    justify-content: center;
    .text{
      margin-left: 5px
    }
  } 
  .link-bar{
    display: flex;
    margin-top: 12px;

    justify-content: space-between;
  }
}
.login-btn{
  margin-top: 10px;
  width: 100%;
}

</style>
