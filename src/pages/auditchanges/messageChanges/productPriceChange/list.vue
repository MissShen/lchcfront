<template>
  <!-- 表格 -->
  <div class="tablebox">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="项目管理" name="first">
    <!-- 表格查询表单 -->
    <div class="table-form">
      <el-form ref="query" :model="query" label-position="right" size="small">
        <el-row :gutter="24">
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.requestCode" placeholder="申报号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.name" placeholder="产品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.doseage" placeholder="剂型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.spec" placeholder="规格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="query.manufacturename" placeholder="生产企业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-select v-model="query.status" placeholder="全部">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="warning" plain  @click="handQuery">查询</el-button>
              <el-button type="primary" plain plain @click="restQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-caption">
      <el-button type="primary" plain size="small" @click="">
        新增产品价格变更
      </el-button>
      <el-button type="primary" plain size="small" @click="">
        提交
      </el-button>
    </div>

    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="申报号">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="商品名">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="剂型">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="转换比">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="包材">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="生产企业">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="当前状态">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="审核结果">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>

  // 引入用户相关请求
   import {} from 'src/axios/auditchanges/messageChanges/price'
  export default {
    data () {
      return {
        rules: this.metaRules(),
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        // 当前状态(0.未提交，1.已提交，2.公示中，3.质疑中，4.澄清中，5.审核中，6.挂网中)
        options:[{
          value:'',
          label:'全部'
        },{
          value:'0',
          label:'未提交'
        },{
          value:'1',
          label:'提交'
        },{
          value:'2',
          label:'受理'
        },{
          value:'3',
          label:'公示'
        },{
          value:'4',
          label:'审核'
        },{
          value:'5',
          label:'确认'
        },{
          value:'6',
          label:'挂网'
        }]
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
            pageNum: 1,
            pageSize: 20,
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
            requestCode: undefined,
            name: undefined,
            doseage: undefined,
            spec: undefined,
            manufacturename: undefined,
            status:undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery () {
        this.showQuery = !this.showQuery
      },
      list () {

      },
      handQuery()
      {
        this.list();
      },
      // ************************
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