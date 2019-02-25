<template>
  <el-dialog
    title="按钮管理"
    top="4vh"
    width="80%"
    :close-on-click-modal="false"
    v-if="permData.resource_button_list"
    :visible.sync="visible">
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        border
        stripe>
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column label="按钮名称" width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.resourceName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="按钮路径" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{ scope.row.resourceUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限标识" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.permissionName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <a class="operation-btn" @click="handleButtonView(scope.row.id)" v-if="permData.resource_button_upd">修改</a>
            <a class="operation-btn" @click="handleButtonDelete(scope.row.id,scope.row.resourceName)" v-if="permData.resource_button_del">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="space-20">
      <el-button
        size="small"
        type="success"
        @click="handleButtonView()"
        v-if="permData.resource_button_add"
      > 新增按钮
      </el-button>
    </div>
    <button-view  v-if="buttonViewVisible" :parent-id="parentId" ref="buttonView" @refreshData="buttonMetaList"></button-view>
    <span slot="footer">
      <el-button @click="visible = false" size="small">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {resourceList,resourceDelete} from "src/axios/management/authority/sysResource";
  import buttonView from './buttonView'
  import {mapGetters} from 'vuex'
  export default {
    name: "menu-button",
    components:{
      buttonView
    },
    props:{
      parentId:{
        type: String,
        required: true
      }
    },
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        visible:false,
        buttonViewVisible: false,
        resData: this.metaData(), // 列表数据初始化
        queryData: this.metaQuery(), // 查询参数初始化
        permData: this.metaPerm(), // 权限初始化
        bid:undefined,
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 查询参数数据封装格式
        return {
          searchName: undefined,
          beginDate: undefined,
          endDate: undefined,
          systemId: undefined
        }
      },
      metaPerm() {
        return {
          resource_button_list: false,
          resource_button_add: false,
          resource_button_del: false,
          resource_button_view: false,
          resource_button_upd: false,
        }
      },
      metaHasPerm() {
        this.permData.resource_button_list = this.perms['sys:resource_button:list'];
        this.permData.resource_button_add = this.perms['sys:resource_button:save'];
        this.permData.resource_button_del = this.perms['sys:resource_button:delete'];
        this.permData.resource_button_view = this.perms['sys:resource_button:view'];
        this.permData.resource_button_upd = this.perms['sys:resource_button:update'];
      },
      buttonMetaList(){
        this.metaHasPerm();
        if(this.permData.resource_button_list){
          this.visible = true;
          resourceList(this.resData,this.queryData,this.parentId,'BUTTON').then(res=>{
            this.resData=res.data;
            0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
          })
        }
      },
      // -------------------------------------------- 数据初始化完毕  -----------------------------------------
      handleButtonDelete(id, name) {
        this.$confirm(`确定删除按钮『${name}』吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resourceDelete(id).then(res => {
            this.$resMessage(res,{
              onClose: () => {
                this.buttonMetaList()
              }
            });
          })
        })
      },
    //  ************************
      handleButtonView(id) {
        this.buttonViewVisible = true
        this.$nextTick(() => {
          this.$refs.buttonView.fillButtonData(id)
        })
      },
    }
  }
</script>

<style scoped>

</style>
