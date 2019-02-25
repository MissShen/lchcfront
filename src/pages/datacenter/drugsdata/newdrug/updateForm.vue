<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="130px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="通用名：" prop="nameChn">
                <el-input v-model="form.nameChn" class="width-260" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="ATC编码：" prop="atcCode">
                <el-input v-model="form.atcCode" maxlength="7" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="关联11位药品：" prop="phone">
                <span>已关联
                  <el-input v-model="form.drugNum" class="width-90" placeholder="0" :disabled="true"></el-input>
                            种药品</span>
                <a @click="bit11DrugsView('1',form.pharmacologyId)">已关联</a>
                |
                <a @click="bit11DrugsView('0','0')">未关联</a>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="制剂：">
                <el-input v-model="form.doseageFormCode" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="备注：">
                <el-input v-model="form.spec" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="创建人：">
                <el-input v-model="form.createUser" :disabled="true" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="创建时间：">
                    <el-date-picker class="width-260"
                      v-model="form.createDate"
                      type="date"
                      placeholder="选择日期" disabled="true">
                    </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="修改人：">
                <el-input v-model="form.updateUser" :disabled="true" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="修改时间：">
                    <el-date-picker class="width-260"
                      v-model="form.updateDate"
                      type="date"
                      placeholder="" disabled="true">
                    </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button @click="goBack()">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <bit11-drugs v-if="bit11DrugsVisible" ref="Bit11Drugs" @saveDrugIds="saveDrugIds" v-bind:pharmId="this.pharmId"></bit11-drugs>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import Bit11Drugs from "../atccode/windowPanel/bit11Drugs";
  import {catList,insertCatNewPharmacology,info,updateCatNewPharmacology} from 'src/axios/datacenter/basedata/catpharmcology/catnewpharmcology'
  export default {
    components: {ElCol,Bit11Drugs},
    data() {
      return {
        bit11DrugsVisible:false,
        pharmId:'',
        utype:'',
        dno:'',
        form: {
          id:'',
          drugIds:'',
          drugIdsNo:'',
          pharmacologyId:'',
          nameChn:'',
          doseageFormCode:'',
          atcCode:'',
          spec:'',
          createUser:'',
          createDate:'',
          updateUser:'',
          updateDate:'',
          drugNum:'',
          drugsType:''
        },
        rules:{
          nameChn:{ required: true, message: '请填写通用名', trigger: 'blur' },
          atcCode:{ required: true, message: '请填写ATC编码', trigger: 'blur' }
        }
      }
    },
    created(){
      this.id = this.$route.params.id || undefined;
        if (this.id) {
          info(this.id).then(res => {
            this.form = res.data;
            this.dno = this.form.drugNum;
        })
      }
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if(this.utype == '1'){
              this.form.drugsType = '0';
            }else{
              this.form.drugsType = '1';
            }
            this.form.id = this.$route.params.id || undefined;
            updateCatNewPharmacology(this.form).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
              }
          });
            this.goBack()
          })
          }
        });
      },
      saveDrugIds (ids){
        this.form.drugIds = ids;
        if(this.utype == '1'){
          this.form.drugNum -= ids.split(',').length;
        }else{
          this.form.drugNum += ids.split(',').length;
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      bit11DrugsView(id,pharmId) {
        this.bit11DrugsVisible = true;
        this.pharmId = pharmId;
        this.utype = id;
        this.form.drugNum = this.dno;
        this.$nextTick(() => {
          this.$refs.Bit11Drugs.fillData(id,pharmId);
        })
      }
    }
  }
</script>

