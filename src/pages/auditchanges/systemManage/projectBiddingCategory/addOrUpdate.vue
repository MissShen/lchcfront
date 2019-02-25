<template>
  <el-dialog
    width="50%"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <!--<div v-if="visible">-->
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px" size="small" label-position="left" class="gap-40 form-bold">

      <el-form-item label="所属项目" prop="catProjectId">
        <el-select v-model="dataForm.catProjectId" placeholder="选择项目" class="w80">
          <el-option v-for="item in projectList"
                     :key="item.id"
                     :label="item.projectName"
                     :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="类别名称" prop="categoryName">
        <el-input v-model="dataForm.categoryName" placeholder="类别名称" class="w80"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :rows="3" v-model="dataForm.remark" placeholder="备注" class="w80"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer">
      <el-button @click="visible = false" size="small">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" size="small">确定</el-button>
    </span>
    <!--</div>-->
  </el-dialog>
</template>

<script>
  import {projectList,findById,insert,update} from "src/axios/auditchanges/systemManage/projectBiddingCategory"

  export default {
    name: "add-or-update",
    data() {
      return {
        visible: false,
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
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
      metaRule() {
        return {
          categoryName: [
            { required: true, message: '类别名称不能为空', trigger: 'blur' }
            /*{ min: 1, max:10, message: '菜单名称长度大于1小于10', trigger: 'blur' }*/
          ],
          catProjectId: [
            { required: true, message: '所属系统不能为空', trigger: 'blur' },
          ],
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
        if (this.dataForm.id) {
          findById(this.dataForm.id).then(res => {
            console.log(res)
            this.dataForm = res.data
          })
        }
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id ?  update(this.dataForm):insert(this.dataForm)
            http.then(res => {
              this.$message({
                message: '保存成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshData')
                }
              })
            })
          }
        })
      }
    }
  }
</script>
