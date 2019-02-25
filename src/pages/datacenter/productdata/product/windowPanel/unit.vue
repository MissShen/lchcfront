<template>
  <el-dialog
    :title="'选择单位'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="query" ref="query"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
        <el-form-item>
          <el-select v-model="query.searchType" size="small">
            <el-option value="0" label="计量单位编码"></el-option>
            <el-option value="1" label="计量单位中文名称"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchText" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="list()" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
        </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        @sort-change="sortChangeFunc"
        border
        stripe>
        <el-table-column width="50" align="center">
          <template slot-scope="scope">
              <el-radio  v-model="radio" :label="scope.row.id" :value="scope.row"
                         :title="scope.row.id" @change="changeHandler(scope.row)">{{ null}}
              </el-radio>
          </template>
        </el-table-column>
        <el-table-column label="计量单位编码" prop="CODE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计量单位中文名称" prop="NAME_CHN" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="计量单位英文名称" prop="NAME_ENG" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.nameEng }}</span>
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
      <el-button size="small" type="primary" @click="buttonForm()">选择</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  // 引入用户相关请求
  import ElCol from "element-ui/packages/col/src/col";
  import {metricList} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import {keyBoardEnter} from "src/utils";
  export default {
    components: {ElCol},
    props: {
      selectedObj: {
        type: Object
      }
    },
    data() {
      return {
        visible: false,
        query: this.metaQuery(), // 查询初始化
        resData: this.metaData(),
        radio: undefined
      }
    },
    methods: {
      metaQuery () {
        return {
          searchType:'0',
          searchText:undefined,
          orderBy:undefined
        }},
      metaData () {
        return {
          // 前后台交互数据封装格式
            pageNum: 1,
            pageSize: 10,
            size: 10,
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
      //  排序查询
      sortChangeFunc(value){
        let sortType=" desc"
        if(value.order != null) {
          if (value.order.startsWith("asc")) {
            sortType = " asc";
          }
          this.query.orderBy = value.prop + sortType;
          this.list();
        }
      },
      //  回车查询
      searchEnterFun(e){
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      fillData(name) {
        this.query.searchText = name || undefined;
        this.query.searchType='1';
        this.visible = true;
        this.list ();
      },
      //  获取单位分页列表
      list () {
        metricList(this.query,this.resData).then(res => {
          this.resData = res.data;
         for(var i=0;i<this.resData.list.length;i++){
           if(this.radio==this.resData.list[i].id){
             this.selectedObj=this.resData.list[i];
           }
         }
        })
      },
      //  重置
      resetForm() {
        this.query = this.metaQuery();
        this.radio=undefined;
        this.selectedObj=undefined;
        this.list();
      },
      //  单选按钮控制
      changeHandler(value) {
        this.selectedObj = value;
      },
      //  重新选择单位
      buttonForm() {
        if (this.selectedObj == undefined) {
          this.$alert('请选择计量单位', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        }
        this.$confirm('确定将选择的产品设置为单位?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '重选',
          type: 'warning'
        }).then(() => {
          this.visible = false;
          this.$emit('newMetric', {value: this.selectedObj})
      })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      }
    }
  }
</script>

