/** +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 路由详细用法见：https://router.vuejs.org/zh-cn/
 *
 * 北京项目路由对象说明：
 *  type: JsonArray
 *  properties:
 *          1.path: 导航路径[type: String、全局唯一、英文、必填]
 *          2.name: 路由名称[type: String、全局唯一、英文、选填(不填时不能使用name属性进行导航)]
 *          3.meta: 元属性[type: JsonArray、必填(不填意味着无权限访问)]
 *                3.1.  title : 路由标题[type: String、中文标题、必填]
 *                3.2.  hidden: 隐藏该路由[Type:Boolean、选填]
 *                3.3.  sys:    系统标识[type: String、单选、深度为1的元素为必填(不填意味着该路由及其子路由无效),其他选填]
 *                                1.AUDIT("资审"),
 *                                2.SELECT("遴选"),
 *                                3.CONTRACT("合同"),
 *                                4.TRADE("交易"),
 *                                5.DATA("数据"),
 *                                6.SUPERVISE("监管"),
 *                                7.MANAGEMENT("管理中心");
 *                3.4.  perm:   权限标识[type: Array、全局唯一、必填(不填意味着无权限访问)、数组中任意一个权限即表示有权限]
 *          4.component：页面组件
 *   示例：
 export const demoMap = [
 {
   path: '/authority',    //--------------------路由导航路径------------------------------
   name: 'authority',     //--------------------路由导航名称-----------------------------
   meta: {                // -------------------路由配置信息-----------------------------
     title: '权限管理',    //-----------------------title:路由展示标题[深度=1为模块名称、深度>=2为菜单名称]--------------------------
     sys: 'MANAGEMENT',   //-----------------------sys:路由所属系统--------------------------
                          //-----------------------hidden:表示不展示该路由
                          //-----------------------perm:表示展示该路由应该拥有的权限
   },
   component: () => import('src/components/LayOut')),'manage'), //--------路由页面使用的组件--------------
   children: [            //--------------------children代表子路由,深度=2
     {
       path: 'sysUser',
       name: 'sysUser',
       meta: {
         title: '用户管理',
         perm: ['sys:user:list'], //-----拥有sys:user:list权限的用户才可以管理用户
       },
       component: r => require.ensure([], () => r(require('src/pages/management/authority/user/sysUser')),'manage')
     },
     {
       path: 'userInfo',
       meta: {title: '个人资料'}, //-----所有登录用户均可查看个人资料
       component: r => require.ensure([], () => r(require('src/pages/management/user-manage/userInfo')),'manage')
     }
   ]
 },
 {
   path: '/subsidiary',
   name: 'subsidiary',
   meta: {
     title: '辅助功能',
     sys: 'MANAGEMENT',       //--------深度=1的路由不使用perm进行权限控制
   },
   component: () => import('src/components/LayOut')),'manage'),
   children: [
     {
       path: 'sysNotice',
       name: 'sysNotice',
       meta: {
         title: '公告',
         perm: ['sys:notice:list'],
       },
       component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/notice/sysNotice')),'manage')
     },
     {
       path: 'noticeForm/:nid',
       name: 'noticeForm',
       meta: {
         title: '公告详情',
         hidden: true,
         perm: ['sys:notice:view', 'sys:notice:save', 'sys:notice:update']
       },
       //---权限标识数组---只要拥有其一个元素则有权限访问[或]
       component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/notice/formView')),'manage')
     },
     {
       path: 'noticeView/:nid',     // 动态路由:页面可使用this.$route.params.nid接收
       name: 'noticeView',
       meta: {
         title: '公告查看',
         perm: ['sys:notice:view'],   //---权限标识
         hidden: true,              //---该标题不会出现在导航菜单中
       },
       component: r => require.ensure([], () => r(require('src/pages/management/subsidiary/notice/noticeView')),'manage')
     }
   ]
 }
 ];
 **++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

/**
 * 无权限路由表
 *  该路由表中的路由对象均不需要任何权限即可访问
 *
 * @author: JiaHaiGang
 * @date: 2018/3/28 17:01
 */
export const baseRouterMap = [
  {
    path: '/',
    name: 'logIn',
    meta: {title: '登录', perm:['none']},
    redirect:"/logIn",
    component: r => require.ensure([], () => r(require('src/pages/management/login/layLogin')),'manage'),
    children: [

    ]
  },
  {
    path: '/IndexGeneral',
    name: 'IndexGeneral',
    meta: {title: '首页',sys: 'MANAGEMENT', perm:['none']},
    redirect:"/index",
    component: r => require.ensure([], () => r(require('src/components/LayOut')),'manage'),
    children: [
      {//登录后进入的首页
        path: '/index',
        name: 'index',
        meta: {title: '欢迎', hidden: true, perm:['none']},
        component: r => require.ensure([], () => r(require('src/pages/management/login/IndexGeneral')),'manage')
      }
    ]
  },
  {
    path: '/Error/:id',
    name: 'Error',
    meta: {title: '错误页面', perm:['none']},
    component: r => require.ensure([], () => r(require('src/components/Error')),'manage')
  }
  /*{
    path: '/printTable',
    name: '打印',
    meta: {title: '打印', perm:['none']},
    component: r => require.ensure([], () => r(require('src/pages/trade/common/printTable')),'manage')
  }*/
];

