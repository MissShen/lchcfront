<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">收货地址维护</span>
    </div>
    <div class="padding20" style="width: 500px">
        <el-form :model="from" ref="from" :rules="rules" label-position="right" label-width="100px" class="demo-ruleForm" size="small">
          <el-form-item label="买方名称：" prop="name">
            <span>中日友好医院</span>
          </el-form-item>
          <el-form-item label="收货人：" prop="consignee">
            <el-input type="consignee" v-model="from.consignee" ></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone">
            <el-input type="phone" v-model="from.phone"></el-input>
          </el-form-item>
          <el-form-item label="区域：" required>
              <ul class="only-from">
                <li class="w33-3">
                  <el-select v-model="from.region" placeholder="请选择市" size="small">
                    <el-option label="北京市" value="beijin"></el-option>
                    <el-option label="天津市" value="tianjin"></el-option>
                  </el-select>
                </li>
                <li class="w33-3">
                  <el-select v-model="from.district" placeholder="请选择区" size="small">
                    <el-option label="西城区" value="xc"></el-option>
                    <el-option label="朝阳区" value="cy"></el-option>
                  </el-select>
                </li>
                <li class="w33-3">
                  <el-select v-model="from.county" placeholder="请选择县/区" size="small">
                    <el-option label="区域一" value="qyo"></el-option>
                    <el-option label="区域二" value="qyr"></el-option>
                  </el-select>
                </li>
              </ul>
          </el-form-item>
          <el-form-item prop="district" size="small" label="区域：">
            <el-select v-model="from.district" placeholder="请选择区" class="w100">
              <el-option label="西城区" value="xc"></el-option>
              <el-option label="朝阳区" value="cy"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input type="address" v-model="from.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('from')" >保存</el-button>
          </el-form-item>
        </el-form>
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
