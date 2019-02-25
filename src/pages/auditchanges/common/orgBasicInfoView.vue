<template>
  <div>
    <div class="tabs-panel">
      <span class="active">企业基础信息</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="form" :model="form" :rules="rules" label-position="right" size="small" label-width="160px">
          <h3>企业基础信息</h3>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="企业名称" prop="name">
                <el-input v-model="form.name" placeholder="企业名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="统一社会信用代码">
                <el-input v-model="form.creditCode" placeholder="统一社会信用代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="组织机构代码">
                <el-input v-model="form.organizeCode" placeholder="组织机构代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="企业类型" prop="type">
                <el-checkbox v-model="form.type.factoryFlag" label="生产企业"></el-checkbox>
                <el-checkbox v-model="form.type.salerFlag" label="代理企业"></el-checkbox>
                <el-checkbox v-model="form.type.sendFlag" label="配送企业"></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="企业简称" prop="abbr">
                <el-input v-model="form.abbr" placeholder="企业简称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="经济性质" prop="businessFlag">
                <el-select v-model="form.businessFlag" placeholder="经济性质">
                  <el-option v-for="x in businessFlag" :key="x.key" :label="x.value"
                             :value="x.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="企业曾用名">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="form.usedName"
                  placeholder="企业曾用名">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="所在地区" prop="region">
                <el-cascader
                  size="300"
                  :options="region"
                  v-model="area"
                  @active-item-change="handleRegionChange">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否法人企业">
                <el-radio v-model="form.isJuridicalCompany" label="1">是</el-radio>
                <el-radio v-model="form.isJuridicalCompany" label="0">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="分部负责人">
                <el-input v-model="form.branchPrincipal" placeholder="分部负责人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="分部名称">
                <el-input v-model="form.branchName" placeholder="分部名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="分部地址">
                <el-input v-model="form.branchAddress" placeholder="分部地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="form.remark"
                  placeholder="备注">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "org-basic-info"
  }
</script>

<style scoped>

</style>
