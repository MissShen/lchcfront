<template>
  <div class="tablebox">
    <el-form ref="form" :model="form" label-width="150px">
      <price-basics></price-basics>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-radio-group v-model="vadio">
            <el-radio label="0">全国最低中标价</el-radio>
            <el-radio label="1">计算价格</el-radio>
            <el-radio label="2">无最低中标价</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="年度">
            <span></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="省份">
            <span></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="项目名称：">
            <span></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="中标价：">
                <span><span style="color: red" v-if="viewFlag.viewFlag==1||viewFlag.viewFlag==3">变更前：</span></span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div v-if="viewFlag.viewFlag==2||viewFlag.viewFlag==3">
                <el-button type="text" @click="handlerFromView">澄清</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-row :gutter="24">
                <div v-if="viewFlag.viewFlag==1||viewFlag.viewFlag==3">
                  <el-col :span="24">
                    <span style="color: red">变更后：</span>
                  </el-col>
                  <div v-if="doubtCheckbox">
                    <el-col :span="16">
                      <el-input></el-input>
                    </el-col>
                    <el-col :span="8">
                      <el-upload
                        class="upload-demo"
                        action=""
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                    </el-col>
                  </div>
                </div>
              </el-row>
            </el-col>
            <el-col :span="12">
              <div v-if="viewFlag.viewFlag==1">
                <el-checkbox v-model="doubtCheckbox">质疑</el-checkbox>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="执行日期：">
            <span></span>
          </el-form-item>
        </el-col>
      </el-row>
      <clarify-dialog v-if="dialogVisible" ref="clarifyDialog"></clarify-dialog>
    </el-form>
  </div>
</template>

<script>
  import priceBasics from 'src/pages/auditchanges/common/priceDetailCommon/priceBasics'
  import clarifyDialog from 'src/pages/auditchanges/common/priceDetailCommon/clarifyDialog'

  export default {
    name: "price-entering-common",
    components: {
      priceBasics,
      clarifyDialog
    },
    data() {
      return {
        form: {},
        vadio: '0',
        doubtCheckbox: undefined,
        viewFlag: '0',
        dialogVisible: false,
      }
    },
    methods: {
      mataData(req) {
        this.viewFlag = req;
      },
      handlerFromView() {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.clarifyDialog.fillData()
        })
      }
    }
  }
</script>

<style scoped>

</style>
