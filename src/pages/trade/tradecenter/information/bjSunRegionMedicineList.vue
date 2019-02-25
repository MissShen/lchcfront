<template>
  <div>
    <!-- ========================== 北京市阳光采购目录 ========================= -->
    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <div class="formrow">
            <span>
                <el-select v-model="query.resState" @keyup.enter.native="searchEnterFun"  placeholder="目录" size="small">
                  <el-option label="候选目录内" value="1"></el-option>
                  <el-option label="候选目录外" value="0"></el-option>
                </el-select>
             </span>
            <span>
<!--	中药国家谈判药品目录
	1000	中药低价药品目录
	1090	西药国家谈判药品目录
	1020	短缺药品目录
	1060	西药竞价谈判目录
	1082	中药竞价谈判目录
	1040	西药低价药品目录
-->
                <el-select v-model="query.catalogState" @keyup.enter.native="searchEnterFun"  placeholder="目录范围" size="small">
                  <el-option
                    v-for="item in pullDownList"
                    :key="item.CATALOG_ID"
                    :label="item.CATALOG_DESC"
                    :value="item.CATALOG_ID">
                    </el-option>
                </el-select>
              </span>
            <span>
                <el-select v-model="query.basicFlag" @keyup.enter.native="searchEnterFun"  placeholder="是否基药" size="small">
                  <el-option label="是" value="1"></el-option><!--0，非基药；1，国家基药；2，北京增补三种，，，0否 1是   -->
                  <el-option label="否" value="0"></el-option>
                </el-select>
             </span>
            <span>
                <el-input v-model="query.productName" @keyup.enter.native="searchEnterFun"  placeholder="品名" size="small"></el-input>
             </span>
            <span>
                <el-input v-model="query.manufactureName" @keyup.enter.native="searchEnterFun"  placeholder="生产企业" size="small"></el-input>
              </span>
            <span>
                <el-button type="warning" size="small" @click="searchEnterFun">查询</el-button>
              </span>
          </div>
        </el-form>
      </div>
      <div class="table-caption">
        <el-button size="small">
          加入区目录
        </el-button>
      </div>
      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list" @selection-change="handleSelectionChange"
          border
          stripe>
          <el-table-column type="selection" width="55"></el-table-column>
        <!--  <el-table-column type="index" width="50" label="序号"></el-table-column>-->
          <el-table-column label="产品名称">
            <template slot-scope="scope">
              {{ scope.row.productName }}
            </template>
          </el-table-column>
          <el-table-column label="商品名">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格包装">
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}× {{ scope.row.standRate }}{{ scope.row.smallestUnits }} / {{ scope.row.specUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="中大包装">
            <template slot-scope="scope">
              {{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
            </template>
          </el-table-column>
          <el-table-column label="生产企业">
            <template slot-scope="scope">
              <span>{{ scope.row.manufactureName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" align="right">
            <template slot-scope="scope">
              {{ priceFormat(scope.row.bidPrice) }}
            </template>
          </el-table-column>
          <el-table-column label="全国最低价" align="right">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.minPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否基药">
            <template slot-scope="scope">
              {{ scope.row.basicFlag }}
            </template>
          </el-table-column>
          <el-table-column label="目录">
            <template slot-scope="scope">
              <span>{{ scope.row.resState }}</span>
            </template>
          </el-table-column>
          <el-table-column label="目录范围">
            <template slot-scope="scope">
              {{ scope.row.catalogArea }}
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
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求
  import {selectAll,selectSysCatalog} from 'src/axios/trade/information/catalogue'
  import {priceFormat,keyBoardEnter} from "src/utils";

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        pullDownList: this.restPullDownList,
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false // 表单查询初始化
      }
    },
    created () {
      this.list()
    },
    methods: {
      priceFormat,
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          multipleSelection: [],
          resData: { // 前后台交互数据封装格式
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
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
            catalogState:'',
            resState: '',
            catalogArea: '',
            productName: '',
            manufactureName: '',
            basicFlag: ''
        }
      },
      restPullDownList () {
        return {
            CATALOG_ID: '',
            CATALOG_DESC: ''
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e,() =>{
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        selectAll(this.resData, this.query).then(res => {
          this.resData = res.data;
          if(this.resData.pageNum === 0 ){
            this.resData.pageNum = 1
          }
        });
        selectSysCatalog(this.resData, this.query).then(res => {
          this.pullDownList = res.data;
        })
      },
      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.reportList()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.reportList()
      }
    }
  }
</script>

