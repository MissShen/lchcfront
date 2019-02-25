<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="width-420">
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="100px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="药品编码：" class="width-520" prop="ORG_CODE">
                <el-input v-model="form.ORG_CODE" placeholder="查询药品" class="width-320" disabled></el-input>
                <a @click="synonymDrugsView()">关联</a>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="通用名：" prop="NAME_CHN">
                <el-input v-model="form.NAME_CHN" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="剂型：" prop="DOSEAGE_FORM_CODE">
                <el-input v-model="form.DOSEAGE_FORM_CODE" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="异名：" prop="ALIAS">
                <el-input v-model="form.ALIAS"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="英文异名：" prop="NAME_ENG">
                <el-input v-model="form.NAME_ENG" maxlength="150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="备注：" prop="REMARK">
                <el-input type="textarea" :rows="4" v-model="form.REMARK" maxlength="500"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button @click="handleBack">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <synonym-drugs @fatherFun="myFun" v-if="synoymDrugsVisible" ref="SynonymDrugs"></synonym-drugs>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import SynonymDrugs from "./windowPanel/synonymDrugs";
  import {isEnglish} from "../../../../utils/validateUtil";

  import {insertDrugSynonymInfo} from 'src/axios/datacenter/drugdata/synonym/synonym';

  export default {
    components: {ElCol,SynonymDrugs},
    data() {
      var validateEng = (rule, value, callback) => {
        if (!isEnglish(value)) {
          callback('请输入英文');
        }else{
          callback();
        }
      }
      return {
        synoymDrugsVisible:false,
        form: {
          ORG_CODE: undefined,
          MEDICAL_ID: undefined,
          NAME_CHN:undefined,
          DOSEAGE_FORM_CODE: undefined,
          ALIAS: undefined,
          NAME_ENG: undefined,
          REMARK: undefined,
        },
        rules:{
          ORG_CODE: [
            {required: true,message: '药品编码不可为空'}
          ],
          NAME_CHN: [
            {required: true,message: '通用名不可为空'}
          ],
          DOSEAGE_FORM_CODE:[
            {required: true,message: '剂型不可为空'}
          ],
          ALIAS:[
            {required: true,message: '异名不可为空'}
          ],
          REMARK: [
            {required: true,message: '备注不可为空'}
          ],
          NAME_ENG: [
            {validator: validateEng, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid){
            insertDrugSynonymInfo(this.form).then(res=>{
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.handleBack();
                }
              })
            });
          }
        })
      },
      synonymDrugsView() {
        this.synoymDrugsVisible=true;
        this.$nextTick(() => {
          this.$refs.SynonymDrugs.fillData();
        })
      },
      handleBack(){
        this.$router.go(-1)
      },
      myFun(code, name, dos, id) {
        this.form.ORG_CODE = code;
        this.form.NAME_CHN = name;
        this.form.DOSEAGE_FORM_CODE = dos;
        this.form.MEDICAL_ID = id;
      }
    }
  }
</script>

