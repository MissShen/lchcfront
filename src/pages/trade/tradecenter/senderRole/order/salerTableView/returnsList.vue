<template>
  <el-dialog
    title="退货"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="60%"
    top="5vh"
    :before-close="handleClose">
    <el-form :model="form" class="info-view">
      <el-row :gutter="20">
        <el-col :span="12">
          <input type="hidden" v-model="form.id"/>
          <el-form-item label="采购单号：">
            {{form.purchaseCode}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="到货时间：">
            {{form.receiveDate}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="买方机构：">
            {{form.bakBuyerEasy}}
          </el-form-item>
        </el-col>
      </el-row>
      <hr>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="产品名称：">
            {{form.bakProductName}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="剂型：">
            {{form.bakMedicalMode}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="包材：">
            {{form.bakWrapName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="规格包装：">
            {{form.bakProductSpec}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生产企业：">
            {{form.bakFactoryEasy}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="配送企业：">
            {{form.bakFactoryEasy}}
          </el-form-item>
        </el-col>
      </el-row>
      <hr>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单价：">
            {{form.unitPrice}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批号：">
            {{form.lotNo}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="有效期：">
            {{form.medicalExpiredDate}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="可退数量：">
            <span class="highline">{{form.returnQty}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="到货数量：">
            {{form.tradeQty}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发票号：">
            {{form.invoiceNo}}
          </el-form-item>
        </el-col>
      </el-row>
      <hr>
      <div class="inner-formview">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="退货数量：">
              <el-input v-model="form.returnSaveQty" size="small" class="width-100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="inner-formview">
          <el-col :span="18">
            <el-form-item label="退货原因：">
                <el-checkbox-group v-model="returnReasonArr" class="font-14">
                  <el-checkbox v-for="reason in returnReasons" :label="reason" :key="reason">{{reason}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="inner-formview">
          <el-col :span="18">
            <el-form-item label="其他：" label-width="80px">
              <el-input type="textarea" v-model="form.buyerRemark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmReturn()">确认退货</el-button>
      <el-button @click="dialogVisible = false" class="el-button-pale">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>

  import {saveConfirm,returnDetailCreate} from 'src/axios/trade/senderRole/waitVerifyList'
  import {isNumber} from "src/utils/validateUtil";

  export default {
    name: "returns-list",
    data(){
      return {
        returnReasonArr:[],
        dialogVisible: false,
        form:this.metaForm(),
        query: this.metaQuery(), // 查询初始化
        returnReasons: [
          '厂家调价',
          '近效期',
          '重复采购',
          '限制使用',
          '订货数量过多',
          '实物与平台规格不符',
          '货票不符',
          '包装破损'
        ],
      }
    },

    methods: {
      metaQuery () { // 表单查询数据初始化
        return {
          ids: undefined,
          keys: undefined,
          bakFactoryEasy: undefined,
          buyerName: undefined,
          bakProductName: undefined,
          lotNo: undefined,
          returnReason:[],
          orderCode: undefined,
          createBenDate: undefined,
          createEenDate: undefined,
          purchaseCode:undefined,
          dataFlag:undefined,
          senderName:undefined
        }
      },
      metaForm(){
        return {
          purchaseCode:'',
          receiveDate:'',
          buyerOrgEasy:'',
          bakProductName:'',
          bakMedicalMode:'',
          bakWrapName:'',
          bakProductSpec:'',
          medicalExpiredDate:'',
          bakFactoryEasy:'',
          senderOrgEasy:'',
          unitPrice:'',
          lotNo:'',
          tradeQty:'',
          returnQty:'',
          canReturnQty:'',
          returnReason: [],
          buyerRemark:'',
          returnAble:'',
          receiveQty:'',
          invoiceNo:'',
          approvalRemark:'',
          salerRemark:'',
          id:''
        }
      },
      handleClose(){
        this.dialogVisible = false;
      },
//      getReturnsList(purchaseCode,receiveDate,bakBuyerEasy,bakMedicalName,bakMedicalMode,metricName,bakMedicalSpecFormat,bakFactoryEasy,bakSenderEasy,unitPrice,lotNo,medicalExpiredDate,invoiceNo,returnQty,tradeQty,receiveId){
//        this.dialogVisible = true;
//        console.count();
//        this.form = {
//          purchaseCode: purchaseCode,
//          receiveDate: receiveDate,
//          bakBuyerEasy: bakBuyerEasy,
//          bakMedicalName: bakMedicalName,
//          bakMedicalMode: bakMedicalMode,
//          metricName: metricName,
//          bakMedicalSpecFormat: bakMedicalSpecFormat,
//          bakFactoryEasy: bakFactoryEasy,
//          bakSenderEasy: bakSenderEasy,
//          unitPrice: unitPrice,
//          lotNo: lotNo,
//          medicalExpiredDate: medicalExpiredDate,
//          returnQty: returnQty,
//          tradeQty: tradeQty,
//          invoiceNo: invoiceNo,
//          returnsCount: '',
//          reasons: '',
//          receiveId:receiveId
//        }
//      },

      getReturnsList(receiveId) {
//        this.buttonState = state;
//        this.buyOrSellerState = buyOrSaller
        this.dialogVisible = true;
        returnDetailCreate(receiveId).then(res => {
          this.form = res.data;
      /*    this.form =this.metaForm();*/
        })
      },
      //确认退货

      confirmReturn(){
        if(null == this.form.returnSaveQty ){
          this.$alert('请输入退货数量', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false;
        }
        if (parseFloat(this.form.returnSaveQty) > parseFloat(this.form.returnQty)) {
          this.$message({
            message:"实退数已大于可退数，请重新填写！",
            type: 'warning'
          });
          return false;
        }
        else{
            if (this.form.returnSaveQty) {
              if (!isNumber(this.form.returnSaveQty)) {
                this.$message({
                  message: '请正确输入到货数量!',
                  type: 'warning'
                });
                return false;
              }
            }
            if (this.form.returnSaveQty == 0) {
              this.$message({
                message: '数量列请输入大于零的数!',
                type: 'warning'
              });
              return false;
              this.form.returnSaveQty.focus();
              return false;
            }
            if (parseFloat(this.form.returnSaveQty) > parseFloat(this.form.returnQty)) {
              var a = i+ 1;
              this.$message({
                message: '第'+ a + "行实退数已大于可退数，请重新填写！",
                type: 'warning'
              });
              return false;
            }
          this.query.ids=this.form.id;
          this.query.returnSaveQty=this.form.returnSaveQty;
          this.query.remarks=this.form.buyerRemark;
          console.log(this.returnReasonArr)
          this.query.returnReason=this.returnReasonArr;
          this.query.keys=this.form.id;
          saveConfirm(this.query).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
//                this.goBack()
                this.$emit('refreshData');
                this.returnReasonArr=[];
                this.dialogVisible = false;
              }
            })
//            this.dialogVisible = false;
          })
        }
      },
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
