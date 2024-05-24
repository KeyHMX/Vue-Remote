<template>
  <div class="app">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleModalCall">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" style="width: 100%">
        <el-table-column type="selection" align="center" width="30" />
        <el-table-column type="index" label="序号" width="80" align="center" />

        <el-table-column prop="name" label="部门名" width="120" align="center" />
        <el-table-column prop="leader" label="部门领导" width="120" align="center" />
        <el-table-column prop="parentId" label="上级部门" width="140" align="center" />

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
            <el-button link type="primary" size="small" @click="handleEditBtnClick(scope.row)"
              >编辑</el-button
            >
            <el-button link type="primary" size="small" @click="handleDeleteBtnClick(scope.row.id)"
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
        :total="pageTotalCount"
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
//发起action 请求userlist的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

// systemStore.postUsersListAction()

//获取userlist数据，进行展示
//但这是异步的 可用computed

const { pageList, pageTotalCount } = storeToRefs(systemStore) //为何用解构呢
fetchPageListData()
// console.log(usersList)

function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

//定义函数 用来发送网络请求
function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  //发起网络请求
  const formInfo = { ...formData, ...info }
  systemStore.postPageListAction('department', formInfo)
}

//delete actions
const handleDeleteBtnClick = (id: any) => {
  systemStore.deletePageByIdAction('department', id)
  console.log(id)
}

//emit the modal action
const emit = defineEmits(['modalCall', 'editCall']) //call the new modal window action
const handleModalCall = () => {
  //just the btn on the right head to new a department
  emit('modalCall')
}
//点击编辑按钮
function handleEditBtnClick(itemData: any) {
  emit('editCall', itemData)
}
defineExpose({ fetchPageListData })
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
