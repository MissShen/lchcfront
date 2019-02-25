<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="160px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="发布期号/文号：" prop="catOtc.proclamationNumber">
                <el-input v-model="form.catOtc.proclamationNumber" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中西药类别：">
                <el-select v-model="form.catOtc.otcFlag" placeholder="请选择" class="width-260">
                  <el-option label="西药" value="0"></el-option>
                  <el-option label="中药" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="药品通用名：" required="true">
                <el-input v-model="form.ids8" class="width-180" placeholder="查询药品" readonly="true"></el-input>
                <a @click="drugsInfo">选择</a>
                <el-checkbox-group v-model="drugsArr" v-if="drugsList.length>0" @change="changeDrugList()">
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
                <el-input v-model="form.telephone" class="width-180" placeholder="查询剂型" readonly="true"></el-input>
                <a @click="dosageInfo">选择</a>
                <el-checkbox-group v-model="dosageFormArr" v-if="dosageFormList.length>0" @change="changeDosageForm()">
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
              <el-form-item label="药品公告名称：">
                <el-input v-model="form.catOtc.bulletinDrug" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告剂型：">
                <el-input v-model="form.catOtc.bulletinDoseageName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="英文名：">
                <el-input v-model="form.catOtc.englishName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类：">
                <el-input v-model="form.catOtc.drugCategory" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="规格组成：">
                <el-input v-model="form.catOtc.ingredient" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="适应症：">
                <el-input v-model="form.catOtc.indication" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="不良反应：">
                <el-input v-model="form.catOtc.untowardReaction" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="禁忌症：">
                <el-input v-model="form.catOtc.tabooCrun" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="生产企业名称：">
                <el-input v-model="form.catOtc.factoryName" class="width-260"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="OTC类别：">
                <template>
                  <el-radio-group v-model="form.catOtc.otcType">
                    <el-radio label="0">甲类</el-radio>
                    <el-radio label="1">乙类</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="是否禁用：">
                <template>
                  <el-radio-group v-model="form.catOtc.enableFlag">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="关联药品：">
               <span>已选择
                  <el-input v-model="form.count" class="width-180" placeholder="0" readonly="true"></el-input>
                            种药品</span>
                <a @click="hasAsso('HAS')">已关联</a>
                |
                <a @click="notAsso('NOT')">未关联</a>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="创建人：">
                <span>{{ form.catOtc.createUserName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间：">
                <span>{{ form.catOtc.createDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="最后修改人：">
                <span>{{ form.catOtc.lastUpdateUserName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最后修改时间：">
                <span>{{ form.catOtc.lastUpdateDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="form.catOtc.remark" class="width-260"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button size="small" @click="goBack">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <common-drugs-info v-if="drugsVisible" ref="CommonDrugsInfo" @choose="choose"></common-drugs-info>
    <common-dosage-info v-if="dosageVisible" ref="CommonDosageInfo"
                        @chooseDosageForm="chooseDosageForm"></common-dosage-info>
    <asso-drugs v-if="assoDrugsVisible" ref="AssoDrugs" @chooseAssDrugs="chooseAssDrugs"></asso-drugs>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  import CommonDrugsInfo from "../../windowPanel/commonDrugsInfo";
  import CommonDosageInfo from "../../windowPanel/commonDosageInfo";
  import AssoDrugs from "./windowPanel/assoDrugs";
  import {info} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {findDoseageForm} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {findDrugAlias} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {update} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {addOtcDrug} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'
  import {delOtcDrug} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'

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
        id: '',
        assoDrugsVisible: false,
        drugsVisible: false,
        dosageVisible: false,
        drugsList: [],
        drugsArr: [],
        dosageFormArr: [],
        dosageFormList: [],
        form: {
          catOtc: {
            'id': '',
            'drugId': '',
            'drugName': '',
            'bulletinDrug': '',
            'drugCategory': '',
            'englishName': '',
            'ingredient': '',
            'indication': '',
            'proclamationNumber': '',
            'untowardReaction': '',
            'tabooCrun': '',
            'otcType': '0',
            'otcFlag': '0',
            'factoryName': '',
            'remark': '',
            'bulletinDoseageName': '',
            'enableFlag': '1',
            'createDate': '',
            'createUserName': '',
            'lastUpdateDate': '',
            'lastUpdateUserName': ''
          },
          count: 0
        },
        rules: {
          'catOtc.proclamationNumber': {required: true, message: '必填项不可为空', trigger: 'blur'}
        }
      }
    },

    created(){
      this.id = this.$route.params.id || undefined;
      this.load(this.id);
    },
    methods: {
      load(id) {
        info(id).then(res => {
          this.form = res.data;
        });
        findDoseageForm(id).then(res => {
          this.dosageFormList = res.data;
        });
        findDrugAlias(id).then(res => {
          this.drugsList = res.data;
        })
      },

      //8位药品
      choose(data) {
        if (this.drugsList.length > 0) {
          this.drugsList.push.apply(this.drugsList, data.value)
        } else {
          this.drugsList = data.value;
        }
      },

      //剂型
      chooseDosageForm(data) {
        if (this.dosageFormList.length > 0) {
          this.dosageFormList.push.apply(this.dosageFormList, data.value)
        } else {
          this.dosageFormList = data.value;
        }
      },

      hasAsso(type) {
        this.assoDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoDrugs.fillData(type, this.form.catOtc.id);
        })
      },

      notAsso(type) {
        var data = {id: "", codes: "", ids8: ""};
        data.id = this.form.catOtc.id;
        data.ids8 = this.drugsArr.toString();
        data.codes = this.dosageFormArr.toString();
        this.assoDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoDrugs.fillData(type, data);
        })
      },

      //加入或删除关联标准药品
      chooseAssDrugs(data) {
        var ids = [];
        var codes = [];
        for (var row of data.value) {
          ids.push(row.catDrug.id);
          codes.push(row.catDrug.code);
        }
        if (data.flag === '已关联') {
          delOtcDrug(this.form.catOtc.id, ids.toString(), codes.toString()).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.form.count -= ids.length;
              }
            })
          })
        } else if (data.flag === '未关联') {
          addOtcDrug(this.form.catOtc.id, ids.toString()).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.form.count += ids.length;
              }
            })
          })
        }
      },

      changeDrugList(){
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

      changeDosageForm(){
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

      changeAssDrugs(){
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
        }).catch(() => {
          let arr = [];
          this.assDrugsList.map(item => {
            arr.push(item.catDrug.id);
          });
          this.assDrugsArr = arr;
        });
      },

      drugsInfo(){
        this.drugsVisible = true;
        this.$nextTick(() => {
          this.$refs.CommonDrugsInfo.fillData("COMMON", this.drugsArr.toString());
        })
      },
      dosageInfo(){
        this.dosageVisible = true;
        this.$nextTick(() => {
          this.$refs.CommonDosageInfo.fillData("COMMON", this.dosageFormArr.toString());
        })
      },
      assoDrugs(type) {
        if (this.drugsArr.length == 0 || this.dosageFormArr.length == 0) {
          this.$alert('请选择药品和剂型', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }

        //选中药品剂型同步到弹窗
        var data = {ids: "", codes: "", ids8: ""};
        data.ids8 = this.drugsArr.toString();
        data.codes = this.dosageFormArr.toString();
        data.ids = this.assDrugsArr.toString();
        this.assoDrugsVisible = true;
        this.$nextTick(() => {
          this.$refs.AssoDrugs.fillData(type, data);
        })
      },

      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.drugsList.length > 0 && this.dosageFormList.length > 0) {
              var data = {ids: "", ids8: "", codes: ""};
              data.ids8 = this.drugsArr.toString();
              data.codes = this.dosageFormArr.toString();
              update(this.form, data).then(res => {
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

