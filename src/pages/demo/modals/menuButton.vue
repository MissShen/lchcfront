<template>
  <el-dialog
    title="按钮管理"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="list"
        border
        stripe>
        <el-table-column label="序号" header-align="center" type="index" width="50"></el-table-column>
        <el-table-column label="按钮名称" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.btnName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="按钮code" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.btnCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="按钮路径" header-align="center">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content" style="text-align: center;">
                <a class="el-icon-setting" @click="handleButtonView(scope.row.id)"
                   style="color: mediumturquoise;">修改</a>
                <span class="space-bar"></span>
                <a class="el-icon-delete" @click="handleButtonDelete(scope.row.id,scope.row.btnName)" style="color: red;">删除</a>
              </div>
              <span>{{ scope.row.btnUrl }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br/>
    <el-button type="primary" size="small" @click="handleButtonView()">新增按钮</el-button>
    <button-view v-if="buttonViewVisible" :parent-id="parentId" ref="buttonView" @refreshData="buttonMetaList"></button-view>
    <span slot="footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  // *******示例数据来自【综合管理】系统，操作请谨慎*******
  //import {buttonList,buttonDelete} from 'src/axios/management/authority/sysMenu'
  import buttonView from './menuButtonTwo'
  export default {
    name: "menu-button",
    components:{
      buttonView
    },
    props:{
      parentId:{
        type: String,
        required: true
      }
    },
    data() {
      return {
        visible:false,
        buttonViewVisible: false,
        list: undefined
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      buttonMetaList(){
        this.visible = true
        buttonList(this.parentId).then(res=>{
          this.list=res.data
        })
      },
      // -------------------------------------------- 数据初始化完毕  -----------------------------------------
      handleButtonDelete(id, name) {
        this.$confirm(`确定删除${name}按钮吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          buttonDelete(id).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.buttonMetaList()
              }
            })
          })
        })
      },
    //  ************************
      handleButtonView(id) {
        this.buttonViewVisible = true
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取menuButtonTwo.vue中的fillButtonData()方法加载弹窗内容
          this.$refs.buttonView.fillButtonData(id)
        })
      },
    }
  }
</script>

<style scoped>

</style>
