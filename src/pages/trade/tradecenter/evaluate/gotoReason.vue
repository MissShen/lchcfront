<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <ul class="tabs-panel">
      <li class="active">审批撤销</li>
    </ul>
    <div class="tablebox">
      <div style="width: 500px">
        <el-form :model="from" ref="from" :rules="rules"  label-width="100px" class="demo-ruleForm" size="small">
          <el-form-item label="撤销原因" prop="phone">
            <template slot-scope="scope">
              iii
            </template>
          </el-form-item>

          <el-form-item>
            <el-button size="small" class="el-button-pale" @click="submitForm('from')" >返回</el-button>
            <el-button type="primary" @click="submitForm('from')" >确认审批</el-button>
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
