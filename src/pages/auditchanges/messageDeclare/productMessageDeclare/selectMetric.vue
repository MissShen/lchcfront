<template>
  <el-dialog
    custom-class="w80"
    title="选择单位"
    :close-on-click-modal="false"
    :visible.sync="visible"
    append-to-body
  >
    <div v-if="visible">
    <div>
      <!-- 表格查询表单 -->
        <el-form :model="query" size="small"  :inline="true" class="table-form demo-form-inline">
            <el-form-item>
                  <el-input v-model="query.name" placeholder="单位名称" size="small"></el-input>
              </el-form-item>
            <el-form-item>
                <el-button type="success" @click="handleQuery" size="small">查询</el-button>
                <el-button type="warning" @click="restQuery" size="small">重置</el-button>
              </el-form-item>
        </el-form>
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
        >
          <el-table-column label="单位名称">
            <template slot-scope="scope">
              <span>{{ scope.row.NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <div class="operates">
                <span>
                  <a class="operation-btn" @click="selectMetric(scope.row.ID,scope.row.NAME)">选择</a>
                </span>
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
    </div>
    <span slot="footer">
      <el-button @click="visible = false" size="small">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {selectMetric} from 'src/axios/auditchanges/messageDeclare/product'
  export default {
    data () {
      return {
        visible:false,
        resData: this.metaData(),
        query:this.metaQuery()
      }
    },
    created () {
      this.resData.pageSize = 10;
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData () {
        return {
          resData: { // 前后台交互数据封装格式
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
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            name:''
          }
        }
      },
      //  获取用户分页列表
      list () {
        this.visible=true;
        //获取药品列表
        selectMetric(this.resData,this.query).then(res => {
          this.resData = res.data
        })
      },
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.list()
      },

      handleQuery(){
        this.list()
      },
      restQuery(){//重置
        this.query=this.metaQuery();this.list();
      },
      selectMetric(id,name){
        this.visible=false;
        this.$nextTick(() => {
//          this.$refs.checkProduct.getDrug(id,name);
          this.$emit("selectMetric",{"0":id,"1":name})
        })
      }
    }
  }
</script>

