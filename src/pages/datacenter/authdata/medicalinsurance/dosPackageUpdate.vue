<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="width-460">
        <el-form :model="form" ref="form" label-position="left" label-width="140px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="剂型打包名称：">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="药品剂型：" class="width-600">
                <el-input v-model="form.dosageName" placeholder="查询剂型" class="width-320"></el-input>
                <a @click="goDosageInfo()">选择</a>

                <el-checkbox-group v-model="dosageChecked" labelWidth="150px">
                  <el-checkbox v-for="dosage in dosageOptions" :label="dosage" :key="dosage">{{dosage}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="">
                <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
                <el-button size="small" @click="goBack">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- ========================== 主内容end ========================= -->
    <dosageInfo v-if="dosageInfoVisible" ref="dosageInfo" @chooseDosages="chooseDosages"></dosageInfo>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  // 引入用户相关请求
  import {findDosageGroup,updateDosageGroup} from 'src/axios/datacenter/authdata/medicalinsurance/dosageformpackage';
  import dosageInfo from "./windowPanel/dosage/dosageInfo";
  export default {
    components: {
      ElButton,
      ElCol,
      dosageInfo
    },
    data() {
      return {
        dosageInfoVisible:false,
        chooseDosagesArr:[],
        dosageOptions:[],
        dosageChecked:[],
        form: {}
      }
    },
    created(){
      var id = this.$route.params.id || undefined;
      if (id) {
        this.list(id);
      }
    },
    methods: {
      //  页面出事化
      list(id){
        findDosageGroup(id).then(res => {
          this.form=res.data;
          this.dosageOptions=this.form.dosageName.split(',');
          this.dosageChecked=this.form.dosageName.split(',');
        })

      },
      //  返回
      goBack(){
        this.$router.go(-1);
      },
      //  弹框信息同步到本页面
      chooseDosages(data){
        this.chooseDosagesArr=[];
        this.dosageOptions=[];
        this.dosageChecked=[];
        for(var i=0;i<data.value.length;i++){
          this.chooseDosagesArr.push(data.value[i]);
          this.dosageOptions.push(data.value[i].nameChn);
          this.dosageChecked.push(data.value[i].nameChn);
        }
      },
      //  信息弹框
      goDosageInfo(){
        this.dosageInfoVisible=true;
        this.$nextTick(() => {
          this.$refs.dosageInfo.fillData();
      })
      },
      onSubmit() {
        var codeArr=[];
        for(var i=0;i<this.chooseDosagesArr.length;i++){
          for(var j=0;j<this.dosageChecked.length;j++){
            if(this.dosageChecked[j]==this.chooseDosagesArr[i].nameChn){
              codeArr.push(this.chooseDosagesArr[i].code);
            }
          }
        }
        this.form.dosageName=this.dosageChecked.toString();
        this.form.dosageCode=codeArr.toString();
        updateDosageGroup(this.form).then(res => {
          this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                  this.goBack();
      }
      });
      });
      }
    }
  }
</script>

