<template>
  <div>
    <!-- ========================== 主内容start ========================= -->
    <div class="tabs-echo">
      <div class="tabs-echo-left">
        <div class="title">
          <span>采购模板</span>
        </div>
        <div class="tools">
          <el-button type="primary" size="small ">生成采购单</el-button>
          <el-button type="primary" size="small ">返回</el-button>
        </div>
      </div>
      <div class="tabs-echo-right">
        <ul class="tabs-echo-ul">
          <li>模板编号：<span>C201803160347762358</span></li>
          <li>创建时间：<span>2018-03-16</span></li>
          <li>拟采金额：<span>442.40</span></li>
          <li>模板名称：<span>克林霉素模板</span></li>
          <li>创建人：<span>医疗机构_交易服务站</span></li>
          <li>买方机构：<span>永新站</span></li>
        </ul>
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="tablebox">
      <div class="title-name">药品详情</div>
      <div class="table-form">
        <el-form :inline="true" :model="queryFrom" ref="formQuery" class="demo-form-inline">
          <div class="formrow">
          <span>
            <el-input v-model="queryFrom.name" placeholder="品名" size="small"></el-input>
          </span>
            <span>
            <el-input v-model="queryFrom.specification" placeholder="规格" size="small"></el-input>
          </span>
          <span>
            <el-button type="warning" size="small">查询</el-button>
            <el-button size="small">重置</el-button>
          </span>
          </div>
        </el-form>
      </div>
      <div class="tableset">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="药品信息" width="300" prop="drugDetail">
            <template slot-scope="scope" class="drugMessage">
              <p>{{ scope.row.drugDetail }}</p>
              <p class="drugCon">{{ scope.row.drugContent}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="drugStorage" label="药库"></el-table-column>
          <el-table-column prop="price" label="单价" show-overflow-tooltip align="right" width="80">
            <template slot-scope="scope">
              <p>{{ priceFormat(scope.row.price) }}</p>
              <div class="price-ico">
                <div class="price-max">0</div>
                <div class="price-min">0</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="enterprise" label="配送企业"></el-table-column>
          <!--<el-table-column prop="enterprise" label="配送企业" show-overflow-tooltip>-->
            <!--<template slot-scope="scope">-->
              <!--<el-select v-model="scope.row.value" placeholder="请选择" size="small">-->
                <!--<el-option v-for="item in scope.row.options" :key="item.value" :label="item.label" :value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="num1" label="数量" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.num1" :min="1" ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        </el-table>
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
    </div>
  </div>
</template>
<script>
  import {priceFormat} from "src/utils";
  export default {
    data() {
      return {
        queryFrom: this.metaQuery(),// 查询初始化
        tableData: [],
        paginations: { // 初始化分页
          pageNum: 0,
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
        }
      }
    },
    mounted(){
      var _this = this;
      // 初始化表格已选数据
      var apiData = {
        total: 2,  // 后台必须返回数据的总数目！更新分页要用！
        list: [{
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
      priceFormat,
      checked(){
        //首先el-table添加ref="multipleTable"引用标识
        var checkedItem = this.checkedItems;
        for(let i=0; i<checkedItem.length; i++){
          this.$refs.multipleTable.toggleRowSelection(this.tableData[checkedItem[i]],true);
        }
      },
      metaQuery(){
        return {
          name:'',
          specification:''
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange (val) {
        this.tableData3.pageSize = val
        /*this.list()*/
      },
      handleCurrentChange (val) {
        this.tableData3.pageNum = val
        /*this.list()*/
      }
    }
  }
</script>



