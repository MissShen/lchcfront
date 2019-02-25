<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="wrapper padding10">
      <div class="process">
        <div class="process-box">
          <el-steps align-center>
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
            <el-form :model="complaint" ref="complaint" :rules="rules" label-position="left" label-width="150px">
              <el-form-item label="投诉对象：" prop="beComplainedOrgid">
                <el-radio-group v-model="complaint.beComplainedOrgid ">
                  <p>                 <el-radio :label="order.bakFactoryId" @change="getAllComplaintReason('producer')">【生产企业】{{order.bakFactoryName}}</el-radio></p>
                  <p class="space-30"><el-radio :label="order.senderOrgid" @change="getAllComplaintReason('sender')">【配送企业】{{order.senderName}}</el-radio></p>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="投诉原因：" prop="reasonTypeId">
                <el-radio-group v-model="complaint.reasonTypeId">
                  <template v-for="item in allReason">
                    <p class="space-20"><el-radio :label="item.id" class="pro-details ellipsis" :title="item.description" style="max-width:500px">
                      {{item.description}}
                    </el-radio></p>
                  </template>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="投诉说明：" prop="complaintExplain">
                <el-input type="textarea" :rows="4" v-model="complaint.complaintExplain">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="submitForm('complaint')">保存</el-button>
                <el-button type="" size="small" @click="returnEx()">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="complain-right">
          <div class="message-item">
            <div class="info-right">
              <i class="iconfont icon-jyxx"></i>
              交易信息
            </div>
            <ul class="message-list">
              <li>
                <span>订单号：</span>
                <span>{{order.recordId}}</span>
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
                <span>¥{{ priceFormat(order.requestQty) }}</span>
              </li>
              <li>
                <span>到货金额：</span>
                <span>¥{{ priceFormat(order.receiveQty)}}</span>
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
  import {queryAllComplaintReason,queryOrderByRecordId,addComplaint,queryComplaintById,updateComplaint} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat} from "src/utils";

  name: "tradeComplainDetails"
  export default {
    data() {
      return {
        complaint:this.complaintData(),
        order:this.orderData(),
        allReason:this.allReasonType(),
        rules:{
          beComplainedOrgid:{required: true, message: '请选择投诉对象', trigger: 'submit'},
          reasonTypeId:{required: true, message: '请选择投诉原因', trigger: 'submit'},
          complaintExplain:{required: true, message: '请输入投诉说明', trigger: 'blur'}
        }
      };
    },
    created(){
      var id =this.$route.params.id
      var orderItemId =this.$route.params.orderItemId
      var type =this.$route.params.type
      if(id==1){
        queryAllComplaintReason("sender").then(res => {
          this.allReason = res.data
        })
      }else{
        this.getComplaintById(id)
        this.getAllComplaintReason(type)
      }
      this.getOrderById(orderItemId)
    },
    methods:{
      priceFormat,
      getComplaintById(id){
        queryComplaintById(id).then(res => {
          this.complaint = res.data
          this.complaint.beComplainedOrgid = res.data.beComplainedOrgid
          this.complaint.reasonTypeId = res.data.reasonTypeId
        })
    },
      getAllComplaintReason(type){
        queryAllComplaintReason(type).then(res => {
          this.allReason = res.data
        })
      },
      getOrderById(orderItemId){
        queryOrderByRecordId(orderItemId).then(res => {
          this.order = res.data
          this.complaint.beComplainedOrgid=this.order.senderOrgid
        })
      },
      orderData() {
        return {
          recordId:undefined,
          bakFactoryId:'',
          senderOrgid:undefined,
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
          id:'',
          orderItemId:'',
          beComplainedOrgName:'',
          beComplainedOrgType:'',
          beComplainedOrgid:'',
          reasonTypeId:'',
          complaintExplain:'',
          state:'',
          stateName:'',
          deductionScore:'',
          processRemark:''
        }
      },
      allReasonType(){
        return {
          id:'',
          description:''
        }
      },
      returnEx(){
        window.history.go(-1)
      },
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            this.$confirm(`确认提交投诉？`, '信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var orderItemId =this.$route.params.orderItemId
              var id =this.$route.params.id
              this.complaint.orderItemId=orderItemId
              if(id==1){
                addComplaint(this.complaint).then(res => {
                  this.$message({
                    type: 'success',
                    message:  res.data
                  })
                  this.$router.push("/trade/manage/customerComplaintsList")
                })
              }else{
                this.complaint.id=id
                updateComplaint(this.complaint).then(res => {
                  this.$message({
                    type: 'success',
                    message:  res.data
                  })

                })
              }
              this.$router.push("/trade/manage/customerComplaintsList")
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
