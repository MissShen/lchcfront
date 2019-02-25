##北京项目前台使用说明
> 前台：
  1. 运行环境：node
  2. MVVM框架: Vue
  3. 状态管理: vuex
  4. 路由管理: vue-router
  5. 请求工具: axios 
  6. 打包工具：webpack
  
>axios实例化对象
```
const service = axios.create({
  baseURL: root,
  withCredentials: false,
  timeout: 5000,
});
export default service
```
>说明
>>默认    
>>1. contentType=application/x-www-form-urlencoded   
>>2. 页面返回结果response只含有后台封装格式的数据
>>3. 请求时间5秒即为超时
>>4. 用户登陆后请求头自带token
>>>配置项 [详见说明](https://www.kancloud.cn/yunye/axios/234845)   
>>>新增配置项:
>>>>1.{type:'json'}   
>>>>用于发起contentType=application/json请求   
>>>>2.{use:'all'}    
>>>>用于返回的结果response是否含有全部信息[配置项、请求信息、响应信息等]

>使用流程   

1 引入axios实例(在src/axios/各自系统文件夹/*.js)
 ```
  import http from 'src/axios/http'
  ```
2 创建前后台交互函数

```
/**
 * 功能注释
 * 
 * -----注释自定义-----
 * @param resData 分页数据
 * @param queryData 查询数据
 * @author: 开发者姓名
 * @date: 2018/3/27 20:15
 */
1. export function userList(resData, queryData) {
2.  return http({
3.    url: '/management/user/list',
4.    method: 'get',
5.    params: {
6.      'searchNameCode': queryData.searchNameCode,
7.      'beginDate': queryData.beginDate,
8.      'endDate': queryData.endDate,
9.      'pageNum': resData.pageNum,
10.      'pageSize': resData.pageSize
11.    }
12.  })
13. }
```
>说明
>>[1]    前台交互函数    
>>[2-12] 后台交互函数   
  >>>[2] 返回axios实例    
  >>>[3-5] axios配置项   
  >>>>[3] url:请求路径    
  >>>>[4] method:请求方法   
  >>>>[5] params:请求方法为[get、delete]方式时的传参数方式   
  >>>>[5] data:请求方法为[post、put]方式时的传参数方式      
  >>>>。。。其他配置项
        
    
3 在页面export default之前引入前后台交互函数
```
import {userList} from 'src/axios/management/authority/sysUser'
```
4 页面Vue组件的methods中调用前后台交互函数(调用后即发起请求)  
```	
userList(this.resData, this.queryData).then(res => {
  this.resData = res.data;
  0 === this.resData.pageNum ? this.resData.pageNum = 1 : null;
})
```
> 默认对象的请求后台spring boot接收方案

    1. 基本数据封装类型、字符串 [多个查询字段时可以封装到域对象中以实体对象方式接收] 
      public List<SysUser> queryUserList(String searchNameCode, String beginDate, String endDate) {...}
    2. 实体对象    
      public String saveSysUser(SysUser sysUser) {...}
    3. 字符串列表
        1.前台拼接为一个字符串
      public String saveUserRole(String ridStr, String uid){...}
        2.后台将list组合到一个域对象中,以实体对象方式接收
        
> type='json'配置后的请求后台spring boot接收方案    

    1. 基本数据封装类型、字符串：使用@RequestParam接收[多个查询字段时直接使用Map接收] 
       public List<SysRole> queryRoleUserList(@RequestParam("id") String id) {...}
    2. 实体对象  
       使用@RequestBody接收  
    3. 字符串列表
        1.前台拼接为一个字符串
        2.后台将list组合到一个域对象中,以实体对象方式接收
   

