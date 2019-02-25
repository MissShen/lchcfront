<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-echo">
      <div class="tabs-echo-left" style="width: 400px">
        <div class="title">
          <span>采购单状态：</span>
          <span class="status" v-if="this.ruleForm.backFlag==='0'">未提交</span>
          <span class="status" v-if="this.ruleForm.backFlag==='1'">已提交</span>
          <span class="status" v-if="this.ruleForm.backFlag==='2'">审核通过</span>
          <span class="status" v-if="this.ruleForm.backFlag==='3'|| this.ruleForm.backFlag==='6'">审核拒绝</span>
          <span class="status" v-if="this.ruleForm.backFlag==='4'">终核通过</span>
          <span class="status" v-if="this.ruleForm.backFlag==='5'">已提交</span>
        </div>
        <div class="tools">
          <el-button type="primary" size="small" v-if="this.ruleForm.backFlag==='0'"  @click="handleSubmitToNext()">提交</el-button>
          <el-button type="warning" size="small" v-if="this.ruleForm.backFlag==='0'"  @click="addOrUpdate()">修改</el-button>
          <el-button type="danger" size="small" v-if="this.ruleForm.delFlag==='0'&&(this.ruleForm.backFlag==='5'||this.ruleForm.backFlag==='1')" @click="handleDel()">申请作废</el-button>
          <el-button type="" size="small" @click="goBack()">返回</el-button>
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
          <li>单价：<span>{{priceFormat(this.ruleForm.bidPrice)}}</span></li>
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
     <!-- <div class="log-box noborder nopad-left">
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
    <!-- 弹窗：新增/编辑 -->
    <el-dialog :title="'作废原因'" top="2vh" width="40%" :visible.sync="showForm" :before-close="handleClose">
      <div style="width: 500px">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-input type="hidden" v-model="form.recordId"></el-input>
          <el-form-item label="" prop="delDesc">
            <el-input type="textarea" v-model="form.delDesc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
          <el-button type="primary" @click="handleForm('form')">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {findHospitalByRecordId,backUpApplyDel} from 'src/axios/trade/backup/hospitalList'
  import {priceFormat} from "src/utils";
  export default {
    data() {
      return {
        rules: this.metaRules(),
        showForm:false,
        form: this.metaForm(), // 表单初始化
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
      addOrUpdate(){
        var recordId=this.ruleForm.recordId
        this.$router.push("/trade/manage/hospitalAdd/"+recordId+"/"+0)
      },
      metaForm () { // 表单数据初始化
        return {
          delDesc:''
        }
      },
      metaRules(){
        return {
          delDesc:{ required: true, message: '请输入作废原因', trigger: 'blur' }
        }
      },
      showDetails(recordId){
        this.$router.push("/trade/manage/hospitalViewList/"+recordId)
      },
      handleClose () {
        this.showForm = !this.showForm
      },
      handleDel () {
        var recordId=this.ruleForm.recordId
        this.form = this.metaForm();
        this.form.recordId =recordId;
        this.showForm = true;
        this.rules = this.metaRules();
      },
      handleForm(form){
        this.$refs[form].validate(valid => {
          if (valid) {
            this.handleClose();
            backUpApplyDel(this.form).then(res => {
              this.list();
              this.$message({
                type: 'info',
                message: res.data
              })
            })
          }
        })
      },
      handleSubmitToNext(){
        var recordId=this.ruleForm.recordId
        this.$confirm(`确定提交?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          submitToNext(recordId).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list()
              }
            })
          })
        }).catch(() => {
        });
      }
    }
  }
</script>

