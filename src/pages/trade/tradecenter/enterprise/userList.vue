<template>
  <!-- ========================== 医院黄页详细通讯录 ========================= -->
  <!-- 表格 -->
  <div class="tablebox">
    <!-- 表格查询表单 -->
    <el-form ref="query" :model="query" label-position="right" size="small" :inline="true" class="table-form">
      <el-form-item>
        <el-input v-model="query.searchLinkman" @keyup.enter.native="searchEnterFun" placeholder="联系人"
                  size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" @click="searchEnterFun">查询</el-button>
        <el-button type="warning" size="small" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        @sort-change="sortChang"
        border
        stripe>
        <!--<el-table-column type="index" header-align="left" align="center" width="50" label="序号"></el-table-column>-->
        <el-table-column label="联系人" prop="LINKMAN" sortable="custom">
          <template slot-scope="scope">
            {{ scope.row.linkman }}
          </template>
        </el-table-column>
        <el-table-column label="座机号码" prop="TELE_PHONE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.telePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="传真" prop="FAX_NUMBER" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.faxNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" prop="MOBILE_PHONE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.mobilePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在部门" prop="LINKMAN_DEPARTMENT" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.linkmanDepartment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职务" prop="LINKMAN_JOB" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.linkmanJob }}</span>
          </template>
        </el-table-column>
        <el-table-column label="QQ号" prop="QQ_NUMBER" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.qqNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信号" prop="WECHAT_CODE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.wechatCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通讯地址" prop="CONTACT_ADDRESS" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.contactAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮政编码" prop="POSTAL_CODE" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.postalCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="COMMENTS" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.comments }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operates">
              <a href="javaScript:;" @click="handleGoShow(scope.row.id,'update')" title="修改" class="green">修改</a>
              <a href="javaScript:;" @click="deletePersonInfo(scope.row.id)" title="删除" class="green">删除</a>
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
    <div class="foot-btn">
      <div class="foot-left">
        <span><el-button type="success" size="small" @click="handleGoShow(addId,'add')">新增</el-button></span>
      </div>
    </div>
  </div>
  <!-- ========================== 主内容end ========================= -->

</template>
<script>

  // 引入用户相关请求
  import {selectEnterpriseContactsInfo, deletePersonInfo} from 'src/axios/trade/enterprise/enterprise'
  import {keyBoardEnter} from "src/utils";

  export default {
    data() {
      return {
        currentOrder: undefined,
        activeName: 'first',  // 当前标签
        resData: this.metaData(),
        query: this.metaQuery(), // 查询初始化
        showForm: false, // 表单可见性初始化
        showQuery: false, // 表单查询初始化
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    created() {
      this.addId = 'null';
      this.list()
    },
    methods: {

      // -------------------------------------------- 数据初始化  -----------------------------------------
      reset() {
        this.query = this.metaQuery();
        this.list();
      },
      metaData() {
        return {
          // 前后台交互数据封装格式
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
          list: []
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          orgId: this.$route.params.orgId,
          searchLinkman: ''
        }
      },
      searchEnterFun(e) {
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum = 1;
        keyBoardEnter(e, () => {
          this.list();
        })
      },
      // ------------------------------------------------- 处理方法 ----------------------------------------
      //  获取用户分页列表
      list() {

        this.resData.orderBy = this.currentOrder;
        selectEnterpriseContactsInfo(this.resData, this.query).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      sortChang(value) {
        let sortType = " desc"
        if (value.order.startsWith("asc")) {
          sortType = " asc";
        }
        this.currentOrder = value.prop + sortType;
        this.list()
      },
      // ************************ 分页操作 ************************
      handleSizeChange(val) {
        this.resData.pageSize = val
        this.list()
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val
        this.list()
      },
      // 修改
      handleGoShow(id, param) {
        this.$router.push("/trade/information/linkManAdd/" + id + "/" + param)
      },
      goBack() {
        this.$router.go(-1);
      },
      deletePersonInfo(id) {
        this.$confirm(`是否确认删除？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePersonInfo(id).then(res => {
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.reset();
              }
            })
          })
        })
      },
      handleClose(done) {
        this.$refs['form'].resetFields();
        this.toggleForm();
      }
    }
  }
</script>

