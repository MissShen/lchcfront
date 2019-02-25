<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="from-padding from-view">
        <el-form :model="ruleForm" ref="ruleForm" label-position="left"
                 label-width="100px" size="small"
                 class="demo-form-inline" :inline="true">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="批准文号">
            {{ruleForm.permitNumber}}
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="产品名称">
            {{ruleForm.medicalName}}
          </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="剂型名称">
            {{ruleForm.doseageFormName}}
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="规格包装">
            {{ruleForm.spec}}
          </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="转换比">
            {{ruleForm.standRate}}
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="生产企业">
            {{ruleForm.manufactureName}}
          </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <el-form :model="newRuleForm" ref="newRuleForm" :rules="rules"  label-position="left"
               label-width="160px" size="small"
               class="demo-form-inline" :inline="true">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="配送企业" prop="senderName" >
                <el-input v-model="newRuleForm.senderName" :readonly="true" class="inputWidth" ></el-input>
                <el-input v-model="newRuleForm.senderId" type="hidden" ></el-input>
              </el-form-item>
              <el-button @click="addGovReal()" size="small">选择</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="月实际到货量" prop="supplyQuantity">
                <el-input v-model="newRuleForm.supplyQuantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="月需求量" prop="demandQuantity">
                <el-input v-model="newRuleForm.demandQuantity"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="采购价格" prop="price">
            <el-input v-model="newRuleForm.price"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="短缺类型" prop="shortageType">
                <el-select v-model="newRuleForm.shortageType" size="small">
                  <el-option label="断货" value="1"></el-option>
                  <el-option label="供应量不足或不及时" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="短缺起始日期" prop="shortageDate">
                <el-date-picker size="small" v-model="newRuleForm.shortageDate" type="date" style=" width:150px" placeholder="请选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否使用可替代药品" prop="isAlternative">
                <el-select v-model="newRuleForm.isAlternative" size="small">
                  <el-option label="无替代" value="1"></el-option>
                  <el-option label="同通用名药品替代" value="2"></el-option>
                  <el-option label="功效相同或相近的异通用名药品替代" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="短缺原因" prop="reasonType">
            <el-checkbox-group v-model="reasonType">
              <el-checkbox label="1" >流标或废标，无企业供货</el-checkbox><br>
              <el-checkbox label="2" >原料短缺，产能不足</el-checkbox><br>
              <el-checkbox label="3" >原料垄断，产能不足</el-checkbox><br>
              <el-checkbox label="4" >企业生产线改造，企业产能不足</el-checkbox><br>
              <el-checkbox label="5" >交易价格低，企业不愿意生产</el-checkbox><br>
              <el-checkbox label="6" >限价交易，企业不愿意供应</el-checkbox><br>
              <el-checkbox label="7" >地域偏远，企业不愿配送</el-checkbox><br>
              <el-checkbox label="8" >临床用量小，企业不愿供应</el-checkbox><br>
              <el-checkbox label="9" @change="changeOtherReason">其他原因</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他原因" prop="reasonComments">
                <el-input type="textarea" :readonly="otherReason" v-model="newRuleForm.reasonComments"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="填表人" prop="createUser">
                <el-input v-model="newRuleForm.createUser"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="newRuleForm.telephone"></el-input>
          </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="submitForm('newRuleForm')" size="small">保存</el-button>
            <el-button type="" size="small" @click="returnForm()" >返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    <add-dialog  v-if="formViewVisible" ref="addDialog" v-on:gov-child-popup="govChildParam"></add-dialog>
    </div>
</template>
<script>
// 引入用户相关请求
import addDialog from './addDialog'
import {doAddShortage,getProductInfo,getShortageById,doUpdateShortage} from 'src/axios/trade/shortage/buyerRole/shortageUpList'

  export default {
    name:"auditaAdd",
    components:{
      addDialog
    },
    data() {
      return {
        ruleForm: this.metaForm(),
        reasonType: [],
        isEdit:'',
        otherReason:true,
        reasonCommentsType:false,
        newRuleForm: this.metaQuery(),
        rules:{
          senderName:{ required: true, message: '请输入', trigger: 'blur'},
          supplyQuantity :[{ required: true, message: '请输入', trigger: 'blur' },{validator: checkNumber, trigger: 'blur'}],
          demandQuantity :[{ required: true, message: '请输入', trigger: 'blur' },{validator: checkNumber, trigger: 'blur'}],
          price :[{ required: true, message: '请输入', trigger: 'blur' },{validator: checkNumber, trigger: 'blur'}],
          shortageType :{ required: true, message: '请选择', trigger: 'blur' },
          shortageDate:{ required: true, message: '请选择日期', trigger: 'blur' },
          reasonType:{ required: true, message: '请选择', trigger: 'blur' },
          isAlternative:{ required: true, message: '请选择', trigger: 'blur' },
          createUser:{ required: true, message: '请输入', trigger: 'blur' },
          telephone:{ required: true, message: '请输入', trigger: 'blur' },
          reasonComments:{ required: false, message: '请输入', trigger: 'blur' },
        },
        formViewVisible: false,
      };
      function  checkNumber  (rule, value, callback) {
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
      this.isEdit= this.$route.params.id;
      if(this.isEdit!=='edit'){
        this.newRuleForm.productId= this.$route.params.productId;
        this.newRuleForm.issueId= this.isEdit
        this.getProduct(this.newRuleForm.productId)
      }else{
        this.newRuleForm.id= this.$route.params.productId;
        this.list()
      }
    },
    methods: {
      metaQuery() {
        return {
          id:'',
          senderName:'',
          issueId:'',
          senderId: '',
          supplyQuantity: '',
          demandQuantity:'',
          price:'',
          shortageType:'',
          shortageDate:'',
          reasonType: [],
          reasonTypeMapper: [],
          productId:'',
          reasonComments:'',
          isAlternative:'',
          createUser:'',
          telephone:''
        }
      },
      metaForm() {
        return {
          id:'',
          permitNumber:'',
          medicalName:'',
          doseageFormName:'',
          spec:'',
          standRate:'',
          manufactureName:''
        }
      },
      govChildParam(senderId,senderEasy){
        this.newRuleForm.senderName = senderEasy;
         this.newRuleForm.senderId = senderId;
      },
      submitForm(from) {
        this.newRuleForm.reasonType=this.reasonType
       let _str = this.reasonType.toString();
       let reasonType = _str.split(',');
        this.$refs[from].validate((valid) => {
          if (valid) {
            if(this.isEdit!=='edit'){
              doAddShortage(this.newRuleForm,reasonType).then(res =>{
                this.$message({
                  type: 'success',
                  message:  res.data
                })
                 this.returnForm()
              })
            }
            else{
              doUpdateShortage(this.newRuleForm,reasonType).then(res => {
                this.$message({
                  type: 'success',
                  message:  res.data
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
        var productId= this.newRuleForm.id
          getShortageById(productId).then(res => {
          this.newRuleForm = res.data
            this.reasonType=this.newRuleForm.reasonTypeMapper.split(',')
          this.getProduct (this.newRuleForm.productId)

       })
     },
      getProduct (productId) {
        getProductInfo(productId).then(res => {
          this.ruleForm = res.data
        })
     },
      returnForm(){
        window.history.go(-1);
      },
      addGovReal(){
        this.formViewVisible = true;
        this.$nextTick(() => {
          this.$refs.addDialog.govPopupParam(this.ruleForm.productId);
        })
      },
      changeOtherReason(){
       let flag = false;
       this.reasonType.some((item)=>{
         if(item == 9){
           flag = true;
         }
       })
        if(flag){
          this.rules.reasonComments.required = true;
          this.otherReason = false;
        }else{
          this.rules.reasonComments.required = false;
          this.otherReason = true;
        }
      }
    }
  }
</script>
