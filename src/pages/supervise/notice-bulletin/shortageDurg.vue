<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form">
        <el-form :inline="true" :model="queryData" ref="queryData">
          <el-input v-model="queryData.orgName" placeholder="期望名称"></el-input>
          <el-button @click="handleQuery()">查询</el-button>
          <el-button type="warning" @click="queryData =metaQuery()" size="small">重置</el-button>
          <el-button size="small">导出</el-button>
        </el-form>
      </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="hospitalName" label="期望名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hospitalNameShort" label="医院数量" width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hospitalArea" label="品规数量" width="160"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div class="operates">
                <a href="javascript:" @click="selectProduct(scope.row.hospitalId)">查看产品</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="resData.total"
          :page-size="resData.pageSize"
          :page-count="resData.pages"
          :current-page.sync="resData.pageNum">
        </el-pagination>
      </div>
    </dd>

    <el-dialog title="查看产品" :visible.sync="dialogTableVisible" width="80%" @close="handleClose">
      <div class="tableset">
        <template>
          <div class="s-form">
            <el-form :inline="true" :model="queryData" ref="queryData">
              <el-input v-model="queryData.productName" placeholder="产品名称"></el-input>
              <el-input v-model="queryData.drugForm" placeholder="剂型名称"></el-input>
              <el-input v-model="queryData.pesc" placeholder="规格包装"></el-input>
              <el-input v-model="queryData.productionOrg" placeholder="生产企业"></el-input>
              <el-select placeholder="短缺类型" class="width-150">
                <el-option v-for="item in selectOption.shortageType" :key="item.code" :label="item.name"
                           :value="item.code"></el-option>
              </el-select>
              <el-select placeholder="是否使用可替代" class="width-150">
                <el-option v-for="item in selectOption.isReplace" :key="item.code" :label="item.name"
                           :value="item.code"></el-option>
              </el-select>
              <el-button @click="selectProducts()" size="small">查询</el-button>
              <el-button @click="queryData =metaQuery()" size="small">重置</el-button>
            </el-form>
          </div>
          <el-table :data="resDescData.list" stripe border tooltip-effect="dark">
            <el-table-column property="proName" label="批准文号" show-overflow-tooltip></el-table-column>
            <el-table-column property="proName" label="产品名称" show-overflow-tooltip></el-table-column>
            <el-table-column property="drugForm" label="剂型" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column property="proPesc" label="规格" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="drugStorage" label="产品信息" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="ellipsis es300 ">
                  {{ scope.row.proPesc}}
                </div>
                <div :title="scope.row.productionOrgName" class="ellipsis es200"
                     v-if="scope.row.productionOrgName!=''">{{ scope.row.productionOrgName}}
                </div>
              </template>
            </el-table-column>
            <el-table-column property="proUnit" label="上报机构数" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="operates">
                  <a href="javascript:" @click="selectOrg(scope.row.hospitalId)">查看机构</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagebox">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[10, 20, 30]"
              @size-change="handleDescSizeChange"
              @current-change="handleDescCurrentChange"
              :total="resDescData.total"
              :page-size="resDescData.pageSize"
              :page-count="resDescData.pages"
              :current-page.sync="resDescData.pageNum">
            </el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>
    <shortage-drug-product-org ref="shortageDrugProductOrg"></shortage-drug-product-org>
  </dl>
</template>

<script>

  import {queryPurchaseRecord, queryProduct} from 'src/axios/supervise/notice/notice'
  import shortageDrugProductOrg from './shortageDrugProductOrg'

  export default {
    components: {
      shortageDrugProductOrg
    },
    name: "shortage-durg",
    data() {
      return {
        orgId: '',
        selectOption: {
          shortageType: [
            {name: "缺货", code: "缺货"},
            {name: "供应不足或不及时", code: "供应不足或不及时"},
          ],
          isReplace: [
            {name: "无替代", code: "无替代"},
            {name: "同通用名药品替代", code: "同通用名药品替代"},
            {name: "异通用名药品替代", code: "异通用名药品替代"},
          ],
        },
        dialogTableVisible: false,
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        resDescData: this.metaDescData(),
        queryDescData: this.metaDescQuery(),
      }
    },
    mounted() {
      this.initTableData()
    },
    methods: {
      metaQuery() { // 查询数据封装格式
        return {
          id: '',
          orgName: '',
          level: '',
          areaId: '',
          nature: '',
          productionOrg: '',
          pesc: '',
          drugForm: '',
          productName: ''
        }
      },
      selectProducts() {
        this.selectProduct(this.orgId);
      },
      selectProduct(id) {
        this.orgId = id;
        this.queryData.id = id;
        queryProduct(this.resDescData, this.queryData).then(response => {
          this.dialogTableVisible = true;
          this.resDescData = response.data;
          0 === this.resDescData.pageNum ? this.resDescData.pageNum = 1 : null;
        });
      },
      selectOrg() {
        this.$nextTick(() => {
          this.$refs.shortageDrugProductOrg.fillData()
        })
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      metaDescQuery() {
        return {
          id: '',
        }
      },
      metaDescData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 10,
          pages: 1,
          list: []
        }
      },
      initTableData() {
        queryPurchaseRecord(this.resData, this.queryData).then(response => {
          this.resData = response.data;
          0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
        })
      },
      handleQuery() {
        this.resData = this.metaData();
        this.initTableData();
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.initTableData()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.initTableData()
      },
      handleDescSizeChange(val) {
        this.resDescData.pageSize = val;
        this.selectProduct(this.queryDescData.id)
      },
      handleDescCurrentChange(val) {
        this.resDescData.pageNum = val;
        this.selectProduct(this.queryDescData.id)
      },
      handleClose() {
        this.dialogTableVisible = false;
        this.resDescData = {};
      }
    }
  }
</script>

<style scoped>

</style>
