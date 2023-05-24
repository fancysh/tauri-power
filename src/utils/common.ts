/*
 * @Author: fangyi fang@zhongan.com
 * @Date: 2023-05-23 15:58:55
 * @LastEditors: fangyi fang@zhongan.com
 * @LastEditTime: 2023-05-23 16:01:06
 * @FilePath: /tauri-power/src/utils/common.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import moment from 'moment';
import { getGroupList, login } from '@/services/common';
// import { removeLocalStorage } from '@/utils/storage';
import cookie from '@/utils/cookie';

export function getCookie(Name: string) {
  const search = `${Name}=`; // 查询检索的值
  let returnvalue = ''; // 返回值
  if (document.cookie.length > 0) {
    let sd = document.cookie.indexOf(search);
    if (sd !== -1) {
      sd += search.length;
      let end = document.cookie.indexOf(';', sd);
      if (end === -1) end = document.cookie.length;
      // unescape() 函数可对通过 escape() 编码的字符串进行解码。
      returnvalue = unescape(document.cookie.substring(sd, end));
    }
  }
  return returnvalue;
}

// 重新登陆鉴权
export const Login = async () => {
  cookie.remove('ATLANTIS_SESSION_ID');
  const res = await login({});
  const { code, value } = res || {};
  if (code === '200') {
    if (value.url) {
      window.location.href = value.url;
    }
  }
};
