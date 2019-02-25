<template>
  <el-dialog
    width="50%"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body>
      <div>
        <el-form :model="dataForm" label-width="50px" size="small" label-position="left" >
          <el-row :gutter="24">
          <el-col :span="24">
              <el-form-item label="回复">
                <el-input type="textarea" :rows = "3" v-model="dataForm.REPLYCONTENT" placeholder="请输入回复"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    <span slot="footer" class="dialog-footer">
        <el-button v-if="this.buttonFlag" type="primary" @click="submit()">保存</el-button>
        <el-button @click="closeForm">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {queryReply,updateReply,updateQuestionsReply} from 'src/axios/auditchanges/auditManage/productDeclareAudit'
  export default {
    data() {
      return {
        priceId:'',
        isPrice:false,
        visible: false,
        buttonFlag:true,
        submitFlag:false,
        dataForm:this.metaDataForm(),
        flagForm:'',
        num:0,
        field:'',
        resData:{}
      }
    },
    created() {
    },
    methods: {
      metaDataForm() {
        return {
          ID:'',
          REPLYCONTENT: ''
        }
      },
      // ---------------
      list(id,flagForm,field,buttonFlag,resData,isPrice,priceId) {
        this.isPrice = isPrice;
        this.resData = resData
        this.buttonFlag = buttonFlag
        this.flagForm = flagForm;
        this.field = field
        this.visible = true
        this.dataForm.ID = id;
        this.priceId = priceId;
        queryReply(id).then(res=>{
          this.dataForm.REPLYCONTENT = res.data;
          if(this.dataForm.REPLYCONTENT==null || this.dataForm.REPLYCONTENT==undefined || this.dataForm.REPLYCONTENT==''){
            this.num = 1;
          }
        })
        //查询回复内容
      },
      submitUseIf(res){
        //如果请求不成功则打开按钮限制
        if(!res.success){
          this.submitFlag = false;
          this.$message.error("回复失败")
        }else{
          let count;
          if(!this.isPrice) {
            count = parseInt(this.flagForm[this.field]) - this.num + "";
          }else {
            this.flagForm.forEach((item,index)=>{
              console.log("回复里面",item.ID,this.dataForm.ID)
              if(item.ID == this.priceId){
                count = parseInt(this.flagForm[index][this.field]) - this.num + "";
              }
            })
          }
          this.$emit('submitChange', count)
          this.resData.list.forEach(item=>{
            item.QUESTIONID == this.dataForm.ID?item.REPLYFLAG = '1':item.REPLYFLAG=item.REPLYFLAG;
          })
          this.$message({
            message:"回复成功",
            type:'success'
          })
          this.visible = false;
        }
      },
      submit() {
        this.submitFlag = true;
        if(this.dataForm.REPLYCONTENT == undefined || this.dataForm.REPLYCONTENT==''){
          this.$message.error("请输入回复信息")
          this.submitFlag = false;
          return
        }
        if(this.field == "DISCOUNTPRICE"){
          for(let i = 1;i<this.flagForm.length;i++) {
            let domain = {"TABLE":'0',"ID":this.flagForm[i].ID,"REPLYCONTENT":this.dataForm.REPLYCONTENT,"FIELD":this.field};
            updateQuestionsReply(domain)
          }
        }
        this.dataForm.TABLE = '0'
        updateReply(this.dataForm).then(res=>{
          this.submitUseIf(res)
        });

      },
      closeForm() {
        this.visible = false;
        this.dataForm = this.metaDataForm()
      }
    }
  }
</script>

<style scoped>

</style>
