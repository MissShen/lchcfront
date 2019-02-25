<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <ul class="tabs-panel">
      <li class="active">特殊药品</li>
    </ul>
    <div class="tablebox">
      <div style="width: 500px">
        <el-form :model="from" ref="from" :rules="rules"  label-width="100px" size="small">
          <el-form-item label="药品名称" prop="phone">
            <span>药品名称</span>
          </el-form-item>
          <el-form-item label="药品类型" prop="consignee">
            <span>药品类型</span>
          </el-form-item>
          <el-form-item label="目标分类" prop="phone">
            <span>目标分类</span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('from')" >确认修改</el-button>
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
