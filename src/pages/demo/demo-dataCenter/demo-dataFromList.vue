<template>
  <div>
    <div class="tabs-panel">
      <span class="active">新增行政保护信息</span>
    </div>
      <div class="from-padding from-view">
        <el-form :model="from" ref="from" :rules="rules" label-position="left"
                 label-width="180px" size="small"
                 class="demo-form-inline" :inline="true">
          <h3>企业基础信息</h3>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品编码：" required>
                <el-input v-model="form.drugCode" class="inputWidth"></el-input>
              </el-form-item>
              <el-button size="small">选择</el-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通用名：">
                <el-input v-model="form.commonName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品名称（中文）：" required>
                <el-input v-model="form.ypmczw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告药品名称（英文）：">
                <el-input v-model="form.ypmcyw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告商品名称（中文）：">
                <el-input v-model="form.spmczw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告商品名称（英文）：">
                <el-input v-model="form.spmcyw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="企业编码：" required>
                <el-input v-model="form.companyCode" class="inputWidth"></el-input>
              </el-form-item>
              <el-button size="small">选择</el-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称：">
                <el-input v-model="form.companyName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请人：" required>
                <el-input v-model="form.proposer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请人所在国家（中文）：">
                <el-input v-model="form.sqrgjzw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请人所在国家（英文）：">
                <el-input v-model="form.sqrgjyw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="受理公告号：">
                <el-input v-model="form.noticeCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="申请日期：" >
                <el-date-picker v-model="form.date1" type="date"
                                placeholder="申请日期" format="yyyy-mm-dd"
                                value-format="yyyy-mm-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请号：">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="授权日期：">
                <el-date-picker v-model="form.date2" type="date"
                                placeholder="授权日期" format="yyyy-mm-dd"
                                value-format="yyyy-mm-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="授权公告号：">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="授权号：">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否终止行政保护：">
                <el-select v-model="form.county">
                  <el-option label="区域一" value="qyo"></el-option>
                  <el-option label="区域二" value="qyr"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="行政保护备注：">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="相关产品信息：" class="product-details">
                <span>已关联</span>
                <span><el-input v-model="form.name"></el-input></span>
                <span>种药品</span>
              </el-form-item>
              <el-button size="small">选择</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <span style="padding-left: 180px">
                <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
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
        form: {
          drugCode:'',
          commonName:'',
          ypmczw:'',
          ypmcyw:'',
          spmczw:'',
          spmcyw:'',
          companyCode:'',
          companyName:'',
          proposer:'',
          sqrgjzw: '',
          sqrgjyw: '',
          noticeCode: '',
          date1: '',
          date2: '',
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
