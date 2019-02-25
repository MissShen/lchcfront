<template>
  <!-- 表格 -->
  <div class="tablebox" v-if="hasPerm('sys:role:list')">
    <el-form :inline="true" :model="queryData" ref="queryData" class="table-form">
      <el-form-item>
         <el-date-picker
           size="small"
           type="date"
           format="yyyy-MM-dd"
           value-format="yyyy-MM-dd"
           placeholder="创建开始日期"
           :editable="false"
           v-model="queryData.beginDate">
          </el-date-picker>
        &nbsp;至&nbsp;
        <el-date-picker
          size="small"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="创建结束日期"
          :editable="false"
          v-model="queryData.endDate">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="queryData.searchNameCode" placeholder="角色名称/角色编码"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="success" size="small" @click="handleQuery">查询 </el-button>
      <el-button type="warning" size="small" @click="queryData=metaQuery()">重置</el-button>
     </el-form-item>
    </el-form>
    <div class="foot-btn foot-left">
      <span>
          <el-button
            size="small"
            type="success"
            v-if="hasPerm('sys:role:save')"
            @click="handleFromView()"
          > 新增角色
        </el-button>
      </span>
      <span>
          <el-button
            size="small"
            type="success"
            v-if="hasPerm('sys:role_type_msg_type:view')"
            @click="handleRoleMessage()"
          > 消息授权管理
        </el-button>
      </span>
    </div>
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        :default-sort="{prop: 'date', order: 'descending'}"
        border
        stripe>
        <el-table-column label="角色名称" sortable show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色编码" sortable show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.roleCode  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" sortable show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <div class="operates">
              <a href="javascript:;" @click="handleGoMenu(scope.row.id)"
                 v-if="hasPerm('sys:role:resource:list')">菜单授权</a>
              <a href="javascript:;" @click="handleMessageRole(scope.row.id)"
                 v-if="hasPerm('sys:role_msg_type:view')">消息订阅</a>
              <a href="javascript:;" @click="handleFromView(scope.row.id)"
                 v-if="hasPerm('sys:role:update')">修改</a>
              <a href="javascript:;" @click="handleDelete(scope.row.id,scope.row.roleName)"
                 v-if="hasPerm('sys:role:delete')">删除</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格分页 -->
    <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
    <form-view v-if="formViewVisible" ref="formView" @refreshData="metaList"></form-view>
    <role-message v-if="roleMessageVisible" ref="roleMessageVisible"></role-message>
    <message-role v-if="messageRoleVisible" ref="messageRoleVisible"></message-role>
  </div>
</template>
<script>
  import {roleDelete, roleList} from "src/axios/management/authority/sysRole";
  import formView from './formView'
  import RoleMessage from './roleMessage'
  import MessageRole from './messageRole'
  import {PageData, HasPerm} from 'src/components/mixins'

  export default {
    name: "sys-menu",
    mixins: [PageData, HasPerm],
    components: {
      formView, RoleMessage, MessageRole
    },
    data() {
      return {
        queryData: this.metaQuery(),
        formViewVisible: false,
        messageRoleVisible: false,
        roleMessageVisible: false
      }
    },
    created() {
      this.metaList();
    },
    methods: {
      metaQuery() { // 查询数据封装格式
        return {
          searchNameCode: undefined,
          beginDate: undefined,
          endDate: undefined
        }
      },
      metaList() {
        if (this.hasPerm('sys:role:list')) {
          roleList(this.resData, this.queryData).then(res => {
            this.resData = res.data;
            if (0 === this.resData.pageNum) {
              this.resData.pageNum = 1;
            }
          });
        }
      },
      handleDelete(id, name) {
        if (this.hasPerm('sys:role:delete')) {
          this.$confirm(`确定删除${name}角色吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            roleDelete(id).then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.metaList()
                }
              });
            })
          })
        }
      },
      handleGoMenu(id) {
        this.$router.push("/authority/roleMenu/" + id)
      },
      handleFromView(id) {
        this.formViewVisible = true
        this.$nextTick(() => {
          this.$refs.formView.fillData(id)
        })
      },
      handleRoleMessage() {
        this.roleMessageVisible = true;
        this.$nextTick(() => {
          this.$refs.roleMessageVisible.metaList()
        })
      },
      handleMessageRole(id) {
        this.messageRoleVisible = true;
        this.$nextTick(() => {
          this.$refs.messageRoleVisible.metaList(id)
        })
      },
    }
  }
</script>

<style scoped>

</style>
