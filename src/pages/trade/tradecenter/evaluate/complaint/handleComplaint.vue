<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="wrapper padding10">
      <div class="process">
        <div class="process-box">
          <el-steps :active="Number(complaint.stateName)" align-center>
            <el-step title="买方机构发起投诉"></el-step>
            <el-step title="被投诉企业与机构协商处理"></el-step>
            <el-step title="上报卫生局处理"></el-step>
            <el-step title="处理完成"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="complain-box">
        <div class="complain-left">
          <div class="complain-list">
            <el-form :model="order" ref="order" label-position="left" label-width="150px" class="demo-ruleForm" size="small">
              <el-form-item label="投诉对象：" prop="beComplainedOrgType" required>
                <span>【{{complaint.beComplainedOrgType}}】{{complaint.beComplainedOrgName}}</span>
              </el-form-item>
              <el-form-item label="投诉原因：" prop="reason" required>
                <span>{{complaint.reason}}</span>
              </el-form-item>
              <el-form-item label="投诉说明：" prop="complaintExplain" required>
                <span>{{complaint.complaintExplain}}</span>
              </el-form-item>
            </el-form>
            <el-form :model="resultForm" :rules="rules" ref="resultForm" label-position="left" label-width="150px">
              <el-row>
                <el-form-item label="处理结果：" prop="processRemark">
                  <el-input type="textarea" :rows="4" v-model="resultForm.processRemark" placeholder="300字以内">
                  </el-input>
                </el-form-item>
                <el-form-item label="是否扣分：" prop="yesOrNo" required>
                  <el-radio-group v-model="resultForm.yesOrNo">
                    <p><el-radio :label="1">是</el-radio><el-radio :label="2">否</el-radio></p>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('resultForm')" size="small">提交</el-button>
                  <el-button type="" @click="returnEx()" size="small">返回</el-button>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="complain-right" v-if="orderFlag!=='noOrder'">
          <div class="message-item">
            <div class="info-right">
              <i class="iconfont icon-jyxx"></i>
              交易信息
            </div>
            <ul class="message-list">
              <li>
                <span>订单号：</span>
                <span><a href="#">{{order.recordId}}</a></span>
              </li>
              <li>
                <span>产品名：</span>
                <span>{{order.bakProductName}}</span>
              </li>
              <li>
                <span>商品名：</span>
                <span>{{order.bakTradeName}}</span>
              </li>
              <li>
                <span>规格包装：</span>
                <span>{{order.bakMedicalSpec}}</span>
              </li>
              <li>
                <span>订购金额：</span>
                <span>¥{{priceFormat(order.requestQty*order.unitPrice)}}</span>
              </li>
              <li>
                <span>到货金额：</span>
                <span>¥{{priceFormat(order.receiveQty*order.unitPrice)}}</span>
              </li>
              <li>
                <span>生产企业：</span>
                <span>{{order.bakFactoryName}}</span>
              </li>
              <li>
                <span>配送企业：</span>
                <span>{{order.senderName}}</span>
              </li>
              <li>
                <span>买方机构：</span>
                <span>{{order.buyerOrgName}}</span>
              </li>
              <li>
                <span>发送时间：</span>
                <span>{{order.createDate}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import {queryComplaintById,queryOrderByRecordId,handleComplaint} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat} from "src/utils";

  name: "tradeComplainDetails"

  export default {
    data() {
      return {
        orderFlag:'',
        order:this.orderData(),
        complaint:this.complaintData(),
        resultForm:this.resultForm(),
        rules:{
          yesOrNo:{required: true, message: '请选择是否扣分', trigger: 'submit'},
          processRemark:[{required: true, message: '处理结果不能为空', trigger: 'blur'},{min: 1, max: 300, message: '300字以内', trigger: 'blur'}]
        }
      };
    },
    created(){
      var id =this.$route.params.id
      var orderItemId =this.$route.params.orderItemId
      this.getComplaintById(id)
      this.getOrderById(orderItemId)
    },
    methods:{
      priceFormat,
      getComplaintById(id){
        queryComplaintById(id).then(res => {
          this.complaint = res.data
        })
      },
      getOrderById(orderItemId){
        if(orderItemId==='null'){
         this.orderFlag='noOrder'
        }else{
          queryOrderByRecordId(orderItemId).then(res => {
            this.order = res.data
          })
        }

      },
      resultForm() {
        return {
          id:undefined,
          yesOrNo:1,
          processRemark:undefined
        }
      },
      orderData() {
        return {
          recordId:undefined,
          buyerOrgName:undefined,
          senderName:undefined,
          unitPrice:undefined,
          bakProductName:undefined,
          bakFactoryName:undefined,
          requestQty:undefined,
          receiveQty:undefined,
          bakMedicalSpec:undefined,
          createDate:undefined,
          bakTradeName:undefined
        }
      },
      complaintData() {
        return {
          beComplainedOrgName:undefined,
          beComplainedOrgType:undefined,
          reason:undefined,
          complaintExplain:undefined,
          state:undefined,
          stateName:undefined,
          deductionScore:undefined,
          processRemark:undefined
        }
      },
      returnEx(){
        window.history.go(-1)
      },
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            this.$confirm(`提交处理结果`, '信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var id=this.$route.params.id
              this.resultForm.id=id
              handleComplaint(this.resultForm).then(res => {
                this.$message({
                  type: 'success',
                  message: "处理完成"
                })
              })
              this.returnEx();
            }).catch(() => {
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

