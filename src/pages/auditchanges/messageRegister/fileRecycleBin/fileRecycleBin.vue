<template>
  <div class="tablebox">
    <div class="foot-btn">
      <div class="foot-left">
        <!--<el-button type="primary" size="small" @click="handleNewFolder" icon="iconfont icon-wenjian">-->
        <!--新建文件夹-->
        <!--</el-button>-->
        <!--<el-button type="danger" size="small" @click="handleUpload" icon="el-icon-upload2">-->
        <!--上传文件-->
        <!--</el-button>-->
        <el-button type="primary" size="small" @click="handleRestoreFilesAndFolders">
          恢复
        </el-button>

        <!--<el-button size="small" @click="handleUpload" icon="">-->
        <!--下载-->
        <!--</el-button>-->
        <!--<el-button size="small" @click="handleUpload">-->
        <!--删除-->
        <!--</el-button>-->
      </div>
    </div>
    <div class="clearfixed">
      <span class="flo-right input-group">
      <input type="file" id="noticeFile" multiple="multiple" @change="getFile($event)" style="display:none;">
        <input type="text" v-model="query" placeholder="搜索您的文件"></input>
        <button type="button" class="el-icon-search"></button>
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
        width="100%"
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
                <el-input v-model="scope.row.name" :value="scope.row.name"
                          class="width-300" size="small"></el-input>{{scope.row.type}}&nbsp;&nbsp;
                <a href="javascript:;" class="el-icon-check" @click="handleEdit(scope.row)"></a>&nbsp;&nbsp;
                <a href="javascript:;" class="el-icon-close" @click="handleCancel(scope.row.id)"></a>
              </span>
              </div>
            </template>
            <template v-else>
              <i :class="getFileStyle(scope.row.type)"></i>
              <span>{{ scope.row.name + (scope.row.type || '')}}</span>
              <!--<el-button type="text" size="small" @click="handleEdit(scope.row,scope.row.name)"-->
              <!--v-show="showRename===scope.row.id">重命名-->
              <!--</el-button>-->
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope" v-if="scope.row.id">
            <!--<el-button @click="list(scope.row.id)" v-if="scope.row.type===null"-->
            <!--type="text" size="small">打开-->
            <!--</el-button>-->
            <!--<el-button @click="handleClick(scope.row.id)" v-if="getType(scope.row.type)===1"-->
            <!--type="text" size="small">查看-->
            <!--</el-button>-->
            <!--<el-button @click="handleFileDown(scope.row.id)" v-if="getType(scope.row.type)===2"-->
            <!--type="text" size="small">下载-->
            <!--</el-button>-->
            <!--<el-button type="text" size="small" @click="handleDelete(scope.row ,scope.row.id)">删除</el-button>-->
            <!--<div class="operates">-->
              <!--<span><a class="operation-btn" @click="handleRestore(scope.row ,scope.row.id)">恢复</a></span>-->
            <!--</div>-->

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- ============================弹窗引用外部页面============================ -->
    <!--【移动到】 ==> 选择文件夹 -->
    <tree-view ref="treeView" v-if="dialogVisible" :parent-id="folderData.catFolderMessage.id" @handleSelectedFolder="selectedData"></tree-view>

  </div>
</template>

<script>
  import {
    initFiles,
    recycleFile,
    recycleFolder,
    recycleFilesAndFolders
  } from 'src/axios/auditchanges/messageRegister/fileRecycleBin';
  // import fileUpload from 'js-file-download';
  // import treeView from 'src/pages/auditchanges/messageRegister/filesmanage/treeView';

  export default {
    name: 'fileRecycleBin',
    components: {
      // treeView
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
        dialogVisible: false
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
        let arrIds = [];
        let arrNames = [];
        if(allData.catFolderMessage){
           arrIds = allData.catFolderMessage.allPathId.split('#');
           arrNames = allData.catFolderMessage.allPath.split('#');
        }
        // let arrIds = allData.catFolderMessage.allPathId.split('#');
        // let arrNames = allData.catFolderMessage.allPath.split('#');
        let crumbs = [];
        for (let i = 0; i < arrIds.length; i++) {
          crumbs.push({id: arrIds[i], name: arrNames[i]});
        }
        console.log('crumbs=======', crumbs);
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
        obj = document.getElementById('noticeFile').click();

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
                    // console.log(allData);
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
                    // console.log(allData);
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
            //
            saveFolder(parentFolderId, _name).then(res => {
              if (res.data.success) {
                const allData = res.data.rightBackJson;
                console.log(allData);
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
      handleRestoreFilesAndFolders(){
      alert("调用function：recycleFilesAndFolders");
      },
      handleRestore(row, id) {
          //向后台请求删除数据，并重新刷新列表
          var fileType = row.type;
          if (fileType == null || fileType == "undefind" || fileType == "" || fileType == "null") {
            // alert("文件夹");
            this.$confirm('此操作将恢复此文件夹及所有子文件夹及文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              recycleFolder(id).then(res => {
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
          }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
          } else {
            // alert("文件");
            this.$confirm('此操作将恢复此文件及其父文件夹, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              recycleFile(id).then(res => {
              if (res.data.success) {
                // this.$message.error(res.data.exceptionMessage);
                const allData = res.data.rightBackJson;
                console.log(allData);
                // 重新加载面包屑和表格数据
                this.folderData = allData;
                this.getData(allData);
              } else {
                this.$message.error(res.data.exceptionMessage);
              }
            });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
      },
      handleSelectionChange(val){
        let _arr = []
        val.map(item => {
          _arr.push(item.id);
        })
        this.selectedFiles = _arr;
      },
      handleMoveFiles(){
        const tis = this;
        tis.dialogVisible = true;
        const _ids = this.selectedFiles;
        console.log(_ids);
        if(_ids.length > 0){
          this.$nextTick(() => {
            // 通过组件中设置的ref属性调取formView.vue中的fillData()方法加载弹窗内容
            this.$refs.treeView.initData(_ids);
          })
        }else{
          return this.$message({
            message: '请选择要移动的文件',
            type: 'warning'
          });
        }
      },
      selectedData(data){
        console.log('selected data===', data);
      }
    }
  }
</script>

<style>

</style>
