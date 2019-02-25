import {Message} from 'element-ui'

/**
 * 基础提示信息配置项
 *
 * @author: JiaHaiGang
 * @date: 2018/4/9 11:32
 */
function baseOptions(res, callback) {
  if(!res){
    return;
  }
  let code = res.code||res.status;
  let message = res.message;
  let data = res.data;
  switch (code) {
    case '200':
      return {
        message: data,
        type: 'success',
        duration: 1000,
        ...callback,
      };
    case 'SAVE_SUCCESS':
      return {
        message: data,
        type: 'success',
        duration: 1000,
        ...callback,
      };
    case 'DELETE_SUCCESS':
      return {
        message: data,
        type: 'success',
        duration: 1000,
        ...callback,
      };
    case 'UPDATE_SUCCESS':
      return {
        message: data,
        type: 'success',
        duration: 1000,
        ...callback,
      };
    case '201':
      return {
        message: message,
        type: 'error',
        duration: 3000,
        ...callback,
      };
    case 'SAVE_ERROR':
      return {
        message: message,
        type: 'error',
        duration: 3000,
        ...callback,
      };
    case 'UPDATE_ERROR':
      return {
        message: message,
        type: 'error',
        duration: 3000,
        ...callback,
      };
    case 'DELETE_ERROR':
      return {
        message: message,
        type: 'error',
        duration: 3000,
        ...callback,
      };
    case '504':
      return {
        message: message,
        type: 'error',
        duration: 3000,
      };
    case '401':
      return {
        message: '无权限进行操作',
        type: 'error',
        duration: 3000,
      };
    case '500':
      return {
        message: '未知错误，请稍后操作',
        type: 'error',
        duration: 3000,
      };
    default:
      return {
        message: message,
        type: 'warning',
        duration: 3000,
      };
  }
}

/**
 * 公共信息提示方法
 *
 * 参数说明：
 * @param res 后台返回标准格式数据
 * @param callback 信息关闭时进行的回调方法:配置项[onClose]
 * @param options  配置项
 *
 ------------------------------------------------------------------------------------------------------------------------
 配置项                        说明                                  类型                可选值                     默认值
 message                      消息文字                              string / VNode      —                           —
 type                         主题                                  string            success/warning/info/error   info
 iconClass                    自定义图标的类名，会覆盖type            string              —                           —
 dangerouslyUseHTMLString     是否将 message 属性作为 HTML 片段处理   boolean             —                         false
 customClass                  自定义类名                             string             —                           —
 duration                     显示时间, 毫秒。设为 0 则不会自动关闭    number              —                         3000
 showClose                    是否显示关闭按钮                       boolean             —                         false
 center                       文字是否居中                           boolean             —                         false
 onClose                      关闭时的回调函数                       function            —                           —
 ------------------------------------------------------------------------------------------------------------------------
 示例：
 let http = this.dataForm.id ? roleUpdate(this.dataForm) : roleSave(this.dataForm);
 http.then(res => {
              this.$resMessage(res, {
                onClose: () => {
                  this.visible = false;
                  this.$emit('refreshData');
                }
              });
            })
 ------------------------------------------------------------------------------------------------------------------------
 *
 * @author: JiaHaiGang
 * @date: 2018/4/9 11:30
 */
export default function resMessage(res, callback, options) {
  Message({
    showClose: true,
    ...baseOptions(res, callback),
    ...options
  })
}
