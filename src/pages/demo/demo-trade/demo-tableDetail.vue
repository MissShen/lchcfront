<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">本院购物车</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small" :inline="true">
          <el-form-item>
            <el-input v-model="query.name" placeholder="品名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.specification" placeholder="规格"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="query.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="warning">查询</el-button>
            <el-button type="primary">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table-caption">
          <el-button type="primary" size="small">
            增加药品
          </el-button>
          <el-button type="primary" size="small">
            删除药品
          </el-button>
          <el-button type="primary" size="small">
            设置急需
          </el-button>
          <el-button type="primary" size="small">
            取消急需
          </el-button>
      </div>
      <template>

        <el-table ref="multipleTable" :data="tableData"
                  style="width: 100%"
                  @select="handleSelect"
                  @cell-click="handleCell"
                  border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="药品信息" width="300" prop="drugDetail">
          <template slot-scope="scope" class="drugMessage">
            <p>{{ scope.row.drugDetail }}</p>
            <p class="drugCon">{{ scope.row.drugContent}}</p>
          </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="药库"></el-table-column>
          <el-table-column prop="price" label="价格" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterprise" label="配送企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择" size="small">
                <el-option v-for="item in scope.row.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="num1" label="数量" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.num1" :min="10" :step="10"
                               @change="handleChange" @blur="amountStatistics" ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span @click="dataBackFillGoods" v-if="scope.row.id !=cellIndex">{{ scope.row.remark }}</span>
              <span><el-input v-model="scope.row.remark"
                              v-if="scope.row.id===cellIndex"
                              @blur="handleCellSubmit(scope.row)"
              ></el-input></span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a class="operation-btn" @click="handleButtonView">备货</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="pagebox">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          :page-size="paginations.pageSize"
          :total="paginations.total"
          :page-count="paginations.pages"
          :current-page="paginations.pageNum">
        </el-pagination>
      </div>
      <div class="sign">
        <span class="text">标记说明：</span>
        <span class="icon-sign sign-district">区</span>
        <span class="text">区目录药品</span>
        <span class="icon-sign sign-basic">基</span>
        <span class="text">基本药物目录</span>
        <span class="icon-sign icon-jixu"></span>
        <span class="text">急需商品</span>
      </div>
    </div>
    <div class="fixed-toolbar">
      <div class="box">
        <div class="amount">
          共<span class="red">1</span>款药品
        </div>
        <div class="amount">
          总价:<span class="red">￥220</span>
        </div>
        <div class="btn-pitchon">代替下级创建采购单</div>
        <div class="btn-purchase">创建采购单</div>
      </div>
    </div>
    <demo-table-stock-up-from v-if="stockUpFrom" ref="demoTableStockUpFrom"></demo-table-stock-up-from>
  </div>

</template>
<script>
  import demoTableStockUpFrom from './demo-tableStockUpFrom.vue'
  export default {
    components: {
      demoTableStockUpFrom
    },
    data() {
      return {
        query: {
          name: '',
          region: [],
          specification:'',
          checkedItems: []
        },
        tableData: [],
        paginations: { // 初始化分页
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
        },
        multipleSelection: [],
        value: '',
        stockUpFrom: false,
        remarkShow:true,
        cellIndex:undefined
      };
    },
    mounted(){
      var _this = this;
      // 初始化表格已选数据
      var apiData = {
        total: 2,  // 后台必须返回数据的总数目！更新分页要用！
        list: [{
          id:"1",
          isChecked: true, // 当前数据是否已勾选（必须返回）
          drugDetail: '1尼群地平片（商品名：尼群地平片）',
          drugStorage: '1住院药库',
          price: '11.11',
          enterprise:'1住院药库',
          amount:'1住院药库',
          remark:'1住院药库',
          drugContent:'规格包装：100mg*100盒/片 中大包装：20/200 生产企业：北京太洋药业股份有限公司',
          options: [{
            value: '选项1',
            label: '烟台正方制药1'
          }, {
            value: '选项2',
            label: '烟台正方制药2'
          }, {
            value: '选项3',
            label: '烟台正方制药3'
          }, {
            value: '选项4',
            label: '烟台正方制药4'
          }, {
            value: '选项5',
            label: '烟台正方制药5'
          }],
          num1: 1,
        },
        {
          id:"2",
          isChecked: false,
          drugDetail: '尼群地平片（商品名：尼群地平片）',
          drugStorage: '住院药库',
          price: '22.22',
          enterprise:'住院药库',
          amount:'住院药库',
          remark:'住院药库',
          drugContent:'规格包装：100mg*100盒/片 中大包装：20/200 生产企业：北京太洋药业股份有限公司',
          options: [{
            value: '选项1',
            label: '烟台正方制药1'
          }, {
            value: '选项2',
            label: '烟台正方制药2'
          }, {
            value: '选项3',
            label: '烟台正方制药3'
          }, {
            value: '选项4',
            label: '烟台正方制药4'
          }, {
            value: '选项5',
            label: '烟台正方制药5'
          }],
          num1: 1,
        }]
      };
      var checkArr = [];
      var apiList = apiData.list;
      _this.paginations.total = apiData.total;
      for(let i=0; i<apiList.length; i++){
        if(apiList[i].isChecked){
          checkArr.push(i);
        }
      }
      _this.checkedItems = checkArr;
      _this.tableData = apiList;
      _this.$nextTick(function(){
        _this.checked(); // 每次更新了数据就触发这个函数
      });
    },
    methods: {
      checked(){
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for(let i=0; i<checkedItem.length; i++){
          this.$refs.multipleTable.toggleRowSelection(this.tableData[checkedItem[i]],true);
        }
      },
      handleSelect(sel, row) {
        console.log('已勾选:', sel);
        console.log('你操作的数据是:', row);

        //row.isChecked = !row.isChecked;
      },
      handleChange(value) {
        console.log(value);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleButtonView(){
        this.stockUpFrom = true;
        this.$nextTick(() => {
          this.$refs.demoTableStockUpFrom.handleForm();
        })
      },
      handleCell(row, column, cell, event){
        console.log(row, column, cell, event)
        if(column.label=="备注"){
          this.cellIndex=row.id;
        }else{
          this.cellIndex=undefined;
        }

      },
      handleCellSubmit(row){
        alert(row.id);
      },
      dataBackFillGoods () {
        this.remarkShow=!this.remarkShow;
      },
      amountStatistics(){
        alert(1)
      },
      handleChange(value){
        console.log("11"+value);
      }
    }
  }
</script>
<style>
  p{
    margin: 0;
  }
  .drugCon{
    font-size: 12px;
    color: #c0c4cc;
  }
  .fixed-toolbar{
    left:60px;
    width:100%;
    background:#eee;
    text-align:right;
    line-height:60px;
    height:60px;
  }
  .box{
    float:right;
    margin-right: 15px;
  }
  .amount{
    float:left;
    font-size:14px;
    margin-right: 15px;
  }
  .red{
    color: #f43530;
  }
  .btn-pitchon{
    float:left;
    color:#008dd8;
    background: #fff;
    border-top: 1px solid #008dd8;
    border-left:1px solid #008dd8;
    padding:0 30px;
    cursor: pointer;
    height: 58px;
  }
  .btn-purchase{
    float:left;
    color:#fff;
    background: #008dd8;
    padding:0 30px;
    cursor: pointer;
    height: 58px;
  }
  .sign{
    height: 22px;
    margin-bottom: 10px;
  }
  .sign > span{
    display: inline-block;
    vertical-align: middle;
  }
  .icon-sign{
    height: 22px;
    line-height: 22px;
    padding:0 5px;
    font-size: 12px;
    border-radius:4px;
  }
  .sign-district{
    background-color:rgba(32,160,255,0.1);
    border:solid 1px rgba(32,160,255,0.2);
    color:#2b86cc;
  }
  .sign-basic{
    background-color:rgba(247,186,42,0.1);
    border:solid 1px rgba(247,186,42,0.2) ;
    color:#ef8e05;
  }
  .text{
    padding: 0 5px;
  }
  .icon-jixu{
    display: inline-block;
    width:10px;
    height:10px;
    border-radius:2px;
    background-color:#e64340;
  }
</style>
