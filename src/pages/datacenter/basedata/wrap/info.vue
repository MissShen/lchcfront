<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="from" ref="from" :rules="rules" label-position="left" label-width="180px" class="demo-ruleForm" size="small">

          <el-form-item label="特殊包装材质编码：">
            <span>{{from.code}}</span>
          </el-form-item>


          <el-form-item label="特殊包装材质中文名称：">
            <span>{{from.nameChn}}</span>
          </el-form-item>

          <el-form-item label="特殊包装材质英文名称：">
            <span>{{from.nameEng}}</span>
          </el-form-item>

          <el-form-item label="备注：">
            <span>{{from.remark}}</span>
          </el-form-item>

          <el-form-item>
            <el-button size="small" @click="goBack()">返回</el-button>
          </el-form-item>


        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  import {info} from 'src/axios/datacenter/basedata/wrap/wrap'

  export default {
    data() {
      return {
        from: '',
        rules:{
        },
        code: ''
      };
    },
    //界面加载完成后执行
    created(){
      this.code = this.$route.params.code || undefined;
      if(this.code) {
        this.metaFrom(this.code);
      }
    },
    methods: {
      metaFrom(code){

        info(code).then(res => {
          this.from = res.data;
        })

      },

      goBack() {
        this.$router.go(-1);
      }

    }
  }
</script>
