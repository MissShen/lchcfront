<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
             <el-form-item>
               <el-input size="small" v-model="query.productName" maxlength="200" placeholder="产品名称" @keyup.enter.native="searchEnterFun"></el-input>
             </el-form-item>
             <el-form-item>
                <el-select size="small" v-model="query.source" placeholder="来源">
                  <el-option
                    v-for="item in sources"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
             </el-form-item>
             <el-form-item>
                <el-select size="small" v-model="query.source" placeholder="目录范围">
                  <el-option
                    v-for="item in sources"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
             </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
              <el-button type="warning" size="small">重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe>
          <el-table-column label="来源" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通用名" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.receivers }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药品信息" width="200" prop="drugDetail">
            <template slot-scope="scope">
              <div :title="scope.row.productName +'('+ scope.row.tradeName +')'" class="ellipsis es300">
                {{ scope.row.productName }}（{{ scope.row.tradeName }}）
              </div>
              <div :title="scope.row.spec+'×'+scope.row.standRate +  scope.row.smallestUnits+'/'+scope.row.specUnit +'('+scope.row.wrapName+')('+scope.row.doseageFormName+')'" class="drugCon ellipsis es300">
                <!--规格×单位转换比 最小使用单位/最小包装单位 (包装材质)(剂型)-->
                规格包装：{{ scope.row.spec}} × {{ scope.row.standRate}} {{ scope.row.smallestUnits}} / {{scope.row.specUnit}} ({{scope.row.wrapName}}) ({{ scope.row.doseageFormName }})
              </div>
              <!--<p>
                中大包装：{{ scope.row.middleStandRate}}/{{ scope.row.bigMiddleRate}}
              </p>-->
              <div :title="scope.row.manufactureName" class="drugCon ellipsis es300">生产企业：{{ scope.row.manufactureName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="申报企业" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="目录范围" width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低价" align="right" header-align="left" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" align="right" header-align="left" width="80">
            <template slot-scope="scope">
              <span>{{ priceFormat(scope.row.bidPrice) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="报价状态" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价开始" width="120" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="议价结束" width="120" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
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
  import {queryHospitalAddressList, deleteHospitalAddress} from 'src/axios/contract/datamanagement/hospitalAddress'
  import {priceFormat} from "src/utils"
  import { keyBoardEnter } from "src/utils"

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
        },
        checked: true
      }
    },
    created () {
      this.list()
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      priceFormat,
      metaData () {
        return {
            pageNum: 1,
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
            list: [],
            sources : [{
              label : '全部',
              value : ''
            },{
              label : 'source1',
              value : '1'
            },{
              label : 'source2',
              value : '2'
            }]
        }
      },
      metaQuery () { // 表单查询数据初始化
        return {
          query: {
            productName : undefined,
            source : undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        queryHospitalAddressList(this.resData, this.query).then(res => {
          console.log(res)
          this.resData = res.data
          if(this.resData.pageNum === 0){
            this.resData.pageNum =1;
          }
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
      },
      handleGoAdd (id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
      },
      deleteAddress(id) {
        this.$confirm(`您删除收货地址的同时，之前的产品配送关系可能失效，是否确认删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHospitalAddress(id).then(res => {
            this.$message({
              message: res.data,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.list();
              }
            })
          })
        })
      },
      updateAddress(id) {
        this.$router.push("/contract/datamanagement/hospitalDeliveryAddress/" + id);
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.list();
        })
      },
    }
  }
</script>

