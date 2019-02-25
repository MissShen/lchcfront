<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span>采购单状态：</span>
          <span class="status" v-if="this.ruleForm.backFlag==='0'&&this.ruleForm.delFlag==='0'">未提交</span>
          <span class="status" v-if="this.ruleForm.backFlag==='2'&&this.ruleForm.delFlag==='0'">审核通过</span>
          <span class="status" v-if="this.ruleForm.backFlag==='4'&&this.ruleForm.delFlag==='0'">终核通过</span>
          <span class="status" v-if="(this.ruleForm.backFlag==='1'||this.ruleForm.backFlag==='5')&&this.ruleForm.delFlag==='0'">已提交</span>
          <span class="status" v-if="this.ruleForm.delFlag==='1'">申请作废</span>
          <span class="status" v-if="this.ruleForm.delFlag==='2'">同意作废</span>
          <span class="status" v-if="this.ruleForm.delFlag==='3'">拒绝作废</span>
          <span class="status" v-if="(this.ruleForm.backFlag==='3'||this.ruleForm.backFlag==='6')&&this.ruleForm.delFlag==='0'">审核拒绝</span>
        </div>
      </div>
      <div class="tabs-echo-right">
        <ul class="tabs-echo-ul">
          <li>登记机构：<span>{{this.ruleForm.backupOrg}}</span></li>
        </ul>
        <ul class="tabs-echo-ul">
          <li>创建时间：<span>{{this.ruleForm.createDate}}</span></li>
        </ul>
      </div>
    </div>
    <div class="tablebox">
      <div class="title-name border-btm">明细</div>
      <div class="detail-from">
        <ul class="detail-from-ul">
          <li>产品名：<span>{{this.ruleForm.nameChn}}</span></li>
          <li>商品名：<span>{{this.ruleForm.tradeName}}</span></li>
          <li>剂型：<span>{{this.ruleForm.modeName}}</span></li>
          <li>规格包装：<span>{{this.ruleForm.spec}}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>转换比：<span>{{this.ruleForm.standRate}}</span></li>
          <li>单位：<span>{{this.ruleForm.specUnit}}</span></li>
          <li>包材：<span>{{this.ruleForm.wrapName}}</span></li>
          <li>批准文号：<span>{{this.ruleForm.permitNumber}}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>单价：<span>  {{ priceFormat(this.ruleForm.bidPrice) }}</span></li>
          <li>采购数量：<span>{{this.ruleForm.purchaseNum}}</span></li>
          <li>生产企业：<span>{{this.ruleForm.manufactureName}}</span></li>
          <li>配送企业：<span>{{this.ruleForm.sendOrgname}}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>采购日期：<span>{{this.ruleForm.purchaseDate}}</span></li>
          <li>临床医师：<span>{{this.ruleForm.useDoctor}}</span></li>
          <li>药剂科主任：<span>{{this.ruleForm.zrName}}</span></li>
          <li>院长信息：<span>{{this.ruleForm.yzName}}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>使用用途：<span>{{this.ruleForm.useDesc}}</span></li>
          <li>采购原因：<span>{{this.ruleForm.purchaseDesc}}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>采购金额： <span>{{ priceFormat(this.ruleForm.purchaseNum*this.ruleForm.bidPrice) }}</span></li>
        </ul>
      </div>
    <!--  <div class="log-box noborder nopad-left">
        <div class="title-name border-btm">退货单处理记录</div>
        <ul class="log-con">
          <li>
            <span>2018-03-10 15:54</span>
            【烟台正方制药】阅读了订单
          </li>
          <li>无数据</li>
        </ul>
      </div>-->
    </div>
    <div class="foot-btn">
      <div class="foot-left">
        <el-button class="martop5" type="primary" size="small" v-if="(this.ruleForm.backFlag==='5'||this.ruleForm.backFlag==='1')&&(this.ruleForm.delFlag==='0')"  @click="checkOkUpdate()">通过</el-button>
        <el-button class="martop5" type="danger" size="small" v-if="(this.ruleForm.backFlag==='5'||this.ruleForm.backFlag==='1')&&(this.ruleForm.delFlag==='0')"  @click="checkUpdateNo()">拒绝</el-button>
        <el-button class="martop5" type="primary" size="small" v-if="this.ruleForm.delFlag==='1'"  @click="govDelOk()">同意作废</el-button>
        <el-button class="martop5" type="warning" size="small" v-if="this.ruleForm.delFlag==='1'"  @click="govDelNo()">拒绝作废</el-button>
        <el-button class="martop5" type="" size="small" @click="goBack()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {findHospitalByRecordId,checkOkUpdate,checkUpdateNo,govDelOk,govDelNo} from 'src/axios/trade/backup/hospitalList'
  import {priceFormat} from "src/utils";
  export default {
    data() {
      return {
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
          useDoctor:'',
          purchaseDate:'',
          purchasePrice:'',
          backFlag:'',
          createOrg:'',
          createDate:'',
          zrName:'',
          yzName:'',
        }
      };
    },
    created() {
      var recordId =this.$route.params.recordId
      this.recordId = recordId
      this.list()
    },
    methods: {
      priceFormat,
      list(){
        var recordId= this.recordId
        findHospitalByRecordId(recordId).then(res => {
          this.ruleForm = res.data
        })
      },
      goBack(){
        window.history.go(-1)
      },
      checkOkUpdate(){
        this.$confirm(`确认当前记录审核通过吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkOkUpdate(this.ruleForm.recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                /*this.goBack()*/
              }
            })
          })
        }).catch(() => {
        });
      },
      checkUpdateNo(){
        this.$confirm(`确认拒绝当前记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkUpdateNo(this.ruleForm.recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.goBack()
              }
            })
          })
        }).catch(() => {
        });
      },
      govDelOk(){
        this.$confirm(`确认作废当前记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          govDelOk(this.ruleForm.recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.goBack()
              }
            })
          })
        }).catch(() => {
        });
      },
    govDelNo(){
        this.$confirm(`确认拒绝作废当前记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          govDelNo(this.ruleForm.recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.goBack()
              }
            })
          })
        }).catch(() => {
        });
      }
    }
  }
</script>

