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
                <span v-if="this.$route.params.type==='producer'">【生产企业】</span>
                <span v-if="this.$route.params.type==='sender'">【配送企业】</span>
                {{enterprise.accountName}}{{complaint.beComplainedOrgName}}
              </el-form-item>
              <el-form-item label="投诉原因：" prop="reasonTypeId">
                <el-radio-group v-model="complaint.reasonTypeId">
                  <template v-for="item in allReason">
                    <div class="space-10"><el-radio :label="item.id" class="pro-details ellipsis" :title="item.description" style="max-width:500px">
                      {{item.description}}
                    </el-radio></div>
                  </template>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="投诉说明：" prop="complaintExplain">
                <el-input type="textarea" :rows="4" v-model="complaint.complaintExplain">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="submitForm('complaint')">保存</el-button>
                <el-button size="small" @click="returnEx()">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import {queryAllComplaintReason,queryEnterpriseById,addComplaint,queryComplaintById,updateComplaint} from 'src/axios/trade/evaluate/evaluate'

  name: "tradeComplainDetails"
  export default {
    data() {
      return {
        complaint:this.complaintData(),
        enterprise:this.enterpriseData(),
        allReason:this.allReasonType(),
        rules:{
          reasonTypeId:{required: true, message: '请选择投诉原因', trigger: 'submit'},
          complaintExplain:{required: true, message: '请输入投诉说明', trigger: 'blur'}
        },
        type:'',
        complaintId:'',
        companyId:'',
      };
    },
    created(){
      this.type =this.$route.params.type
      this.companyId =this.$route.params.companyId
      this.complaintId =this.$route.params.complaintId
      this.getAllComplaintReason(this.type)

      if(this.complaintId==='new'){
        this.complaint.beComplainedOrgid =this.companyId
        this.getEnterpriseById()
      }
      if(this.companyId==='update'){
        this.getComplaintById()
      }
    },
    methods:{
      getComplaintById(){
        queryComplaintById(this.complaintId).then(res => {
          this.complaint = res.data
        })
      },
      getAllComplaintReason(type){
        queryAllComplaintReason(type).then(res => {
          this.allReason = res.data
        })
      },
      getEnterpriseById(){
        queryEnterpriseById(this.complaint.beComplainedOrgid).then(res => {
          this.enterprise = res.data
        })
      },
      enterpriseData() {
        return {
          id:undefined,
          accountName:undefined,
          factoryFlag:undefined,
          sendFlag:undefined
        }
      },
      complaintData() {
        return {
          id:undefined,
          beComplainedOrgid:undefined,
          reasonTypeId:undefined,
          complaintExplain:undefined
        }
      },
      allReasonType(){
        return {
          id:undefined,
          description:undefined
        }
      },
      returnEx(){
        window.history.go(-1)
      },
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            if(this.complaintId==='new'){
              addComplaint(this.complaint).then(res => {
                this.$message({
                  type: 'success',
                  message: "操作成功"
                })
              })
            }else{
              this.complaint.id=this.complaintId
              updateComplaint(this.complaint).then(res => {
                this.$message({
                  type: 'success',
                  message: "操作成功"
                })
              })
            }
            this.$router.push("/trade/manage/customerComplaintsList")
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

