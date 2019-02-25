<template>
  <div class="tablebox">

    <div class="foot-btn">
      <div class="foot-left">
        <el-button type="success" size="small" @click="handleNewFolder" icon="iconfont icon-wenjian">
          新建文件夹
        </el-button>
        <el-button type="primary" size="small" @click="handleUpload" icon="el-icon-upload2">
          上传文件
        </el-button>
        <el-button type="warning" size="small" @click="handleMoveFiles">
          移动到..
        </el-button>
      </div>
    </div>
      <!--<el-button size="small" @click="handleUpload" icon="">-->
      <!--下载-->
      <!--</el-button>-->
      <!--<el-button size="small" @click="handleUpload">-->
      <!--删除-->
      <!--</el-button>-->
    <div class="table-caption">
      <span class="flo-right input-group">
      <input type="file" id="noticeFile" multiple="multiple" @change="getFile($event)" style="display:none;">
        <input type="text" v-model="query" placeholder="搜索您的文件" @keyup.enter="searchEnterFun">
        <button type="button" class="el-icon-search" @click="searchFile"></button>
      </span>
    </div>

    <div class="table-caption" v-model="crumbs">
      <template v-if="crumbs.length === 1">
        全部文件
      </template>
      <template v-else>
        <div class="file-crumbs">
          <!--<span><a href="javascript:;" @click="goLastLevel()">返回上一级</a></span>-->
          <span v-for="item in crumbs" :key="item.id"><a href="javascript:;"
                                                         @click="list(item.id)">{{item.name}}</a></span>
        </div>
      </template>
    </div>

    <!-- 表格列表 -->
    <div class="tableset">
      <el-table
        :data="resData"
        class="files-table"
        border
        @cell-mouse-enter="overShow"
        @cell-mouse-leave="outHide"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column label="文件名">
          <template slot-scope="scope">
            <template v-if="isEdit === scope.row.id">
              <div class="edit-cell">
                <span>
                  <el-input
                    v-model="scope.row.name"
                    :value="scope.row.name"
                    class="width-300" size="small"></el-input>{{scope.row.type}}&nbsp;&nbsp;
                  <a href="javascript:;" class="el-icon-check" @click="handleEdit(scope.row)"></a>&nbsp;&nbsp;
                  <a href="javascript:;" class="el-icon-close" @click="handleCancel(scope.row.id)"></a>
                </span>
              </div>
            </template>
            <template v-else>
              <i :class="getFileStyle(scope.row.type)"></i>
              <span :class="(scope.row.type===null||getType(scope.row.type)===2)?'operation-btn':''" @click="doOperate(scope.row.type,scope.row.id)">{{ scope.row.name + (scope.row.type || '')}}</span>
              <a  @click="handleEdit(scope.row,scope.row.name)"
                         v-show="showRename===scope.row.id">重命名
              </a>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope" v-if="scope.row.id">
            <div class="operates">
              <span v-if="scope.row.type===null"><a href="javascript:;" @click="list(scope.row.id)"
                 class="operation-btn" type="text" size="small">打开
              </a></span>
              <span v-if="getType(scope.row.type)===1"><a href="javascript:;" @click="handleClick(scope.row.id)"
                 class="operation-btn" type="text" size="small">查看
              </a></span>
              <span v-if="getType(scope.row.type)===2"><a href="javascript:;" @click="handleFileDown(scope.row.id)"
                 class="operation-btn" type="text" size="small">下载
              </a></span>
              <span><a href="javascript:;" type="text" size="small" @click="handleDelete(scope.row ,scope.row.id)"
                 class="operation-btn">删除</a></span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ============================弹窗引用外部页面============================ -->
    <!--【移动到】 ==> 选择文件夹 -->
    <tree-view ref="treeView" v-if="dialogVisible" @refreshList="list" :parent-id="folderData.catFolderMessage.id"
               @handleSelectedFolder="selectedData"></tree-view>
    <!--弹框-->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="imgZoomShow"
      :center="true"
      width="100%"
      append-to-body
      class="preview-dialog-box"
      :close="handleCloseZoom">
      <div class="preview-dialog-table">
        <div class="preview-table-cell">
          <!--图片层-->
          <img ref="previewImg" class="preview-dialog-img" :src="fileData.url" alt="">
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    deleteFile,
    deleteFolder,
    downloadFile,
    initFiles,
    openFolder,
    renameFile,
    renameFolder,
    saveFolder,
    uploadFile,
    selectFileAndFolder,
    downloadBase64File
  } from 'src/axios/auditchanges/messageRegister/filesManage';
  import fileUpload from 'js-file-download';
  import treeView from 'src/pages/auditchanges/common/treeView';

  export default {
    name: 'filesManage',
    components: {
      treeView
    },
    data() {
      return {
        folderData: {},
        crumbs: [],
        query: '',
        resData: [],
        isEdit: '',
        oldname: '',
        showRename: false,
        parentFolderId: '',
        file: [],
        selectedFiles: [],
        selectedFolders: [],
        dialogVisible: false,
        imgZoomShow: false,
        fileData: {}
      }
    },
    created() {
      this.list();
    },
    methods: {
      // ------------------------------------------------- 处理方法 ----------------------------------------
      handleFileDown(fileId) {
        // alert("文件下载");
        downloadFile(fileId).then(res => {
          let fileName = res.headers['content-disposition'].split('filename=')[1];
          let contentType = res.headers['content-type'];
          fileName = decodeURI(fileName);
          fileUpload(res.data, fileName, contentType)
        });
      },
      //  获取文件列表
      list(pathId) {
        console.log(pathId, 'pathId')
        if (pathId) {// 如果有pathId参数，则请求子文件夹数据
          openFolder(pathId).then(res => {
            if (res.data.success) {
              const allData = res.data.rightBackJson;
              // alert(JSON.stringify(allData));
              this.folderData = allData;
              this.getData(allData);
            } else {
              this.$message.error(res.data.exceptionMessage);
            }
          })

        } else {// 如果没有pathId参数，则请求返回根目录数据

          initFiles().then(res => {
            if (res.data.success) {
              const allData = res.data.rightBackJson;
              this.folderData = allData;
              this.getData(allData);
            } else {
              this.$message.error(res.data.exceptionMessage);
            }
          })

        }
      },
      // 处理返回的数据
      getData(allData) {
        this.folderData = allData;
        console.log(allData);
        // 处理表格数据
        let folderDomainList = allData.folderDomainList || [];
        let fileDomainList = allData.fileDomainList || [];
        this.resData = folderDomainList.concat(fileDomainList);
        // 处理面包屑
        let arrIds = allData.catFolderMessage.allPathId.split('#');
        let arrNames = allData.catFolderMessage.allPath.split('#');
        let crumbs = [];
        for (let i = 0; i < arrIds.length; i++) {
          crumbs.push({id: arrIds[i], name: arrNames[i]});
        }
        this.crumbs = crumbs;
      },
      overShow(row) {
        this.showRename = row.id;
      },
      outHide(row) {
        this.showRename = undefined;
      },
      // 点击【新建文件夹】按钮
      handleNewFolder() {
        const _newData = {
          type: null,
          name: '新建文件夹',
          id: ''
        };
        this.isEdit = '';
        this.resData.push(_newData);
      },
      handleUpload() {
        let obj = document.getElementById('noticeFile').click();
      },
      getFile(event) {
        const parentFolderId = this.folderData.catFolderMessage.id;
        //文件上传

        var files = event.target.files;
        let formData = new FormData();
        formData.append('folderId', parentFolderId);
        for (let f of files) {
          formData.append('files', f);
        }
        uploadFile(formData).then(res => {
          if (res.data.success) {
            const allData = res.data.rightBackJson;
            // alert(JSON.stringify(allData));
            this.folderData = allData;
            this.getData(allData);
          } else {
            this.$message.error(res.data.exceptionMessage);
          }
        })

      },
      getFileStyle(type) {
        const _type = this.getType(type);
        const _styles = ['iconfont icon-wenjian blue', 'el-icon-picture red', 'el-icon-document'];
        return _styles[_type];
      },
      getType(type) {
        const _t = type || '';
        const arr = _t.split('.');
        let t = 0;
        const _type = arr[arr.length - 1].toLowerCase();
        if (_type === '') {
          t = 0;
        } else if (_type === 'jpg' || _type === 'jpeg' || _type === 'png' || _type === 'bmp') {
          t = 1;
        } else {
          t = 2
        }
        return t;
      },
      // 验证输入框中的名称
      checkName(name) {
        const _name = name.trim();
        if (_name === '') {
          this.$message.error('文件夹名称不能为空！');
          row.name = this.oldname;
          return false;
        } else {
          return true;
        }
      },
      // 编辑（重命名）单条数据
      handleEdit(row, oldName) {
        const parentFolderId = this.folderData.catFolderMessage.id;
        const _id = row ? row.id : '';
        if (_id) {
          // 传ID值，操作【重命名】
          this.oldname = oldName;
          this.isEdit = _id;
          if (this.checkName(row.name)) {
            if (!oldName) {
              // 不传oldName值，请求后台【重命名】
              var fileType = row.type;
              if (fileType == null || fileType == "undefind" || fileType == "" || fileType == "null") {
                renameFolder(_id, row.name).then(res => {
                  if (res.data.success) {
                    const allData = res.data.rightBackJson;
                    // 重新加载面包屑和表格数据
                    this.folderData = allData;
                    this.getData(allData);
                  } else {
                    this.$message.error(res.data.exceptionMessage);
                  }
                })
              } else {
                renameFile(_id, row.name).then(res => {
                  if (res.data.success) {
                    const allData = res.data.rightBackJson;
                    // 重新加载面包屑和表格数据
                    this.folderData = allData;
                    this.getData(allData);
                  } else {
                    this.$message.error(res.data.exceptionMessage);
                  }
                })
              }
              this.isEdit = '';
            }
          }
        } else {
          // 不传oldName值，操作【新增文件夹】
          const _name = row.name;
          if (this.checkName(_name)) {
            //向后台请求添加数据，并重新刷新列表
            saveFolder(parentFolderId, _name).then(res => {
              if (res.data.success) {
                const allData = res.data.rightBackJson;
                // 重新加载面包屑和表格数据
                this.folderData = allData;
                this.getData(allData);
              } else {
                this.$message.error(res.data.exceptionMessage);
              }
            });
            this.isEdit = '';
          }
        }
      },
      // 【取消】操作
      handleCancel(id) {
        const rows = this.resData;
        rows.forEach((row, index) => {
          if (row.id === id) {
            if (id === '') {
              rows.splice(index, 1)
            } else {
              row.name = this.oldname;
              this.isEdit = '';
              return false;
            }
          }
        });
      },
      handleDelete(row, id) {
        this.$confirm('此操作将该文件移入回收站, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //向后台请求删除数据，并重新刷新列表
          var fileType = row.type;
          if (fileType == null || fileType == "undefind" || fileType == "" || fileType == "null") {
            deleteFolder(id).then(res => {
              if (res.data.success) {
                // this.$message.error(res.data.exceptionMessage);
                const allData = res.data.rightBackJson;
                // 重新加载面包屑和表格数据
                this.folderData = allData;
                this.getData(allData);
              } else {
                this.$message.error(res.data.exceptionMessage);
              }
            });
          } else {
            deleteFile(id).then(res => {
              if (res.data.success) {
                // this.$message.error(res.data.exceptionMessage);
                const allData = res.data.rightBackJson;
                // 重新加载面包屑和表格数据
                this.folderData = allData;
                this.getData(allData);
              } else {
                this.$message.error(res.data.exceptionMessage);
              }
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSelectionChange(val) {
        let _fileArr = [];
        let _folderArr = [];
        val.map(item => {
          if (item.type) {
            _fileArr.push(item.id);
          } else {
            _folderArr.push(item.id);
          }
        })
        this.selectedFiles = _fileArr;
        this.selectedFolder = _folderArr;
      },
      handleMoveFiles() {
        const tis = this;
        tis.dialogVisible = true;
        const _ids = this.selectedFiles.concat(this.selectedFolder);
        if (_ids[0]) {
          let objFiles = {fileIdList: this.selectedFiles, folderIdList: this.selectedFolder};
          console.log(objFiles, "objFiles")
          this.$nextTick(() => {
            // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
            this.$refs.treeView.initData(objFiles);
          })
        } else {
          return this.$message({
            message: '请选择要移动的文件',
            type: 'warning'
          });
        }
      },
      selectedData(data) {
        // 所选择的树节点id
        console.log('selected data===', data);
      },
      //模糊查询
      searchEnterFun(e){
        var keyCode = window.event? e.keyCode:e.which;
        if(keyCode == 13 ){
          this.searchFile();
        }
      },
      searchFile() {
        console.log(this.query)
        selectFileAndFolder(this.query).then(res => {
          console.log(res, "res.data");
          if (res.data.success) {
            let fileDomainList = res.data.rightBackJson.fileDomainList
            let folderDomainList = res.data.rightBackJson.folderDomainList
            this.resData = folderDomainList.concat(fileDomainList);
          } else {
            console.log("出错")
          }
        })
      },
      handleClick(fileId) {//查看弹出遮罩层
        this.imgZoomShow = true;
        downloadBase64File(fileId).then(res => {
          if (res.data.success) {
            this.fileData = res.data.rightBackJson;
            this.fileData.url = 'data:application/octet-stream;base64,' + this.fileData.base64;
          }
          else {
            this.$message.error('服务器出错，请刷新重试');
          }
          console.log(this.fileData, 'this.fileData')
        })
      },
      //关闭弹层
      handleCloseZoom() {
        this.imgZoomShow = false;
      },
      //点击名字也可以进行操作
      doOperate(itemType,itemId){
        let fileType = this.getType(itemType);
        if( itemType === null ){
          this.list(itemId);
        }
        else if( fileType === 1 ){
          this.handleClick(itemId);
        }
        else if( fileType === 2 ){
          this.handleFileDown(itemId);
        }
      }
    }
  }
</script>

<style>
  @import "./../../../../assets/css/auditchanges.css";
</style>
