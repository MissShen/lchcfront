<template>
  <el-dialog
    :title="dataForm.type+'关联药品'"
    :close-on-click-modal="false"
    width="75%"
    :visible.sync="visible">
    <el-form :model="query" :rules="dataRule" ref="query"
             label-width="150px" label-position="left" :inline="true" size="small" class="table-form">
      <input type="hidden" v-model="dataForm.type"/>
          <el-form-item>
            <el-input v-model="query.searchContent" placeholder="通用名或编码" size="small" @keyup.enter.native="searchEnterFun"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="searchEnterFun" size="small">查询</el-button>
            <el-button type="warning" size="small">重置</el-button>
          </el-form-item>
    </el-form>

    <div class="tableset">
      <el-table
        :data="resData.list"
        :row-key="getRowkeys"
        @selection-change="handleSelectionChange"
        border
        stripe>
        <el-table-column v-if="lookType != '查看'" type="selection" width="50" align="center" :reserve-selection="true"></el-table-column>
        <el-table-column label="药品编码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通用名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nameChn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剂型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.doseageFormCodeName }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer">
      <el-button size="small" type="primary" v-if="dataForm.type == '查看已'" @click="choiceData()">取消关联</el-button>
      <el-button size="small" type="primary" v-else @click="choiceData()">关联</el-button>
      <el-button size="small" @click="visible = false">关闭</el-button>
    </span>
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
  </el-dialog>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {getDrugs} from 'src/axios/datacenter/basedata/formulary/formulary';
  import {keyBoardEnter} from "src/utils";

  export default {
    components: {ElCol},
    name: "assoDrugsDetail",
    props: {
      lookType:''
    },
    data() {
      return {
        visible: false,
        resData: this.metaData(),
        dataForm: this.metaForm(),
        dataRule: this.metaRule(),
        query : this.metaQuery(),
        choiceList : []

      }
    },

    created() {
      if(this.lookType == '查看已'){
        this.metaList()
      }else if(this.lookType == '查看未'){
        this.metaList()
      }else{
        this.metaList()
      }
    },
    methods: {
      searchEnterFun(e){
        this.resData.pageNum=1;
        keyBoardEnter(e, () => {
          this.metaList();
        })
      },
      metaList() {
        if(this.lookType == '查看已' || this.lookType == '查看'){
          console.log("查看已")
          this.query.searchType = '1';
          this.query.formularyId = this.$route.params.id;
        }else{
          console.log("查看未")
          this.query.searchType = '2';
        }

        getDrugs(this.query, this.resData).then(res => {
          this.resData = res.data
        })
      },
      getRowkeys(row){
        return row.id;
      },
      choiceData(){
        this.visible = false
        let idsArr =this.choiceList.map(data=>{
            return data.id
          })
        let ids = idsArr.join(',').toString();
        console.log("ids========="+ids)
        this.$emit('saveDrugIds',ids)

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
          type:''
        }
      },
      metaData () {
        return {// 前后台交互数据封装格式
          pageNum: 0,
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
          searchContent : "",
          searchType:'',
          formularyId:''
        }
      },
      // -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; 处理方法 &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
      //  获取用户分页列表
      list () {
        userList(this.resData, this.query).then(res => {
          console.log(res);
          this.resData = res.data
        })
      },
      fillData(type,formularyId) {
        this.dataForm.type = type;
        this.query.formularyId = formularyId;
        this.metaList()
        this.visible = true
      },

      // ************************ 分页操作 ************************
      handleSizeChange (val) {
        this.resData.pageSize = val
        this.metaList()
      },
      handleCurrentChange (val) {
        this.resData.pageNum = val
        this.metaList()
      },
      handleSelectionChange(val){
        this.choiceList=val
      }
    }
  }
</script>
