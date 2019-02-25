<template>
  <el-dialog
    :title="'选择'+dataForm.level+'级分类'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">

    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column label="ATC编码" width="140">
          <template slot-scope="scope">
            <a href="javascript:;">{{ scope.row.code }}</a>
          </template>
        </el-table-column>
        <el-table-column label="中文名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="英文名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameEng }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
              <span>
                <a class="operation-btn" href="javascript:void(0)" @click="choiceData(scope.row.id,scope.row.nameChn,scope.row.code)">选择</a>
              </span>
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

    <span slot="footer">
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {catCategoryList} from 'src/axios/datacenter/basedata/catatccategory/catatclist';

  export default {
    components: {ElCol},
    name: "divide-drugs",
    props: {
      level:'',
      sort:''
    },
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        searchCategory:{
          parentId:'',
          hierarchy:''
        },
      }
    },
    created() {

    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          sort:undefined,
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

        }
      },
      choiceData(id,name,code){
        this.$emit('saveChoiceData',id,name,code)
        this.visible = false;
      },
      metaList() {
        if(this.level == '一'){
          this.searchCategory.hierarchy = '1';
          this.searchCategory.parentId = '';
          catCategoryList(this.searchCategory, this.resData).then(res => {
            this.resData = res.data
          })
        }
        if(this.level == '二'){
          this.searchCategory.hierarchy = '2';
          this.searchCategory.parentId = this.sort;
          catCategoryList(this.searchCategory, this.resData).then(res => {
            this.resData = res.data
          })
        }
        if(this.level == '三'){
          this.searchCategory.hierarchy = '3';
          this.searchCategory.parentId = this.sort;
          catCategoryList(this.searchCategory, this.resData).then(res => {
            this.resData = res.data
          })
        }
        if(this.level == '四'){
          this.searchCategory.hierarchy = '4';
          this.searchCategory.parentId = this.sort;
          catCategoryList(this.searchCategory, this.resData).then(res => {
            this.resData = res.data
          })
        }
      },
      fillData(level) {
        this.dataForm.level = level || undefined
        this.visible = true
        this.metaList();
      },
      dataFormSubmit() {

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
          query: {
            id: undefined,
            code: undefined,
            name: undefined,
            beginDate: undefined,
            endDate: undefined
          }
        }
      },
      //  获取用户分页列表
      list () {
        userList(this.resData, this.query).then(res => {
          this.resData = res.data
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.metaList();
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.metaList();
      }
    }
  }
</script>
