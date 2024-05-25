<template>
  <div class="app">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleModalCall">
        {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ turnToBeijing(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleEditBtnClick(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="handleDeleteBtnClick(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" hName="why"></slot>
                <!-- 此处为定制化 结合插槽以及配置文件进行自定义 -->
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
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

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

const props = defineProps<IProps>()

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
  systemStore.postPageListAction(props.contentConfig.pageName, formInfo) //这里将原本写的‘department’改为了配置文件里的pagename，封装性更强
}

//delete actions
const handleDeleteBtnClick = (id: any) => {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
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
