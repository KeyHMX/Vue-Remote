<template>
  <div class="pane-account">
    <el-form label-width="60px" size="large" :rules="accountRules" status-icon>
      <el-form-item label="帐号">
        <el-input />
      </el-form-item>
      <el-form-item label="密码">
        <el-input show-password/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'

const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须由6~20数字或字母组成~', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

//执行账号的登录逻辑
defineExpose({
  
})
</script>

<style scoped>
.pane-account {
}
</style>
