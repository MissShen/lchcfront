<template>
  <el-dialog
    title="退货"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="60%"
    :before-close="handleClose">
    <el-form :model="form" class="info-view">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input type="hidden" v-model="form.id"></el-input>
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
            {{form.buyerOrgEasy}}
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
            {{form.senderOrgEasy}}
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
            <span class="highline">{{form.canReturnQty}}</span>
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
              <!--<span v-if="buttonState == '1'&& buyOrSellerState == '0'"><el-input v-model="form.returnQty" size="small"></el-input></span>-->
              <!--<span  v-else>{{form.returnQty}}</span>-->
              <span>{{form.returnQty}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="inner-formview">
          <el-col :span="18">
            <el-form-item label="退货原因：">
              <span v-if="buttonState == '1'&& buyOrSellerState == '0'">
                <el-checkbox-group v-model="returnReasonArr" class="font-14">
                  <el-checkbox v-for="reason in returnReasons" :label="reason" :key="reason" >{{reason}}</el-checkbox>
                </el-checkbox-group>
              </span>
              <span v-else>
                <el-checkbox-group v-model="returnReasonArr" class="font-14">
                  <el-checkbox v-for="reason in returnReasons" :label="reason" :key="reason" disabled>{{reason}}</el-checkbox>
                </el-checkbox-group>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="inner-formview">
          <el-col :span="18">
            <el-form-item label="备注：">
              <span v-if="buttonState == '1'&& buyOrSellerState == '0'">
                <el-input type="textarea" v-model="form.buyerRemark"></el-input>
              </span>
              <span v-else>
                {{form.buyerRemark}}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="inner-formview"  v-if=" buyOrSellerState == '0'">
          <el-col :span="18">
            <el-form-item label="审批说明：">
              <span v-if="buttonState == '1'">
                  <el-input type="textarea" v-model="form.approvalRemark"></el-input>
              </span>
            <span  v-else>
                 {{form.approvalRemark}}
              </span>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="20" class="inner-formview" v-if="buttonState == '0'|| buyOrSellerState == '1'">
          <el-col :span="18">
            <el-form-item label="处理说明：">
               <!--<span>-->
                 <!--{{form.approvalRemark}}-->
               <!--</span>-->
              <span v-if="buttonState == '1'">
                 <el-input type="textarea" v-model="form.salerRemark"></el-input>
               </span>
              <span  v-else>
                  {{form.salerRemark}}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="buttonState == '1' && buyOrSellerState == '0'"><!--买方-->
    <el-button @click="checkOK('0')">拒 绝</el-button>
    <el-button type="primary" @click="checkOK('1')">同 意</el-button>
  </span>
    <span slot="footer" class="dialog-footer" v-if="buttonState == '1' && buyOrSellerState == '1'"><!--卖方-->
    <el-button @click="salesReturn(form.id,2)">拒 绝</el-button>
    <el-button type="primary" @click="salesReturn(form.id,1)">同 意</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {returnDetailX,sbmitReturn,updateReturn} from 'src/axios/trade/senderRole/waitVerifyList'
  import {approvalTheOne} from 'src/axios/trade/buyerrole/waitList'

  export default {
    name: "returns-list",
    data(){
      return {
        returnReasonArr:[],
        dialogVisible: false,
        form:this.metaForm(),
        buttonState:'1',
        buyOrSellerState:'0',
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
        query: this.metaQuery(), // 查询初始化
      }
    },

    methods: {
      handleClose(){
        this.dialogVisible = false;
      },
      metaQuery () { // 表单查询数据初始化
        return {
          id: undefined,
          key: undefined,
          returnSaveQty:undefined,
          approvalRemark:undefined,
          salerRemark:'',
          ids: undefined,
          keys: undefined,
          bakFactoryEasy: undefined,
          buyerName: undefined,
          bakProductName: undefined,
          lotNo: undefined,
          orderCode: undefined,
          createBenDate: undefined,
          createEenDate: undefined,
          purchaseCode:undefined,
          dataFlag:undefined,
          senderName:undefined,
          buyerRemark:undefined,
          approvalState:undefined

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
          returnReason:'',
          buyerRemark:'',
          returnAble:'',
          receiveQty:'',
          invoiceNo:'',
          approvalRemark:'',
          salerRemark:'',
          id:''
        }
      },
      sbmitReturn(form){
        approvalReturn(form).then(res => {
          this.dialogVisible = false
          this.form =this.metaForm();
          this.$emit('refreshData')
        })
      },
      fillData(id,state,buyOrSaller) {
        this.buttonState = state;
        this.buyOrSellerState = buyOrSaller
        this.dialogVisible = true
        returnDetailX(id).then(res => {
          this.form =this.metaForm();
          this.form = res.data;
          if(res.data.reasons != null){
            this.returnReasonArr=res.data.reasons;
          }else{
            this.returnReasonArr=[]
          }
          console.log(this.returnReasonArr)
        })
      },
      //审批
      checkOK(val) {
        this.query.id=this.form.id;//退货id
        this.query.returnSaveQty=this.form.returnQty; //退货数量
        this.query.approvalRemark=this.form.approvalRemark;  //退货原因
        this.query.buyerRemark=this.form.buyerRemark;//审批说明
        this.query.key=this.form.id;

          this.query.approvalState = val;
        approvalTheOne(this.query).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$emit('refreshData');
                this.dialogVisible = false;
                this.returnReasonArr = [];
              }
            })
//          this.dialogVisible = false;
          })
        },
    //配送方退货审批方法
    salesReturn(id,whether){
      let arr = [];
      arr.push({id:id,remark:this.form.salerRemark});
      updateReturn(arr,whether).then(() =>{
        this.$message({
          message: "操作成功！",
          type: 'success',
          onClose: () => {
            this.$emit('refreshData');
            this.dialogVisible = false;
            this.returnReasonArr = [];

          }
        })
      });
    },
  }
  }
</script>
