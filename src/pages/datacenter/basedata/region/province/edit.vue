<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="from" ref="from" :rules="rules" label-position="left" label-width="120px" class="demo-ruleForm" size="small">

          <el-form-item label="所在国家：" prop="consignee">
            <el-form-item>
              <el-select v-model="from.parentCode" placeholder="请选择" class="w100">
                <el-option
                  v-for="item in countries"
                  :key="item.code"
                  :label="item.nameChn"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>

          <el-form-item label="省份编码：" prop="code">
            <el-input type="phone" v-model="from.code" maxlength="10"></el-input>
          </el-form-item>

          <el-form-item label="省份名称：" prop="nameChn">
            <el-input type="phone" v-model="from.nameChn" maxlength="40"></el-input>
          </el-form-item>

          <el-form-item label="省份简称：">
            <el-input type="phone" v-model="from.abbr" maxlength="40"></el-input>
          </el-form-item>
          <el-form-item label="字母码：">
            <el-input type="consignee" v-model="from.letterCode" maxlength="10"></el-input>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input
              type="textarea" :rows="2" v-model="from.remark" maxlength="40">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm('from')">保存</el-button>
            <el-button size="small" @click="goBack()">返回</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  import {countryAllList, update, info} from 'src/axios/datacenter/basedata/region/region'

  export default {
    data() {
      return {
        countries:'',
        from: {
          parentCode:'',
          code:'',
          nameChn: '',
          abbr:'',
          letterCode: '',
          remark:''
        },
        rules:{
          consignee:{ required: true, message: '请选择所在国家', trigger: 'blur'},
          code:{ required: true, message: '请输入省份编码', trigger: 'blur'},
          nameChn:{ required: true, message: '请输入省份名称', trigger: 'blur' },
        }
      };
    },
    //界面加载完成后执行
    created(){

      //国家列表
      countryAllList().then(res => {
        this.countries = res.data
//        this.from.county = 'CHN156'
      })

      //获取数据
      this.id = this.$route.params.id || undefined;
      if(this.id) {
        this.metaFrom(this.id);
      };

    },
    methods: {
      submitForm(from) {
        this.$refs[from].validate((valid) => {
          if (valid) {
            update(this.from).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                }
              });
              this.goBack()
            })
          }
        });
      },
      metaFrom(id){
        info(id).then(res => {
          this.from = res.data;
        })

      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
