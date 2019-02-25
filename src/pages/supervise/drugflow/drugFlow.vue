<template>
  <div class="mainbox">
    <ul>
      <!--药品流向查询框-->
      <div>
        <h3 class="area-title">查询药品流向</h3>
        <div class="s-search">
          <div class="search-inner">
            <el-autocomplete
              class="drug-search"
              v-model="productName"
              :fetch-suggestions="querySearch"
              placeholder="输入查询药品名称"
              @select="handleSelect"
              @focus="handleFocus"
            >
              <el-button slot="append" icon="el-icon-search" @click="metaList"></el-button>
            </el-autocomplete>
          </div>
        </div>
      </div>
      <!--药品流向表格-->
      <div class="infobox smaller">
        <div class="tableset">
          <el-table
            :data="resData.list"
            :show-header="headVisable"
            style="width: 100%">
            <el-table-column prop="drugStorage" label="产品信息">
              <template slot-scope="scope">
                <!--<a class="dflink">有关<span>{{scope.row.title}}</span>信息：</a>-->
                <div class="s-result">
                  <router-link :to="{path:'superviseDrugInfo/',query:{id:scope.row.productId}}">
                    有关<span class="s-hightline">{{scope.row.productName}}</span>信息：
                  </router-link>
                  <ul>
                    <li>通用名：{{scope.row.tradeName}}</li>
                    <li>剂型：{{scope.row.doseageFormName}}</li>
                    <li>规格：{{scope.row.spec}}</li>
                    <li>转换比：{{scope.row.standRate}}</li>
                    <li>生产企业：{{scope.row.manufactureName}}</li>
                  </ul>
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
      </div>
    </ul>
  </div>
</template>
<script>

  import {findByProductName, findProductNamesByProductName} from 'src/axios/supervise/drug-flow/drugFlow'

  export default {
    name: "drug-flow",
    data() {
      return {
        resProductNames: [],
        productName: '',
        headVisable: false,
        tableData: [{}],
        resData: this.metaData(),
        queryData: this.metaQuery(),
      }
    },
    methods: {
      metaData() {
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          name: undefined,
          code: undefined
        }
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.metaList()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.metaList()
      },
      metaList() {
        findByProductName(this.productName).then((res) => {
          this.resData = res.data
        })
      },
      //提示框
      querySearch(queryString, cb) {
        findProductNamesByProductName(this.productName).then((res) => {
          this.resProductNames = [];
          for (let i of res.data) {
            this.resProductNames.push({
              "value": i
            })
          }
          cb(this.resProductNames)
        })
        /*var resProductNames = this.resProductNames;
        var results = queryString ? resProductNames.filter(this.createFilter(queryString)) : resProductNames;
        // 调用 callback 返回建议列表的数据
        cb(results);*/
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleFocus(){
        let suggestionNode = document.getElementsByClassName('el-autocomplete-suggestion')[0];
        suggestionNode.setAttribute('id','drugSuggestion')
      }
    }
  }
</script>

<style>
  #drugSuggestion .el-autocomplete-suggestion__wrap {
    background-color: #072d70;
    border: none;
    color: #fff;
  }
  #drugSuggestion .el-scrollbar {
    border: solid 1px #2456a9;
  }
  #drugSuggestion.el-popper[x-placement^=bottom] .popper__arrow::after {
    border-bottom-color: #072D70;
  }
  #drugSuggestion.el-autocomplete-suggestion li.highlighted,
  #drugSuggestion.el-autocomplete-suggestion li:hover {
    background-color: rgba(255,255,255,.2) !important;
  }
</style>
