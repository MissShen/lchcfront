<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格查询表单 -->
      <div class="table-form">
        <el-form ref="query" :model="query" size="small" :inline="true" class="demo-form-inline">
          <div class="formrow">
            <span>
              <el-input v-model="query.templateByName" placeholder="采购模板名称" size="small"></el-input>
            </span>
            <span>
            <el-date-picker type="date" placeholder="开始日期" v-model="query.searchBenDate"
                            value-format="yyyy-MM-dd" size="small"></el-date-picker>
             &nbsp;至&nbsp;
            <el-date-picker type="date" placeholder="结束日期" v-model="query.searchEndDate"
                            value-format="yyyy-MM-dd" size="small"></el-date-picker>
            </span>
            <span>
              <el-button type="warning" size="small">查询</el-button>
              <el-button type="primary" size="small">重置</el-button>
            </span>
          </div>
        </el-form>
      </div>
      <div class="tableset">
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="purchaseCode" label="模板编号"></el-table-column>
          <el-table-column prop="byName" label="模板名称"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column prop="buyerName" label="买方机构"></el-table-column>
          <el-table-column prop="requestTotal" label="拟采购金额（元）" align="right" width="80"></el-table-column>
          <el-table-column prop="remark" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <a class="operation-btn" size="small">详情</a>
              <a class="operation-btn" size="small">生成采购单</a>
              <a class="operation-btn" size="small">删除</a>
            </template>
          </el-table-column>

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

























