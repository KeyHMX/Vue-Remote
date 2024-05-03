<template>
  <div class="right">
    <div class="container">
      <div class="operation">
        <span>
          <el-icon><Message /></el-icon>
        </span>
        <span>
          <span class="dot"></span>
          <el-icon><ChatDotRound /></el-icon>
        </span>
        <span>
          <el-icon><Search /></el-icon>
        </span>
      </div>
      <div class="user-info">
        <div class="block">
          <!-- <el-avatar :size="28" src="@/assets/img/R.jpg" /> -->
          <!-- 这里图片不生效 -->
        </div>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            Key_H0626<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <div>
                <el-dropdown-item @click="handleExit">退出系统</el-dropdown-item>
              </div>
              <div>
                <el-dropdown-item>个人信息</el-dropdown-item>
              </div>
              <div>
                <el-dropdown-item>修改密码</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { useRouter } from 'vue-router'
const router = useRouter()
function handleExit() {
  localStorage.removeItem(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  .block {
    margin-right: 10px;
  }
}
</style>
