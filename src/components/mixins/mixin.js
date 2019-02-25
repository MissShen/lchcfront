import {keyBoardEnter} from "src/utils";
const mixin = {
  //导航守卫 监测到路由变化后 删除本地搜索条件
  beforeRouteLeave(to,from,next){
    sessionStorage.removeItem('query')
    next()
  },
  methods:{
    //查询按钮
    searchEnterFun(e){
      sessionStorage.setItem('query',JSON.stringify(this.query))
      if(this.$store.state.pageSeach.length>0){
        this.$store.state.pageSeach.pageNum = 1;
      }
      this.resData.pageNum=1;
      keyBoardEnter(e, () => {
        this.list();
      })
    }
  }
}
export default mixin
