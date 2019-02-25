<template>
  <div>
    <!-- ========================== 采购目录维护》修改商品信息 ========================= -->

     <el-dialog
        title="采购目录修改菜单"
        custom-class="w50"
        :close-on-click-modal="false"
        :visible.sync="visible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" inline>
          <div class="info-view">
              <dl class="w50 nopad-left">
                <dt>产品名：</dt>
                <dd>{{ ruleForm.bakProductName }}</dd>
              </dl>
              <dl class="w50 nopad-left">
                <dt>商品名：</dt>
                <dd>{{ ruleForm.bakTradeName }}</dd>
              </dl>
              <dl class="w50 nopad-left">
                <dt>剂型：</dt>
                <dd>{{ ruleForm.bakMedicalMode }}</dd>
              </dl>
              <dl class="w50 nopad-left">
                <dt>规格包装：</dt>
                <dd>{{ ruleForm.bakMedicalSpec }}</dd>
              </dl>
              <dl class="w50 nopad-left">
                <dt>生产企业：</dt>
                <dd>{{ ruleForm.bakProducerFullname }}</dd>
              </dl>
              <dl class="w50 nopad-left">
                <dt>单价（元）：</dt>
                <dd>{{ ruleForm.hitPrice.toFixed(2) }}</dd>
              </dl>
              <dl class="w50 nopad-left">
                <dt>医保：</dt>
                <dd>{{ ruleForm.bakProvinceInsuranceFlag }}</dd>
              </dl>
              <dl class="w50 nopad-left">
                <dt>商品有效时间：</dt>
                <dd>{{ ruleForm.beginTime }}&nbsp;至&nbsp;{{ ruleForm.endTime}}</dd>
              </dl>
            <div class="inner-formview">
              <template v-if="ruleForm.roleCode =='director' || ruleForm.roleCode =='doctor'">
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="默认配送方案：" prop="plan">
                      <el-radio-group v-model="ruleForm.plan">
                        <el-radio label="0">主配送</el-radio>
                        <el-radio label="1">每次更新</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
              <el-row class="nomar-left nomar-right">
                <el-col :span="12">
                  <el-form-item label="配送企业：" prop="bakSenderFullname">
                    <el-select v-model="ruleForm.senderOrgid" placeholder="请选择配送企业" size="small">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="药品检索码：" prop="bakRetrievalCode">
                    <el-input v-model="ruleForm.bakRetrievalCode" class="width-180">{{ ruleForm.bakRetrievalCode }}</el-input>
                    <input type="hidden" v-model="ruleForm.recordId" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="nomar-left nomar-right">
                <el-col :span="12">
                  <el-form-item label="超额提醒：" prop="bakQuantityExcess">
                    <el-select size="small" v-model="ruleForm.bakQuantityExcessStr" placeholder="超额数量">
                      <el-option label="无" value="0"></el-option>
                      <el-option label="10W" value=10></el-option>
                      <el-option label="50W" value=50></el-option>
                      <el-option label="100W" value="100"></el-option>
                      <el-option label="200W" value="200"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <strong>最后订购时间：</strong>
                  <span>{{ ruleForm.lastOrderDate}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
         <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="small"  @click="submitForm('ruleForm')" >保存</el-button>
            <el-button size="small" @click="closeForm" class="el-button-pale">关闭</el-button>
         </span>
        </el-dialog>

  </div>
</template>

<script>
import {selectHitComm,putHitComm,getSendName} from 'src/axios/trade/catalog/comm/updateLog';
  export default {
    data() {
      return {
        ruleForm:{
          bakSenderFullname: '',
          bakRetrievalCode:'',
          bakQuantityExcessStr:'',
          recordId:'',
          plan:'',
          senderOrgid:''
        },
        visible: false, // 表单可见性初始化
        recordId:this.$route.query.recordId,
        options:[],
        rules:{
          warehouseCode:{ required: true, message: '请输入药库编码', trigger: 'blur'},
          warehouseName:{ required: true, message: '请输入药库名称', trigger: 'blur' },
          warehouseAddress:{ required: true, message: '请输入药库地址', trigger: 'blur' },
          district:{ required: false},
          county:{ required: false},
          address:{ required: false}
        }
      };
    },
    methods: {
        metaForm() {
            return {
              bakSenderFullname: '',
              bakRetrievalCode:'',
              bakQuantityExcess:0,
              recordId:'',
              plan:''
            }
          },
        closeForm () {
           this.$refs['ruleForm'].resetFields()
           this.toggleForm()
           this.form = this.metaForm()
        },
       toggleForm () {
           this.visible = !this.visible
       },
       fillData(id) {
          this.ruleForm.recordId = id || undefined
          this.visible = true
  /*        this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
          })*/
         if (this.ruleForm.recordId) {
           getSendName(this.ruleForm.recordId).then(res => {
               this.options= res.data
            })
            selectHitComm(this.ruleForm.recordId).then(res => {
              this.ruleForm = res.data
              this.ruleForm.plan = res.data.plan == null?'':res.data.plan
            })
        }
     },
       // 提交用户表单
          // 提交用户表单
                   submitForm (ruleForm) {
                     this.$refs[ruleForm].validate(valid => {
                       if (valid) {
                         this.toggleForm()
                         if (!this.ruleForm.id) {
                           putHitComm(this.ruleForm).then(res => {
                             this.$message({
                               type: 'success',
                               message: '修改成功',
                               duration: 1000,
                               onClose: () => {
                                   this.visible = false;
                                    this.$emit('refreshData');
                                }
                             })
                           })
                         }
                      }
                     })
                   }

    }
  }
</script>
