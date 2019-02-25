<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span>状态：</span>
          <span class="red" v-if="this.ruleForm.returnState==='1'">已发送</span>
          <span class="red" v-if="this.ruleForm.returnState==='2'">已撤销</span>
          <span class="red" v-if="this.ruleForm.returnState==='3'">对方已同意</span>
          <span class="red" v-if="this.ruleForm.returnState==='4'">对方已拒绝</span>
          <span class="red" v-if="this.ruleForm.returnState==='5'">送二审</span>
          <span class="red" v-if="this.ruleForm.returnState==='6'">二审拒绝</span>
          <span class="red" v-if="this.ruleForm.returnState==='7'">送一审</span>
          <span class="red" v-if="this.ruleForm.returnState==='8'">一审拒绝</span>
        </div>
        <div class="tools">
          <span v-if="flag=='0'">
          <el-button size="small" class="el-button-pale" @click="returnForm()" >返回</el-button>
          </span>
          <span  v-if="flag=='1'">
            <el-button size="small" @click="checkOK('1')" type="primary">审批通过</el-button>
            <el-button size="small" @click="checkOK('0')" type="danger">审批拒绝</el-button>
          </span>
        </div>
      </div>
      <div class="tabs-echo-right">
        <ul class="detail-from-ul">
          <li>配送企业：<span>{{this.ruleForm.bakSenderEasy}}</span></li>
          <li>医疗机构：<span>{{this.ruleForm.bakBuyerEasy}}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>退货单号：<span>{{this.ruleForm.returnCode}}</span></li>
          <li>创建时间：<span>{{this.ruleForm.createDate}}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>退货数量：<span>{{this.ruleForm.returnQty}}</span></li>
          <li>退货金额：<span>{{ priceFormat(this.ruleForm.returnTotal) }}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>退货原因：<span>{{this.ruleForm.buyerRemark}}</span></li>
          <li></li>
        </ul>
      </div>
    </div>
    <div class="tablebox">
      <div class="title-name border-btm">退货单明细</div>
      <div class="detail-from">
        <ul class="detail-from-ul">
          <li>采购单号：<span>{{this.ruleForm.purchaseCode}}</span></li>
          <li>产品名：<span>{{this.ruleForm.bakProductName}}</span></li>
          <li>商品名：<span>{{this.ruleForm.bakTradeName}}</span></li>
          <li>单价：<span>{{ priceFormat(this.ruleForm.unitPrice) }}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>规格包装：<span>{{this.ruleForm.bakProductSpec}}</span></li>
          <li>剂型：<span>{{this.ruleForm.bakMedicalMode}}</span></li>
          <li>生产企业：<span>{{this.ruleForm.bakFactoryEasy}}</span></li>
          <li>批号：<span>{{this.ruleForm.lotNo}}</span></li>
        </ul>
        <ul class="detail-from-ul">
          <li>到货时间：<span>{{this.ruleForm.receiveDate}}</span></li>
          <li>销售发票号：<span>{{this.ruleForm.invoiceNo}}</span></li>
          <li>有效期：<span>{{this.ruleForm.invoiceExpireDate}}</span></li>
          <li></li>
        </ul>
      </div>
      <!--<div class="log-box noborder nopad-left">-->
        <!--<div class="title-name border-btm">退货单处理记录</div>-->
        <!--<ul class="log-con">-->
          <!--<li>-->
            <!--<span>2018-03-10 15:54</span>-->
            <!--【烟台正方制药】阅读了订单-->
          <!--</li>-->
          <!--<li>无数据</li>-->
        <!--</ul>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  // 引入数据请求
  import {returnDetail} from 'src/axios/trade/senderRole/waitVerifyList'
  import {priceFormat} from "src/utils";
  import {firstUnSendList,senderFirstApproval,exportEXL} from 'src/axios/trade/buyerrole/waitList'
  export default {
    data() {
      return {
        query: this.metaQuery(), // 查询初始化
        ruleForm: {
          purchaseCode:'',
          returnState:'',
          bakSenderEasy:'',
          bakBuyerEasy:'',
          returnCode:'',
          createDate:'',
          returnQty:'',
          returnTotal:'',
          orderCode:'',
          bakProductName:'',
          bakTradeName:'',
          unitPrice:'',
          bakMedicalMode:'',
          bakProductSpec:'',
          bakFactoryEasy:'',
          lotNo:'',
          receiveDate:'',
          invoiceNo:'',
          invoiceExpireDate:'',
          buyerRemark:''
        },
        flag:'',


      }
    },
    created(){
      var id = this.$route.params.id;
      var flag = this.$route.params.flag;
      this.flag=flag;
      this.id = id;
      this.metaList()
    },

    methods:{
      metaQuery () { // 表单查询数据初始化
        return {
          ids: undefined
        }
      },
      priceFormat,
      returnForm(){
        window.history.go(-1);
      },
      metaList() {
        var id= this.id;
        returnDetail(id).then(res => {
          this.ruleForm = res.data;
        })
      },
      //确认退货
      checkOK(val){

//        if(this.dataList.length<1){
//          this.$alert('请至少选择一条数据', '提示', {
//            confirmButtonText: '确定',
//            type: 'warning',
//          });
//          return false;
//        }else{
          var idList='';
//          for(var noticeType of this.dataList){

            idList += (this.id + ',');
//          }
          idList=idList.slice(0, -1);
          this.query.ids=idList;
          this.query.keys=idList;
          this.query.approvalState=val;
          senderFirstApproval(this.query).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
//                this.list()
                this.returnForm();
              }
            })
          })
        }
//      }
    }
  }

</script>
