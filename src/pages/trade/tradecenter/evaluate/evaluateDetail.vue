<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <ul class="tabs-panel">
      <li class="active">供应评价</li>
    </ul>
    <div class="tablebox">
      <div style="width: 500px">
        <el-form :model="from" ref="from" :rules="rules"  label-width="100px" size="small">

          <el-form-item label="通用名" prop="consignee">
            <span>通用名</span>
          </el-form-item>
          <el-form-item label="商品名" prop="phone">
            <span>商品名</span>
          </el-form-item>
          <el-form-item label="剂型" prop="consignee">
            <span>剂型</span>
          </el-form-item>
          <el-form-item label="规格包装" prop="phone">
            <span>规格包装</span>
          </el-form-item>
          <el-form-item label="生产企业" prop="consignee">
            <span>生产企业</span>
          </el-form-item>
          <el-form-item label="填报机构" prop="phone">
            <span>填报机构</span>
          </el-form-item>
          <el-form-item label="审批机构" prop="consignee">
            <span>审批机构</span>
          </el-form-item>
          <el-form-item label="违约行为一" prop="phone">
            <span>违约行为一</span>
          </el-form-item>
          <el-form-item label="备注" prop="consignee">
            <span>备注</span>
          </el-form-item>
          <el-form-item label="配送企业" prop="phone">
            <span>撤销原因</span>
          </el-form-item>
          <el-form-item label="撤销原因" prop="phone">
            <span>撤销原因</span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('from')" >返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        from: {
          name: '',
          consignee:'',
          phone:'',
          address:'',
          district:'',
          county:'',
          region:''
        },
        rules:{
          consignee:{ required: true, message: '请输入收货人', trigger: 'blur'},
          phone:{ required: true, message: '请输入联系电话', trigger: 'blur' },
          region:{ required: true, message: '请选择市', trigger: 'change' },
          district:{ required: true, message: '请选择区', trigger: 'change' },
          county:{ required: true, message: '请选择县', trigger: 'change' },
          address:{ required: true, message: '请输入详细地址', trigger: 'blur' }
        }
      };
    },
    methods: {
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
