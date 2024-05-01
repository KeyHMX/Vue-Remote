<template>
  <div class="pane-account">
    <el-form
      label-width="60px"
      size="large"
      :model="account"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号">
        <el-input v-model="account.name" />
        <!-- 这里 v-model和 ：model是不一样的
        v-model是双向绑定，说明这个组件里的值和
        account里的值实时更新
        而：model 表示v-bind：model 每个elform里的item都可以
        绑定在account的一个具体的属性 -->
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import type { IAccount } from '@/type/login'
import { localCache } from '@/utils/cache'
import { type FormRules, type ElForm, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// import { Ref } from 'vue';
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
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore() //
//这里要导入elform
// 接收接口
//reactive对象
const account = reactive<IAccount>({
  //若记录就将值赋给name和password从而自动写到input框去
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
function loginAction(checked1: boolean) {
  //还好是形参不影响
  // console.log('login')
  //这个validate需要看文档来学习使用方法
  formRef.value?.validate((valid) => {
    //这个validate是elform——elm组件表单的方法，返回一个bool值（若验证成功）
    if (valid) {
      const name = account.name
      const password = account.password

      //向服务器发送网络请求（携带账号和密码）
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 判断是否需要记住密码
        if (checked1) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('oops,请输入正确的格式后再操作')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style scoped>
.pane-account {
}
</style>
