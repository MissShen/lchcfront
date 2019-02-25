<template>
  <el-dialog
    :title="'选择分装企业'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
             label-position="left" :inline="true" size="small" class="table-form">

        <el-form-item>
          <el-select v-model="query.searchType" placeholder="请选择" size="small">
            <el-option label="企业名称" value="1"></el-option>
            <el-option label="企业编号" value="2"></el-option>
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
        stripe>
        <!--<el-radio-group type="selection" width="50"></el-radio-group>-->

        <el-table-column label="" width="50" align="center">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change="changeRadio(scope.$index, 0)">{{null}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="企业编码" width="180">
          <template slot-scope="scope">
            <a href="javascript:;">{{ scope.row.CODE }}</a>
          </template>
        </el-table-column>
        <el-table-column label="企业名称">
          <template slot-scope="scope">
            <span>{{ scope.row.NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否会员" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.MEMBER_FLAG }}</span>
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
      <el-button size="small" type="primary" @click="changeRadio(null , 1)">选择</el-button>
      <el-button size="small" @click="myClose()">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";

  import {queryDisList} from 'src/axios/datacenter/orgdata/sell/seller'
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "split-org",
    props: {
      // parentId: {
      //   type: String,
      //   required: true
      // }
    },
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        query: this.metaQuery(),
        id: undefined,
        radio: undefined,
        flag: undefined,
        selectCodeTemp: undefined,
        selectNameTemp: undefined,
        selectIdTemp: undefined,
        selectCode: undefined,
        selectName: undefined,
        selectId: undefined,
        deleteDataList: undefined
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
          isShortcutMenu: '0',
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
      metaList() {

        // this.id = this.parentId

        console.log("==-==>", this.id);

        queryDisList(this.query, this.resData).then(res => {
          console.log('resData===', res.data);
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })

      },
      fillData(id) {
        this.id = id || undefined
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
          searchType: '1',
          searchText: ''
        }
      },
      //查询
      searchEnterFun(e){
        this.$store.state.pageSeach.pageNum = 1;
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.metaList();
        })
      },
      // -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 处理方法 &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
      //  获取用户分页列表
      list () {
        queryDisList(this.id, this.query, this.resData).then(res => {
          this.resData = res.data
          if (this.resData.pageNum === 0) {
            this.resData.pageNum = 1
          }
        })
      },
      // 重置
      resetForm () {
        this.query = this.metaQuery();
      },
      handleSelectionChange(val){
        this.deleteDataList=val
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
      // 单选框操作
      changeRadio(value, flag) {
        // 修改radio
        if(flag == 0) {

          if(value == undefined || value == null) {
            this.$alert('请先勾选一项企业', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            })
            return false
          }

          this.selectCodeTemp = this.resData.list[value].CODE;
          this.selectNameTemp = this.resData.list[value].NAME;
          this.selectIdTemp = this.resData.list[value].ID;
          flag = 0;
          // this.myClose()
          return ;
        }
        // 点击选择按钮
        if(flag == 1) {
          if(this.selectCodeTemp == undefined && this.selectNameTemp == undefined) {
            this.$alert('请先勾选一项企业', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            })
            return false
          }

          this.selectCode = this.selectCodeTemp;
          this.selectName = this.selectNameTemp;
          this.selectId = this.selectIdTemp;
          flag = 1;
          this.myClose()
          return ;
        }

      },
      myClose() {
console.log('1231312')
        this.$emit('myChange', this.selectCode, this.selectName, this.selectId);
        this.visible = false;

      }
    }
  }
</script>
