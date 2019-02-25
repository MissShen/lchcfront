<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div style="width: 500px" class="padding20">
        <el-form :model="query" ref="query" label-width="180px" label-position="left" :inline="true" class="demo-ruleForm" size="small" >
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item v-show="false" >
                  <el-input v-model="query.id" type="hidden" ></el-input>
                  <el-input v-model="query.orgId" type="hidden" ></el-input>
                  <el-input v-model="query.creatorId" type="hidden" ></el-input>
              </el-form-item>
              <el-form-item v-if="query.roleCode == 'director'" label="是否审核下级采购单：" >
                <template>
                  <el-radio v-model="query.needAuditDoctorPurchase" label="1">是</el-radio>
                  <el-radio v-model="query.needAuditDoctorPurchase" label="0">否</el-radio>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item v-if="query.roleCode == 'director'" label="是否使用多药库：">
            <template>
              <el-radio v-model="query.isMultiRepository" label="1">是</el-radio>
              <el-radio v-model="query.isMultiRepository" label="0">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="是否启用自动到货：">
            <template>
              <el-radio v-model="query.isAutoReceive" label="1">是</el-radio>
              <el-radio v-model="query.isAutoReceive" label="0">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="自动到货时间设置：">
            <template>
              <el-select v-model="query.autoReceiveTime" placeholder="请选择" class="inputWidth">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" >保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {selectTradeSetting,updateTradeSetting} from 'src/axios/trade/trading/trading'
  export default {
    data() {
      return {
        query:this.metaQuery(),
        options: [{
          value: '24',
          label: '24小时'
        },{
          value: '48',
          label: '48小时'
        }, {
          value: '72',
          label: '72小时'
        }, {
          value: '96',
          label: '96小时'
        }, {
          value: '120',
          label: '120小时'
        }],
        value: '',

      };
    },
    created () {
      this.list()
    },
    methods: {

      metaQuery(){
        return{
          query:{
            needAuditDoctorPurchase: '',
            isMultiRepository:'',
            isAutoReceive:'',
            autoReceiveTime:'',
            creatorId:'',
            orgId:'',
            roleCode:''
          }
        }
      },
      submitForm() {
        updateTradeSetting(this.query).then( () => {
          this.$message({
            message: "设置成功！",
            type: 'success',
            duration: 1000
          })
        })

      },
      list(){
        selectTradeSetting().then( res => {
          this.query = res.data[0];
        })
      }
    }
  }
</script>
