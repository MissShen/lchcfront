// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// 获取Mock数组对象
//const navGeneral = ['数据管理','资审管理','遴选管理', '合同管理', '交易管理', '管理中心', '监管管理', '消息公告'];
const navsGeneral = [
  {navTitle: '数据管理', subNav: [{txt: '下载数据'}, {txt: '上传数据'}]},
  {navTitle: '资审管理', subNav: [{txt: '下载数据'}, {txt: '上传数据'}]},
  {navTitle: '遴选管理', subNav: [{txt: '下载数据'}, {txt: '上传数据'}]},
  {navTitle: '合同管理', subNav: [{txt: '下载数据'}, {txt: '上传数据'}]},
  {navTitle: '交易管理', subNav: [{txt: '下载数据'}, {txt: '上传数据'}]},
  {navTitle: '管理中心', subNav: [{txt: '下载数据'}, {txt: '上传数据'}]},
  {navTitle: '监管管理', subNav: [{txt: '下载数据'}, {txt: '上传数据'}]},
  {navTitle: '消息公告', subNav: [{txt: '下载数据'}, {txt: '上传数据'}]}
];
//面包屑
//const breadCrumbs = ['权限分配', '角色管理', '分配管理']
const breadCrumbs = [
  {text: '权限分配', src: 'AuthorityDistribute'},
  {text: '角色管理', src: 'RoleManage'},
  {text: '分配管理', src: 'DistributeManage'},
];

// mock一组数据
const navList = () => {
  let navs = [];
  let len = Random.natural(2,8); // 随机获取1-8个菜单项
  for (let i = 0; i < len; i++) {
    let x = Math.random();
    let rand = len > navsGeneral.length ? len : navsGeneral.length;
    let idx = Math.round(x * rand);
    let navObj = {
      id: (i+1),
      navItems: navsGeneral[idx]
    }
    navs.push(navObj);
    navsGeneral.splice(idx, 1);
  }

  return {
    navGeneral: {
      navItems: navs,
      activeNav: Math.round(Math.random() * len) // 指定某个导航菜单为当前菜单
      //selectedNav: Math.round(Math.random() * len).toString()  // 指定某个导航菜单为当前菜单
    }
  }
}
//登录 通知通告
const newList=[
  { url:'',title:'转登北京已改办等第10部门关于1',time:'2017.11.12',content:"近期、随着气温骤降，空气干燥，儿童发病不断上升，北京东区儿童医院 迎来了冬季患儿就诊高峰期，门诊患儿激增，其中发热患儿最多，不少家长也在区儿童医院迎来了冬季患儿就诊高峰期"},
  { url:'',title:'转登北京已改办等第10部门关于2',time:'2017.11.13',content:'近期、随着气温骤降11'},
  { url:'',title:'转登北京已改办等第10部门关于3',time:'2017.11.14',content:'近期、随着气温骤降22'}
];
//登录 通知内容
const noticeContent={
  url:'',
  content:'近期、随着气温骤降，空气干燥，儿童发病不断上升，北京东区儿童医院 迎来了冬季患儿就诊高峰期，门诊患儿激增，其中发热患儿最多，不少家长也在区儿童医院迎来了冬季患儿就诊高峰期 ，门诊迎来了冬季患儿就诊高峰期'
};
//登录
const login=[
  { userName:'zhangsan',password:'123'},
  { userName:'lisi',password:'123'}
];
//用户列表
const user=[
  { id:1, name:'结果公示', system: '遴选管理', date: '2016-05-02'}
];
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/generalManage/navGeneral', 'post', navList); // 动态导航
Mock.mock('/generalManage/breadCrumbs', 'post', breadCrumbs); // 面包屑
Mock.mock('/getNewsList/newList', 'post', newList); // 登录通知
Mock.mock('/getNoticeContent/noticeContent', 'post', noticeContent); // 登录通知内容
Mock.mock('/getLogin/login', 'post', login);
/*Mock.mock('/user/list', 'get', user);*/
