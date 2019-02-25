<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="padding20">
      <div class="width-520">
        <el-form :model="from" ref="from" :rules="rules" label-position="left" label-width="120px" class="demo-ruleForm" size="small">

          <el-form-item label="所在省份：">
            <span>{{from.parentName}}</span>
          </el-form-item>

          <el-form-item label="地市编码：">
            <span>{{from.code}}</span>
          </el-form-item>


          <el-form-item label="地市名称：">
            <span>{{from.nameChn}}</span>
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
        from: {
          name: '',
          consignee:'',
          phone:'',
          address:'',
          district:'',
          county:'',
          region:''
        },
        rules:{},
        id:''
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
