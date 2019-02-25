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
          <div class="info-panel"  v-if="complaint.state === '1'">
            <span class="info-title">被投诉企业与买方机构协商处理</span>
            <p>请被投诉企业与买方机构协商解决投诉问题：</p>
            <p>• 如合理解决，买方机构撤销投诉，不对企业扣分；</p>
            <p>• 如未解决，买方机构可上报至卫生局，卫生局根据投诉情况可能对企业进行扣分处罚</p>
          </div>
          <div class="info-panel" v-if="complaint.state === '3'">
            <span class="info-title">投诉已撤销</span>
            <p>被投诉企业与买方机构协商一致，投诉撤销</p>
          </div>
          <div class="info-panel" v-if="complaint.state === '2'">
            <span class="info-title">已上报至卫生局</span>
            <p>卫生局根据投诉情况可能会对被投诉企业进行扣分处罚</p>
          </div>
          <div class="info-panel" v-if="complaint.state === '4'">
            <span class="info-title">投诉处理完成</span>
            <p>处理结果：{{complaint.processRemark}}</p>
            <p>扣分情况：{{complaint.deductionScore}}分</p>
          </div>
          <div class="complain-list">
            <el-form :model="order" ref="order" label-position="left" label-width="150px" class="demo-ruleForm" size="small">
              <el-form-item label="投诉对象：" prop="beComplainedOrgType" required>
                <span v-if="complaint.beComplainedOrgType=='sender'">【配送企业】{{complaint.beComplainedOrgName}}</span>
                <span v-else>【生产企业】{{complaint.beComplainedOrgName}}</span>
              </el-form-item>
              <el-form-item label="投诉原因：" prop="reason" required>
                <span>{{complaint.reason}}</span>
              </el-form-item>
              <el-form-item label="投诉说明：" prop="complaintExplain" required>
                <span>{{complaint.complaintExplain}}</span>
              </el-form-item>
              <el-form-item>
                <span v-if="complaint.state=='1'&& roleCode!='send'"><el-button type="primary" size="small" @click="toHealthBureau(complaint.id)">上报卫生局</el-button>
                <el-button type="warning" size="small" @click="revoke(complaint.id)">撤销投诉</el-button>
                <el-button type="primary" size="small" @click="updateComplaint(complaint.beComplainedOrgType,complaint.id,complaint.orderItemId)">修改投诉信息</el-button></span>
                <el-button type="" size="small" @click="returnEx()">返回</el-button>
              </el-form-item>
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
                <span>¥{{priceFormat(order.receiveQty)}}</span>
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
  import {queryComplaintById,queryOrderByRecordId,revokeComplaint,upToHealthBureau,getRoleCode} from 'src/axios/trade/evaluate/evaluate'
  import {priceFormat} from "src/utils";

  name: "tradeComplainDetails"

  export default {
    data() {
      return {
        orderFlag:'',
        roleCode:'',
        order:this.orderData(),
        complaint:this.complaintData()
      };
    },
    created(){
      this.getRoleCode()
      var id =this.$route.params.id
      var orderItemId =this.$route.params.orderItemId
      this.getComplaintById(id)
      this.getOrderById(orderItemId)
    },
    methods:{
      getRoleCode(){
        getRoleCode().then(res => {
          this.roleCode = res.data
        })
      },
      priceFormat,
      updateComplaint(type,id,orderId){
        if(orderId==null){
          this.$router.push("/trade/manage/createCompanyComplain/"+id+"/update/"+type)
        }else{
          this.$router.push("/trade/manage/createTradeComplain/"+type+"/"+id+"/"+orderId)
        }
      },
      toHealthBureau(id){
        this.$confirm(`确定上报到卫生局？`, '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          upToHealthBureau(id).then(res => {
            this.$message({
              message: "操作成功",
              type: 'success',
              duration: 1000,
              onClose: () => {
                window.history.go(0)
              }
            })
          })
        }).catch(() => {
        });
      } ,
      revoke(id){
        this.$confirm(`确定撤销投诉？`, '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          revokeComplaint(12).then(res => {
            this.$message({
              message: "撤销成功",
              type: 'success',
              duration: 1000,
              onClose: () => {
                window.history.go(0)
              }
            })
          })
        }).catch(() => {
        });
      },
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
          id:undefined,
          beComplainedOrgName:undefined,
          beComplainedOrgType:undefined,
          orderItemId:undefined,
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
      }
    }
  }
</script>
