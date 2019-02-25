<template>
  <el-dialog
    :title="'选择生产企业'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="query"  ref="query"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
        <el-form-item>
          <el-select v-model="query.searchType" size="small">
            <el-option value="1" label="企业名称"></el-option>
            <el-option value="2" label="企业编号"></el-option>
            <el-option value="3" label="企业ID"></el-option>
            <el-option value="4" label="注册地址"></el-option>
            <el-option value="5" label="许可证号"></el-option>
            <el-option value="6" label="所在省市"></el-option>
            <el-option value="7" label="GSP证书号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchText" @keyup.enter.native="searchEnterFun" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
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
        <el-table-column label="企业编码" prop="factory_code" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript:;">{{ scope.row.code}}</a>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" prop="factory_name" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
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
  //  引入用户请求
  import ElCol from "element-ui/packages/col/src/col";
  import {manufacturyList} from 'src/axios/datacenter/productdata/productinfo/productinfo';
  import {keyBoardEnter} from "src/utils";
  export default {
    components: {ElCol},
    name: "produOrg",
    props: {
      selectedObj: {
        type: Object
      }
    },
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        query: this.metaQuery(),
        radio: undefined
      }
    },
    methods: {
      metaData () {
        return {
          // 前后台交互数据封装格式
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
      metaQuery () {
        return {
          // 表单查询数据初始化
          searchType: '1',
          searchText: undefined,
          orderBy:undefined
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
        keyBoardEnter(e, () =>{
          this.list();
        })
      },
      fillData(name) {
        this.query.searchText = name || undefined;
        this.query.searchType='1';
        this.visible = true;
        this.list();
      },
      //  重置
      resetForm() {
        this.query = this.metaQuery();
        this.selectedObj = undefined;
        this.radio = undefined;
        this.list();
      },
      //  获取用户分页列表
      list() {
        manufacturyList(this.query,this.resData).then(res => {
          this.resData = res.data
          for(var i=0;i<this.resData.list.length;i++){
            if(this.radio == this.resData.list[i].id){
              this.selectedObj = this.resData.list[i];
            }
          }
      })
      },
      //  单选按钮控制
      changeHandler(value) {
        this.selectedObj = value;
      },
      //  重新选择生产企业
      buttonForm() {
        if (this.selectedObj == undefined) {
          this.$alert('请选择生产企业', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
          return false
        }
        this.$confirm('确定将选择的产品设置生产企业为?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '重选',
          type: 'warning'
        }).then(() => {
          this.visible = false;
        this.$emit('newProduct', {value: this.selectedObj})
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
