<template>
  <div class="sidebar">
    <ul class="side-list">
      <li v-if="list.length>0" v-for="shortcutMenu in list">
        <a href="javascript:;" @click="handelShortcutMenuRouter(shortcutMenu)">
          <i class="iconfont" :class="shortcutMenu.shortcutMenuIcon"></i>
          <span class="side-txt">{{shortcutMenu.shortcutMenuName}}</span>
        </a>
      </li>
    </ul>
    <p class="sidemenu">
      <a href="javascript:;" @click="handleFromView" class="el-icon-circle-plus"><span
        class="side-txt">{{msg}}</span></a>
    </p>
    <shortcut v-if="shortcutViewVisible" ref="shortcutView"
              @closeShortcutView="closeShortcutView"></shortcut>
    <!--<project-choose v-if="projectVisible" ref="project" @refreshProject="refreshProject"></project-choose>-->
  </div>
</template>

<script>
  import shortcut from 'src/pages/management/authority/shortcut/shortcutMenu'
  import {hasMenuList, notHasMenuList} from "src/axios/management/authority/shortcut";
  import {findRouterPathByTitle} from 'src/utils/index'
  import {mapGetters} from 'vuex'
  import {busSysView} from "src/axios/management/authority/headMenu";
  import {isNotNull} from "src/utils/validateUtil";
  import ProjectChoose from 'src/pages/management/project/project-choose'

  export default {
    name: 'SideBar',
    components: {shortcut},
    computed: {
      ...mapGetters([
        'perm_routers',
      ]),
    },
    data() {
      return {
        msg: '自定义',
        list: [],
        busSys: undefined,
        shortcutViewVisible: false,
        shortcutMenuVisible: false,
        // projectVisible: false,
      }
    },
    created() {
      this.metaList();
    },
    methods: {
      handleFromView() {
        this.shortcutViewVisible = true;
        this.$nextTick(() => {
          this.$refs.shortcutView.showView()
        })
      },
      closeShortcutView() {
        this.shortcutViewVisible = false;
        this.metaList();
      },
      chooseProject() {
        this.projectVisible = true;
        this.$nextTick(() => {
          this.$refs.project.metaList();
        });
      },
      refreshProject() {
        this.$emit('refreshProject')
      },
      metaList() {
        hasMenuList().then(res => {
          if (res.code == 200) {
            this.list = res.data;
            if (res.data.length < 1) {
              let resData = {
                pageNum: 1,
                pageSize: 6
              };
              notHasMenuList(resData).then(notHas => {
                if (notHas.code == 200) {
                  this.list = notHas.data.list
                }
              })
            }
          }
        });
      },
      handelShortcutMenuRouter(shortcutMenu) {
        /*todo 项目选择 暂时注释*/
        // if (!isNotNull(sessionStorage.getItem("projectId"))) {
        //   this.chooseProject();
        // } else {
        let path = findRouterPathByTitle(this.perm_routers, shortcutMenu.resourceName);
        this.$router.push({path: path, query: {anchor: shortcutMenu.shortcutMenuName}, replace: true})
        // }

      }
    }
  }
</script>
