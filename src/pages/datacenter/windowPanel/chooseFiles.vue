<template>
  <!--<div class="treebox">-->
  <div class="zbl_treebox">
    <el-dialog
      title="选择文件"
      width="60%"
      :visible.sync="visible"
      append-to-body>
      <el-tree
        class="audit-tree-box"
        :data="treeData"
        ref="tree"
        node-key="id"
        show-checkbox
        default-expand-all
        :render-after-expand="true"
        @node-click="handleNodeClick"
        :render-content="renderContent">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="toFileManage" type="warning">选择文件</el-button>
        <el-button size="small" type="primary" @click="handleSelectedFolder">确 定</el-button>
        <el-button size="small" @click="visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <div>
      <add-choose-file ref="addChooseFile" v-if="dialogVisible" @update="updateData" :refname="refName"></add-choose-file>
    </div>
  </div>
</template>

<script>
  import {getFolderAndFileListByOrgId,getFolderAndFileListByOrgParentId } from 'src/axios/auditchanges/messageRegister/filesManage';
  import addChooseFile from 'src/pages/auditchanges/messageRegister/productMessageRegister/addChooseFile'
  export default {
    name: "choose-files",
    components: {
      addChooseFile
    },
    props:{
//      parentId:{
//        type: String,
//        required: true
//      }
    },
    data() {
      return {
        dialogVisible: false,
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
        refName:''
      }
    },
    created() {
    },
    methods: {
      updateData(data) {
        this.initData(data);
      },
      // -------------------------------------------- 数据初始化  -----------------------------------------
      initData(refName){
        this.treeData = [];
        this.refName = refName;
        this.visible = true;
        // this.selectedObjs = selectedObjs;
        // 从主页面获取到：文件原根目录id（this.parentId），选择的文件id（ids）
        // console.log('parent id: '+ this.parentId);
        // console.log('selected id: '+ ids);
        // 加载根目录
        getFolderAndFileListByOrgId().then( res => {
            if (res.data.success) {
              let _arr = [];
              let treeData = res.data.rightBackJson.folderTreeDomain;
              this.expandedKey = new Array(treeData.id);
              if(!!res.data.rightBackJson.folderTreeDomainList){
                treeData.children = res.data.rightBackJson.folderTreeDomainList;
              }else{
                treeData.children = [];
              }
              treeData.children = treeData.children.concat(res.data.rightBackJson.fileTreeDomainList);
              _arr.push(treeData);
              this.treeData = JSON.parse(JSON.stringify(_arr));

            } else {
              this.$message.error(res.data.exceptionMessage);
            }

            console.log(this.treeData)
            this.$nextTick(()=>{
              this.checkBoxHide();
            })
          }
        )

      },
      handleSelectedFolder(){
        let selected = this.$refs.tree.getCheckedNodes();
        console.log(selected,'selected')
        let selectedId =[]
        for(let i=0;i<selected.length;i++){
          if(selected[i].type){
            selectedId.push(selected[i].id);
          }
        }
        console.log(selectedId,122222)
        this.selectedObjs.folderId = selectedId;
        if(this.selectedObjs.folderId.length<=5){
          if( this.selectedObjs.folderId.length <= 0){
            return this.$message({
              message: '请打开文件目录，选择具体文件',
              type: 'warning'
            });
          }else{
            // console.log('向后台提交的最终数据===', this.selectedObjs);
            console.log('向后台提交的最终数据===', this.selectedObjs.folderId);
            this.$emit('handleSelectedFolder',
              {'refName':this.refName,"data":this.selectedObjs.folderId}); //向主页面传递数据
          }
        }else{
          return this.$message({
            message: '不可选择超过五个资源',
            type: 'warning'
          });
        }
        this.visible = false;
      },
      // 处理返回的树数据
      getTreeData(allData) {
        let folderDomainList = allData.folderTreeDomainList || [];
        let fileDomainList = allData.fileTreeDomainList || [];
        let folderOrfileDomainList = folderDomainList.concat(fileDomainList);
        return folderOrfileDomainList;
      },
      // 点击文件夹树
      handleNodeClick(data) {
        this.selectedFolder.id = data.id;
        this.selectedFolder.type = data.type || 'folder';
        this.selectedFolder.name = data.label;
        if(data.children){
          return false;
        }else{
          this.appendChild(data, data.id);
        }
      },
      appendChild(data, parentId) {
        if (!data.children) {
          getFolderAndFileListByOrgParentId(parentId).then(res => {
            if (res.data.success) {
              console.log(res.data,'res.data')
              const allData = res.data.rightBackJson;
              const newChild = this.getTreeData(allData);
              console.log(newChild,'newChild')
              this.$set(data, 'children', []);
              if(newChild.length>0){
                // data.children.push(newChild[0]);
                data.children = newChild;
                this.$nextTick(()=>{
                  this.checkBoxHide()
                })

              }else{
                this.$message.warning('当前文件夹为空文件夹');
                return false;
              }
            } else {
              this.$message.error(res.data.exceptionMessage);
            }
          })

        }



      },
      renderContent(h, { node, data, store }) {
        if(data.type==null){
          return (<span class="iconfont icon-wenjian choose-file">{node.label}</span>);
        }else if(data.type=='.jpg'||data.type=='.png'||data.type=='.jpeg'){
          return (<span class="el-icon-picture choose-picture">{node.label}</span>);
        }else{
          return (<span class="el-icon-document">{node.label}</span>);
        };
      },
      toFileManage(){
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.addChooseFile.list();
        })
        // this.$router.push({
        //   path:'/AUDIT/messageRegister/filesManage'
        // })
      },
      checkBoxHide(){
        let fileNodes = document.getElementsByClassName('choose-file');
        for(let i = 0 ; i < fileNodes.length ; i ++ ) {
          fileNodes[i].previousElementSibling.style.display = 'none';
        }
      }
  },
    watch:{
      treeData(){
        this.$nextTick(()=>{
          this.checkBoxHide()
        })
      }
    }
  }
</script>

<style>
  @import "../../../assets/css/datacenter.css";
</style>
