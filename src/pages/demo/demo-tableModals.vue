<template>
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <div class="table-form">
      <el-form ref="query" :model="queryData" label-position="right" size="small">
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="queryData.searchName" placeholder="菜单名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="warning" @click="handleQuery">查询</el-button>
              <el-button @click="restQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-caption">
      <el-button type="primary" size="small" @click="handleFromView()">新增二级菜单</el-button>
      <el-button type="primary" size="small" @click="showChildList()">获取子组件数据</el-button>
    </div>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
        stripe>
        <el-table-column label="序号" header-align="center" type="index" width="50"></el-table-column>
        <el-table-column label="菜单名称" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.menuName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="菜单名称简写" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.shortcutMenuName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="菜单路径" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button @click="handleFromView(scope.row.id)" type="text" size="small">修改</el-button>
            <el-button @click="handleDelete(scope.row.id,scope.row.menuName)" type="text" size="small">删除</el-button>
            <el-button @click="handleMenuButton(scope.row.id)" type="text" size="small">按钮管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格分页 -->
    <div class="pagebox">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30]"
        :total="resData.total"
        :page-size="resData.pageSize"
        :page-count="resData.pages"
        :current-page.sync="resData.pageNum">
      </el-pagination>
    </div>

    <!-- ============================弹窗引用外部页面============================ -->
    <!-- “新增菜单/修改菜单” demo-auditmenu.vue -->
    <form-view v-if="formViewVisible" :parent-id="id" ref="formView" @refreshData="metaList"></form-view>
    <!-- “按钮管理” menuButton.vue -->
    <menu-button v-if="menuButtonVisible" :parent-id="levelTwoId" ref="menuButton"></menu-button>
    <!-- “获取子组件数据” childList.vue -->
    <child-list v-if="childVisible" :parent-id="flag" ref="childList" @childSelected="handleChildList"></child-list>
  </div>
</template>

<script>
  // *******示例数据来自【综合管理】系统，操作请谨慎*******
  //import {levelTwoList, menuDelete} from 'src/axios/management/authority/sysMenu'
  import menuButton from './modals/menuButton'
  import formView from './modals/auditMenu'
  import childList from './modals/childList'

  export default {
    name: "demoTableModals",
    components: {
      formView,
      menuButton,
      childList
    },
    data() {
      return {
        id: undefined,
        levelTwoId: undefined,
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        formViewVisible: false,
        menuButtonVisible: false,
        flag: '1234',
        childVisible: false
      }
    },
    created() {
      //this.id = this.$route.params.mid
      //id值由上一级页面传过来。为操作方便，本demo使用固定数据：
      this.id = 'CMGR00000000000000000138';
      this.metaList();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          size: 10,
          startRow: 0,
          endRow: 0,
          total: 0,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: false,
          isLastPage: true,
          hasPreviousPage: false,
          hasNextPage: false,
          navigatePages: 8,
          navigatepageNums: [],
          navigateFirstPage: 0,
          navigateLastPage: 0,
          firstPage: 0,
          lastPage: 0,
          list: []
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          searchName: undefined,
        }
      },
      metaList() {
        levelTwoList(this.resData, this.queryData, this.id).then(res => {
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum = 1;
          }
        })
      },
      // -------------------------------------------- 数据初始化完毕  -----------------------------------------
      handleDelete(id, name) {
        this.$confirm(`确定删除${name}菜单吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          menuDelete(id).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.metaList()
              }
            })
          })
        })
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.metaList();
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.metaList();
      },
      handleFromView(id) {
        this.formViewVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.formView.fillData(id);
        })
      },
      handleMenuButton(id) {
        this.levelTwoId = id;
        this.menuButtonVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取menuButton.vue中的buttonMetaList()方法加载弹窗内容
          this.$refs.menuButton.buttonMetaList();
        })
      },
      handleQuery() {
        this.metaList();
      },
      restQuery() {
        this.queryData = this.metaQuery();
      },
      showChildList() {
        this.childVisible = true;
        this.$nextTick(() => {
          // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
          this.$refs.childList.getDataList(this.flag);
        })
      },
      handleChildList(data){
        console.log('收到子组件数据：', data);
      }
    }
  }
</script>

