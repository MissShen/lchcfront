<template>
  <el-dialog
    :title="'选择关联剂型'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="search" ref="search"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
          <el-form-item>
            <el-input v-model="search.searchText" placeholder="通用名或编码" @keyup.enter.native="searchEnterFun" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        :row-key="getRowkeys"
        @selection-change="handleSelectionChange"
        border
        stripe>
        <el-table-column type="selection" :reserve-selection="true" align="center" width="50"></el-table-column>
        <el-table-column label="剂型编码">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
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
    </div>

    <span slot="footer">
      <el-button size="small" type="primary" @click="choiceData()">保存</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {getDoseages} from 'src/axios/datacenter/basedata/catatccategory/catatclist';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "drugs-doseage",
    data() {
      return {
        choiceList:[],
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        choiceList:[],
        search:{
          searchType:'',
          searchText:''
        }
      }
    },
    created() {
    },
    methods: {
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
      metaRule() {
        return {
          menuName: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '菜单名称长度大于1小于10', trigger: 'blur'}
          ],
          shortcutMenuName: [
            {required: true, message: '菜单名称简写不能为空', trigger: 'blur'},
          ],
          menuUrl: [
            {required: true, message: '菜单路径不能为空', trigger: 'blur'},
          ],
        }
      },
      getRowkeys(row){
        return row.code;
      },
      choiceData(){
        this.visible = false
        this.$emit('saveDoseageIds',this.choiceList)

      },
      metaList() {
        this.search.searchType = '4';
        getDoseages(this.search, this.resData).then(res => {
          this.resData = res.data
        })
      },
      fillData(id) {
        this.dataForm.id = id || undefined
        this.visible = true
        this.metaList();
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id ? menuLevelTwoUpdate(this.dataForm) : menuLevelTwoSave(this.dataForm)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshData');
                }
              })
            })
          }
        })
      },
      metaData () {
        return {
            pageNum: 1,
            pageSize: 10,
            size: undefined,
            startRow: undefined,
            endRow: undefined,
            total: undefined,
            pages: undefined,
            prePage: undefined,
            nextPage: undefined,
            isFirstPage: true,
            isLastPage: undefined,
            hasPreviousPage: undefined,
            hasNextPage: undefined,
            navigatePages: undefined,
            navigatepageNums: undefined,
            navigateFirstPage: undefined,
            navigateLastPage: undefined,
            firstPage: undefined,
            lastPage: undefined,
            list: undefined
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            id: undefined,
            code: undefined,
            name: undefined,
            beginDate: undefined,
            endDate: undefined
          }
        }
      },
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.metaList();
        })
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
        this.choiceList=val
      }
    }
  }
</script>
