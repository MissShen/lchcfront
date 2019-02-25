<template>
  <el-dialog
    title="选择项目"
    top="4vh"
    @close="projectClose"
    :close-on-click-modal="false"
    :visible.sync="visible" width="500px">
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="projectData"
        border
        empty-text="暂无项目,请先创建项目"
        stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="项目名称">
          <template slot-scope="scope">
            <span>{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div slot="content">
              <a class="operation-btn" @click="chooseProject(scope.row.id,scope.row.projectName)">选择</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
  import {projectList, projectSave} from "src/axios/management/authority/headMenu";

  export default {
    name: "project-choose",
    data() {
      return {
        visible: true,
        projectData: []
      }
    },
    methods: {
      metaList() {
        projectList().then(res => {
          if (res.code === '200') {
            this.visible = true;
            this.projectData = res.data;
            if (this.projectData.length === 1) {
              let project = res.data[0];
              this.chooseProject(project.id, project.projectName)
            }
          } else {
            this.$resMessage(res);
            this.visible = false;
          }
        })
      },
      chooseProject(id, name) {
        projectSave(id, name).then(res => {
          if(res.code==='200') {
            sessionStorage.setItem("projectId", id);
            sessionStorage.setItem("projectName", name);
            this.$emit('refreshProject');
            this.$resMessage(res);
            this.visible = false;
          }else{
              sessionStorage.removeItem("projectId");
              sessionStorage.removeItem("projectName");
              this.$resMessage(res);
              this.visible = false;
            }
        })
      },
      projectClose() {
        this.visible = false;
      }
    },
  }
</script>

<style scoped>

</style>
