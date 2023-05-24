import { message } from 'antd';
import axios, { AxiosRequestConfig, AxiosStatic, AxiosResponse } from 'axios';
import cookie from '@/utils/cookie';
import { Login } from '@/utils/common';
import { getSessionStorage } from '@/utils/sessionStorage';

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

// eg: code对应文案Map
// const code = {
//   D001: '应用找不到对应事业线',
// };

interface CustomResponse {
  success: boolean;
  successMsg?: string;
  errorMsg?: string;
  value?: any;
  rows?: any;
  [key: string]: any;
}
type CustomPromise = Promise<CustomResponse>;

interface RequestInterface {
  config(config: AxiosRequestConfig): CustomPromise;
  get?(url: string, params: object): CustomPromise;
  post?(url: string, params: object): CustomPromise;
  form?(url: string, params: object): CustomPromise;
  cache?(url: string, method: Method): Promise<any>;
}

class Request implements RequestInterface {
  // eslint-disable-next-line no-shadow
  constructor(axios: AxiosStatic) {
    this.axios = axios;
    this.cacheMap = new Map();
    this.sequenceMap = new Map();
    this.axios.defaults.withCredentials = true;
  }

  private axios: AxiosStatic;

  private cacheMap: Map<string, any>;

  private sequenceMap: Map<string, number>;

  private handerError() {
    // todo
  }

  private handerResponse(res: AxiosResponse) {
    const { data, headers } = res;
    data.success = data.success || data.isSuccess;
    try {
      if (data.code === 401) {
        Login();
      }
    } catch (e) {
      console.error(e);
    }
    // 配合node取出当前下载文件名称
    if (headers.downloadfilename) {
      data.downloadfilename = headers.downloadfilename;
      data.success = true;
    }
    if (data.success || data.code == '200') {
      data.successMsg = data.successMsg || data.resultMessage;
    } else {
      data.errorMsg =
        data.errorMsg || data.resultMessage || data.error || data.msg || data.errorCode;
      // const error = new Error(data.errorMsg);
      data.errorMsg && message.error(data.errorMsg);
      // throw error; // 请求报错后不走后续操作
      // throw data;
    }
    return data;
  }

  cache(url: string, method: Method = 'get') {
    return new Promise((resolve, reject) => {
      if (this.cacheMap.has(url)) {
        resolve(this.cacheMap.get(url));
        return;
      }
      this.config({ url, method })
        .then(res => {
          if (res && res.success) {
            this.cacheMap.set(url, res.value);
            resolve(res.value || []);
          } else {
            console.log(res.msg);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  get(url: string, params: object = {}, options = {}) {
    return this.config({
      method: 'get',
      url,
      params,
      ...options,
    });
  }

  post(url: string, params: object = {}, options = {}) {
    return this.config({
      method: 'post',
      url,
      data: params,
      ...options,
    });
  }

  // form 提交
  form(url: string, params: { [key: string]: any }) {
    let tempParams = new FormData();
    if (typeof params === 'object') {
      for (const key in params) {
        if (params[key] !== undefined) {
          tempParams.append(key, params[key]);
        }
      }
    } else {
      tempParams = params;
    }
    return this.post(url, tempParams);
  }

  checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 401) {
      Login();
    } else {
      message.error(response.statusText);
    }
    throw response.json;
  };

  // 通过向 axios 传递相关配置来创建请求
  config(config: AxiosRequestConfig): CustomPromise {
    if (!config.url) {
      console.error('url不能为空');
      // eslint-disable-next-line prefer-promise-reject-errors
      return new Promise((resolve, reject) => reject('url不能为空'));
    }
    let curId = 0;
    const { url } = config;
    if (this.sequenceMap.has(url)) {
      // 第一次以后就有值了
      let lastId = this.sequenceMap.get(url) as number;
      curId = lastId += 1;
      this.sequenceMap.set(url, lastId); // 保存最新的id
    } else {
      this.sequenceMap.set(url, 0); // 第一次 设置初始值
    }
    const env = getSessionStorage('sky_web_env')?.env; // 实时获取环境变量
    const companyId = getSessionStorage('sky_web_env')?.companyId; // 实时获取所处公司主体
    const headers = {
      'x-service-name': cookie.get('ATLANTIS_SERVICE_NAME'),
      'za-tenant-id': companyId,
    };
    if (url.indexOf('/validate2') === -1) {
      headers['x-usercenter-session'] = cookie.get('ATLANTIS_SESSION_ID') || '';
    }
    config.headers = {
      ...(config.headers || {}),
      // 'Sso-User-Name': 'baochengshi',
      env: env,
      ...headers,
    };
    return new Promise((resolve, reject) => {
      this.axios(config)
        .then(this.checkStatus)
        .then(res => {
          // 对请求id进行判断
          if (curId !== this.sequenceMap.get(url)) {
            return;
          }
          const data = this.handerResponse(res);
          resolve(data);
        })

        .catch(err => {
          // 对请求id进行判断
          if (curId !== this.sequenceMap.get(url)) {
            return;
          }
          reject(err);
        });
    });
  }
}

const request = new Request(axios);
export default request;
