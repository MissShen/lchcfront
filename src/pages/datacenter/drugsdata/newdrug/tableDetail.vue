<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="width-520">
        <el-form :model="form" ref="form" label-position="left" label-width="130px" class="demo-ruleForm"
                 size="small">

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="通用名：" prop="name">
                <span>{{form.nameChn}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="ATC编码：" prop="name">
                <span>{{form.atcCode}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="关联11位药品：" prop="name">
                <span>{{form.drugNum}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="制剂：" prop="name">
                <span>{{form.doseageFormCode}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="规格：" prop="name">
                <span>{{form.spec}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="创建人：" prop="name">
                <span>{{form.createUser}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="创建时间：" prop="name">
                <span>{{form.createDate | capitalize}}</span>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="修改人：" prop="name">
                <span>{{form.updateUser}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="修改时间：" prop="name">
                <span>{{form.updateDate | capitalize}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button size="small" @click="goBack()">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {info} from 'src/axios/datacenter/basedata/catpharmcology/catnewpharmcology';
  import moment from 'moment'
  export default {
    components: {moment},
    data() {
      return {
        id:'',
        form: {
          nameChn:'',
          atcCode:'',
          doseageFormCode:'',
          spec:'',
          createUser:'',
          createDate:'',
          updateUser:'',
          updateDate:'',
          drugNum:''
        }
      }
    },

    created () {
      this.id = this.$route.params.id || undefined;
      if (this.id) {
        info(this.id).then(res => {
          this.form = res.data;
        })
      }
    },
    methods: {
      onSubmit() {

      },
      goBack() {
        this.$router.go(-1);
      },
    },
    filters:{
      capitalize(date){
        if(date == null || date == undefined || date == ""){
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    }

  }
</script>

