<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <div class="tablebox">
      <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="120px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="药品编码：" prop="catDrug.code">
                <el-input v-model="form.catDrug.code" placeholder="查询药品" readonly="true" class="w80"></el-input>
                &nbsp;<a class="blue" @click="chooseDrugs">选择</a>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="通用名：">
                <el-input v-model="form.catDrug.nameChn" readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公告药品名称：" prop="catAuthDrugCnProtected.drugName">
                <el-input v-model="form.catAuthDrugCnProtected.drugName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="公告药品剂型：">
                <el-input v-model="form.catAuthDrugCnProtected.dosageForm"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="药品剂型：" required="true">
                <a class="blue" @click="chooseDosage">选择</a>
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
            <el-col :span="8">
              <el-form-item label="企业编码：" prop="catAuthDrugCnProtected.companyCode">
                <el-input v-model="form.catAuthDrugCnProtected.companyCode"
                          readonly="true" class="w80"></el-input>
                &nbsp;<a class="blue" @click="chooseOrg">选择</a>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="企业名称：">
                <el-input v-model="form.catAuthDrugCnProtected.companyName" readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公告生产企业：" prop="catAuthDrugCnProtected.corpName">
                <el-input v-model="form.catAuthDrugCnProtected.corpName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="省份：">
                <el-select v-model="form.catAuthDrugCnProtected.province" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in chnRegions"
                    :key="item.id"
                    :label="item.nameChn"
                    :value="item.nameChn">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="保护级别：">
                <el-select v-model="form.catAuthDrugCnProtected.protectionGrade" style="width:100%">
                  <el-option label="一级" value="1"></el-option>
                  <el-option label="二级" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="保护年限：">
                <el-select v-model="form.catAuthDrugCnProtected.protectedTime" placeholder="请选择" style="width:100%">
                  <el-option label="7" value="7"></el-option>
                  <el-option label="10" value="10"></el-option>
                  <el-option label="20" value="20"></el-option>
                  <el-option label="30" value="30"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="保护开始日期：" prop="catAuthDrugCnProtected.protectionionStartDate">
                <el-date-picker v-model="form.catAuthDrugCnProtected.protectionionStartDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="保护终止日期：" prop="catAuthDrugCnProtected.protectionionExpiryDate">
                <el-date-picker v-model="form.catAuthDrugCnProtected.protectionionExpiryDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公告号：" prop="catAuthDrugCnProtected.proclamationNumber">
                <el-input v-model="form.catAuthDrugCnProtected.proclamationNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="保护品种号：">
                <el-input v-model="form.catAuthDrugCnProtected.protectionionNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公告日期：">
                <el-date-picker v-model="form.catAuthDrugCnProtected.bulletinDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="终止公告号：">
                <el-input v-model="form.catAuthDrugCnProtected.endProclamationNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="是否相同品种：">
                <template>
                  <el-radio-group v-model="form.catAuthDrugCnProtected.sameSpeciesFlag">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="4">
              <el-form-item label="功能主治：">
                <el-input type="textarea" :rows="2" v-model="form.catAuthDrugCnProtected.action"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="备注：">
                <el-input v-model="form.catAuthDrugCnProtected.certRemark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="相关产品信息：">
                已关联
                <el-input v-model="form.count" style="width:15%" readonly="true"></el-input>
                种药品&nbsp;
                <a class="blue" @click="chooseProduct('HAS')">已关联</a>
                &nbsp;|&nbsp;
                <a class="blue" @click="chooseProduct('NOT')">未关联</a>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button size="small" @click="goBack()">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <common-drugs-code v-if="drugsVisble" ref="CommonDrugsCode" @chooseDrugCode="chooseDrugCode"></common-drugs-code>
    <common-dosage-info v-if="dosageVisible" ref="CommonDosageInfo"
                        @chooseDosageForm="chooseDosageForm"></common-dosage-info>
    <common-org-code v-if="orgVisible" ref="CommonOrgCode" @chooseOrgCode="chooseOrgCode"></common-org-code>
    <asso-product-detail v-if="hasProductVisible" ref="HasAssoProductDetail"
                         @saveProduct="saveProduct"></asso-product-detail>
    <asso-product-detail v-if="notProductVisible" ref="NotAssoProductDetail"
                         @saveProduct="saveProduct"></asso-product-detail>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  import CommonDrugsCode from "../../windowPanel/commonDrugsCode";
  import CommonDosageInfo from "../../windowPanel/commonDosageInfo";
  import CommonOrgCode from "../../windowPanel/commonOrgCode";
  import AssoProductDetail from "./windowPanel/assoProductDetail";
  import {regions} from 'src/axios/datacenter/orgdata/catbuyer/catBuyer'
  import {findAssDosageForm} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'
  import {findByIdForUpdate} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'
  import {update, checkProtectNumber} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'
  import {findAllAssProductDosageFormCodeAndId} from 'src/axios/datacenter/authdata/cnprotecteddrug/cnProtected'

  export default {
    components: {
      AssoProductDetail,
      CommonOrgCode,
      CommonDosageInfo,
      CommonDrugsCode,
      ElButton,
      ElCol
    },
    data() {
      return {
        hasProductVisible: false,
        notProductVisible: false,
        dosageVisible: false,
        drugsVisble: false,
        orgVisible: false,
        dosageFormArr: [],
        dosageFormList: [],
        foreverDosageFormList: [],
        chnRegions: [],
        drugCode: "",
        orgCode: "",
        allDosageFormCodes: [],
        allAssProductIds: [],
        delProductIds: [],
        addProductIds: [],
        id: "",
        oldProtectNumber: "",
        form: {
          productIds: [],
          codes: [],
          count: 0,
          catDrug: {
            code: "",
            nameChn: ""
          },
          catAuthDrugCnProtected: {
            drugId: "",
            drugName: "",
            dosageForm: "",
            companyId: "",
            companyCode: "",
            companyName: "",
            corpName: "",
            province: "",
            protectionGrade: "",
            protectedTime: "",
            protectionionStartDate: "",
            protectionionExpiryDate: "",
            proclamationNumber: "",
            protectionionNumber: "",
            bulletinDate: undefined,
            endProclamationNumber: "",
            sameSpeciesFlag: "",
            action: "",
            drugSpec: "",
            certRemark: ""
          }
        },
        rules: {
          'catAuthDrugCnProtected.drugName': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthDrugCnProtected.companyCode': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthDrugCnProtected.corpName': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthDrugCnProtected.protectionionStartDate': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthDrugCnProtected.protectionionExpiryDate': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catAuthDrugCnProtected.proclamationNumber': {required: true, message: '必填项不可为空', trigger: 'blur'},
          'catDrug.code': {required: true, message: '必填项不可为空', trigger: 'blur'}
        },
      }
    },

    created() {
      this.id = this.$route.params.id || undefined;
      this.load(this.id);
    },

    methods: {

      load(id){
        findByIdForUpdate(id).then(res => {
          res.data.count = parseInt(res.data.catAuthDrugCnProtected.drugSpec);
          this.form = res.data;
          this.drugCode = this.form.catDrug.code;
          this.orgCode = this.form.catAuthDrugCnProtected.companyCode;
          this.oldProtectNumber = this.form.catAuthDrugCnProtected.protectionionNumber;
        });
        findAssDosageForm(id).then(res => {
          this.dosageFormList = res.data;
          this.foreverDosageFormList = res.data;
        });
        regions().then(res => {
          this.chnRegions = res.data;
        });
        findAllAssProductDosageFormCodeAndId(id).then(res => {
          for (var i = 0; i < res.data.length; i++) {
            this.allDosageFormCodes.push(res.data[i].code);
            this.allAssProductIds.push(res.data[i].nameChn);
          }
        });
        this.form.productIds = this.allAssProductIds;
      },

      //同步选择药品数据
      chooseDrugCode(data){
        this.form.catAuthDrugCnProtected.drugId = data.value.id;
        this.form.catDrug.code = data.value.code;
        this.form.catDrug.nameChn = data.value.nameChn;
        this.changeCount();
      },

      //同步选择剂型数据
      chooseDosageForm(data) {
        if (this.dosageFormList.length > 0) {
          this.dosageFormList.push.apply(this.dosageFormList, data.value);
        } else {
          this.dosageFormList = data.value;
        }
        this.form.codes = this.dosageFormArr;

        //计算删除剂型后剩余已关联数量
        var arr = [];
        for (var j = 0; j < this.dosageFormList.length; j++) {
          for (var o = 0; o < this.allDosageFormCodes.length; o++) {
            if (this.dosageFormList[j].code == this.allDosageFormCodes[o]) {
              arr.push(this.allDosageFormCodes[o]);
            }
          }
        }
        this.form.count = arr.length;
      },

      //同步企业编码
      chooseOrgCode(data) {
        this.form.catAuthDrugCnProtected.companyId = data.value.id;
        this.form.catAuthDrugCnProtected.companyCode = data.value.code;
        this.form.catAuthDrugCnProtected.companyName = data.value.name;
        this.changeCount();
      },

      changeCount(){
        if (this.orgCode === this.form.catAuthDrugCnProtected.companyCode && this.form.catDrug.code === this.drugCode) {
          this.form.count = this.form.catAuthDrugCnProtected.drugSpec
        } else {
          this.form.count = 0;
        }
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

          if (this.allDosageFormCodes.length > 0) {
            //计算删除剂型后剩余已关联数量
            var arr2 = [];
            for (var j = 0; j < arr.length; j++) {
              for (var o = 0; o < this.allDosageFormCodes.length; o++) {
                if (arr[j].code == this.allDosageFormCodes[o]) {
                  arr2.push(this.allDosageFormCodes[o]);
                }
              }
            }
            this.form.count = arr2.length;
          }
        }).catch(() => {
          let arr = [];
          this.dosageFormList.map(item => {
            arr.push(item.code);
          });
          this.dosageFormArr = arr;
        });
        this.form.codes = this.dosageFormArr;
      },

      //同步关联产品数据
      saveProduct(data){
        var count = parseInt(this.form.catAuthDrugCnProtected.drugSpec);
        var ids = [];
        if (data.flag === 'DEL') {
          for (var i = 0; i < data.value.length; i++) {
            ids.push(data.value[i].catProduct.id)
          }
          this.delProductIds = ids;
        } else if (data.flag === 'ADD') {
          for (var i = 0; i < data.value.length; i++) {
            ids.push(data.value[i].catProduct.id)
          }
          this.addProductIds = ids;
        }

        if (this.addProductIds != undefined && this.addProductIds.length > 0) {
          count += this.addProductIds.length;
        }
        if (this.delProductIds != undefined && this.delProductIds.length > 0) {
          count -= this.delProductIds.length;
        }

        this.form.count = count;
      },

      chooseDrugs()
      {
        this.drugsVisble = true;
        this.$nextTick(() => {
          this.$refs.CommonDrugsCode.fillData();
        })
      }
      ,
      chooseDosage()
      {
        this.dosageVisible = true;
        this.$nextTick(() => {
          this.$refs.CommonDosageInfo.fillData('COMMON', this.dosageFormArr.toString());
        })
      }
      ,
      chooseOrg()
      {
        this.orgVisible = true;
        this.$nextTick(() => {
          this.$refs.CommonOrgCode.fillData();
        })
      }
      ,
      chooseProduct(flag)
      {
        if (this.form.catAuthDrugCnProtected.drugId === "") {
          this.$alert('请选择药品编码', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else if (this.dosageFormArr.length == 0) {
          this.$alert('请选择剂型', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        } else if (this.form.catAuthDrugCnProtected.companyCode === "") {
          this.$alert('请选择企业编码', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        }

        if (flag === 'HAS') {
          this.hasProductVisible = true;
          this.form.codes = this.dosageFormArr.toString();
          this.$nextTick(() => {
            this.$refs.HasAssoProductDetail.fillData(flag, this.form);
          })
        } else if (flag === 'NOT') {
          this.notProductVisible = true;
          this.form.codes = this.dosageFormArr.toString();
          this.$nextTick(() => {
            this.$refs.NotAssoProductDetail.fillData(flag, this.form);
          })
        }
      }
      ,

      onSubmit(form){
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            //检察保护品种号是否已经存在
            var isExist = await checkProtectNumber(this.form.catAuthDrugCnProtected.protectionionNumber);
            if (isExist.data > 0 && this.form.catAuthDrugCnProtected.protectionionNumber != this.oldProtectNumber) {
              this.$alert('保护品种号已存在', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              });
              return false;
            } else {
              if (this.delProductIds != undefined && this.delProductIds.length > 0) {
                var productIds = [];
                for (var i = 0; i < this.allAssProductIds.length; i++) {
                  var add = true;
                  for (var o = 0; o < this.delProductIds.length; o++) {
                    if (this.allAssProductIds[i] == this.delProductIds[o]) {
                      add = false;
                    }
                  }
                  if (add) {
                    productIds.push(this.allAssProductIds[i])
                  }
                  this.allAssProductIds = productIds;
                  this.form.productIds = this.allAssProductIds;
                }
              }
              if (this.addProductIds != undefined && this.addProductIds.length > 0) {
                this.allAssProductIds.push.apply(this.allAssProductIds, this.addProductIds);
                this.form.productIds = this.allAssProductIds;
              }
              update(this.form).then(res => {
                this.$message({
                  message: res.data,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.goBack();
                  }
                })
              })
            }
          } else {
            this.$alert('请检查必填项内容', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            });
            return false;
          }
        });
      }
      ,
      goBack()
      {
        this.$router.go(-1);
      }
    }
  }
</script>

