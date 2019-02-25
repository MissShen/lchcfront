<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <el-row :gutter="24">
            <el-col :span="1" style="width: 900px;">
              <el-form-item>
                <span>
                  <el-input v-model="input" placeholder="品名" style="width: 170px;"></el-input>
                </span>

                <span>
                  <el-input v-model="input" placeholder="生产企业" style="width: 170px;"></el-input>
                </span>
                <span>
                  <el-input v-model="input" placeholder="剂型" style="width: 170px;"></el-input>
                </span>
                <span>
                  <el-input v-model="input" placeholder="规格" style="width: 170px;"></el-input>
                </span>
                <template>
                  <el-select v-model="value" placeholder="全部" style="width: 170px;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>

            </el-col>

            <el-col :span="2" >
              <el-form-item>
                <el-button type="warning">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col  :span="2" >
              <el-form-item>
                <el-button plain>重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>


      <!-- 表格列表 -->
      <div class="tableset">
        <el-button type="primary" size="middle">加入采购目录</el-button>
        <el-table style="padding-top: 10px;"
          :data="resData.list"
          border
          stripe>
          <!--序号、通用名、产品名、商品名、剂型、规格、转换比、单位、包材、生产企业、总分、参考价、企业报价、历史采购量、基药标记、可配送企业数量-->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column label="通用名">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总分">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="历史采购量">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="基药标记">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="可配送企业数量">
            <template slot-scope="scope">
              <span>{{ scope.row.aaa }}</span>
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

  // 引入用户相关请求  引自js文件

  export default {
    data () {
      return {
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
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
            searchRuleName: undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        selectSysRuleList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
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

