<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tablebox">
      <div class="width-420">
        <el-form :model="data" ref="data" label-position="left" label-width="100px" class="demo-ruleForm"
                 size="small">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="药品编码：" prop="name">
                <span>{{data.CODE}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="通用名：" prop="name">
                <span>{{data.NAME_CHN}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="剂型：" prop="name">
                <span>{{data.CDF_NAME_CHN}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="异名：" prop="name">
                <span>{{data.ALIAS}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="英文异名：" prop="name">
                <span>{{data.NAME_ENG}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="备注：" prop="name">
                <span>{{data.REMARK}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button @click="handleBack">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>

  import ElCol from "element-ui/packages/col/src/col";
  import {findDrugSynonymInfo} from 'src/axios/datacenter/drugdata/synonym/synonym'

  export default {
    components: {ElCol},
    data() {
      return {
        from: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        id: undefined,
        data: undefined
      }
    },
    created () {

      // 接收参数
      this.id = this.$route.params.id;
      this.id = this.id === 'undefined' ? undefined : this.id;

      console.log("this.id=", this.id)

      findDrugSynonymInfo(this.id).then(res => {
        this.data = res.data
      })

    },
    methods: {
      handleBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

