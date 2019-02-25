<template>
  <!--信息页-->
  <div>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="产品名称:">
          <span>{{resData.product}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="剂型:">
          <span>{{resData.dosage}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="商品名:">
          <span>{{resData.trade}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="转换比:">
          <span>{{resData.standRate}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="规格:">
          <span>{{resData.spec}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="单位:">
          <span>{{resData.metric}}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="包材:">
          <span>{{resData.wrap}}</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="生产企业:">
          <span>{{resData.manufacture}}</span>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import {findProductBasic,findShowProductBasic} from 'src/axios/auditchanges/messagePublicity/price'

  export default {
    name: "price-details-top-common",
    props: ["projectProductId","changeFlag"],
    data() {
      return {
        resData: this.metaData()
      }
    },
    created() {
      console.log(this.projectProductId)
      if(this.changeFlag){
        findShowProductBasic(this.projectProductId).then(res =>{
          this.resData = res.data;
        })
      }else {
        findProductBasic(this.projectProductId).then(res =>{
          this.resData = res.data;
        })
      }
    },
    methods: {
      metaData() {
        return {
          product: '',
          trade: '',
          dosage: '',
          spec: '',
          standRate: '',
          metric: '',
          wrap:'',
          manufacture: ''
        }
      },
    }
  }

</script>

