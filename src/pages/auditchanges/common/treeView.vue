<template>
  <div class="treebox">
    <el-dialog :close-on-click-modal="false" title="选择文件夹" :visible.sync="visible" width="60%">
      <el-tree
        :data="treeData"
        node-key="id"
        default-expand-all
        @node-click="handleNodeClick"
        :render-content="renderContent">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSelectedFolder">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getFolderListByOrgId , getFolderListByOrgParentId,removeFile,removeFolder,removeFilesAndFolders} from 'src/axios/auditchanges/messageRegister/filesManage';
  export default {
    name: "tree-view",
    props:{
      parentId:{
        type: String,
        required: true
      }
    },
    data() {
      return {
        visible:false,
        treeData: [],
        //expandedKey: [],
        selectedFolder: {
          id: 0,
          name: '',
          type: ''
        },
        selectedObjs: {},
        isFiletree: false,
      }
    },
    created() {
    },
    methods: {
      // -------------------------------------------- 数据初始化  -----------------------------------------
      initData(selectedObjs){
        this.visible = true;
        console.log(selectedObjs,'selectedObjs')
        this.selectedObjs = selectedObjs;
        // 从主页面获取到：文件原根目录id（this.parentId），选择的文件id（ids）
        // console.log('parent id: '+ this.parentId);
        // console.log('selected id: '+ ids);
        // 加载根目录
        getFolderListByOrgId().then( res => {
            if (res.data.success) {
              console.log(res.data);
              let _arr = [];
              let treeData = res.data.rightBackJson.folderTreeDomain;
              this.expandedKey = new Array(treeData.id);
              treeData.children = res.data.rightBackJson.folderTreeDomainList;
              _arr.push(treeData);
              this.treeData = JSON.parse(JSON.stringify(_arr));
            } else {
              this.$message.error(res.data.exceptionMessage);
            }
          }
        )
      },
      handleSelectedFolder(){
        let folderId = this.selectedFolder.id;
          let fileremoveDomain={}
          fileremoveDomain.fileIdList=this.selectedObjs.fileIdList;
          fileremoveDomain.folderId = this.selectedFolder.id;
          fileremoveDomain.folderIdList= this.selectedObjs.folderIdList;
          console.log(fileremoveDomain,'fileremoveDomain')
          removeFilesAndFolders(fileremoveDomain).then( res =>{
            console.log(res.data,'res.data')
            if(res.data.success){
              this.visible = false;
              this.$emit('refreshList',res.data.rightBackJson.catFolderMessage.id)
            }else{
              return;
            }
          })
          console.log(1)
      },
      // 处理返回的树数据
      getTreeData(allData) {
        let folderDomainList = allData.folderTreeDomainList || [];
        let fileDomainList = allData.fileTreeDomainList || [];
        return folderDomainList.concat(fileDomainList);
      },
      // 点击文件夹树
      handleNodeClick(data) {
        this.selectedFolder.id = data.id;
        this.selectedFolder.type = data.type || 'folder';
        this.selectedFolder.name = data.label;
        if(data.children){
          return false;
        }else{
          this.appendChild(data, data.id)
        }
      },
      appendChild(data, parentId) {
        if (!data.children) {
          getFolderListByOrgParentId(parentId).then(res => {
            if (res.data.success) {
              const allData = res.data.rightBackJson;
              const newChild = this.getTreeData(allData);
              this.$set(data, 'children', []);
              if(newChild.length>0){
                data.children.push(newChild[0]);
              }else{
                return false;
              }
            } else {
              this.$message.error(res.data.exceptionMessage);
            }
          })

        }

      },
      renderContent(h, { node, data, store }) {
        console.log(node,'node')
        return (<span class="file-icons">{node.label}</span>);
      }
    }
  }
</script>

<style>
  @import "../../../assets/css/auditchanges.css";
</style>
