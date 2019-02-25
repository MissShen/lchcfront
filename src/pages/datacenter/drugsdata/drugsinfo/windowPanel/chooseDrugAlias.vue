<template>
  <el-dialog
    :title="'选择药品通用名称'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="query" ref="query"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">

          <el-form-item>
            <el-input v-model="query.searchContent" placeholder="分类名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="metaList()" size="small">查询</el-button>
            <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
          </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        @selection-change="handleSelectionChange"
        border
        stripe>
        <el-table-column label="药品通用名">
          <template slot-scope="scope">
            <span>{{ scope.row.NAME_CHN }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operates"><a class="operation-btn" @click="myCallBack(scope.row.CODE, scope.row.ID,scope.row.NAME_CHN)">选择</a></div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer">
      <el-button class="flo-left" type="success" @click="addAlias()" size="small">新增</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>

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
    <add-alias v-if="addAliasVisible" ref="AddAlias" @updateData="metaList()"></add-alias>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElFormItem from "../../../../../../node_modules/element-ui/packages/form/src/form-item";
  import AddAlias from "./addAlias";

  import {queryCommonNameList} from 'src/axios/datacenter/drugdata/druginfo/druginfo'

  export default {
    components: {
      AddAlias,
      ElFormItem,
      ElCol
    },
    name: "drugAlias",
    data() {
      return {
        addAliasVisible: false,
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        query: this.metaQuery(),
        codeBig: undefined,
        codeSmall: undefined
      }
    },
    created() {
    },
    methods: {
      fillData(codeBig, codeSmall) {
        this.codeBig = codeBig;
        this.codeSmall = codeSmall;
        this.visible = true;
        this.metaList();
      },

      addAlias() {
        this.addAliasVisible = true;
        this.$nextTick(() => {
          this.$refs.AddAlias.fillData(this.codeBig, this.codeSmall);
        })
      },

      metaForm() {
        return {
          id: undefined,
          parentId: undefined,
          menuName: undefined,
          shortcutMenuName: undefined,
          menuUrl: undefined,
          orderNum: undefined,
          remark: undefined,
          isShortcutMenu: '0'
        }
      },

      metaData () {
        return {// 前后台交互数据封装格式
          pageNum: 0,
          pageSize: 10,
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
      metaQuery () { // 表单查询数据初始化
        return {
          searchContent: "",
          searchType: '',
          codeType: '',
          pharmType: '',
          pharmId: ''
        }
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.metaList()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.metaList()
      },
      handleSelectionChange(val){
        this.choiceList = val
      },
      metaList() {
        queryCommonNameList(this.resData, this.query, this.codeBig, this.codeSmall).then(res => {
          this.resData = res.data;
          console.log(res.data)
        })
      },
      // 重置
      resetForm() {
        this.query = this.metaQuery ();
      },
      myCallBack(code, id, name) {

        // 2 + 2 + 4 最少是等于6的，加if过滤一些脏数据。
        if(code.length >= 6) {
          this.$emit('callBack', code.substr(4, 4), id, name);
          this.visible = false;
        }

      }
    }
  }
</script>


