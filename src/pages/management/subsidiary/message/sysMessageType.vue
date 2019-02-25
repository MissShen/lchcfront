<template>
  <!--<div v-if="permData.message_type_list">-->
  <div>
    <message-type-view v-if="messageTypeView" ref="messageTypeView" @refreshMessageType="metaList()"></message-type-view>
    <!-- 表格 -->
    <el-dialog title="消息类型" :visible.sync="visible" width="70%" top="10vh">
      <div>
        <div class="table-form">
          <!-- 表格查询表单 -->
          <el-form :inline="true" :model="queryData" ref="queryData">
            <div class="formrow">
              <span><el-input v-model="queryData.searchCode" placeholder="类别编号" size="small"></el-input></span>
              <span><el-input v-model="queryData.searchName" placeholder="类别名称" size="small"></el-input></span>
              <span>
               <el-select v-model="queryData.systemUnicode" placeholder="所属系统" size="small">
                <el-option v-for="busSys in busSysInfoList"
                           :key="busSys.systemUnicode"
                           :label="busSys.systemName"
                           :value="busSys.systemUnicode"></el-option>
              </el-select>
            </span>
              <span>
              <el-button type="success" @click="metaList()" size="small">查询</el-button>
              <el-button type="warning" @click="queryData = metaQuery()" size="small">重置</el-button></span>
            </div>
          </el-form>
        </div>

        <!-- 表格列表 -->
        <div class="tableset">
          <el-table
            :data="resData.list"
            @selection-change="handleSelectionChange"
            border
            stripe>
            <el-table-column header-align="center" align="center" type="selection" width="40"></el-table-column>
            <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
            <el-table-column label="消息类型编码" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.msgTypeCode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属系统">
              <template slot-scope="scope">
              <span v-for="busSys in busSysInfoList"
                    :key="busSys.systemUnicode"
                    v-if="busSys.systemUnicode===scope.row.systemCode">{{ busSys.systemName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="消息类型名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.msgTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="消息内容模板" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.contentTemplate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否推送微信">
              <template slot-scope="scope">
                <span>{{ scope.row.isSendWeixin==='1'?'是':'否' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否推送站内">
              <template slot-scope="scope">
                <span>{{ scope.row.isSendWeb==='1'?'是':'否' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建人">
              <template slot-scope="scope">
                <span>{{ scope.row.createName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.createDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <a class="operation-btn" @click="handleFromView(scope.row.id)"
                   v-if="permData.message_type_upd">修改</a>
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="success"
                   size="small"
                   v-if="permData.message_type_add"
                   @click="handleFromView()">新增消息类别
        </el-button>
        <el-button type="danger"
                   size="small"
                   v-if="permData.message_type_del"
                   @click="handleDelete()">删除
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {messageTypeList, messageTypeDelete} from "src/axios/management/subsidiary/message";
  import {busSysList} from "src/axios/management/authority/headMenu"
  import MessageTypeView from './formView'
  import {PageData, HasPerm} from 'src/components/mixins'

  import {mapGetters} from 'vuex';

  export default {
    name: "sys-message-type",
    mixins: [PageData, HasPerm],
    components: {MessageTypeView},
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        visible: false,
        messageTypeView: false,
        resData: this.metaData(),
        queryData: this.metaQuery(), // 查询初始化
        permData: this.metaPerm(), // 权限初始化
        busSysInfoList: [],
        deleteDataList: []
      }
    },
    created() {
      this.metaHasPerm();
      if (this.permData.message_type_list) {
        busSysList().then(res => {
          this.busSysInfoList = res.data
        });
        this.metaList();
      }
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 查询数据封装格式
        return {
          searchName: undefined,
          searchCode: undefined,
          systemUnicode: ''
        }
      },
      metaList() {
        this.visible = true;
        messageTypeList(this.resData, this.queryData).then(res => {
          this.resData = res.data;
          if (0 === this.resData.pageNum) {
            this.resData.pageNum = 1
          }
        });
      },
      metaPerm() {
        return {
          message_type_list: false,
          message_type_add: false,
          message_type_del: false,
          message_type_upd: false,
        }
      },
      metaHasPerm() {
        this.permData.message_type_list = this.perms['sys:message_type:list'];
        this.permData.message_type_add = this.perms['sys:message_type:save'];
        this.permData.message_type_del = this.perms['sys:message_type:delete'];
        this.permData.message_type_upd = this.perms['sys:message_type:update'];
      },
      // -------------------------------------------- 数据初始化完毕  -----------------------------------------
      handleFromView(id) {
        // this.$router.push("/subsidiary/messageTypeForm/" + id)
        this.messageTypeView = true;
        this.$nextTick(() => {
          this.$refs.messageTypeView.metaList(id);
        })
      },
      handleDelete() {
        if (this.deleteDataList.length < 1) {
          this.$alert('请至少选择一条数据', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          })
          return false
        } else {
          this.$confirm(`确定删除选中的数据吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var messageTypeIdList = []
            for (var messageType of this.deleteDataList) {
              messageTypeIdList.push(messageType.id)
            }
            messageTypeDelete(messageTypeIdList.join(',')).then(res => {
              this.$message({
                message: res.data,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.metaList()
                }
              })
            })
          }).catch(() => {
          });
        }
      },
      handleQuery() {
        this.resData = this.metaData();
        this.metaList();
      },
      // ************************
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.metaList();
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.metaList();
      },
      handleSelectionChange(val) {
        this.deleteDataList = val;
      }
    }
  }
</script>

<style scoped>

</style>
