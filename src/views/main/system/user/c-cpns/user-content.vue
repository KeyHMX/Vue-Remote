<template>
  <div class="app">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" style="width: 100%">
        <el-table-column type="selection" align="center" width="30" />
        <el-table-column type="index" label="序号" width="80" align="center" />

        <el-table-column prop="name" label="用户名" width="120" align="center" />
        <el-table-column prop="realname" label="真实名" width="120" align="center" />
        <el-table-column prop="cellphone" label="手机号码" width="140" align="center" />
        <el-table-column prop="enable" label="状态" width="160" align="center">
          <template #default="scope">
            <el-button plain :type="scope.row.enable ? 'primary' : 'danger'" size="small">
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>

            <!-- //作用域插槽 -->
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" width="200" align="center">
          <template #default="scope">
            {{ turnToBeijing(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="200" align="center">
          <template #default="scope">
            {{ turnToBeijing(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { turnToBeijing } from '@/utils/format'
import { storeToRefs } from 'pinia'
//发起action 请求userlist的数据
const systemStore = useSystemStore()
systemStore.postUsersListAction()

//获取userlist数据，进行展示
//但这是异步的 可用computed

const { usersList } = storeToRefs(systemStore) //为何用解构呢

// console.log(usersList)
</script>

<style scoped>
.app {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}
</style>
