<template>
  <div>
    <!-- ========================== 采购目录维护》修改商品信息 ========================= -->
    <ul class="tabs-panel"></ul>
      <div  class="form-padding form-view" >
       <el-dialog title="备货"
          top="2vh" :visible.sync="showAddForm" :before-close="handleCloseC" width="70%">
          <div style="width: 100%">
          <el-row :gutter="20">
            <el-col :span="10" :offset="1">产品名&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{resData.bakProductName}}</span></el-col>
            <el-col :span="10" :offset="1">商品名&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{resData.bakTradeName}}</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" :offset="1">订购量&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{resData.requestQty}}</span></el-col>
            <el-col :span="10" :offset="1">总备货量&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{resData.delivery}}</span></el-col>
          </el-row><br>
            <div class="tableset" id="addline">
            <el-table id="thWhite" class="stockUpTable" :data="addData" rules="none">
             <el-table-column label="药品批号">
                 <template slot-scope="scope">
                   <el-input v-model="scope.row.lotNo" size="small"></el-input>
                 </template>
             </el-table-column>
             <el-table-column label="有效期">
               <template slot-scope="scope">
                 <el-date-picker
                   v-model="scope.row.medicalExpiredDate"
                   type="date"
                   size="small"
                   placeholder="选择日期"
                   :picker-options="pickerOptions0">
                 </el-date-picker>
               </template>
             </el-table-column>
             <el-table-column label="发票号">
               <template slot-scope="scope">
                   <el-input v-model="scope.row.invoiceNo"  size="small"></el-input>
                </template>
             </el-table-column>
              <el-table-column
                   label="本次送货量">
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.amount" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                   width="135">
                 <template  slot-scope="scope">
                    <el-input v-model="resData.recordId" type="hidden" size="small"></el-input>
                    <span style="cursor: pointer" @click="deleteRow(scope.$index, addData)"><i size="small" class="el-icon-delete"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style="cursor: pointer" @click="addInput(addData)" v-if="scope.$index == 0"><i size="small" class="el-icon-plus"></i>添加</span>
                    <el-input v-model="resData.orderId" type="hidden" size="small"></el-input>
                </template>
              </el-table-column>
            </el-table>
            </div>
          </div>
          <span slot="footer">
            <el-button type="primary" size="small"  @click="submitFormC(addData)">确认备货</el-button>
            <el-button size="small" @click="handleCloseC">取消</el-button>
          </span>
        </el-dialog>
      </div>
  </div>
</template>

<script>
import {getStockInfo,Stocking} from 'src/axios/trade/senderRole/order/salerTableView/salerHandleList';
import {isNumber} from "src/utils/validateUtil";
  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        ruleForm: this.metaForm(),
        itemId:'',
        stockState:'',
        resData:this.metaData(),
        orderId:'',
        showAddForm:false,
        recordId:this.$route.query.recordId,
        options:[],
       addData:[{
                lotNo:'',
                medicalExpiredDate:'',
                purchaseInvoiceNo:'',
                invoiceNo:'',
                amount:'',
                orderId:'',
                recordId:''
            }],
        rules:{
          warehouseCode:{ required: true, message: '请输入药库编码', trigger: 'blur'},
          warehouseName:{ required: true, message: '请输入药库名称', trigger: 'blur' },
          warehouseAddress:{ required: true, message: '请输入药库地址', trigger: 'blur' },
          district:{ required: false},
          county:{ required: false},
          address:{ required: false}
        }
      };
    },
    methods: {
        metaForm() {
            return {
              bakSenderFullname: '',
              bakRetrievalCode:'',
              bakQuantityExcess:'',
              recordId:''
            }
          },
        toggleFormC () {
          this.showAddForm = !this.showAddForm
        },
       addInput(rows){
         rows.splice(rows.length, 0,{ lotNo:'', medicalExpiredDate:'',purchaseInvoiceNo:'', invoiceNo:'', amount:'', orderId:'', itemId:''});
        },
        deleteRow(index, rows) {
           if(rows.length === 1){
            this.$message.error('至少需要有一项备货');
            return false;
           }
            rows.splice(index, 1);
          },
        closeForm () {
           this.$refs['ruleForm'].resetFields()
           this.toggleForm()
           this.form = this.metaForm()
        },
       fillData(id) {
          this.itemId= id || undefined
          this.showAddForm = true
          getStockInfo(this.itemId).then(res => {
             this.resData= res.data
             this.itemId =  res.data.recordId
             this.orderId = res.data.orderId
           })
     },
     metaData(){
        return {
           bakProductName:'',
           bakTradeName:'',
           requestQty:0,
           delivery:0,
           orderId:''
        }
     },
      handleCloseC(done) {
         this.addData= [{
                         lotNo:'',
                         medicalExpiredDate:'',
                         invoiceNo:'',
                         amount:'',
                         orderId:'',
                         itemId:''
                     }],
         this.toggleFormC();
       },
       // 提交用户表单
          // 提交用户表单
          submitFormC(data){
              var totalAmount = 0 ;
              for (var k = 0; k < data.length; k++) {
                totalAmount =  totalAmount +  Number(data[k].amount);
              var sum = data.map(
                       row=>row.amount).reduce(
                       (acc, cur) => (Number(cur) + acc), 0)
               if(data[k].lotNo.trim()==''){
                 this.$message.error('批号不能为空');
                 return false;
               }else if(data[k].medicalExpiredDate == ''||data[k].medicalExpiredDate ==null){
                 this.$message.error('有效期不能为空');
                  return false;
               }else if(!isNumber(data[k].amount)){
                 this.$message.error('请正确输入到货量');
                 return false;
               }else if(data[k].amount.trim()==''){
                  this.$message.error('本次送货量不能为空');
                   return false;
               }else if(sum >Number(this.resData.requestQty) *2){
                  this.$message.error('备货不能超过采购的两倍');
                   return false;
               }else if(totalAmount >Number(this.resData.requestQty) *2){
                 this.$message.error('备货不能超过采购的两倍');
                 return false;
               }
              }
              Stocking(data,this.itemId,this.orderId).then(res => {
                     if(res.data === 0){
                       this.$message.error("备货量超过订购量的两倍");
                     }else {
                       this.handleCloseC();
                       this.$router.push({path: 'handleHome', query: {orderId: this.orderId}}),
                       this.$emit('refreshData')
                     }
              })
           }
    }
  }
</script>
