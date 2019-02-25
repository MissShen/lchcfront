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
                <el-input v-model="form.dosageName"  placeholder="查询剂型" class="width-320"></el-input>
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
  // 引入用户相关请求
  import {saveDosageGroup} from 'src/axios/datacenter/authdata/medicalinsurance/dosageformpackage';
  import dosageInfo from "./windowPanel/dosage/dosageInfo";

  export default {
    components: {dosageInfo},
    data() {
      return {
        dosageInfoVisible:false,
        chooseDosagesArr:[],
        dosageOptions:[],
        dosageChecked:[],
        form: {
          name: undefined,
          dosageName: undefined,
          dosageCode: undefined
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      //  信息弹框
      goDosageInfo(){
        this.dosageInfoVisible=true;
        this.$nextTick(() => {
          this.$refs.dosageInfo.fillData();
      })
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
      //  保存新增剂型包
      onSubmit(){
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

        saveDosageGroup(this.form).then(res => {
          this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                  this.goBack();
                  }
          });
        });
      },
      //  返回
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>

