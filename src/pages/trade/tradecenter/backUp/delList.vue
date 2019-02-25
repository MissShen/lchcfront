<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">备案审核</span>
    </div>
    <div class="from-padding from-view">
      <el-form :model="from" ref="from" :rules="rules" label-position="left"
               label-width="180px" size="small"
               class="demo-form-inline" :inline="true">
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="通用名" prop="consignee">
                <span>通用名</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品名" prop="phone">
                <span>商品名</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="剂型" prop="consignee">
                <span>剂型</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格包装" prop="phone">
                <span>规格包装</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="转换比" prop="consignee">
                <span>转换比</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位" prop="phone">
                <span>单位</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="包材" prop="consignee">
                <span>包材</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="批准文号" prop="phone">
                <span>批准文号</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="单价" prop="consignee">
                <span>单价</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购数量" prop="phone">
                <span>采购数量</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="采购金额" prop="phone">
                <span>采购金额</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购日期" prop="phone">
                <span>采购日期</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="生产企业" prop="phone">
                <span>生产企业</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配送企业" prop="phone">
                <span>配送企业</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="使用用途" prop="phone">
                <span>使用用途</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购原因" prop="phone">
                <span>采购原因</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="临床医师" prop="phone">
                <span>临床医师</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药剂科主任" prop="phone">
                <span>药剂科主任</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="院长信息" prop="phone">
                <span>院长信息</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="提交时间" prop="phone">
            <span>提交时间</span>
          </el-form-item>
            </el-col>
          </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="申请时间" prop="phone">
            <span>申请时间</span>
          </el-form-item>
            </el-col>
            <el-col :span="12">
          <el-form-item label="作废原因" prop="phone">
            <span>作废原因</span>
          </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button size="small" @click="submitForm('from')" >同意作废</el-button>
            <el-button size="small" @click="submitForm('from')" >拒绝作废</el-button>
            <el-button size="small" @click="submitForm('from')" >返回</el-button>
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
