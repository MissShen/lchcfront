<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="from-padding from-view">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules"  label-position="left"
                 label-width="120px" size="small"
                 class="demo-form-inline" :inline="true">
          <el-input type="hidden"  v-model="ruleForm.recordId"></el-input>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="产品名：" prop="nameChn">
                <el-input v-model="ruleForm.nameChn"></el-input>
              </el-form-item>
              <el-button @click="chooseProducts()" size="small">选择</el-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品名：" prop="tradeName">
                <el-input v-model="ruleForm.tradeName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="剂型：" prop="modeName">
                  <el-input v-model="ruleForm.modeName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格包装：" prop="spec">
                <el-input v-model="ruleForm.spec"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="转换比：" prop="standRate">
            <el-input v-model="ruleForm.standRate"></el-input>
          </el-form-item>
              <el-form-item>
                <div style="color: #f56c6c; font-size: 12px">如某药品包装规格为0.2g✖20片/盒，<br/>转换比为20</div>
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="单位：" prop="specUnit">
            <el-input v-model="ruleForm.specUnit"></el-input>
          </el-form-item>
              <el-form-item>
                <div style="color: #f56c6c; font-size: 12px">此为最小包装单位，如：盒、瓶等</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="包材：" prop="wrapName">
            <el-input v-model="ruleForm.wrapName"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="批准文号：" prop="permitNumber">
            <el-input v-model="ruleForm.permitNumber"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="单价：" prop="bidPrice">
            <el-input v-model="ruleForm.bidPrice"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="采购数量：" prop="purchaseNum">
            <el-input v-model="ruleForm.purchaseNum"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="采购日期：" prop="purchaseDate">
            <el-date-picker size="small" v-model="ruleForm.purchaseDate" type="date" placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生产企业：" prop="manufactureName">
                <el-input v-model="ruleForm.manufactureName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="配送企业：" prop="sendOrgname">
            <el-input v-model="ruleForm.sendOrgname"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用用途：" prop="useDesc">
                <el-input type="textarea" v-model="ruleForm.useDesc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="采购原因：" prop="purchaseDesc">
            <el-input type="textarea" v-model="ruleForm.purchaseDesc"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="临床医师：" prop="useDoctor">
                <el-input v-model="ruleForm.useDoctor"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="药剂科主任：" prop="zrName">
            <el-input v-model="ruleForm.zrName"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="院长信息：" prop="yzName">
                <el-input v-model="ruleForm.yzName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="非两票制药品：" prop="twoToken">
              <el-checkbox label="1"  v-model="checked">是</el-checkbox>
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="非两票制原因：" prop="twoTokenReason">
            <el-input type="textarea" v-model="ruleForm.twoTokenReason"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
          <hr>
          <el-row :gutter="12">
            <el-col :span="12">
              <el-form-item label="采购金额：" style="color: red; font-size: 24px">
                {{ruleForm.bidPrice*ruleForm.purchaseNum}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="small">保存</el-button>
            <el-button size="small" @click="returnForm()" >返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    <choose-product  v-if="formViewVisible" ref="chooseProduct" v-on:gov-child-popup="govChildParam"></choose-product>
    </div>
</template>
<script>
// 引入用户相关请求
import chooseProduct from './chooseProduct'
import {findHospitalByRecordId,addHospital,updateHospital} from 'src/axios/trade/backup/hospitalList'

  export default {
    name:"backup",
    components:{
      chooseProduct
    },
    data() {
      return {
        ruleForm: {
          productId:'',
            sign:'',
            recordId: '',
            nameChn: '',
            tradeName:'',
            modeName:'',
            spec:'',
            standRate:'',
            specUnit:'',
            wrapName:'',
            permitNumber:'',
            bidPrice:'',
            purchaseNum:'',
            purchasePrice:'',
            purchaseDate:'',
            manufactureName:'',
            sendOrgname:'',
            useDesc:'',
            purchaseDesc:'',
            useDoctor:'',
            zrName:'',
            yzName:'',
            twoToken:'',
            twoTokenReason:'',
          },
        rules:{
          nameChn:{ required: true, message: '请输入产品名', trigger: 'blur'},
          modeName :{ required: true, message: '请输入剂型', trigger: 'blur' },
          spec :{ required: true, message: '请输入规格包装', trigger: 'blur' },
          specUnit :{ required: true, message: '请输入单位', trigger: 'blur' },
          wrapName :{ required: true, message: '请输入包材', trigger: 'blur' },
          standRate :[{ required: true, message: '请输入转换比', trigger: 'blur' },{validator: checkNumber, trigger: 'blur'}],
          permitNumber :{ required: true, message: '请输入批准文号', trigger: 'blur' },
          bidPrice  :[{ required: true, message: '请输入单价', trigger: 'blur' },{validator: checkNumber, trigger: 'blur'}],
          purchaseNum :[{ required: true, message: '请输入采购数量', trigger: 'blur'},{validator: checkNumber, trigger: 'blur'}],
          manufactureName :{ required: true, message: '请输入生产企业', trigger: 'blur' },
          sendOrgname :{ required: true, message: '请输入配送企业', trigger: 'blur' },
          useDesc :{ required: true, message: '请输入使用用途', trigger: 'blur' },
          purchaseDesc:{ required: true, message: '请输入采购原因', trigger: 'blur' },
          purchaseDate:{ required: true, message: '请选择采购日期', trigger: 'change,blur' },
          useDoctor:{ required: true, message: '请输入临床医师', trigger: 'blur' },
          zrName:{ required: true, message: '请输入药剂科主任', trigger: 'blur' },
          yzName:{ required: true, message: '请输入院长信息', trigger: 'blur' },
        },
        checked:undefined,
        recordId:'',
        formViewVisible: false,
      };
      function  checkNumber  (rule, value, callback)
      {
          setTimeout(() => {
            const patt =/^[0-9]+([.]{1}[0-9]+){0,1}$/ ;
            if (!patt.test(value)) {
              return callback(new Error('请输入数字'));
            } else {
              callback();
            }
          }, 1000);
      };
    },
    created() {
      var recordId =this.$route.params.recordId
      var sign =this.$route.params.sign
      this.recordId = recordId
      this.sign = sign
      if(!(recordId==='0')){
        this.list()
      }else{
        this.checked = false
      }
    },
    methods: {
      metaForm() {
        return {
          sign:'',
          recordId: '',
          nameChn: '',
          tradeName:'',
          modeName:'',
          spec:'',
          standRate:'',
          wrapName:'',
          permitNumber:'',
          bidPrice:'',
          purchaseNum:'',
          purchasePrice:'',
          purchaseDate:'',
          manufactureName:'',
          sendOrgname:'',
          useDesc:'',
          purchaseDesc:'',
          useDoctor:'',
          zrName:'',
          yzName:'',
          twoToken:'',
          twoTokenReason:'',
        }
      },
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if(this.checked){
              this.ruleForm.twoToken=1
            }else {
              this.ruleForm.twoToken=0
            }
            if(this.recordId==='0'||this.sign==='1'){
                addHospital(this.ruleForm).then(res =>{
                  this.$message({
                    type: res.success == true ? 'success' : 'error',
                    message: res.success == true ? res.data : res.message,
                    duration: 3000,
                  })
                 this.returnForm()
              })
            }
            else{
              this.ruleForm.recordId=this.recordId
              updateHospital(this.ruleForm).then(res => {
                this.$message({
                  type: res.success == true?'success':'error',
                  message: res.success == true ? res.data : res.message,
                  duration: 3000,
                })
                this.returnForm()
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      list () {
        var recordId= this.recordId
          findHospitalByRecordId(recordId).then(res => {
          this.ruleForm = res.data
            if( this.ruleForm.twoToken==='1'){
              this.checked = true
            }
       })
     },
      chooseProducts(){
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.$refs.chooseProduct.govPopupParam();
        })
      },
      govChildParam(row){
        this.ruleForm=row
        this.ruleForm.nameChn=row.productName
        this.ruleForm.modeName=row.doseageFormName
        if(row.manufactureAbbr!=null||row.manufactureAbbr!=''){
          this.ruleForm.manufactureName=row.manufactureAbbr
        }
        this.ruleForm.spec=row.spec+"×"+row.standRate+""+row.smallestUnits+"/"+row.specUnit
      },
      returnForm(){
        window.history.go(-1);
      }
    }
  }
</script>
