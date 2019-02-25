<template>
  <el-dialog
    :title="name"
    :visible.sync="backupHandle"
    width="60%"
    :before-close="handleClose">
    <el-form :model="ruleForm" class="info-view">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="备案单号：">
            {{this.ruleForm.backupCode}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备案时间：">
            {{this.ruleForm.createDate}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="买方机构：">
            {{this.ruleForm.backupOrg}}
          </el-form-item>
        </el-col>
      </el-row>
      <hr>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="产品名称：">
            {{this.ruleForm.nameChn}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="剂型：">
            {{this.ruleForm.modeName}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="包材：">
            {{this.ruleForm.wrapName}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位：">
            {{this.ruleForm.specUnit}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="规格包装：">
            {{this.ruleForm.spec}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产企业：">
            {{this.ruleForm.manufactureName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="配送企业：">
            {{this.ruleForm.sendOrgname}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="批准文号：">
            {{this.ruleForm.permitNumber}}
          </el-form-item>
        </el-col>
      </el-row>
      <hr>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="备案价格：">
            <span class="highline">{{ priceFormat(this.ruleForm.bidPrice) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购数量：">
            <span class="highline">{{this.ruleForm.purchaseNum}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="采购金额：">
            <span class="highline">{{ priceFormat(this.ruleForm.purchaseNum*this.ruleForm.bidPrice) }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="临床医师：">
            {{this.ruleForm.useDoctor}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="药剂科主任：">
            {{this.ruleForm.zrName}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="院长信息：">
            {{this.ruleForm.yzName}}
          </el-form-item>
        </el-col>
      </el-row>
      <hr>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="采购时间："> {{this.ruleForm.purchaseDate}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="非两票制药品：">
            <el-checkbox label="1" disabled v-model="checked">是</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="inner-formview">
        <el-col :span="10">
          <el-form-item label="采购原因：">
            <el-input type="textarea" v-model="ruleForm.purchaseDesc" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="非两票制原因：">
            <el-input type="textarea" v-model="ruleForm.twoTokenReason" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="inner-formview">
        <el-col :span="10">
          <el-form-item label="使用用途：">
            <el-input type="textarea" v-model="ruleForm.useDesc" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <hr>
      <div class="inner-formview">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="审批说明：" v-if="(roleCode==='manage'||roleCode==='supervise_bj')||((roleCode==='serviceCenter'||roleCode==='director')&&showSome)">
              <el-input v-if="!showSome" type="textarea" v-model="ruleForm.handleDesc"></el-input>
              <el-input v-if="showSome" type="textarea" v-model="ruleForm.handleDesc" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="!showSome&&(roleCode==='manage'||roleCode==='supervise_bj')">
      <el-button type="primary" v-if="(ruleForm.backFlag==5||ruleForm.backFlag==1)&&(ruleForm.delFlag==0)" @click="checkOkUpdate(recordId)">通 过</el-button>
      <el-button type="danger" v-if="(ruleForm.backFlag==5||ruleForm.backFlag==1)&&(ruleForm.delFlag==0)" @click="checkUpdateNo(recordId)">拒 绝</el-button>
      <el-button type="primary" v-if="ruleForm.delFlag==1" @click="govDelOk(recordId)">通 过</el-button>
      <el-button type="danger" v-if="ruleForm.delFlag==1" @click="govDelNo(recordId)">拒 绝</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {findHospitalByRecordId,checkOkUpdate,checkUpdateNo,govDelOk,govDelNo,getRoleCode} from 'src/axios/trade/backup/hospitalList'
  import {priceFormat} from "src/utils";
  export default {
    name: "returnsList",
    data(){
      return {
        backupHandle:false,
        showSome:false,
        checked:undefined,
        roleCode:'',
        name:'',
        ruleForm: {
          nameChn:'',
          tradeName:'',
          recordId:'',
          modeName:'',
          spec:'',
          standRate:'',
          specUnit:'',
          backupOrg:'',
          wrapName:'',
          manufactureName:'',
          bidPrice:'',
          sendOrgname:'',
          permitNumber:'',
          purchaseDesc:'',
          purchaseNum:'',
          delFlag:'',
          useDesc:'',
          handleDesc:'',
          useDoctor:'',
          purchaseDate:'',
          purchasePrice:'',
          backFlag:'',
          createOrg:'',
          createDate:'',
          zrName:'',
          yzName:'',
        }
      }
    },
    methods: {
      priceFormat,
      handleClose(){
        this.backupHandle=false;
      },
      govPopupParam(param,name){
        this.backupHandle = true;
        this.recordId = param
        this.name = name
        this.getRoleCode()
        this.list();
      },
      getRoleCode(){
        getRoleCode().then(res => {
          this.roleCode = res.data
        })
      },
      list(){
        var recordId= this.recordId
        findHospitalByRecordId(recordId).then(res => {
          this.ruleForm = res.data
          this.showSome = (((this.ruleForm.backFlag==2||this.ruleForm.backFlag==3||this.ruleForm.backFlag==6)&&this.ruleForm.delFlag==0)||this.ruleForm.delFlag==3||this.ruleForm.delFlag==2)
          if( this.ruleForm.twoToken==='1'){
            this.checked = true
          }
        })
      },
      checkOkUpdate(recordId){
        this.$confirm(`确认当前记录审核通过吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkOkUpdate(recordId,this.ruleForm.handleDesc).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$emit('refreshData');
                this.backupHandle = false
              }
            })
          })
        }).catch(() => {
        });
      },
      checkUpdateNo(recordId){
        this.$confirm(`确认拒绝当前记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkUpdateNo(recordId,this.ruleForm.handleDesc).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$emit('refreshData');
                this.backupHandle = false
              }
            })
          })
        }).catch(() => {
        });
      },
      govDelOk(recordId){
        this.$confirm(`确认作废当前记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          govDelOk(recordId,this.ruleForm.handleDesc).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$emit('refreshData');
                this.backupHandle = false
              }
            })
          })
        }).catch(() => {
        });
      },
      govDelNo(recordId){
        this.$confirm(`确认拒绝作废当前记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          govDelNo(recordId,this.ruleForm.handleDesc).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$emit('refreshData');
                this.backupHandle = false
              }
            })
          })
        }).catch(() => {
        });
      }
    }
  }
</script>
