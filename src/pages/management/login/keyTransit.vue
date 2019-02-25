<template>
  <div class="loading-box">
    <p>
      <i class="iconfont icon-loading"></i>
      <span style="font-size: 44px;">LOADING</span>
      <span>页面加载中，请稍候...</span>
    </p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import router from 'src/router'

  export default {
    name: "keyTransit",
    computed: {
      ...mapGetters([
        'loginCode',
        'roleNames',
        'userImage',
        'addRouters',
      ]),
    },
    mounted() {
      let _this = this
      var query = window.location.href;
      var vars = query.split("?");
      if (!vars[1]) {
        this.$router.push({path: '/logIn'});
        return;
      }
      var params = vars[1].split("=");
      if (!params[1]) {
        this.$router.push({path: '/logIn'});
        return;
      }
      var strCertEntityID = ""
      GetSignCert(decodeURIComponent(params[1]), function (retObj) {
        var strUserCert = retObj.retVal;
        GetCertEntity(strUserCert, function (retObj) {
          console.info(" retObj.retVal", retObj.retVal)
          strCertEntityID = retObj.retVal
          console.info("strCertEntityID", strCertEntityID)
          _this.$store.dispatch('LoginCA', strCertEntityID).then((res) => {
            console.info(" res.data.resourceList", res.data.resourceList)
            if (res.code === '200') {
              // sessionStorage.setItem("strCertEntityID", decodeURIComponent(params[1]));
              sessionStorage.setItem("certId", decodeURIComponent(params[1]));
              const resources = res.data.resourceList;
              _this.$store.dispatch('generateRoutes', {resources}).then(() => {
                console.info("this", _this)// 根据权限生成可访问的路由表
                router.addRoutes(_this.addRouters); // 动态添加可访问路由表
              });
              console.info("=====================")
              _this.$router.push({path: '/IndexGeneral'});
            } else {
              _this.$resMessage(res);
              _this.$router.push({path: '/logIn'});
            }
          }).catch((res) => {
            // this.loading = false;
            console.log(res, 'login');
            _this.$router.push({path: '/logIn'});
          })
        });
      });


    },
    updated() {
    }


  }
</script>

<style scoped>
  .loading-box {
    display: table;
    width: 100%;
  }

  .loading-box > p {
    display: table-cell;
    height: 100vh;
    text-align: center;
    vertical-align: middle;
  }

  .loading-box > p > span {
    display: block;
    line-height: 38px;
  }

  .loading-box i {
    position: relative;
    display: inline-block;
    width: 140px;
    height: 140px;
    font-size: 100px;
    color: #f7a923;
  }

  .loading-box i::before {
    position: absolute;
    left: 10px;
    top: 0;
    line-height: 140px;
    animation: spin 800ms infinite linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(-360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
</style>
