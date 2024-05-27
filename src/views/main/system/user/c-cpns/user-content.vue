<template>
  <div class="app">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleModalCall">新建用户</el-button>
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
          <template #default="scope">
            <el-button
              v-if="isUpdate"
              link
              type="primary"
              size="small"
              @click="handleEditBtnClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="isDelete"
              link
              type="primary"
              size="small"
              @click="handleDeleteBtnClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { turnToBeijing } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { defineEmits } from 'vue'
import usePermissons from '@/hooks/usePermissons'

const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
//发起action 请求userlist的数据
fetchUserListData()
// systemStore.postUsersListAction()

//获取userlist数据，进行展示
//但这是异步的 可用computed

// 用户的权限判断
const isCreate = usePermissons('users:create')
const isDelete = usePermissons('users:delete')
const isUpdate = usePermissons('users:delete')
const isQuery = usePermissons('users:query')

const { usersList, usersTotalCount } = storeToRefs(systemStore) //为何用解构呢 为了方便，不用每个地方都systemstore.usertotalcount

// console.log(usersList)

function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

//定义函数 用来发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  console.log('remain fetch', formData)
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  //发起网络请求
  const formInfo = { ...formData, ...info }
  systemStore.postUsersListAction(formInfo)
}

//delete actions
const handleDeleteBtnClick = (id: any) => {
  systemStore.deleteUserByIdAction(id)
}
//edit actions
function handleEditBtnClick(itemData: any) {
  emit('editcall', itemData)
}

//emit the modal action
const emit = defineEmits(['modalCall', 'editcall']) //call the new modal window action
const handleModalCall = () => {
  console.log(isQuery)
  emit('modalCall')
}
defineExpose({ fetchUserListData })
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
