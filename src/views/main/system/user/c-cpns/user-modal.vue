<template>
  <div class="app">
    <el-dialog v-model="dialogVisible" title="Warning" width="500" align-center>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">1</el-button>
          <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dialogVisible = ref(false)
const setDialogVisible = () => {
  dialogVisible.value = false
}
defineExpose({ setDialogVisible })
</script>

<style scoped>
.modal {
}
</style>
