<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
        <el-form :model="query" ref="query" :rules="rules" label-position="left" label-width="150px" style="padding: 0px 0px 0px 30px;"  class="demo-ruleForm" size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="产品名：" prop="bakMedicalName">
                 <span>{{query.bakMedicalName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品名：">
                  <span>{{query.bakProductName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="规格包装：">
                  <span>{{ query.bakMedicalSpec }}× {{ query.bakStandSpecRate }}{{ query.bakUseUnit }}{{ query.bakSpecUnit }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生产企业：">
                  <span>{{ query.bakProducerShortName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="库存状态：">
                <el-radio-group v-model="maintainState">
                  <el-radio :label="1">充足</el-radio>
                  <el-radio :label="2">断货</el-radio>
                  <el-radio :label="3">缺货</el-radio><!--<el-input type="hidden" v-model="query.productId"></el-input>-->
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中/标准包装转换比：" prop="bakMiddleStandRate">
                  <el-input class="width-240" v-model="query.bakMiddleStandRate"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="大/中包装转换比：" prop="bakBigMiddleRate">
                <el-input class="width-240" v-model="query.bakBigMiddleRate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label=" 断缺货原因：" v-if="maintainState != 1" prop="comments">
                <el-input class="width-240" v-model="query.comments" type="textarea" :rows="2" ></el-input>
              </el-form-item>
              <el-form-item label=" 断缺货原因：" v-else >
                <el-input class="width-240" v-model="query.comments" type="textarea" :rows="2" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="submitForm()" >保存</el-button>
                <el-button @click="goBack()" >返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
</template>

<script>
  import {queryStockMaintain,updateStock} from 'src/axios/trade/stock/stock'
  import {isNumber, isNotNull} from 'src/utils/validateUtil'
  export default {
    data() {
      var msRule = (rule, value, callback) => {
        if(isNotNull(value) && isNumber(value) === false){
          return callback(new Error('应为数字'));
        }else{
          callback();
        }
      };
      return {
        query:this.metaQuery(),
        maintainState: '',
        rules:{
          bakMiddleStandRate:[{required: false, validator: msRule, trigger: 'blur'}],
          bakBigMiddleRate:[{required: false, validator: msRule, trigger: 'blur'}],
          comments:[{required: true, message: '请填写断缺货原因', trigger: 'change'}]
        }
      };
    },
    created () {
      this.list(this.$route.params.productId)
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      metaQuery(){
        return{
          maintainState: '',
          bakMiddleStandRate:'',
          bakBigMiddleRate:'',
          productId:this.$route.params.productId,
          comments:''
        }
      },
      submitForm() {

        this.$refs['query'].validate((valid) => {
          if (valid) {
            this.query.maintainState=this.maintainState,
            updateStock(this.query).then( () => {
              this.$message({
                message: "操作成功！",
                type: 'success',
                duration: 1000
              })
            });
            this.goBack()
          }
        });

      },
      list(productId){
        queryStockMaintain(productId).then( res => {
          this.query = res.data.list[0];
          this.maintainState = Number(res.data.list[0].maintainState);
        })
      }
    }
  }
</script>
