import {userLogin, userPerms, refreshToken} from "src/axios/login/login";

const user = {
  state: {
    loginCode: '',
    loginId: '',
    orgId: '',
    roleIds: '',
    roleNames: '',
    userImage: '',
    accountType: '',
    token: sessionStorage.getItem('token'),
    expireTime: sessionStorage.getItem('expireTime'),
    perms: [],
  },
  mutations: {
    SET_LOGIN_CODE: (state, loginCode) => {
      state.loginCode = loginCode
    },
    SET_LOGIN_ID: (state, loginId) => {
      state.loginId = loginId
    },
    SET_ORG_ID: (state, orgId) => {
      state.orgId = orgId
    },
    SET_ROLE_IDS: (state, roleIds) => {
      state.roleIds = roleIds
    },
    SET_ROLE_NAMES: (state, roleNames) => {
      state.roleNames = roleNames
    },
    SET_USER_IMAGE: (state, userImage) => {
      if (userImage) {
        state.userImage = userImage
      } else {
        state.userImage = require("../../assets/images/avatar.png");
      }
    },
    SET_ACCOUNT_TYPE: (state, accountType) => {
      state.accountType = accountType
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_PERMS: (state, perms) => {
      state.perms = perms
    },
    SET_EXPIRE_TIME: (state, expireTime) => {
      state.expireTime = expireTime
    },
  },
  actions: {


    /**
     * 用户登录
     *
     * @param loginForm 用户登录信息
     * @author:
     * @date: 2018/3/27 19:39
     */
    LoginUser({commit}, loginForm) {
      return new Promise((resolve, reject) => {
        userLogin(loginForm).then(res => {
          if (res.code === '200') {
            commit('SET_TOKEN', res.data.token);
            commit('SET_EXPIRE_TIME', res.data.expireTime);
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('expireTime', res.data.expireTime);
            userPerms().then(res => {
              const perms = {};
              res.data.resourceList.forEach(resource => {
                perms[resource.permissionName] = true
              });
              // commit('SET_PERMS', perms);
              // commit('SET_LOGIN_CODE', res.data.code);
              // commit('SET_LOGIN_ID', res.data.loginId);
              // commit('SET_ORG_ID', res.data.orgId);
              // commit('SET_ROLE_IDS', res.data.roleIds);
              // commit('SET_ROLE_NAMES', res.data.roleNames);
              // commit('SET_ACCOUNT_TYPE', res.data.accountType);
              // commit('SET_USER_IMAGE', res.data.userImage);
              resolve(res)
            }).catch(error => {
              reject(error)
            })
          } else {
            reject(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },


    /**
     * ca默认登陆
     * @param commit
     * @param strCertID
     * @returns {Promise<any>}
     * @constructor
     */
    LoginCA({commit}, data) {
      return new Promise((resolve, reject) => {
        caKeyLogin(data).then(res => {
          if (res.code === '200') {
            commit('SET_TOKEN', res.data.token);
            commit('SET_EXPIRE_TIME', res.data.expireTime);
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('expireTime', res.data.expireTime);
            userPerms().then(res => {
              const perms = {};
              res.data.resourceList.forEach(resource => {
                perms[resource.permissionName] = true
              });
              commit('SET_PERMS', perms);
              commit('SET_LOGIN_CODE', res.data.userName);
              commit('SET_LOGIN_ID', res.data.loginId);
              commit('SET_ORG_ID', res.data.orgId);
              commit('SET_ROLE_IDS', res.data.roleIds);
              commit('SET_ROLE_NAMES', res.data.roleNames);
              commit('SET_ACCOUNT_TYPE', res.data.accountType);
              commit('SET_USER_IMAGE', res.data.userImage);
              resolve(res)
            }).catch(error => {
              reject(error)
            })
          } else {
            reject(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    /**
     * ca初始绑定并登陆
     * @param commit
     * @param strCertID
     * @returns {Promise<any>}
     * @constructor
     */
    LoginInitBindCa({commit}, data) {
      return new Promise((resolve, reject) => {
        caInitBind(data).then(res => {
          if (res.code === '200') {
            commit('SET_TOKEN', res.data.token);
            commit('SET_EXPIRE_TIME', res.data.expireTime);
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('expireTime', res.data.expireTime);
            userPerms().then(res => {
              const perms = {};
              res.data.resourceList.forEach(resource => {
                perms[resource.permissionName] = true
              });
              commit('SET_PERMS', perms);
              commit('SET_LOGIN_CODE', res.data.userName);
              commit('SET_LOGIN_ID', res.data.loginId);
              commit('SET_ORG_ID', res.data.orgId);
              commit('SET_ROLE_IDS', res.data.roleIds);
              commit('SET_ROLE_NAMES', res.data.roleNames);
              commit('SET_ACCOUNT_TYPE', res.data.accountType);
              commit('SET_USER_IMAGE', res.data.userImage);
              resolve(res)
            }).catch(error => {
              reject(error)
            })
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },


    /**
     * 拉取用户信息：权限列表
     *
     * @author:
     * @date: 2018/3/27 19:38
     */
    getUserPerms({commit}) {
      return new Promise((resolve, reject) => {
        userPerms().then(res => {
          const perms = {};
          res.data.resourceList.forEach(resource => {
            perms[resource.permissionName] = true
          });
          commit('SET_PERMS', perms);
          commit('SET_LOGIN_CODE', res.data.userName);
          commit('SET_LOGIN_ID', res.data.loginId);
          commit('SET_ORG_ID', res.data.orgId);
          commit('SET_ROLE_IDS', res.data.roleIds);
          commit('SET_ROLE_NAMES', res.data.roleNames);
          commit('SET_ACCOUNT_TYPE', res.data.accountType);
          commit('SET_USER_IMAGE', res.data.userImage);
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    refreshRequestTime({commit}) {
      return new Promise((resolve, reject) => {
        refreshToken().then(res => {
          if (res.data&&res.data.token) {
            commit('SET_TOKEN', res.data.token);
            sessionStorage.setItem('token', res.data.token);
            commit('SET_EXPIRE_TIME', res.data.expireTime);
            sessionStorage.setItem('expireTime', res.data.expireTime);
          } else {
            commit('SET_TOKEN', '');
            commit('SET_PERMS', []);
            commit('SET_EXPIRE_TIME', undefined);
            commit('SET_LOGIN_CODE', '');
            commit('SET_LOGIN_ID', '');
            commit('SET_ORG_ID', '');
            commit('SET_ROLE_IDS', '');
            commit('SET_LOGIN_ID', '');
            commit('SET_ROLE_NAMES', '');
            commit('SET_USER_IMAGE', '');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('expireTime');
            sessionStorage.removeItem('login');
            sessionStorage.removeItem('projectId');
            sessionStorage.removeItem('projectName');
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    /**
     * 用户登出
     *
     * @author:
     * @date: 2018/3/27 19:42
     */
    logoutUser({commit}) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        commit('SET_PERMS', []);
        commit('SET_EXPIRE_TIME', undefined);
        commit('SET_LOGIN_CODE', '');
        commit('SET_LOGIN_ID', '');
        commit('SET_ORG_ID', '');
        commit('SET_ROLE_IDS', '');
        commit('SET_ROLE_NAMES', '');
        commit('SET_USER_IMAGE', '');
        commit('SET_ACCOUNT_TYPE', '');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('expireTime');
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('projectId');
        sessionStorage.removeItem('projectName');
        sessionStorage.removeItem('flag');
        sessionStorage.removeItem('menu-code');
        resolve();
      })
    },

    /**
     * 用户头像
     *
     * @param getPhoto 用户头像
     * @author:
     * @date: 2018/5/9 16:13
     */
    getPhoto({commit}, blob) {
      return new Promise((resolve, reject) => {
        commit('SET_USER_IMAGE', blob);
      })
    },

  }
};
export default user;
