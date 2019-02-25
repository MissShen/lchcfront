<template>
  <el-dialog
    width="50%"
    :title="'详情菜单'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <!--<div v-if="visible">-->
    <el-form :model="dataForm"  ref="dataForm" label-width="80px" size="small" label-position="left" class="gap-40 form-bold">

      <el-form-item label="所属项目" prop="select">
        <span
          v-for="item in projectList"
          :key="item.id"
          v-if="dataForm.catProjectId===item.id"
        >
         {{item.projectName}}
        </span>
      </el-form-item>

      <el-form-item label="类别名称">
        <span>{{dataForm.categoryName}}</span>
      </el-form-item>

      <el-form-item label="备注" >
        <span>{{dataForm.remark}}</span>
      </el-form-item>

    </el-form>
    <span slot="footer">
      <el-button @click="visible = false" size="small">关闭</el-button>
    </span>
    <!--</div>-->
  </el-dialog>
</template>

<script>
  import {projectList,findById} from "src/axios/auditchanges/systemManage/projectBiddingCategory"

  export default {
    name: "findView",
    data() {
      return {
        visible: false,
        dataForm: this.metaForm(),
        projectList: undefined
      }
    },
    created() {
      this.metaList()
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          catProjectId: undefined,
          categoryName: undefined,
          remark: undefined
        }
      },
      metaList() {
        projectList().then(res => {
          this.projectList = res.data
        })
      },
      // ---------------
      fillData(id) {
        this.dataForm.id = id || undefined
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
          findById(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
      }
    }
  }
</script>
