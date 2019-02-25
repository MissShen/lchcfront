<template>
  <!-- 表格 -->
  <div class="tablebox" v-if="permData.resource_two_list">
    <!-- 表格查询表单 -->
    <el-form :inline="true" :model="queryData" ref="queryData" class="table-form">
      <el-form-item>
        <el-input v-model="queryData.searchName" placeholder="菜单名称" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleQuery()" size="small">查询</el-button>
        <el-button type="warning" @click="queryData=metaQuery()" size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="foot-btn foot-left">
      <el-button size="small" type="success" @click="handleFromView()" v-if="permData.resource_two_add"> 新增二级菜单</el-button>
      <el-button size="small" @click="handleBack()" class="el-button-pale"> 返回</el-button>
    </div>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
        stripe>
        <el-table-column label="菜单名称" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.resourceName }}</span>
            <el-tag size="mini" v-if="scope.row.isShortcutMenu=='1'">快捷菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="菜单名称简写" width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <i v-if="scope.row.shortcutMenuIcon" class="iconfont" :class=" scope.row.shortcutMenuIcon"></i>
            <span>{{ scope.row.shortcutMenuName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="菜单路径" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.resourceUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注信息" width="280" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div class="operates">
              <a href="javascript:;" @click="handleFromView(scope.row.id)"
                 v-if="permData.resource_two_upd">修改</a>
              <a href="javascript:;" @click="handleDelete(scope.row.id,scope.row.resourceName)"
                 v-if="permData.resource_two_del">删除</a>
              <a href="javascript:;" v-if="permData.resource_button_list"
                 @click="handleMenuButton(scope.row.id)">按钮管理</a>
            </div>
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
    <form-view v-if="formViewVisible" :parent-id="id" ref="formView" @refreshData="metaList"></form-view>
    <menu-button v-if="menuButtonVisible" :parent-id="mid" ref="menuButton"></menu-button>
  </div>
</template>

<script>
  import {resourceList, resourceDelete} from "src/axios/management/authority/sysResource";
  import menuButton from '../button/menuButton'
  import formView from './formView'
  import {mapGetters} from 'vuex'

  export default {
    name: "two-menu",
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    components: {
      formView, menuButton
    },
    data() {
      return {
        id: undefined,
        mid: undefined,
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        permData: this.metaPerm(), // 权限初始化
        formViewVisible: false,
        menuButtonVisible: false
      }
    },
    created() {
      this.metaHasPerm();
      if (this.permData.resource_two_list) {
        this.id = this.$route.params.mid
        this.metaList()
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          searchName: undefined,
        }
      },
      metaList() {
        resourceList(this.resData, this.queryData, this.id, 'MENU').then(res => {
          this.resData = res.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      metaPerm() {
        return {
          resource_two_list: false,
          resource_button_list: false,
          resource_two_add: false,
          resource_two_del: false,
          resource_two_view: false,
          resource_two_upd: false,
        }
      },
      metaHasPerm() {
        this.permData.resource_two_list = this.perms['sys:resource_two:list'];
        this.permData.resource_button_list = this.perms['sys:resource_button:list'];
        this.permData.resource_two_add = this.perms['sys:resource_two:save'];
        this.permData.resource_two_del = this.perms['sys:resource_two:delete'];
        this.permData.resource_two_view = this.perms['sys:resource_two:view'];
        this.permData.resource_two_upd = this.perms['sys:resource_two:update'];
      },
      // -------------------------------------------- 数据初始化完毕  -----------------------------------------
      handleDelete(id, name) {
        this.$confirm(`确定删除菜单『${name}』吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resourceDelete(id).then(res => {
            this.$resMessage(res, {
              onClose: () => {
                this.metaList()
              }
            });
          })
        })
      },
      // ************************
      handleQuery() {
        this.resData = this.metaData();
        this.metaList();
      },
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.metaList()
      },
      handleFromView(id) {
        this.formViewVisible = true
        this.$nextTick(() => {
          this.$refs.formView.fillData(id)
        })
      },
      handleMenuButton(id) {
        this.menuButtonVisible = true
        this.mid = id;
        this.$nextTick(() => {
          this.$refs.menuButton.buttonMetaList()
        })
      },
      handleBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
