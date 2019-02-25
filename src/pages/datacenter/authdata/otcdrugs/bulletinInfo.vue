<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="width-600">
        <el-form :model="form" ref="form" label-position="left" label-width="100px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="中西药类别：" prop="name">
                <span>{{ otcFlag(form.catOtc.otcFlag) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药品名称：">
                <span>{{ form.catOtc.bulletinDrug }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="规格组成：" prop="name">
                <span>{{ form.catOtc.ingredient }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类：">
                <span>{{ form.catOtc.drugCategory }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="foot-btn">
        <div class="foot-left">
          <el-button  @click="goBack()" size="small">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {info} from 'src/axios/datacenter/authdata/otcdrugs/catOtc'

  export default {
    components: {ElCol},
    data() {
      return {
        id: '',
        form: {
          catOtc: {}
        }
      }
    },

    created(){
      this.id = this.$route.params.id || undefined;
      this.load(this.id);
    },

    methods: {
      load(id) {
        info(id).then(res => {
          this.form = res.data;
        })
      },

      //OTC_FLAG转换
      otcFlag(status){
        if (status === "0") {
          return "西药"
        } else if (status === "1") {
          return "中药"
        } else {
          return status;
        }
      },

      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

