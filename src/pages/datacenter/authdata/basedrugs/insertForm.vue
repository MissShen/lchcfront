<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="160px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品分类：">
                <template>
                  <el-radio-group v-model="form.catAuthCountryBase.cnWestFlag">
                    <el-radio label="1">中药</el-radio>
                    <el-radio label="2">西药</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品序号：" prop="catAuthCountryBase.drugNo">
                <el-input v-model="form.catAuthCountryBase.drugNo" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品通用名：" required="true">
                <el-input class="width-260" placeholder="查询药品" readonly="true"></el-input>
                <a @click="chooseDrugs">选择</a>
                <el-checkbox-group v-model="drugsArr" v-if="drugsList.length>0" @change="deleteDrugList()">
                  <el-checkbox v-for="item in drugsList"
                               :key="item.id"
                               :label="item.id"
                               :value="item.id" checked="checked">{{item.nameChn}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品剂型：" required="true">
                <el-input class="width-260" placeholder="查询剂型" readonly="true"></el-input>
                <a @click="chooseDosage">选择</a>
                <el-checkbox-group v-model="dosageFormArr" v-if="dosageFormList.length>0" @change="deleteDosageForm()">
                  <el-checkbox v-for="item in dosageFormList"
                               :key="item.code"
                               :label="item.code"
                               :value="item.code" checked="checked">{{item.nameChn}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="英文名：">
                <el-input v-model="form.catAuthCountryBase.englishName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告药品名称：" prop="catAuthCountryBase.bulletinDrug">
                <el-input v-model="form.catAuthCountryBase.bulletinDrug" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="公告药品剂型：">
                <el-input v-model="form.catAuthCountryBase.bulletinDoseageName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告药品规格：">
                <el-input v-model="form.catAuthCountryBase.bulletinSpecName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品大类：">
                <el-input v-model="form.catAuthCountryBase.drugCategory" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品中类：">
                <el-input v-model="form.catAuthCountryBase.middleCategory" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品小类：">
                <el-input v-model="form.catAuthCountryBase.smallCategory" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配备使用单位：">
                <template>
                  <el-radio-group v-model="form.catAuthCountryBase.useAgency">
                    <el-radio label="1">基层医疗卫生机构</el-radio>
                    <el-radio label="2">其他医疗机构</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="维护地区：" prop="catAuthCountryBase.countryId">
                <el-select v-model="form.catAuthCountryBase.countryId" placeholder="请选择" class="width-260">
                  <el-option
                    v-for="item in chnRegions"
                    :key="item.id"
                    :label="item.nameChn"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="form.catAuthCountryBase.remark" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="关联药品：">
               <span>已选择
                  <el-input v-model="count" class="width-200" readonly="true"></el-input>
                            种药品</span>
                <a @click="chooseAssoDrugs">选择</a>
                <el-checkbox-group v-model="assDrugsArr" v-if="assDrugsList.length>0" @change="deleteAssDrugs()">
                  <el-checkbox v-for="item in assDrugsList"
                               :key="item.catDrug.id"
                               :label="item.catDrug.id"
                               :value="item.catDrug.id" checked="checked">
                    {{item.catDrug.nameChn}} - {{item.catDoseageForm.nameChn}} - {{item.catDrug.spec}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <common-drugs-info v-if="commonDrugsVisible" ref="CommonDrugsInfo" @choose="choose"></common-drugs-info>
    <common-dosage-info v-if="commonDosageVisible" ref="CommonDosageInfo"
                        @chooseDosageForm="chooseDosageForm"></common-dosage-info>
    <asso-drugs v-if="commonAssoVisible" ref="AssoDrugs" @messageMethod="messageMethod"></asso-drugs>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  import CommonDrugsInfo from "../../windowPanel/commonDrugsInfo";
  import CommonDosageInfo from "../../windowPanel/commonDosageInfo";
  import AssoDrugs from "./windowPanel/assoDrugs";
  import {chnRegions} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'
  import {add} from 'src/axios/datacenter/authdata/countrybasedrugs/countryBase'

  export default {
    components: {
      AssoDrugs,
      CommonDosageInfo,
      CommonDrugsInfo,
      ElButton,
      ElCol
    },
    data() {
      return {
        commonAssoVisible: false,
        commonDrugsVisible: false,
        commonDosageVisible: false,
        drugsList: [],
        drugsArr: [],
        dosageFormArr: [],
        dosageFormList: [],
        assDrugsArr: [],
        assDrugsList: [],
        count: 0,
        chnRegions: [],
        form: {
          catAuthCountryBase: {
            'cnWestFlag': "1",
            'drugNo': '',
            'countryId': '',
            'englishName': '',
            'bulletinDrug': '',
            'bulletinDoseageName': '',
            'bulletinSpecName': '',
            'drugCategory': '',
            'middleCategory': '',
            'smallCategory': '',
            'useAgency': "1",
            'remark': ''
          }
        },
        rules: {
          'catAuthCountryBase.drugNo': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthCountryBase.bulletinDrug': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthCountryBase.countryId': {required: true, message: '必填项不可为空', trigger: 'blur'}
        }
      }
    },

    created () {
      this.init()
    },

    methods: {

      init() {
        chnRegions().then(res => {
          this.chnRegions = res.data;
        })
      },

      //同步选择8位药品数据
      choose(data) {
        if (this.drugsList.length > 0) {
          this.drugsList.push.apply(this.drugsList, data.value);
        } else {
          this.drugsList = data.value;
        }
      },

      //同步选择剂型数据
      chooseDosageForm(data) {
        if (this.dosageFormList.length > 0) {
          this.dosageFormList.push.apply(this.dosageFormList, data.value);
        } else {
          this.dosageFormList = data.value;
        }
      },

      //删除选择的8位药品
      deleteDrugList(){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var del = true;
          var arr = [];
          for (var i = 0; i < this.drugsList.length; i++) {
            del = true;
            for (var o = 0; o < this.drugsArr.length; o++) {
              if (this.drugsList[i].id == this.drugsArr[o]) {
                del = false
              }
            }
            if (!del) {
              arr.push(this.drugsList[i]);
            }
          }
          this.drugsList = arr;
        }).catch(() => {
          let arr = [];
          this.drugsList.map(item => {
            arr.push(item.id);
          });
          this.drugsArr = arr;
        });
      },

      //删除选择的剂型
      deleteDosageForm(){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var del = true;
          var arr = [];
          for (var i = 0; i < this.dosageFormList.length; i++) {
            del = true;
            for (var o = 0; o < this.dosageFormArr.length; o++) {
              if (this.dosageFormList[i].code == this.dosageFormArr[o]) {
                del = false
              }
            }
            if (!del) {
              arr.push(this.dosageFormList[i]);
            }
          }
          this.dosageFormList = arr;
        }).catch(() => {
          let arr = [];
          this.dosageFormList.map(item => {
            arr.push(item.code);
          });
          this.dosageFormArr = arr;
        });
      },

      //删除选择的标准药品
      deleteAssDrugs(){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var del = true;
          var arr = [];
          for (var i = 0; i < this.assDrugsList.length; i++) {
            del = true;
            for (var o = 0; o < this.assDrugsArr.length; o++) {
              if (this.assDrugsList[i].catDrug.id === this.assDrugsArr[o]) {
                del = false
              }
            }
            if (!del) {
              arr.push(this.assDrugsList[i]);
            }
          }
          this.assDrugsList = arr;
          this.count = this.assDrugsList.length;
        }).catch(() => {
          let arr = [];
          this.assDrugsList.map(item => {
            arr.push(item.catDrug.id);
          });
          this.assDrugsArr = arr;
        });
      },

      //打开8位药品弹窗
      chooseDrugs(){
        this.commonDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.CommonDrugsInfo.fillData("COMMON", this.drugsArr.toString());
        })
      },

      //打开剂型弹窗
      chooseDosage() {
        this.commonDosageVisible = true;
        this.$nextTick(() => {
          this.$refs.CommonDosageInfo.fillData("COMMON", this.dosageFormArr.toString());
        })
      },

      //选择关联药品
      chooseAssoDrugs() {
        if (this.drugsArr.length == 0 || this.dosageFormArr.length == 0) {
          this.$alert('请选择药品和剂型', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }

        //选中药品剂型同步到弹窗
        var data = {ids: "", codes: "", ids8: "", codeLength: 0};
        data.ids8 = this.drugsArr.toString();
        data.codes = this.dosageFormArr.toString();
        data.ids = this.assDrugsArr.toString();
        this.commonAssoVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoDrugs.fillData("CHOOSE", data);
        })
      },

      //接收选择的药品数据
      messageMethod(data) {
        if (this.assDrugsList.length > 0) {
          this.assDrugsList.push.apply(this.assDrugsList, data.value)
        } else {
          this.assDrugsList = data.value;
        }
        this.count = this.assDrugsList.length;
      },

      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.drugsList.length > 0 && this.dosageFormList.length > 0) {
              var data = {ids: "", ids8: "", codes: ""};
              data.ids8 = this.drugsArr.toString();
              data.codes = this.dosageFormArr.toString();
              data.ids = this.assDrugsArr.toString();
              add(this.form, data).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                  }
                });
                this.goBack()
              })
            } else {
              this.$alert('请选择药品和剂型', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              });
              return false;
            }
          } else {
            this.$alert('请检查必填项', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
            return false;
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

