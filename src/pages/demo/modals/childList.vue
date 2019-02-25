<template>
  <el-dialog
    title="按钮管理"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="list"
        @select="handleSelect"
        border
        stripe>
        <el-table-column label="序号" header-align="center" align="center" type="selection" width="50">
        </el-table-column>
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
                <a class="el-icon-setting""
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
    <span slot="footer">
      <el-button type="primary" size="small" @click="toParentList">选择</el-button>
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "childList",
    props:{
      parentId:{
        type: String,
        required: true
      }
    },
    data() {
      return {
        visible:false,
        list: undefined,
        selectedData: ''
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      getDataList(flag){
        console.log('父传子参数flag：', flag);
        this.visible = true
        /*buttonList(this.parentId).then(res=>{
          this.list=res.data
        })*/
        this.list = [
          {
            id: '1',
            btnName: 'button1',
            btnCode: '001'
          },
          {
            id: '2',
            btnName: 'button2',
            btnCode: '002'
          }
        ]
      },
      // -------------------------------------------- 数据初始化完毕  -----------------------------------------
      handleSelect(sel, row) {
        //console.log(sel);
        this.selectedData = sel;
      },
      toParentList(){
        this.visible = false;
        this.$emit('childSelected', this.selectedData);
      }
    }
  }
</script>
