<template>
  <!--================================== 页面根标签使用v-if进行权限控制[permData] ======================================-->
  <!--============================ 页面所有操作 按钮 DOM块 使用v-if进行权限控制[permData] =================================-->
  <div v-if="hasPerm('sys:user:list')">
    <!--============================================主题内容==========================================================-->
    <div class="tablebox">
      <!--==========================================  查询 条件 ======================================================-->
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
          <el-input v-model="queryData.searchNameCode" size="small" placeholder="登录账户/用户名称"></el-input>
        </el-form-item>
        <el-form-item> <el-input v-model="queryData.searchOrgName" size="small" placeholder="机构名称"></el-input></el-form-item>
        <el-form-item> <el-input v-model="queryData.searchCaKey" size="small" placeholder="KEY码"></el-input></el-form-item>
        <el-form-item> <el-input v-model="queryData.searchOpenId" size="small" placeholder="openId"></el-input></el-form-item>
        <el-form-item>
         <el-button type="success" size="small" @click="handleQuery">查询 </el-button>
         <el-button type="warning" size="small" @click="queryData = metaQuery()">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="foot-btn foot-left">
        <span>
        <el-button
          size="small"
          type="success"
          @click="handleFromView()"
          v-if="hasPerm('sys:user:save')"
        > 新增用户
        </el-button>
        </span>
      </div>

      <!--================================================ table 数据表格 ============================================-->
      <div class="tableset">
        <el-table :data="resData.list" border stripe :empty-text="emptyText">

          <el-table-column label="登录账号" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.userCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.roleNames }}</span>
            </template>
          </el-table-column>
          <el-table-column label="机构性质" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-for="orgType in userOrgType(scope.row.accountType)"
                    :key="orgType.value"
              >
                {{orgType.label}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="机构名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.orgName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="绑定KEY" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.userCaKey }}</span>
            </template>
          </el-table-column>
          <el-table-column label="绑定微信" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.openId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div slot="content" class="operates">
                <template v-if="hasPerm('sys:user:role:list')">
                  <a href="javascript:;" @click="handleUserRole(scope.row.id)">分配角色</a>
                </template>
                <template v-if="hasPerm('sys:user:update')">
                  <a href="javascript:;" @click="handleUserUpdate(scope.row.id)">修改</a>
                </template>
                <template v-if="hasPerm('sys:user:delete')">
                  <a href="javascript:;" @click="handleDelete(scope.row.id,scope.row.userName)">删除</a>
                </template>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--==========================================分页工具条 ====================================================== -->
      <page-bar :data="resData" @refreshPage="refreshPage"></page-bar>
      <!--=============================子组件引入[根据需求引入在不同的位置] =============================================-->
      <user-role v-if="userRoleVisible" ref="userRole" @refreshData="metaList"/>
    </div>
  </div>
</template>

<script>
  // -----------------------------------引入当前页面需要的方法、组件-------------------------------------------------------
  import {userList, userDel} from 'src/axios/management/authority/sysUser'
  import {enumOrgTypeList} from "src/axios/common/common";
  import userRole from './userRole'
  import {PageData, HasPerm} from 'src/components/mixins'
  // ------------------------------------------------ 构建Vue对象name----------------------------------------------------
  export default {
    name: 'sys-user',
    mixins: [PageData, HasPerm],
    // ----------------------------------------------- 子组件注册 -------------------------------------------------------
    components: {
      userRole
    },
    // ------------------------------Vue模板内的动态数据来自data内定义、全局定义、computed、Props------------------------------
    data() {
      return {
        queryData: this.metaQuery(), // 查询初始化
        userRoleVisible: false,
        emptyText: '暂无数据',
        enumOrgType: [],
        userOrgTypeList: []
      }
    },
    // -------------------------------------created 首先进行拥有权限的初始化--------------------------------------------------
    // ----------------------DOM加载完成,各标签元素已加载完毕后,调用的方法.beforeCreated之后执行-----------------------------
    created() {
      this.metaList();
    },
    methods: {
      //------------------------------ 列表查询条件初始化方法[已确定数据类型初始化其类型] -----------------------------------
      metaQuery() { // 表单查询数据初始化
        return {
          searchNameCode: undefined,
          searchOrgName: undefined,
          searchOpenId: undefined,
          searchCaKey: undefined,
          beginDate: undefined,
          endDate: undefined
        }
      },
      // --------------------------------页面加载后立即调用的方法(由created钩子决定)----------------------------------------
      metaList() {
        // ----------------------------------- 先获取权限 拥有权限后才能继续请求 -------------------------------------------
        if (this.hasPerm('sys:user:list')) {
          userList(this.resData, this.queryData).then(res => {
            if (res.code == 200) {
              this.resData = res.data;
              // -------------------------- 所有分页方法返回的数据均需要进行此处理，解决循环请求 -------------------------------
              0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
              // ------------------------ 所有需要执行顺序的方法,均放在上一个方法的.then(()=>{})中-----------------------------
            } else {
              this.resData = this.metaData();
              this.emptyTxt = "数据获取失败!";
            }
          }).then(() => {
            enumOrgTypeList().then(res => {
              if (res.code == 200) {
                this.enumOrgType = res.data
              }
            })
          });
        }
      },
      // ---------------------------------------------- click等事件调用的处理方法 ----------------------------------------
      // 处理用户删除
      handleDelete(id, name) {
        this.$confirm(`确定删除用户『${name}』?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          userDel(id).then(res => {
            // -------------------------------------- 公共的信息提示方法 ---------------------------------------------
            this.$resMessage(res, {
              onClose: () => {
                this.metaList();
              }
            });
          })
        })
      },
      userOrgType(accountType) {
        let orgTypeNewList = [];
        this.enumOrgType.map(item => {
          if (accountType) {
            accountType.split('').forEach(
              itemValue => {
                if (itemValue === item.value) {
                  orgTypeNewList.push(item);
                }
              }
            )
          }
        });
        return orgTypeNewList;
      },
      // 展示用户详情表单
      handleFromView() {
        this.$router.push("/authority/userAdd/");
      },
      handleUserUpdate(id) {
        this.$router.push("/authority/userUpdate/" + id);
      },
      // 展示用户角色分配列表
      handleUserRole(id) {
        this.userRoleVisible = true;
        this.$nextTick(() => {
          this.$refs.userRole.fillData(id);
        })
      },
    }
  }
</script>


