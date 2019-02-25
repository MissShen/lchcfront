<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div style="width: 500px">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px" class="demo-ruleForm" size="small" :inline="true">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="下级机构名称：" prop="orgName" >
                <el-input v-model="form.orgName" :readonly="true" class="inputWidth"></el-input>
              </el-form-item>
              <el-button @click="addGovReal('orgName')" size="small">选择</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="上级机构名称：" prop="parentOrgName" >
                <el-input v-model="form.parentOrgName" :readonly="true" class="inputWidth" ></el-input>
              </el-form-item>
              <el-button @click="addGovReal('parentOrgName')" size="small">选择</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="padding-left: 120px">
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="submitForm()" >保存</el-button>
                <el-button type="" @click="goBack">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- ============================弹窗引用外部页面============================ -->
    <audita-popup  v-if="formViewVisible" :param = "param" ref="auditaPopup" v-on:gov-child-popup="govChildParam"></audita-popup>
  </div>
</template>

<script>
  import auditaPopup from './auditaPopup'
  import {insertOrdGovRelation} from 'src/axios/trade/transaction/transaction'
  export default {
    //引入子组件
    name:"auditaAdd",
    components:{
      auditaPopup
    },
    data() {
      return {
        formViewVisible: false,
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
          orgName:{ required: true, message: '请选择下级机构名称', trigger: 'change'},
          parentOrgName:{ required: true, message: '请选择上级机构名称', trigger: 'change'}
        },
      };
    },
    // -------------------------------------------- 方法  -----------------------------------------
    methods: {
      submitForm(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            insertOrdGovRelation(this.form).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  if(res.data == "新增成功！"){
                    this.goBack();
                  }
                }
              })
            })
          }
        })
      },
      govChildParam(id,name,abbr){
        this.param == "orgName" ? this.form.orgName = abbr : this.form.parentOrgName = abbr;
        this.param == "orgName" ? this.form.orgId = id : this.form.parentOrgId = id;

      },
      addGovReal(temp){
          this.param = temp;
          this.formViewVisible = true;
          this.$nextTick(() => {
            this.$refs.auditaPopup.govPopupParam(this.param);
          })

      },
      //表单数据
      metaQuery() {
        return {
          parentOrgName: undefined,
          orgName:undefined,
          orgId: undefined,
          parentOrgId: undefined,
          param:'',
          subordinate: '',
          superior: ''

        }
      },
      //回退上级连接页面
      goBack() {
        this.$router.go(-1)
      },


    }
  }
</script>

