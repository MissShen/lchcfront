<template>
  <div>
    <!-- ========================== 修改药库信息 ========================= -->
    <div class="padding20" style="width: 500px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="100px" class="demo-ruleForm" size="small">
          <el-row>
              <el-input type="hidden" v-model="ruleForm.warehouseId"></el-input>
            <el-form-item label="药库编码：" prop="warehouseCode">
              <el-input v-model="ruleForm.warehouseCode"></el-input>
            </el-form-item>
            <el-form-item label="药库名称：" prop="warehouseName">
              <el-input v-model="ruleForm.warehouseName"></el-input>
            </el-form-item>
            <el-form-item label="药库联系人：" prop="linkPerson">
              <el-input v-model="ruleForm.linkPerson"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话：" prop="linkPhone">
              <el-input v-model="ruleForm.linkPhone"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="warehouseDesc">
              <el-input v-model="ruleForm.warehouseDesc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" size="small">保存</el-button>
              <el-button type="" @click="returnEx" size="small">返回</el-button>
            </el-form-item>
          </el-row>
        </el-form>
    </div>
  </div>
</template>
<script>
  import {updateWarehouse,findOrdWarehouseByWarehouseId,insertWarehouse,toCheckNameExists,toCheckCodeExists} from 'src/axios/trade/information/wareHouseList'
  export default {
    data() {
      var warehouseId=this.$route.params.warehouseId
      return {
          ruleForm: this.metaForm(),
        rules:{
          warehouseCode:[
            {required: true, message: '请输入药库编码', trigger: 'blur'},
            {validator: checkCodeExists, trigger: 'blur'}
            ],
          warehouseName:[{ required: true, message: '请输入药库名称',trigger: 'blur' },
            {validator: checkNameExists, trigger: 'blur'}
            ],
          district:{ required: false},
          county:{ required: false},
          address:{ required: false}
        }
      };
      function  checkNameExists  (rule, value, callback) {
        setTimeout(() => {
          toCheckNameExists(value,warehouseId).then(res => {
            var name = res.data
            if(name==="break"){
              return callback(new Error('仓库名称已存在'));
            }else{
              return callback();
            }
          })
        }, 1000);
      };
      function  checkCodeExists  (rule, value, callback) {
        setTimeout(() => {
        toCheckCodeExists(value,warehouseId).then(res => {
          var code = res.data
          if(code==="break"){
            return callback(new Error('仓库编码已存在'));
          }else{
            return callback();
          }
        })
        }, 1000);
      };
    },
    created() {
      var warehouseId = this.$route.params.warehouseId
      this.warehouseId = warehouseId
      if(warehouseId!=0){
        this.list()
      }
    },
    methods: {
      metaForm() {
        return {
          warehouseId: undefined,
          warehouseCode: undefined,
          warehouseName:undefined,
          linkPerson:undefined,
          linkPhone:undefined,
          warehouseDesc:undefined
        }
      },
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            if(this.warehouseId==0){
              insertWarehouse(this.ruleForm).then(res => {
                this.$message({
                  type: 'success',
                  message: res.data
                })
              })
            }else{
              updateWarehouse(this.ruleForm,this.warehouseId).then(res => {
                this.$message({
                  type: 'success',
                  message: res.data
                })
              })
            }
            this.returnEx();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      list () {
        var warehouseId= this.warehouseId
        findOrdWarehouseByWarehouseId(warehouseId).then(res => {
          this.ruleForm = res.data
        })
      },
      returnEx(){
        window.history.go(-1)
      }
  }
  }
</script>
