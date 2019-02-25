<template>
  <div>
    <!-- ========================== 采购目录维护》修改商品信息 ========================= -->
    <ul class="tabs-panel"></ul>
    <div  class="form-padding form-view" >
      <el-dialog title="评价订单" top="2vh" width="50%" :visible.sync="showAddForm" :before-close="closeForm">
        <div style="width: 500px" class="padding20">
          <el-form ref="form" :model="form" label-width="180px">
            <el-input type="hidden"  v-model="form.id"></el-input>
            <el-form-item  label="配送速度：">
              <el-rate v-model="form.speedState"   show-score text-color="#ff9900" score-template="{value}" >
              </el-rate>
            </el-form-item>
            <el-form-item label="服务态度：" >
              <el-rate v-model="form.serviceState"  show-score text-color="#ff9900" score-template="{value}"></el-rate>
            </el-form-item>
            <el-form-item label="药品包装：" >
              <el-rate v-model="form.productPack"  show-score text-color="#ff9900" score-template="{value}"></el-rate>
            </el-form-item>
            <el-form-item label="库存信息描述：" >
              <el-radio-group v-model="form.stockInfoState">
                <el-radio label="1">准确</el-radio>
                <el-radio label="2">不准确</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="评价内容：" >
              <el-input type="textarea" :rows="6" v-model="form.evaluate"></el-input>
            </el-form-item>
              <el-input type="hidden" :rows="6" v-model="form.orderItemId"></el-input>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" size="small" @click="submitForm('form')">提交</el-button>
          <el-button @click="showAddForm=false" size="small">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {getItemEvaluate,evaluateUpdate} from 'src/axios/trade/evaluate/evaluate'
  import {isNumber} from "src/utils/validateUtil";
  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        orderItemId:'',
        stockState:'',
        form:this.metaData(),
        orderId:'',
        showAddForm:false,
        stockInfoState:'',
        evaluate:''
      };
    },
    methods: {
      toggleForm () {
        this.showAddForm = !this.showAddForm
      },
      submitForm(form){
        this.$refs[form].validate(valid => {
          if (valid) {
            evaluateUpdate (this.form).then(res => {
              this.showAddForm = !  this.showAddForm;
              this.form = this.metaData();
              this.$message({
                type: 'success',
                message: '评价成功'
              })
              this.$emit('refreshData')
            })
          } else {
            return false
          }
        })
      },
      closeForm () {
        this.toggleForm()
        this.form = this.metaForm()
      },
      fillData(id) {
        this.form.id= id || undefined
        this.showAddForm = true
        getItemEvaluate(id).then(res => {
          this.form.id= res.data.id
          this.form.evaluate= res.data.evaluate
          this.form.speedState=Number(res.data.speedState);
          this.form.serviceState=Number(res.data.serviceState);
          this.form.productPack=Number(res.data.productPack);
          this.form.orderItemId=res.data.orderItemId;
        })
      },
      metaData(){
        return {
          speedState:5,
          id:'',
          serviceState:5,
          productPack:5,
          stockInfoState: '1',
          evaluate:'',
          orderItemId:''
        }
      },
      handleCloseC(done) {
        this.addData= [{
          lotNo:'',
          medicalExpiredDate:'',
          purchaseInvoiceNo:'',
          invoiceNo:'',
          amount:'',
          orderId:'',
          itemId:''
        }],
          this.toggleFormC();
      }
    }
  }
</script>
