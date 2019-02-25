<template>
  <el-dialog
    title="已关联企业列表"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
             label-position="left" :inline="true" size="small" class="table-form">

        <el-form-item>
          <el-select v-model="query.searchType" placeholder="请选择" size="small">
            <el-option label="企业名称" value="1"></el-option>
            <el-option label="企业编号" value="2"></el-option>
            <el-option label="企业ID" value="3"></el-option>
            <el-option label="注册地址" value="4"></el-option>
            <el-option label="许可证号" value="5"></el-option>
            <el-option label="所在省市" value="6"></el-option>
            <el-option label="GSP证书号" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchText" placeholder="关键词" size="small" @keyup.enter.native="searchEnterFun"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
          <el-button type="warning" @click="resetForm()" size="small">重置</el-button>
        </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        @selection-change="handleSelectionChange"
        border
        stripe :row-key="getRowKeys">
        <el-table-column type="selection" width="50" align="center" :reserve-selection="true"></el-table-column>
        <el-table-column label="企业编码" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.CODE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区域" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.SCOPE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业类型" width="120">
          <template slot-scope="scope">
            <span>{{ isWholesale(scope.row.SALER_FLAG) }} {{ isDistribution(scope.row.SEND_FLAG)
              }} {{ isProduce(scope.row.FACTORY_FLAG) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业简称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.ABBR }}</span>
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

    <span slot="footer">
      <el-button size="small" type="primary" @click="handleAdd()">取消关联</el-button>
      <el-button size="small" @click="myClose(resData.total)">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";

  import {queryRelatedOrg, deleteRelatedOrg} from 'src/axios/datacenter/orgdata/sell/seller'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "orgForm",
    props: {
      parentId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        query: this.metaQuery(),
        id: undefined,
        deleteDataList: []
      }
    },
    created() {
      // this.metaList()
    },
    methods: {
      metaForm() {
        return {
          id: undefined,
          parentId: undefined,
          menuName: undefined,
          shortcutMenuName: undefined,
          menuUrl: undefined,
          orderNum: undefined,
          remark: undefined,
          isShortcutMenu: '0'
        }
      },
      metaRule() {
        return {
          menuName: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'},
            {min: 1, max: 10, message: '菜单名称长度大于1小于10', trigger: 'blur'}
          ],
          shortcutMenuName: [
            {required: true, message: '菜单名称简写不能为空', trigger: 'blur'},
          ],
          menuUrl: [
            {required: true, message: '菜单路径不能为空', trigger: 'blur'},
          ],
        }
      },
      getRowKeys(row){
        return row.ID
      },
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.metaList();
        })
      },
      metaList() {
        this.dataForm.parentId = this.parentId
        this.id = this.dataForm.parentId
        console.log("==>", this.dataForm.parentId);
        queryRelatedOrg(this.dataForm.parentId, this.query, this.resData).then(res => {
          console.log("==>", res);
          this.resData = res.data;
        })
      },
      fillData(id) {
        this.dataForm.id = id || undefined
        this.visible = true

        this.metaList()
        /* this.$nextTick(() => {
         this.$refs['dataForm'].resetFields()
         })
         if (this.dataForm.id) {
         menuView(this.dataForm.id).then(res => {
         this.dataForm = res.data
         })
         }*/
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var http = this.dataForm.id ? menuLevelTwoUpdate(this.dataForm) : menuLevelTwoSave(this.dataForm)
            http.then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshData');
                }
              })
            })
          }
        })
      },
      metaData () {
        return {// 前后台交互数据封装格式
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
      metaQuery () { // 表单查询数据初始化
        return {
          searchType: '',
          searchText: ''
        }
      },
      // 重置
      resetForm () {
        this.query = this.metaQuery();
      },
      handleSelectionChange(val){
        this.deleteDataList = val
      },
      // -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 处理方法 &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
      // 获取已关联企业列表
      list () {
        queryRelatedOrg(this.id, this.query, this.resData).then(res => {
          console.log('resData===', res.data);
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      handleAdd() {

        if (this.deleteDataList.length < 1) {
          this.$alert('请选择要关联的企业', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        } else {
          this.$confirm(`确定关联选择的企业?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = [];
            ids = this.deleteDataList.map(data => {
              return data.ID
            })
            deleteRelatedOrg(ids.join(',').toString(), this.id).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.myClose(0);
                }
              })
            })
          }).catch(() => {
          });
        }
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
      isWholesale(status){
        return status == 1 ? '批发' : ''
      },
      isDistribution(status) {
        return status == 1 ? '配送' : ''
      },
      isProduce(status) {
        return status == 1 ? '生产' : ''
      },
      myClose(sum) {
        this.$emit('myChange', sum);
        this.visible = false;
      }
    }
  }
</script>
