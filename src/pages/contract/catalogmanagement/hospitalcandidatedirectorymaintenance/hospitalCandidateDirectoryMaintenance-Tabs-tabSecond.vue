<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <div class="tablebox">
      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" label-position="right" size="small">
          <el-row :gutter="24">
            <el-col :span="10" style="width: 700px;">
              <el-form-item >
                <template>
                  <el-input style="width: 200px;"
                            placeholder="品名"
                            v-model="input10"
                            clearable>
                  </el-input>
                </template>
                <template>
                  <el-input style="width: 200px;"
                            placeholder="基药标记"
                            v-model="input10"
                            clearable>
                  </el-input>
                </template>
                <template>
                  <el-input style="width: 200px;"
                            placeholder="生产企业"
                            v-model="input10"
                            clearable>
                  </el-input>
                </template>
              </el-form-item>

            </el-col>

            <el-col :span="6">
              <el-form-item>
                <el-button type="warning">查询</el-button>

              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 表格列表
       序号、通用名、产品名、商品名、剂型、规格、
       转换比、单位、包材、生产企业、总分、参考价、
       企业报价、议价价格、申报企业、目录范围、
       基药标记、议价状态、其他医院选择数量、议价开始时间、议价结束时间；
       -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          style="width: 100%"
          border
          stripe>
          <el-table-column label="序号" type="index">
            <el-checkbox v-model="checked">
            </el-checkbox>
          </el-table-column>
          <el-table-column label="通用名">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品名">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="剂型">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column >
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="转换比">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包材">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产企业">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总分">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价">
            <template slot-scope="企业报价">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价价格">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申报企业">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="目录范围">
          <template slot-scope="scope">
            <span>{{ scope.row.aa }}</span>
          </template>
        </el-table-column>
          <el-table-column label="基药标记">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价状态">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="其他医院选择数量">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价开始时间">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价结束时间">
            <template slot-scope="scope">
              <span>{{ scope.row.aa }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">删除</el-button>
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
  import {selectHospitalReportDrugList} from 'src/axios/contract/hospitalreportdrug/hospitalReportDrug'

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

      // 打开用户新增页面
      handleGoAdd () {
        this.resetForm()
        this.form = this.metaForm()
        this.showForm = true
        /*this.$refs['form'].resetFields()*/
        this.formStatus = 'add'
        this.rules = this.metaRules()
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
        selectTemplateTypeList(this.resData, this.query).then(res => {
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
