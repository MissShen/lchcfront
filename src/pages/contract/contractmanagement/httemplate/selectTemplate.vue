<template>
  <div>
    <!-- ========================== 主内容start ========================= -->

    <!-- 表格 -->
    <div class="tablebox">

      <!-- 表格列表 -->
      <div class="tableset">
        <el-table
          :data="resData.list"
          border
          stripe
          @sort-change="sortChangeOne">
          <el-table-column label="合同类型" prop="template_Type_Name" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.templateTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="模板名称" prop="title" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a class="operation-btn" type="text" size="small" @click="showContentMsg(scope.row.content)">{{ scope.row.title }}</a>
            </template>
          </el-table-column>
          <el-table-column label="甲方" prop="jia_Id" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.jiaId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="乙方" prop="yi_Id" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.yiId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="约束类型" prop="rule_Names" sortable="custom" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.ruleNames }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <div class="operates">
                <a class="green" type="text" size="small" @click="selectHtTemplate(scope.row)">选择合同模板</a>
                <a class="green" type="text" size="small" @click="selectConstraintList(scope.row)">选择约束</a>
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
      <!--  ====================================== 弹窗 ====================================== -->
      <!--选择合同模板弹框-->
      <el-dialog title="选择合同模板" top="2vh" :visible.sync="showForm" :close-on-click-modal="false" :before-close="closeForm" width="70%">
        <el-form ref="selectQuery" :model="selectQuery" :inline="true" class="table-form">
            <el-form-item>
              <el-input v-model="selectQuery.title"
                        maxlength="200" placeholder="模板名称" size="small" @keyup.enter.native="searchEnterFun"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="selectQuery.typeId" placeholder="选择模板类型" size="small">
                <el-option
                  v-for="item in templateTypeNames"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button  @click="searchEnterFun" type="success" size="small">查询</el-button>
              <el-button @click="resetForm(templateId)" type="warning" size="small">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
          :data="selectData.list"
          border
          stripe
          @sort-change="sortChangeTwo">
          <el-table-column label="模板类型编号" prop="id" sortable="custom" width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="模板名称" prop="title" sortable="custom">
            <template slot-scope="scope">
              <a class="operation-btn" type="text" size="small" @click="showContentMsg(scope.row.content)">{{ scope.row.title }}</a>
            </template>
          </el-table-column>
          <el-table-column label="模板类型" prop="name" sortable="custom">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="160" prop="create_Date" sortable="custom">
            <template slot-scope="scope">
              <el-tooltip :enterable="false" class="item" effect="dark" placement="top-start">
                <div slot="content">{{ scope.row.createDate }}</div>
                <span v-if="scope.row.createDate!=null && scope.row.createDate!=''">{{ moment(scope.row.createDate).format("YYYY-MM-DD") }}</span>
                <span v-else></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.id == templateId" size="mini" style="color: #ff0000">已选</span>
              <a v-if="scope.row.id != templateId" class="operation-btn" type="text" size="small" @click="chooseForOne(scope.row)">选择</a>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer">
          <!--<el-button type="primary" @click="closeForm()">保存</el-button>-->
          <el-button @click="closeForm()">关闭</el-button>
        </span>
        <div class="pagebox">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :page-sizes="[10, 20, 30]"
            :total="selectData.total"
            :page-size="selectData.pageSize"
            :page-count="selectData.pages"
            :current-page.sync="selectData.pageNum">
          </el-pagination>
        </div>
      </el-dialog>

      <!-- 选择约束弹框 -->
      <el-dialog title="选择约束" width="600px" top="2vh" :visible.sync="showConstraint" :before-close="closeConstraint">
        <div class="padding20">
          <el-form ref="constraintQuery" label-position="left" :model="constraintQuery" label-width="150px">
            <el-form-item label="规则字典列表：" prop="userName">
              <template>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedRuleNames" @change="handleCheckedRulesChange">
                  <el-checkbox v-for="obj in ruleNames" :label="obj.ruleName" :key="obj.id">{{obj.ruleName}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="addRulesToRuleIds('constraintQuery')">确定</el-button>
          <el-button @click="closeConstraint">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 详情弹窗 -->
      <el-dialog title="合同模板详情" top="2vh" :visible.sync="showContent" :before-close="closeContent" width="60%">
        <span v-html="this.templateContent"></span>
        <span slot="footer">
          <el-button @click="showContent = false">关闭</el-button>
        </span>
      </el-dialog>

    </div>
    <!-- ========================== 主内容end ========================= -->
  </div>

</template>
<script>

  // 引入用户相关请求  引自js文件
  import {
    templateProjectList,
    selectTemplateList,
    updateTemplateId,
    selectTemplateTypeList,
    selectSysRuleList,
    updateRuleIds
  } from 'src/axios/contract/httemplate/selectTemplate';
  import moment from "moment";
  import { keyBoardEnter } from "src/utils"

  export default {
    data() {
      return {
        currentOrder:undefined, //分页的时候缓存
        resData: this.metaData(),
        selectData: this.metaSelectData(),
        selectQuery: this.metaSelectQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        constraintQuery: this.metaConstraintQuery(),
        isIndeterminate: true,
        checkAll: false,
        ruleIds: [],
        checkedRuleNames: [],
        ruleNames: [],
        showConstraint: false,
        showContent: false,
        showQuery: false, // 表单查询初始化
        templateTypeNames: [],//模板类型名称
        roleTree: [], // 角色分配树节点
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        templateProjectId: undefined,
        templateId: undefined,
        templateContent: undefined,
        templateTypeId: undefined
      }
    },

    created() {
      this.list();
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      moment,
      metaData() {
        return {
          orderBy: undefined,
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
        }
      },
      metaSelectData() {
        return {
          orderBy: undefined,
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
          templateId: undefined,
          selectList: [],
        }
      },
      metaSelectQuery() { // 表单查询数据初始化
        return {
          title: undefined,
          typeId: undefined
        }
      },
      metaConstraintQuery(){
        return {
          id: undefined,
          ruleName: undefined
        }
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      toggleQuery() {
        this.showQuery = !this.showQuery
      },
      toggleForm() {
        this.showForm = !this.showForm
      },
      toggleConstraint(){
        this.showConstraint = !this.showConstraint;
      },
      toggleContent() {
        this.showContent = !this.showContent
      },
      closeForm() {
        this.toggleForm();
        this.isIndeterminate=true;
      },
      closeConstraint(){
        this.toggleConstraint();
        this.isIndeterminate=true;
      },
      closeContent() {
        this.toggleContent();
      },
      selectConstraintList(row){
        this.templateProjectId = row.id;
        if(row.ruleNames!=null && row.ruleNames!==""){
          this.checkedRuleNames = row.ruleNames.split(",");
        }else{
          this.checkedRuleNames=[];
        }
        selectSysRuleList().then(res=>{
          this.ruleNames = res.data;
          if(this.checkedRuleNames!=null && this.ruleNames!=null && this.checkedRuleNames.length==this.ruleNames.length){
            this.isIndeterminate=false;
            this.checkAll=true;
          }
          if(this.checkedRuleNames==null || this.checkedRuleNames.length==0){
            this.isIndeterminate=false;
            this.checkAll=false;
          }
          this.toggleConstraint();
        })
      },
      //多选框-全选方法
      handleCheckAllChange(val) {
        if(val){
          let allRuleNames=[];
          let allRuleIds=[];
          for(let i=0;i<this.ruleNames.length;i++){
            allRuleIds.push(this.ruleNames[i].id);
            allRuleNames.push(this.ruleNames[i].ruleName);
          }
          this.ruleIds = allRuleIds;
          this.checkedRuleNames = allRuleNames;
        }else{
          this.ruleIds = [];
          this.checkedRuleNames=[];
        }
        this.isIndeterminate = false;
      },
      //为ruleIds赋值的公共方法
      setValueForRuleIds(value){
        let allRuleIds=[];
        for(let i=0;i<value.length;i++){
          for(let j=0;j<this.ruleNames.length;j++){
            if(this.ruleNames[j].ruleName == value[i]){
              allRuleIds.push(this.ruleNames[j].id);
            }
          }
        }
        this.ruleIds=allRuleIds;
      },
      handleCheckedRulesChange(value) {
        this.setValueForRuleIds(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.ruleNames.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.ruleNames.length;
      },
      addRulesToRuleIds(){
        console.log(this.checkedRuleNames);
        this.setValueForRuleIds(this.checkedRuleNames);
        let ruleId="";
        let ruleName="";
        if(this.ruleIds!=null && this.ruleIds.length!=0){
          for(let i=0;i<this.ruleIds.length;i++){
            if(i!=this.ruleIds.length-1){
              ruleId += this.ruleIds[i]+",";
            }else{
              ruleId += this.ruleIds[i];
            }
          }
        }
        if(this.checkedRuleNames!=null && this.checkedRuleNames.length!=0){
          for(let i=0;i<this.checkedRuleNames.length;i++){
            if(i!=this.checkedRuleNames.length-1){
              ruleName += this.checkedRuleNames[i]+",";
            }else{
              ruleName += this.checkedRuleNames[i];
            }
          }
        }
        console.log("ruleId: ", ruleId);
        console.log("ruleName: ", ruleName);
        updateRuleIds(this.templateProjectId,ruleId,ruleName).then(res=>{
          this.toggleConstraint();
          this.$message({
            message: res.success==true ? res.data :res.message,
            type: res.success==true ? "success" : "error",
          })
          this.list();
        })
        this.isIndeterminate=true;
      },
      //  查询合同模板项目列表
      list() {
        this.resData.orderBy = this.currentOrder;
        templateProjectList(this.resData).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1;
          }
        })
      },
      // 查询选择合同模板列表
      selectList(templateId) {
        this.templateId = templateId;
        this.selectData.orderBy = this.currentOrder;
        selectTemplateList(this.selectData, this.selectQuery, this.templateTypeId).then(res => {
          this.selectData = res.data;
          if (this.selectData.pageNum === 0) {
            this.selectData.pageNum = 1;
          }
        })
      },
      queryTemplateTypeNames() {
        selectTemplateTypeList().then(res => {
          this.templateTypeNames = res.data;
          var templateTypeNamesA = [{
            id:'',
            name:'全部'
          },]
          this.templateTypeNames =  templateTypeNamesA.concat(this.templateTypeNames);
        })
      },
      // 选择合同模板
      selectHtTemplate(row) {
        this.templateTypeId = row.templateTypeId;
        this.templateProjectId = row.id;
        this.toggleForm();
        this.selectQuery = this.metaSelectQuery();
        this.queryTemplateTypeNames();
        this.selectList(row.templateId);
      },
      chooseForOne(row) {
        this.toggleForm();
        updateTemplateId(this.templateProjectId, row.id).then(res => {
          this.$message({
            message: res.success== true ? res.data : '选择合同模板失败',
            type: res.success== true ? 'success' :'error',
            duration: 1000,
            onClose: () => {
              this.list();
            }
          })
        })
      },
      showContentMsg(content) {
        this.toggleContent();
        this.templateContent = content;
      },
      //重置表单
      resetForm(templateId) {
        this.selectQuery = this.metaSelectQuery();
        this.selectList(templateId);
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      handleSizeChange2(val) {
        this.selectData.pageSize = val
        this.selectList()
      },
      handleCurrentChange2(val) {
        this.selectData.pageNum = val
        this.selectList()
      },
      sortChangeOne(value){
        this.sortChangeCommon(value);
        this.list();
      },
      sortChangeTwo(value){
        this.sortChangeCommon(value);
        this.selectList();
      },
      sortChangeCommon(value){
        console.log("value: ", value);
        let sortType=" desc"
        if(!!value.order){
          if(value.order.startsWith("asc")){
            sortType=" asc";
          }
          this.currentOrder=value.prop + sortType;
        } else {
          this.currentOrder=undefined;
        }
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.selectData.pageNum = 1;
        keyBoardEnter(e , ()=>{
          this.selectList(this.templateId);
        })
      }
    }
  };
</script>


