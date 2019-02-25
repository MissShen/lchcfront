<template>
  <div>
    <div class="tabs-panel">
      <span class="active">新增行政保护信息</span>
    </div>
      <div class="from-padding from-view">
        <el-form :model="ruleForm" ref="ruleForm" label-position="left"
                 label-width="180px" size="small"
                 class="demo-form-inline" :inline="true">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品名称（中文）：">
                <span>{{ruleForm.ypmczw}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告药品名称（英文）：">
                <span>{{ruleForm.ypmcyw}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告商品名称（中文）：">
                <span>{{ruleForm.spmczw}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告商品名称（英文）：">
                <span>{{ruleForm.spmcyw}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请人：">
                <span>{{ruleForm.proposer}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="申请人所在国家（中文）：">
                <span>{{ruleForm.sqrgjzw}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请人所在国家（英文）：">
                <span>{{ruleForm.sqrgjyw}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="受理公告号：">
                <span>{{ruleForm.noticeCode}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请日期：" >
                <span>{{ruleForm.date1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请号：">
                <span>{{ruleForm.telephone}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="授权日期：">
                <span>{{ruleForm.date2}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="授权公告号：">
                <span>{{ruleForm.telephone}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="授权号：">
                <span>{{ruleForm.telephone}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否终止行政保护：">
                <span>{{ruleForm.county}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <span style="padding-left: 180px">
                <el-button size="small">返回</el-button>
              </span>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

</template>
<script>
  export default {
    data () {
      return {
        ruleForm:{
          ypmczw:'布洛芬',
          ypmcyw:'buluofen',
          spmczw:'',
          spmcyw:'',
          proposer:'张胜',
          sqrgjzw: '中国',
          sqrgjyw: 'china',
          noticeCode: '',
          date1: '2018-2-15',
          date2: '2018-3-15',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }

      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>
  .product-details span{
    display: inline-block;
    margin-right: 10px;
  }
  .product-details .el-input__inner {
    width:60px !important;
  }
</style>
