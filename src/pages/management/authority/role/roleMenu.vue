<template>
  <div v-if="permData.role_resource_list||permData.role_resource_save" class="tab-box">
    <el-tabs v-model="activeTabs" class="menu-tree">
      <el-tab-pane :label="busSysData[0].systemName" name="first">
        <el-tree
          :data="treeData0"
          ref="treeData0"
          @check-change="handleTreeCheck()"
          :default-checked-keys="updateNodeIds"
          show-checkbox
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </el-tab-pane>
      <el-tab-pane :label="busSysData[1].systemName" name="second">
        <el-tree
          :data="treeData1"
          ref="treeData1"
          @check-change="handleTreeCheck()"
          :default-checked-keys="updateNodeIds"
          show-checkbox
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </el-tab-pane>
      <el-tab-pane :label="busSysData[2].systemName" name="third">
        <el-tree
          :data="treeData2"
          ref="treeData2"
          @check-change="handleTreeCheck()"
          :default-checked-keys="updateNodeIds"
          show-checkbox
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </el-tab-pane>
      <el-tab-pane :label="busSysData[3].systemName" name="fourth">
        <el-tree
          :data="treeData3"
          ref="treeData3"
          @check-change="handleTreeCheck()"
          :default-checked-keys="updateNodeIds"
          show-checkbox
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </el-tab-pane>
      <el-tab-pane :label="busSysData[4].systemName" name="fifth">
        <el-tree
          :data="treeData4"
          ref="treeData4"
          @check-change="handleTreeCheck()"
          :default-checked-keys="updateNodeIds"
          show-checkbox
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </el-tab-pane>
      <el-tab-pane :label="busSysData[5].systemName" name="sixth">
        <el-tree
          :data="treeData5"
          ref="treeData5"
          @check-change="handleTreeCheck()"
          :default-checked-keys="updateNodeIds"
          show-checkbox
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </el-tab-pane>
      <el-tab-pane :label="busSysData[6].systemName" name="seventh">
        <el-tree
          :data="treeData6"
          ref="treeData6"
          @check-change="handleTreeCheck()"
          :default-checked-keys="updateNodeIds"
          show-checkbox
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </el-tab-pane>
    </el-tabs>
    <div class="ft-btn">
      <el-button type="primary" size="small" @click="handleDataForm">确定</el-button>
      <el-button size="small" type="warning" v-if="permData.role_resource_save" @click="goBack()">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {busSysList} from "src/axios/management/authority/headMenu";
  import {userResourceList, roleResourceList, roleResourceSave} from "src/axios/management/authority/sysRole";
  import {treeDataTranslate, removeFromArray} from "src/utils/index";
  import {mapGetters} from 'vuex'

  const treeData = ['treeData0', 'treeData1', 'treeData2', 'treeData3', 'treeData4', 'treeData5', 'treeData6']

  export default {
    name: "role-menu",
    computed: {
      ...mapGetters([
        'perms',
      ]),
    },
    data() {
      return {
        permData: this.metaPerm(),
        id: undefined, //角色id
        parentIds: [],
        activeTabs: 'first',
        updateNodeIds: [],
        treeData: [],
        treeData0: [],
        treeData1: [],
        treeData2: [],
        treeData3: [],
        treeData4: [],
        treeData5: [],
        treeData6: [],
        busSysData: [
          {
            id:'',
            systemName:''
          },
          {
            id:'',
            systemName:''
          },
          {
            id:'',
            systemName:''
          },
          {
            id:'',
            systemName:''
          },
          {
            id:'',
            systemName:''
          },
          {
            id:'',
            systemName:''
          },
          {
            id:'',
            systemName:''
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'resourceName'
        }
      }
    },
    created() {
      this.metaList();
    },
    updated() {
      this.defaultTree();
    },
    methods: {
      metaList() {
        this.metaHasPerm();
        if (this.permData.role_resource_list) {
          this.id = this.$route.params.rid;
          roleResourceList(this.id).then(res => {
            this.updateNodeIds = res.data
          }).then(() => {
            busSysList().then(res => {
              this.busSysData = res.data
            }).then(() => {
              userResourceList().then(res => {
                this.treeData = treeDataTranslate(res.data);
                this.treeData.forEach(item => {
                  if (item.children && item.children.length > 0) {
                    this.parentIds.push(item.id);
                    item.children.forEach(child => {
                      if (child.children && child.children.length > 0) {
                        this.parentIds.push(child.id);
                      }
                    })
                  }
                });
                this.treeData.map(item => {
                  if (item.systemId === this.busSysData[0].id) {
                    this.treeData0.push(item);
                  }
                  if (item.systemId === this.busSysData[1].id) {
                    this.treeData1.push(item);
                  }
                  if (item.systemId === this.busSysData[2].id) {
                    this.treeData2.push(item);
                  }
                  if (item.systemId === this.busSysData[3].id) {
                    this.treeData3.push(item);
                  }
                  if (item.systemId === this.busSysData[4].id) {
                    this.treeData4.push(item);
                  }
                  if (item.systemId === this.busSysData[5].id) {
                    this.treeData5.push(item);
                  }
                  if (item.systemId === this.busSysData[6].id) {
                    this.treeData6.push(item);
                  }
                })
              })
            })
          });
        }
      },
      metaPerm() {
        return {
          role_resource_list: false,
          role_resource_save: false,
        }
      },
      defaultTree() {
        let endIds = [];
        this.updateNodeIds.forEach(item => {
          this.parentIds.forEach(ids => {
            if (ids == item) {
              endIds.push(item);
            }
          })
        });
        endIds.forEach(item => {
          removeFromArray(this.updateNodeIds, item);
        });
        for (let i = 0; i < treeData.length; i++) {
          this.$refs[treeData[i]].setCheckedKeys(this.updateNodeIds)
        }
      },
      metaHasPerm() {
        this.permData.role_resource_list = this.perms['sys:role:resource:list'];
        this.permData.role_resource_save = this.perms['sys:role:resource:save'];
      },
      handleDataForm() {
        let idArray = [];
        for (let i = 0; i < treeData.length; i++) {
          this.$refs[treeData[i]].getCheckedNodes().map(item => {
            idArray.push(item.id)
          });
          this.$refs[treeData[i]].getHalfCheckedNodes().map(item => {
            idArray.push(item.id)
          });
        }
        roleResourceSave(idArray.toString(), this.id).then(res => {
          this.$resMessage(res, {
            onClose: () => {
              this.goBack()
            }
          });
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      handleTreeCheck() {
        let updateNode = [];
        for (let i = 0; i < treeData.length; i++) {
          this.$refs[treeData[i]].getCheckedNodes().map(item => {
            updateNode.push(item.id)
          });
        }
        this.updateNodeIds=updateNode;
      }
    },
  }
</script>
