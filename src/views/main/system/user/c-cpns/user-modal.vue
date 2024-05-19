<template>
  <div class="app">
    <el-dialog v-model="dialogVisible" title="请选择" width="500" align-center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
                <!-- 其实这里的value起到的是一个定位的作用 -->
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { ref } from 'vue'

import useSystemStore from '@/stores/main/system/system'
const dialogVisible = ref(false)

const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '', //这里很奇怪，必须要输入手机号码才生效 不知道是什么原理
  roleId: '',
  departmentId: ''
})

//请求数据了
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments, entireRoles } = storeToRefs(mainStore) //保持响应式，即若更改了服务器的值也会同步修改

//点击取消时仅仅关闭即可
const setDialogVisible = () => {
  dialogVisible.value = true
}

//点击确定时的逻辑——调用接口进行数据的上传
const handleConfirmClick = () => {
  dialogVisible.value = false
  systemStore.newUserDataAction(formData)
}
defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-dialog__footer {
  padding-top: 0;
}

.modal {
}
</style>
