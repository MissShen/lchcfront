<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">
      <!-- 表格查询表单 -->
        <el-form ref="query" :model="query" size="small" :inline="true" class="table-form">
            <el-form-item>
              <el-input size="small" v-model="query.productName" maxlength="200" placeholder="产品名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="query.assertState" placeholder="确认状态">
                <el-option
                  v-for="item in assertStates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="query.forbidden" placeholder="是否禁用">
                <el-option
                  v-for="item in forbiddens"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="success" @click="list()">查询</el-button>
              <el-button size="small" type="warning" >重置</el-button>
            </el-form-item>
        </el-form>

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          :default-sort = "{prop: '通用名',prop: '申报企业',prop: '两票制',prop: '最低价',
          prop: '企业报价',prop: '执行时间',prop: '确认状态'}"
          border
          stripe>
          <el-table-column label="序号" width="50"  :show-overflow-tooltip="true" align="center" header-align="left">
            <template slot-scope="scope">
              <span> {{(resData.pageNum - 1) * resData.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="通用名" prop="通用名" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.buyerName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="药品信息" prop="drugDetail">
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
          <el-table-column label="申报企业" prop="申报企业" sortable width="120" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="两票制" width="120" prop="两票制" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.twoVoteCou <= 0" style="color:red">未签订</span>
              <span v-if="scope.row.twoVoteCou > 0">已签订</span>
            </template>
          </el-table-column>
          <el-table-column label="最低价" prop="最低价" sortable align="right" header-align="left" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业报价" prop="企业报价" sortable align="right" header-align="left" width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="执行时间" prop="执行时间" sortable width="90" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.defaultFlag == '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="确认状态" prop="确认状态" sortable width="90" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.defaultFlag == '1'" class="font-red">{{ scope.row.defaultFlag == '1' ? '已确认' : '未确认' }}</span>
              <span v-else>{{ scope.row.defaultFlag == '1' ? '已确认' : '未确认' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <a class="operation-btn" type="text" size="small" v-if="scope.row.defaultFlag == '0'">确认加入采购目录</a>
              <span v-if="scope.row.defaultFlag == '1'">已加入采购目录</span>
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
        checked: true,
        assertStates : [
          {
            label : '已确认',
            value : '1'
          },{
            label : '未确认',
            value : '0'
          }
        ],
        forbiddens : [
          {
            label : '是',
            value : '1'
          },{
            label : '否',
            value : '0'
          }
        ]
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
            productName : undefined,
            source : undefined,
            hospitalName : undefined,
            assertState : undefined,
            forbidden : undefined
          }
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list () {
        queryHospitalAddressList(this.resData, this.query).then(res => {
          console.log(res)
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
      }
    }
  }
</script>
