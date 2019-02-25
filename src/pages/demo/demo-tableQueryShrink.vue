<template>
  <div>
    <!-- 标签页start -->
    <div class="tabs-panel">
      <span class="active">专家库</span>
    </div>
    <!-- 标签页end -->
    <!-- table start -->
    <div class="tablebox">
      <!-- 查询条件 start -->
      <div class="table-form">
        <el-form :inline="true" :model="formQuery" ref="formQuery" class="demo-form-inline">
         <div class="formrow">
          <span>
            <el-input v-model="formQuery.userName" placeholder="用户名" size="small"></el-input>
          </span>
          <span>
            <el-input v-model="formQuery.realName" placeholder="姓名" size="small"></el-input>
          </span>
          <span>
            <el-button type="warning" size="small" v-show="boxhide">查询</el-button>
            <el-button size="small"  v-show="boxhide">重置</el-button>
            <el-button size="small" @click="spread"  v-show="boxhide">更多<i class="el-icon-arrow-down"></i></el-button>
          </span>
         </div>
         <div class="formrow" v-show="boxshow">
           <span>
            <el-input v-model="formQuery.unit" placeholder="单位" size="small"></el-input>
           </span>
            <span>
              <el-input v-model="formQuery.subject" placeholder="学科" size="small"></el-input>
            </span>
            <span>
              <el-select v-model="formQuery.value" placeholder="类别" size="small">
                <el-option v-for="item in formQuery.category" :key="item.catlog" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
           <span>
              <el-select v-model="formQuery.value" placeholder="性别" size="small">
                <el-option v-for="item in formQuery.gender" :key="item.sex" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span>
              <el-input v-model="formQuery.age" placeholder="年龄" size="small"></el-input>
            </span>
            <span>
              <el-input v-model="formQuery.identity" placeholder="身份证号" size="small"></el-input>
            </span>
           <span>
              <el-checkbox-group v-model="formQuery.type">
                <el-checkbox label="1" name="type">复选框1</el-checkbox>
                <el-checkbox label="2" name="type">复选框2</el-checkbox>
                <el-checkbox label="3" name="type">复选框3</el-checkbox>
              </el-checkbox-group>
           </span>
           <span>
              <el-input v-model="formQuery.phone" placeholder="联系电话" size="small"></el-input>
            </span>
           <span>
              <el-radio-group v-model="formQuery.resource">
                <el-radio label="1">选项1</el-radio>
                <el-radio label="2">选项2</el-radio>
              </el-radio-group>
           </span>
           <span>
              <el-date-picker type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="formQuery.startDate"></el-date-picker>
              &nbsp;至&nbsp;
              <el-date-picker type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" v-model="formQuery.endDate"></el-date-picker>
           </span>
           <span>
            <el-button type="warning" size="small" >查询</el-button>
            <el-button size="small">重置</el-button>
            <el-button size="small" @click="packup" >收起<i class="el-icon-arrow-up"></i></el-button>
          </span>
          </div>
        </el-form>
      </div>
      <!-- 查询条件 end -->
    <div class="table-caption">
      <el-button type="primary" size="small ">新增</el-button>
      <el-button size="small ">删除</el-button>
    </div>
    <!-- 表格列表 start -->
    <div class="tableset">
      <el-table ref="multipleTable" border  stripe :default-sort = "{prop: 'name'}" :data="resData.list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column label="序号" width="80">
          <template slot-scope="scope" >{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="companyType" label="企业类型" sortable width="120"></el-table-column>
        <el-table-column prop="time" label="时间" sortable width="90" ></el-table-column>
        <el-table-column prop="companyCode" label="企业代码" width="120"
           :filters="[{ text: 'ARE784', value: 'ARE784' },{ text: 'ARG033', value: 'ARG033' }]"
           :filter-method="filterProductSpecies"
           filter-placement="bottom-end"
           show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <span :class="getTagClass(scope.row.companyCode)">{{scope.row.companyCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="企业名称" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="address" label="企业简介" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="price" label="价格" sortable width="80" align="right" ></el-table-column>
        <el-table-column prop="quantity" label="数量" sortable width="80" align="right" ></el-table-column>
        <el-table-column label="操作" width="120">
         <!-- <template slot-scope="scope">
            <a class="operation-btn">修改</a>
            <a class="operation-btn">详细</a>
          </template>-->
          <!-- 悬浮按钮 start -->
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content" class="alink">
                <a href="#">修改</a>
                <a href="#">详细</a>
              </div>
              <span>{{scope.row.companyCode}}</span>
            </el-tooltip>
          </template>
          <!-- 悬浮按钮 end -->
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
             <a class="operation-btn">修改</a>
             <a class="operation-btn">详细</a>
           </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格列表 end -->
    <!-- 表格分页 start-->
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
    <!-- 表格分页 end-->
  </div>
    <!-- ==== table end ==== -->
  </div>
</template>
<script>
  import {query} from 'src/axios/management/authority/sysUser'
  export default {
    data() {
      return {
        formQuery: this.metaQuery(),
        resData: this.metaData(),
        boxshow:false,
        boxhide:true,
        multipleSelection: [],

      }
    },
    methods:{
      metaQuery () {
        return {
            userName:'',
            realName:'',
            age:'',
            identity:'',
            phone:'',
            unit:'',
            subject:'',
            category:[{
              value: '选项1',
              label: '药学'
            },{
              value: '选项2',
              label: '医学'
            },{
              value: '选项3',
              label: '管理学'
            }],
            gender:[{
              value: '选项1',
              label: '男'
            },
              {
                value: '选项2',
                label: '女'
              }
            ],
            value:'',
            resource:'1',
            startDate:'',
            endDate:'',
            checkList: [],
            type:[]
        }
      },
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          size: 10,
          startRow: 0,
          endRow: 0,
          total: 7,
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
          list: [{
            date: '1',
            companyType: '软件',
            companyCode:'ARE784',
            name:"北京市门头沟区中医院",
            address: '上海市普陀区金沙江路 1518 弄',
            time:"2018-1-30",
            price:"2.35",
            quantity:"35"
          }, {
            date: '2',
            companyType: '软件',
            companyCode:'ARE784',
            name:"北京市门头沟区中医院",
            address: '上海市普陀区金沙江路 1518 弄',
            time:"2018-1-30",
            price:"2.35",
            quantity:"35"
          }, {
            date: '3',
            companyType: '软件',
            companyCode:'ARE784',
            name:"北京市门头沟区中医院",
            address: '上海市普陀区金沙江路 1518 弄',
            time:"2018-1-30",
            price:"2.35",
            quantity:"35"
          }, {
            date: '4',
            companyType: '软件',
            companyCode:'ARG033',
            name:"北京市门头沟区中医院",
            address: '上海市普陀区金沙江路 1518 弄',
            time:"2018-1-30",
            price:"2.35",
            quantity:"35"
          }, {
            date: '5',
            companyType: '软件',
            companyCode:'ARG033',
            name:"北京市门头沟区中医院",
            address: '上海市普陀区金沙江路 1518 弄',
            time:"2018-1-30",
            price:"2.35",
            quantity:"35"
          }, {
            date: '6',
            companyType: '软件',
            companyCode:'ARG033',
            name:"北京市门头沟区中医院",
            address: '上海市普陀区金沙江路 1518 弄',
            time:"2018-1-30",
            price:"2.35",
            quantity:"35"
          }, {
            date: '7',
            companyType: '软件',
            companyCode:'ARG033',
            name:"北京市门头沟区中医院",
            address: '上海市普陀区金沙江路 1518 弄',
            time:"2018-1-30",
            price:"2.35",
            quantity:"35"
          }]
        }
      },
      spread:function(){
        this.boxshow = true;
        this.boxhide=false;
      },
      packup:function(){
        this.boxshow = false;
        this.boxhide=true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
      },
      // 筛选标签（企业类型）
      filterProductSpecies(value, row) {
        return row.companyCode === value;
      },
      // 表格内标签显示不同样式
      getTagClass(val) {
        let obj = {'ARE784': 'red', 'ARG033': 'blue'};
        return obj[val];
      }
    }
  }
</script>
<style>

</style>
