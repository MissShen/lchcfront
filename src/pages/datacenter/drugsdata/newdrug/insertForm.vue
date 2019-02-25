<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="130px" class="demo-ruleForm"
                 size="small">
          <div>
          <el-form-item label="分类" prop="pharmacologyId">
            <el-select v-model="form.pharmacologyId_1" placeholder="选择分类" @change="changeMethod(form.pharmacologyId_1,2)" class="width-260">
                <el-option
                  v-for="item in categorys_1"
                  :key="item.pid"
                  :label="item.pname"
                  :value="item.pid">
                </el-option>
            </el-select>
            <el-select v-model="form.pharmacologyId_2" placeholder="选择分类" v-if="categorys_2.length>0" @change="changeMethod(form.pharmacologyId_2,3)" class="width-260">
                <el-option
                  v-for="item in categorys_2"
                  :key="item.pid"
                  :label="item.pname"
                  :value="item.pid">
                </el-option>
            </el-select>
            <el-select v-model="form.pharmacologyId_3" placeholder="选择分类" v-if="categorys_3.length>0" @change="changeMethod(form.pharmacologyId_3,4)" class="width-260">
                <el-option
                  v-for="item in categorys_3"
                  :key="item.pid"
                  :label="item.pname"
                  :value="item.pid">
                </el-option>
            </el-select>
            <el-select v-model="form.pharmacologyId_4" placeholder="选择分类" v-if="categorys_4.length>0" class="width-260">
                <el-option
                  v-for="item in categorys_4"
                  :key="item.pid"
                  :label="item.pname"
                  :value="item.pid">
                </el-option>
            </el-select>
          </el-form-item>
        </div>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="ATC编码："  prop="atcCode">
                <el-input v-model="form.atcCode" maxlength="7" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="通用名：" prop="nameChn">
                <el-input v-model="form.nameChn" class="width-260" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="关联11位药品：">
                <span>已关联
                  <el-input v-model="form.drugIdsNo" :disabled="true" class="width-90" placeholder="0"></el-input>
                            种药品</span>
                            <input type="hidden"  v-model="form.drugIds" style="width:0;height:0">
                <a @click="bit11DrugsView('0','0')">查询</a>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="制剂：" >
                <el-input type="textarea" :rows="4" v-model="form.doseageFormCode" class="width-260">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="备注：">
                <el-input
                  type="textarea" :rows="4" v-model="form.spec" class="width-260">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="22">
              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <bit11-drugs v-if="bit11DrugsVisible" ref="Bit11Drugs" @saveDrugIds="saveDrugIds" v-bind:pharmId="0"></bit11-drugs>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import Bit11Drugs from "../atccode/windowPanel/bit11Drugs";
  import {catList,insertCatNewPharmacology} from 'src/axios/datacenter/basedata/catpharmcology/catnewpharmcology'
  export default {
    components: {
      Bit11Drugs,
      ElCol},
    data() {
      return {
        bit11DrugsVisible:false,
        categorys_1:[],
        categorys_2:[],
        categorys_3:[],
        categorys_4:[],
        form: {
          drugIds:'',
          drugIdsNo:'',
          pharmacologyId:'',
          pharmacologyId_1:'',
          pharmacologyId_2:'',
          pharmacologyId_3:'',
          pharmacologyId_4:'',
          nameChn:'',
          doseageFormCode:'',
          atcCode:'',
          spec:''
        },
        rules:{
          nameChn:{ required: true, message: '请填写通用名', trigger: 'blur' },
          atcCode:{ required: true, message: '请填写ATC编码', trigger: 'blur' },
          pharmacologyId:{ required: true, message: '请选择分类', trigger: 'blur' }
        }
      }
    },
    created() {
      catList(null,1).then(res => {
        this.categorys_1 = res.data
      })
    },
    methods: {
      onSubmit(form) {
        debugger
        if(this.form.pharmacologyId_1 && this.form.pharmacologyId_1 != '' && this.form.pharmacologyId_1 != 'undefined'){
          this.form.pharmacologyId = this.form.pharmacologyId_1
        }
        if(this.form.pharmacologyId_2 && this.form.pharmacologyId_2 != '' && this.form.pharmacologyId_2 != 'undefined'){
          this.form.pharmacologyId = this.form.pharmacologyId_2
        }
        if(this.form.pharmacologyId_3 && this.form.pharmacologyId_3 != '' && this.form.pharmacologyId_3 != 'undefined'){
          this.form.pharmacologyId = this.form.pharmacologyId_3
        }
        if(this.form.pharmacologyId_4 && this.form.pharmacologyId_4 != '' && this.form.pharmacologyId_4 != 'undefined'){
          this.form.pharmacologyId = this.form.pharmacologyId_4
        }

        this.$refs[form].validate((valid) => {
          if (valid) {
            if(!this.form.pharmacologyId || this.form.pharmacologyId == ''){
              return this.$message.error('请选择分类');
            }
            insertCatNewPharmacology(this.form).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
              }
            });
            this.goBack();
          })
          }
        });
      },
      changeMethod(pid,plevel){
        catList(pid,plevel).then(res => {
          if(plevel == 2){
            this.categorys_2 = res.data;
            this.form.pharmacologyId_2 = "";
            this.form.pharmacologyId_3 = "";
            this.form.pharmacologyId_4 = "";
            this.categorys_3 = [];
            this.categorys_4 = [];
          }
          if(plevel == 3){
            this.categorys_3 = res.data;
            this.form.pharmacologyId_3 = "";
            this.form.pharmacologyId_4 = "";
            this.categorys_4 = [];
          }
          if(plevel == 4){
            this.categorys_4 = res.data;
            this.form.pharmacologyId_4 = "";
          }

        })
      },
      saveDrugIds (ids){
        this.form.drugIds = ids;
        this.form.drugIdsNo = ids.split(',').length
      },
      goBack() {
        this.$router.go(-1);
      },
      bit11DrugsView(id,pharmId) {
        this.bit11DrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.Bit11Drugs.fillData(id,pharmId);
        })
      }
    }
  }
</script>


