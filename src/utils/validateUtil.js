/**
 * 封装 生产企业+中包装+大包装
 *
 * @param v
 * @author:
 * @date: 2018/6/14 13:25
 * @return:
 */
export function getPackHints(v1,v2,v3) {

  let _vl,_v2,_v3;
  if(v1 == null || v1 == undefined || v1 == "空"){
    _vl = "";
  }else {
    _vl = v1;
  }
  if(v2 == null || v2 == undefined || v2 == "空"){
    _v2 = "";
  }else {
    _v2 = v2;
  }
  if(v3 == null || v3 == undefined || v3 == "空"){
    _v3 = "";
  }else {
    _v3 = v3;
  }

  return _vl+' 中大包装:'+_v2 +'/'+_v3;
}
/**
 * 封装 规格包装  包材
 *
 * @param v
 * @author:
 * @date: 2018/6/14 13:25
 * @return:
 */
export function getSpecHints(v1,v2,v3,v4,v5) {

  let _vl,_v2,_v3,_v4,_v5;
  if(v1 == null || v1 == undefined || v1 == "空"){
    _vl = "";
  }else {
    _vl = v1;
  }
  if(v2 == null || v2 == undefined || v2 == "空"){
    _v2 = "";
  }else {
    _v2 = v2;
  }
  if(v3 == null || v3 == undefined || v3 == "空"){
    _v3 = "";
  }else {
    _v3 = v3;
  }

  if(v4 == null || v4 == undefined || v4 == "空"){
    _v4 = "";
  }else {
    _v4 = v4;
  }
  if(v5 == null || v5 == undefined || v5 == "空"){
    _v5 = "";
  }else {
    _v5 = v5;
  }

  return ' 规格包装:'+_vl+'×'+_v2 +_v3+'/'+_v4+' 包材:'+_v5;
}
/**
 * 验证数据是否为null
 *
 * @param value 要验证的数据
 * @author:
 * @date: 2018/3/26 13:25
 * @return:  Boolean
 */
export function isNotNull(value) {
  return !(typeof(value) === 'undefined' || value === null || !value.replace(/(^\s*)|(\s*$)/g, '').length);
}

export function numberLineAZ(value) {
  return  /^[a-zA-Z0-9_]{3,16}$/.test(value)
}

/**
 * 验证输入的邮箱是否合法
 *
 * @param value 要验证的邮箱
 * @author:
 * @date: 2018/3/26 13:26
 * @return:  Boolean
 */
export function isEMail(value) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)
}


/**
 * 验证输入的手机号是否合法
 *
 * @param value 要验证的手机号
 * @author:
 * @date: 2018/3/26 13:26
 */
export function isMobile(value) {
  return /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/.test(value)
}

/**
 * 验证输入的电话号是否合法
 *
 * @param value 要验证的电话号
 * @author:
 * @date: 2018/3/26 13:27
 * @return: Boolean
 */
export function isPhone(value) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(value)
}

/**
 * 验证是否为数字
 *
 * @param value 验证是否为数字
 * @author: lixy
 * @return: Boolean
 */
export function isNumber(value) {
  return /^[1-9]\d*$/.test(value)
}


/**
 * 验证输入的手机号是否合法(表单)
 *
 */
export const isMobileForm= /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;

/**
 * 验证输入的电话是否合法(表单)
 *
 */
export const isPhoneForm=/^([0-9]{3,4}-)?[0-9]{7,8}$/;

/**
 * 验证输入的是数字、字母
 * */
export function isNumberOrEng(value) {
  return /^[a-zA-Z0-9]*$/.test(value)
}
/**
 * 验证匹配数字 <=10
 * */
export function isNumberLimit(value) {
  return /^((\d+\.\d{1,})|([1-9]{1}))$/.test(value)
}

/**
 * 匹配非中文
 * */
export function isChinese(value) {
  return /^[^\u4e00-\u9fa5]+$/.test(value)
}
/**
 * 验证匹配英文
 * */
export function isEnglish(value) {
  return /^[a-zA-Z]*$/.test(value)
}
/**
 * 验证匹配中文
 * */
export function onlyChinese(value) {
  return /^[\u4e00-\u9fa5]+$/.test(value)
}
/**
 * 验证匹配数字
 * */
export function onlyNumber(value){
  return /^[0-9]*$/.test(value)
}
/**
 * 验证匹配邮政编码
 * */
export function isPostCode(value) {
  return  /^[1-9][0-9]{5}$/.test(value)
}
/**
 * 验证匹配url
 * */
export function isUrl(value) {
  return /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(value)
}
/**
 * 验证匹配QQ
 * */
export function isQq(value) {
  return /^[1-9]\d{4,10}$/.test(value)
}

/**
 * 输入的内容字数转为字节个数
 * @author: myh
 * @return:number
 */
export function changeToBite(value){
  let isC = value;
  let resultNum;
  let chineseNum = 0;
  if((typeof isC) == 'number'){
    isC = isC.toString()
  }
  if(isC){
    isC.replace(/[\u4e00-\u9fa5]/ig,function (matchItem,matchNum) {
      chineseNum = matchNum+1
    });
  }
  let len = 0;
  isC && isC.length?len=isC.length:0;
  let nonChineseNum = len - chineseNum;
  resultNum = chineseNum*2 + nonChineseNum;
  return resultNum
}
