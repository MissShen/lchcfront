import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permResource from './modules/permResource'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    activeName:'1',
    pageSeach:{},
    resDataObj:{
      '1':{},
      '2':{},
      '3':{},
      '4':{},
      '5':{},
      '6':{},
      '7':{},
      '8':{},
      '9':{}
    }
  },
  modules: {
    permResource,
    user
  },
  getters
});
export default store
