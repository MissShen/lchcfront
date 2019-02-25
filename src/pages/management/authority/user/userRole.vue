<template>
  <el-dialog
    title="分配角色"
    top="4vh"
    width="50%"
    :close-on-click-modal="false"
    :visible.sync="visible"
    v-if="permData.user_role_list"
  >
    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData.list"
        v-loading="loading"
        border
        stripe>
        <el-table-column label="序号" header-align="center" width="40px" align="center">
          <template slot-scope="scope">
            <input type="checkbox" class="checkbox"
                   @change="handleChecked(scope.row)"
                   :checked="scope.row.isChecked==='true'"/>
          </template>
        </el-table-column>
        <el-table-column label="角色名称">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="small">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-if="permData.user_role_save" size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {userRoleList, userRoleDefaultList, userRoleSave} from "src/axios/management/authority/sysUser";
  import {mapGetters} from 'vuex'

  export default {
    name: "user-role",
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        id: undefined, //用户id
        visible: false,
        loading: true,
        resData: this.metaData(),  // 展示数据初始化
        queryData: this.metaQuery(),// 查询数据初始化
        permData: this.metaPerm(), // 权限初始化
        userRole: [] // 用户角色
      }
    },
    methods: {
      metaData() { // 前后台交互数据封装格式
        return {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          pages: 0,
          list: []
        }
      },
      metaQuery() { // 表单查询数据初始化
        return {
          searchNameCode: undefined,
          beginDate: undefined,
          endDate: undefined
        }
      },
      metaPerm() {
        return {
          user_role_list: false,
          user_role_save: false,
        }
      },
      metaHasPerm() {
        this.permData.user_role_list = this.perms['sys:user:role:list'];
        this.permData.user_role_save = this.perms['sys:user:role:save'];
      },
      fillData(id) {
        this.metaHasPerm();
        if (this.permData.user_role_list) {
          if (this.id !== id) {  // 不是一个用户则重置分页参数，返回首页
            this.resData = this.metaData();
          }
          this.id = id || undefined;
          this.visible = true;
          if (this.id) {
            userRoleList(this.id).then(res => {
              this.userRole = res.data
            }).then(() => {
              userRoleDefaultList(this.resData, this.id).then(res => {
                this.resData = res.data;
                this.loading = false;
                if (0 === this.resData.pageNum) {
                  this.resData.pageNum = 1
                }
              })
            })
          }
        }
      },
      handleSizeChange(val) {
        this.resData.pageSize = val;
        this.fillData(this.id)
      },
      handleCurrentChange(val) {
        this.resData.pageNum = val;
        this.fillData(this.id)
      },
      handleChecked(row) {
        row.isChecked = (row.isChecked==='true')?'false':'true';
        if (row.isChecked === 'true') {
          this.userRole.push(row)
        } else {
          this.userRole.splice(this.userRole.findIndex(v => v.id === row.id), 1);
        }
      },
      dataFormSubmit() {
        let idStr = this.userRole.map(item => {
          return item.id
        });
        userRoleSave(idStr.join(',').toString(), this.id).then(res => {
          this.$resMessage(res, {
            onClose: () => {
              this.visible = false;
              this.$emit('refreshData')
            }
          });
        })
      },
    }
  }
</script>

<style>
  .checkbox {
    background-color: #409eff;
    border-color: #409eff;
    font-size: 14px;
    cursor: pointer;
  }
</style>

