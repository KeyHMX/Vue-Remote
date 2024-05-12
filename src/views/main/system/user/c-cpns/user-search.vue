<!-- <template>
  <div class="search">
    <el-form ref="form" style="max-width: 600px" label-width="90px">
      <el-form-item label="Activity zone">
        <el-select placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.search {
  background-color: #fff;
  padding: 0 20px 20px 20px;
}
</style> -->

<template>
  <div class="search">
    <el-form label-width="90px" size="large">
      <el-row>
        <el-col :span="8">
          <el-form-item class="form-item" label="Price">
            <el-input placeholder="please enter the price"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="form-item" label="Price">
            <el-input placeholder="please enter the price"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item class="form-item" label="Price">
            <el-input placeholder="please enter the price"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select placeholder="please select your zone" style="width: 100%">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 8px 15px;
  }
}
</style>
