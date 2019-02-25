<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-panel">
      <span class="active">临采购物车</span>
    </div>
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline">

          <span>
            <el-input v-model="query.name" placeholder="品名" size="small"></el-input>
          </span>
          <span>
            <el-input v-model="query.specification" placeholder="规格" size="small"></el-input>
          </span>
          <span>
            <el-button type="warning" size="small">查询</el-button>
            <el-button type="primary" size="small">重置</el-button>
          </span>
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
      <div class="tableset">

        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="药品信息" width="300" prop="drugDetail">
          <template slot-scope="scope" class="drugMessage">
            <p>{{ scope.row.drugDetail }}</p>
            <p class="drugCon">{{ scope.row.drugContent}}</p>
          </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="药库"></el-table-column>
          <el-table-column prop="price" label="价格" show-overflow-tooltip align="right" width="80"></el-table-column>
          <el-table-column prop="enterprise" label="配送企业" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择" size="small">
                <el-option v-for="item in scope.row.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="num1" label="数量" show-overflow-tooltip align="right" width="80">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.num1" :min="1" ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="pagebox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
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
        <div class="btn-purchase">创建采购单</div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        query: {
          name: '',
          region: 'beijing',
          specification:'',
          checkedItems: []
        },
        tableData3: [],
        multipleSelection: [],
        value:'',
        currentPage4:4
      };
    },
    mounted(){
      var _this = this;
      // 初始化表格已选数据
      var apiData = [{
        isChecked: true,
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
        isChecked: true,
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
      }];
      var checkArr = [];
      for(let i=0; i<apiData.length; i++){
        if(apiData[i].isChecked){
          checkArr.push(i);
        }
      }
      _this.checkedItems = checkArr;
      _this.tableData3 = apiData;
      _this.$nextTick(function(){
        _this.checked(); // 每次更新了数据就触发这个函数
      });
    },
    methods: {
      checked(){
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for(let i=0; i<checkedItem.length; i++){
          this.$refs.multipleTable.toggleRowSelection(this.tableData3[checkedItem[i]],true);
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*handleSelect(sel, row) {
        row.isChecked = !row.isChecked;
      },*/
      handleChange(value) {
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      }
    }
  }
</script>
