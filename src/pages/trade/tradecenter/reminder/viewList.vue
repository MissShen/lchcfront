<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <ul class="tabs-panel">
      <li class="active">订单查看</li>
    </ul>
    <div class="tablebox">
      <div style="width: 500px">
        <el-form :model="from" ref="from" :rules="rules"  label-width="100px" size="small">
          <el-row>
            <el-col :span="12">
          <el-form-item label="订单编号" prop="phone">
            <span>订单编号</span>
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="订单金额" prop="consignee">
            <span>订单金额</span>
          </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
          <el-form-item label="到货金额" prop="phone">
            <span>到货金额</span>
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="发送时间" prop="consignee">
          <span>发送时间</span>
        </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
          <el-form-item label="批发企业" prop="phone">
            <span>批发企业</span>
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="配送企业" prop="phone">
            <span>配送企业</span>
          </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
          <el-form-item label="医院联系人" prop="consignee">
            <span>医院联系人</span>
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="医院电话" prop="phone">
            <span>医院电话</span>
          </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
          <el-form-item label="医院备注" prop="phone">
            <span>医院备注</span>
          </el-form-item>
            </el-col>
          </el-row>

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
