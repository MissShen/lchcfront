<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="from" ref="from" label-position="left" :rules="rules"  label-width="110px" class="demo-ruleForm" size="small">

          <el-form-item label="国家编码：">
            <span>{{from.code}}</span>
          </el-form-item>

          <el-form-item label="国家中文名称：">
            <span>{{from.nameChn}}</span>
          </el-form-item>

          <el-form-item label="国家英文名称：">
            <span>{{from.nameEng}}</span>
          </el-form-item>

          <el-form-item label="字母码：">
            <span>{{from.letterCode}}</span>
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

  import {info} from 'src/axios/datacenter/basedata/region/region'

  export default {
    data() {
      return {
        from: '',
        rules:{},
        id: ''
      };
    },
    //界面加载完成后执行
    created(){
      this.id = this.$route.params.id || undefined;
      if(this.id) {
        this.metaFrom(this.id);
      }
    },
    methods: {
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
