<template>
  <dl class="mainbox">
    <dd>
      <div class="s-form">
          <el-form :inline="true" :model="queryData" ref="queryData">
            <el-input v-model="queryData.orgName" placeholder="医院名称"></el-input>
            <el-select v-model="queryData.areaId" placeholder="医院区域" class="width-120">
              <el-option></el-option>
              <el-option v-for="item in areaArr.list"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="queryData.level" placeholder="医院等级" class="width-120">
              <el-option
                v-for="item in levelArr"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeName">
              </el-option>
            </el-select>
            <el-select v-model="queryData.nature" placeholder="医院性质" class="width-120">
              <el-option
                v-for="item in natureArr"
                :key="item.label"
                :label="item.value"
                :value="item.label">
              </el-option>
            </el-select>
            <el-button @click="handleQuery()">查询</el-button>
            <el-button type="warning" @click="queryData =metaQuery()" size="small">重置</el-button>
          </el-form>
        </div>
      <div class="tableset">
        <el-table :data="resData.list" stripe border tooltip-effect="dark">
          <el-table-column prop="hospitalName" label="医院名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hospitalNameShort" label="医院简称" width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="hospitalArea" label="区县名称" width="160"></el-table-column>
          <el-table-column prop="hospitalLevel" label="医院级别" width="120" align="center"></el-table-column>
          <el-table-column prop="hospitalNature" label="医院性质" width="120" align="center"></el-table-column>
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
              <el-input v-model="queryData.productName" placeholder="产品名称/药品名称"></el-input>
              <el-input v-model="queryData.drugForm" placeholder="剂型"></el-input>
              <el-input v-model="queryData.pesc" placeholder="规格"></el-input>
              <el-input v-model="queryData.productionOrg" placeholder="生产企业"></el-input>
              <el-button @click="selectProducts()" size="small">查询</el-button>
              <el-button @click="queryData =metaQuery()" size="small">重置</el-button>
            </el-form>
          </div>
          <el-table :data="resDescData.list" stripe border tooltip-effect="dark">
            <el-table-column property="proName" label="产品名称" show-overflow-tooltip ></el-table-column>
            <el-table-column property="drugsName" label="药品名称" show-overflow-tooltip></el-table-column>
            <el-table-column property="drugForm" label="剂型" width="100" show-overflow-tooltip ></el-table-column>
            <el-table-column property="proPesc" label="规格" width="100" show-overflow-tooltip ></el-table-column>
            <el-table-column property="proUnit" label="单位" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column property="proConversionRatio" label="转换比" width="100" align="right"></el-table-column>
            <el-table-column property="winPrice" label="中标价" width="100" align="right"></el-table-column>
            <el-table-column property="minPrice" label="最低价格" width="100" align="right"></el-table-column>
            <el-table-column property="belongedCatelog" label="所属目录" width="100" show-overflow-tooltip ></el-table-column>
            <el-table-column property="productionOrgName" label="生产企业" show-overflow-tooltip ></el-table-column>
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
  </dl>
</template>
<script>
  import {queryCityArea,queryPurchaseRecord,queryProduct} from 'src/axios/supervise/notice/notice'

  export default {
    name: 'manufacturingEnterprise',
    data() {
      return {
        orgId:'',
        dialogTableVisible: false,
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        resDescData:this.metaDescData(),
        queryDescData:this.metaDescQuery(),
        natureArr:[
          {
            label:'',
            value:''
          },
          {
            label:'0',
            value:'公立'
          },{
            label:'1',
            value:'私立'
          }],
        levelArr: [
          {
            typeId: '',
            typeName:''
          },
          {
            typeId: '1',
            typeName:'三级医院'
          },{
            typeId: '2',
            typeName:'二级医院'
          },{
            typeId: '3',
            typeName:'一级医院'
          }, {
            typeId: '4',
            typeName: '社区'
          },{
            typeId: '5',
            typeName: '其他'
          }],
        areaArr:{
          list: []
        },
      }
    },
    mounted() {
      this.queryCityArea();
      this.initTableData()
    },
    methods: {
      queryCityArea(){
        queryCityArea(this.areaArr, this.queryDate).then(res => {
          this.areaArr;
          this.areaArr=res.data;
        })
      },
      metaQuery() { // 查询数据封装格式
        return {
          id:'',
          orgName:'',
          level:'',
          areaId:'',
          nature:'',
          productionOrg:'',
          pesc:'',
          drugForm:'',
          productName:''
        }
      },
      selectProducts(){
        this.selectProduct(this.orgId);
      },
      selectProduct(id){
        this.orgId=id;
        this.queryData.id=id;
        queryProduct(this.resDescData, this.queryData).then(response => {
          this.dialogTableVisible=true;
          this.resDescData = response.data;
          0 === this.resDescData.pageNum ? this.resDescData.pageNum = 1 : null;
        });
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
      metaDescQuery(){
        return{
          id:'',
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
      handleClose(){
        this.dialogTableVisible = false;
        this.resDescData = {};
      }
    }
  }
</script>
