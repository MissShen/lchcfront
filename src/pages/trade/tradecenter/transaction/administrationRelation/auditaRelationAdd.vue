<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20" style="width: 600px">
        <el-form :model="form" ref="form" :rules="rules" label-width="160px" class="demo-ruleForm" size="small" :inline="true">
              <el-form-item label="医疗机构名称：" prop="buyerName" >
                <el-input v-model="form.buyerName" :readonly="true" class="inputWidth" ></el-input>
              </el-form-item>
              <el-button @click="addApprove('paramBuyer')" size="small">选择</el-button>

              <el-form-item label="审批机构名称：" prop="approveName" >
                <el-input v-model="form.approveName" :readonly="true" class="inputWidth" ></el-input>
              </el-form-item>
              <el-button @click="addApprove('paramApprove')" size="small">选择</el-button>

                <el-form-item style="margin-left: 120px">
                  <el-button type="primary"  size="small"@click="submitForm()" >保存</el-button>
                  <el-button @click="goBack" size="small" class="el-button-pale">返回</el-button>
                </el-form-item>
        </el-form>
    </div>
    <!-- ============================弹窗引用外部页面============================ -->
    <audita-relation-popup v-if="formViewVisible" :param="param" ref="auditaRelationPopup" v-on:gov-child-popup="childParam"></audita-relation-popup>
  </div>
</template>

<script>
  import {addAuditRelation} from 'src/axios/trade/auditRelation/auditRelationConfig'
  import auditaRelationPopup from './auditaPopup'
  import auditaPopup from './auditaPopup'
  export default {
    //引入子组件
    name:"auditaRelationAdd",
    components: {
      auditaRelationPopup
    },
    data() {
      return {
        form: this.metaQuery(),
        formViewVisible: false,
        dialogVisible:false,
        buyerAbbr:undefined,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        //input效验
        rules:{
          buyerName:{ required: true, message: '请选择医疗机构', trigger: 'change'},
          approveName:{ required: true, message: '请选择审批机构', trigger: 'change'}
        },
      };
    },
    // -------------------------------------------- 方法  -----------------------------------------
    methods: {
      //接收子页面数据，给inpu插入值
      childParam(buyerOrgid,approveOrgid,buyerAbbr){
          this.param === "paramBuyer" ? (this.form.buyerName = buyerAbbr) : (this.form.approveName = buyerAbbr);
          this.param === "paramBuyer" ? (this.form.buyerOrgid = buyerOrgid) : (this.form.approveOrgid = buyerOrgid);
      },
      //调取子组件
      addApprove(temp){
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.param = temp;
          this.$refs.auditaRelationPopup.govPopupParam(this.param);
        })
      },
      //表单数据
      metaQuery() {
        return {
            buyerAbbr: undefined,
            buyerOrgid: undefined,
            buyerName: undefined,
            approveAbbr: undefined,
            approveOrgid: undefined,
            approveName: undefined,
            param:''
        }
      },
      //回退上级连接页面
      goBack() {
        this.$router.go(-1)
      },
      //提交
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
          addAuditRelation(this.resData, this.form).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                if(res.data == "新增成功！"){
                  this.goBack()
                }
              }
            })
          })
        }
      })
      }
    }
  }
</script>

