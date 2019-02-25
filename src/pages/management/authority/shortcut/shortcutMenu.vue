<template>
  <el-dialog
    title="快捷菜单"
    top="4vh"
    :close-on-click-modal="false"
    :before-close="handleClose"
    width="50%"
    :visible.sync="visible">
    <strong>已选快捷菜单</strong>
    <template v-if="selectedTags.length>0">
      <div class="tagbox" v-if="selectedTags.length>0">
        <el-tag
          v-for="(tag, index) in selectedTags"
          :key="index"
          size="medium"
          closable
          type="warning"
          @close="handleDelete(tag.id,tag.resourceName)">
          {{tag.resourceName}}
        </el-tag>
      </div>
    </template>
    <template v-else>
      <span class="gray"> （无）</span>
    </template>
    <div class="tableset">
      <el-checkbox-group v-model="multipleSelection">
        <el-table
          :data="shortcutData"
          style="width: 100%"
          border
          stripe>
          <el-table-column label="所属菜单" width="200">
            <template slot-scope="scope">
              <div>{{ scope.row.resourceName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="快捷菜单">
            <template slot-scope="scope">
                <el-checkbox v-for="(item, index) in scope.row.resources" :key="index"
                             :label="item.id" name="type">{{item.shortcutMenuName}}</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-checkbox-group>
    </div>
    <!-- 表格分页 -->
    <!--<div class="pagebox">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30]"
        :total="shortcutData.total"
        :page-size="shortcutData.pageSize"
        :page-count="shortcutData.pages"
        :current-page.sync="shortcutData.pageNum">
      </el-pagination>
    </div>-->
    <span slot="footer" class="dialog-footer">
      <!--<el-button class="el-button-pale" size="small" @click="visible=false">关闭</el-button>-->
      <el-button type="primary" size="small" @click="handleDataSubmit()">提交</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import {notHasMenuList, shortcutSave} from "src/axios/management/authority/shortcut";
  import {hasMenuList, shortcutDelete} from "src/axios/management/authority/shortcut";


  export default {
    name: "shortcut-menu",
    data() {
      return {
        visible: false,
        selectedTags: [],
        shortcutData: [],
        multipleSelection: []
      };
    },
    created() {
      this.showView();
    },
    methods: {
      showView() {
        this.visible = true
        this.metaAddMenuList();
        this.metaHasMenuList();
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      metaData() {
        return {
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
      metaAddMenuList() {
        notHasMenuList(this.shortcutData).then(res => {
          let arr = [];
          res.data.forEach((item)=>{
            let flag = true;
            if(arr.length>0){
              arr.some((subItem)=>{
                if(subItem.resourceName === item.resourceName){
                  subItem.resources.push(item);
                  flag = false;
                }
              })
            }
            if((arr.length===0) || flag){
              let resourceItem = new Array(item);
              arr.push({
                'resourceName': item.resourceName,
                'resources': resourceItem
              })
            }
          })
          this.shortcutData = res.data;
          this.shortcutData = arr;
          /*if(0===this.shortcutData.pageNum){
            this.shortcutData.pageNum=1
          }*/
        })
      },
      metaHasMenuList() {
        hasMenuList().then(res => {
          this.selectedTags = res.data
        })
      },
      handleDataSubmit() {
        shortcutSave(this.multipleSelection.toString()).then(res => {
          this.$resMessage(res,{
            onClose: () => {
              this.metaAddMenuList();
              this.metaHasMenuList();
            }
          });
        })
      },
      handleDelete(id) {
        this.$confirm(`确定删除该快捷菜单吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          shortcutDelete(id).then(res => {
            this.$resMessage(res,{
              onClose: () => {
                this.metaHasMenuList();
                this.metaAddMenuList();
              }
            });
          })
        })
      },
      handleClose(){
        this.visible = false;
        this.$emit('closeShortcutView');
      }
    }
  }
</script>

<style scoped>

</style>
