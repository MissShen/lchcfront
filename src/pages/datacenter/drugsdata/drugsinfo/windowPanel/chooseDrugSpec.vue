<template>
  <el-dialog
    :title="'选择药品规格'"
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
            <el-button type="warning" @click="resetForm" size="small">重置</el-button>
          </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        @selection-change="handleSelectionChange"
        border stripe>
        <el-table-column label="药品规格">
          <template slot-scope="scope">
            <span>{{ scope.row.SPEC }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operates"><a class="operation-btn" @click="myCallBack(scope.row.CODE, scope.row.SPEC)">选择</a></div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer">
      <el-button class="flo-left" type="success" @click="addAlias()" size="small">新增</el-button>
      <el-button @click="visible = false" size="small">关闭</el-button>
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
    <add-spec v-if="addSpecVisible" ref="AddSpec" @updateData="metaList"></add-spec>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {querySpecificationList} from 'src/axios/datacenter/drugdata/druginfo/druginfo'
  import ElFormItem from "../../../../../../node_modules/element-ui/packages/form/src/form-item";
  import AddSpec from "./addSpec";

  export default {
    components: {
      AddSpec,
      ElFormItem,
      ElCol
    },
    name: "chooseDrugSpec",
    data() {
      return {
        addSpecVisible: false,
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        query: this.metaQuery(),
        codeBig: undefined,
        codeSmall: undefined,
        name:undefined,
        dos: undefined
      }
    },
    created() {
    },
    methods: {
      fillData(codeBig, codeSmall, name, dos) {
        this.codeBig = codeBig;
        this.codeSmall = codeSmall;
        this.name = name;
        this.dos = dos;
        this.visible = true;
        this.metaList();
      },

      addAlias() {
        let preCode = this.codeBig+""+this.codeSmall+""+this.name+""+this.dos;
        this.addSpecVisible = true;
        this.$nextTick(() => {
          this.$refs.AddSpec.fillData(preCode);
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
        querySpecificationList(this.resData, this.query, this.codeBig, this.codeSmall, this.name, this.dos).then(res => {
          this.resData = res.data;
          console.log(res.data)
        })
      },
      // 重置
      resetForm() {
        this.query = this.metaQuery ();
      },
      myCallBack(code, spec) {

        this.$emit('callBack', code, spec);
        this.visible = false;

      },
    }
  }
</script>
