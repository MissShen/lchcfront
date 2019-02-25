<template>
  <!-- 表格 -->
  <div class="tablebox" v-if="permData.resource_one_list">
    <!-- 表格查询表单 -->
    <el-form :inline="true" :model="queryData" ref="queryData" class="table-form">
       <el-form-item>
         <el-date-picker
           size="small"
           type="date"
           format="yyyy-MM-dd"
           value-format="yyyy-MM-dd"
           placeholder="创建开始日期"
           :editable="false"
           v-model="queryData.beginDate">
          </el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker
          size="small"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="创建结束日期"
          :editable="false"
          v-model="queryData.endDate">
          </el-date-picker>
     </el-form-item>
      <el-form-item>
         <el-input v-model="queryData.searchName" placeholder="菜单名称" size="small"></el-input>
      </el-form-item>
      <el-form-item>
         <el-select v-model="queryData.systemId" placeholder="所属系统" size="small">
          <el-option v-for="busSys in busSysInfoList"
                     :key="busSys.id"
                     :label="busSys.systemName"
                     :value="busSys.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleQuery()" size="small">查询</el-button>
       <el-button type="warning" @click="queryData=metaQuery()" size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="foot-btn foot-left">
      <span>
        <el-button
          size="small"
          type="success"
          @click="handleFromView()"
          v-if="permData.resource_one_add"
        > 新增菜单
      </el-button>
      </span>
    </div>
    <div class="tableset">
      <el-table
        :data="resData.list"
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: auto"
        border
        stripe>
        <el-table-column label="序号" type="index" width="50"  align="center"></el-table-column>
        <el-table-column label="菜单名称" sortable show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.resourceName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属系统" sortable width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="busSys in busSysInfoList"
                  :key="busSys.id"
                  v-if="busSys.id===scope.row.systemId">{{ busSys.systemName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注信息" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" sortable width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div class="operates">
              <a href="javascript:;" @click="handleGoChildren(scope.row.id)" v-if="permData.resource_two_list">二级菜单</a>
              <a href="javascript:;" @click="handleFromView(scope.row.id)" v-if="permData.resource_one_upd">修改</a>
              <a href="javascript:;" @click="handleDelete(scope.row.id,scope.row.resourceName)" v-if="permData.resource_one_del">删除</a>
            </div>
          </template>
        </el-table-column>
      </el-table>

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

      <form-view v-if="formViewVisible" ref="formView" @refreshData="metaList"></form-view>
    </div>
  </div>
</template>

<script>
  import {resourceList, resourceDelete} from "src/axios/management/authority/sysResource";
  import {busSysList} from "src/axios/management/authority/headMenu"
  import formView from './formView'
  import {mapGetters} from 'vuex'

  export default {
    name: "one-menu",
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    components: {
      formView
    },
    data() {
      return {
        resData: this.metaData(), // 列表数据初始化
        queryData: this.metaQuery(), // 查询参数初始化
        permData: this.metaPerm(), // 权限初始化
        busSysInfoList: undefined,  // 系统列表数据初始化
        formViewVisible: false
      }
    },
    created() {
      this.metaHasPerm();
      if(this.permData.resource_one_list){
        busSysList().then(res => {
          this.busSysInfoList = res.data
        });
        this.metaList();
      }
    },
    methods: {
      metaData() { // 翻页、列表数据
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 查询参数
        return {
          searchName: undefined,
          beginDate: undefined,
          endDate: undefined,
          systemId: undefined
        }
      },
      metaPerm() {
        return {
          resource_one_list: false,
          resource_two_list: false,
          resource_one_add: false,
          resource_one_del: false,
          resource_one_view: false,
          resource_one_upd: false,
        }
      },
      metaHasPerm() {
        this.permData.resource_one_list = this.perms['sys:resource_one:list'];
        this.permData.resource_two_list = this.perms['sys:resource_two:list'];
        this.permData.resource_one_add = this.perms['sys:resource_one:save'];
        this.permData.resource_one_del = this.perms['sys:resource_one:delete'];
        this.permData.resource_one_view = this.perms['sys:resource_one:view'];
        this.permData.resource_one_upd = this.perms['sys:resource_one:update'];
      },
      metaList() { // 查询一级菜单
        resourceList(this.resData, this.queryData, null, 'MENU').then(res => {
          this.resData = res.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      handleGoChildren(id) {
        this.$router.push("/authority/twoMenu/" + id);
      },
      handleDelete(id, name) {
        this.$confirm(`确定删除菜单『${name}』吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resourceDelete(id).then(res => {
            this.$resMessage(res,{
              onClose: () => {
                this.metaList();
              }
            });
          })
        })
      },
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
          this.$refs.formView.fillData(id);
        })
      },
      handleQuery() {
        this.resData = this.metaData();
        this.metaList();
      },
    }
  }
</script>

<style scoped>

</style>
