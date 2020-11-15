import axios from 'axios'
import {message} from "antd";

const apiConfig = {
  tag: {
    listTag: {
      method: 'get',
      url: '/innerApi/v1/tag'
    },
    deleteTagById: {
      method: 'delete',
      url: '/innerApi/v1/tag/${id}'
    },
    createTag: {
      method: 'post',
      url: '/innerApi/v1/Tag'
    },
    updateTagById: {
      method: 'put',
      url: '/innerApi/v1/tag/${id}'
    }
  },
  user: {
    listUser: {
      method: 'get',
      url: '/innerApi/v1/User'
    },
    deleteUserById: {
      method: 'delete',
      url: '/innerApi/v1/User/${id}'
    },
    postUser: {
      method: 'post',
      url: '/innerApi/v1/User/${id}'
    },
    updateUserByID: {
      method: 'update',
      url: '/innerApi/v1/User/${id}'
    }
  }
}

const preApi = 'http://localhost:7001'

const withAxios = apiConfig => {
  const serviceMap = {}

  for (const apiTag in apiConfig) {

    const tagAgg = apiConfig[apiTag]
    const tagObj = {}
    for (const apiKey in tagAgg) {

      const {method, url} = tagAgg[apiKey]
      tagObj[apiKey] = async function (data = {}) {

        console.log('------------------------------')
        console.log(data)

        let key = 'params'
        // 如果是post和put，则 key 为 data，否则为 params
        if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') {
          key = 'data'
        }
        return axios({
          method,
          url: preApi + url.format(data),
          [key]: data,
          // headers: {
          //     'Content-Type': "application/json;charset=utf-8"
          // },
          timeout: 10000,
        })
      }
    }

    serviceMap[apiTag] = tagObj
  }

  return serviceMap
}

//
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return postProcessingData(response.data);
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 对返回值进行处理
const postProcessingData = data => {
  let resp = {}
  if (data) {
    // 将 数据复制给 resp
    resp = data.data

    const dataMessage = data.message;
    const dataCode = data.code

    // 添加 __code__,__message__,__data__
    if (typeof resp == 'object' && resp) {
      resp.__message__ = dataMessage
      resp.__code__ = dataCode
    } else {
      resp = {
        __data__: resp,
        __message__: dataMessage,
        __code__: dataCode
      }
    }

    if (data.code !== 0) {
      const ms = data.message;
      if (ms && ms.defaultMsg) {
        message.error('')
        //     data ={ms} placeHolders = {data.placeHolders ||[]}
      } else if (typeof ms === 'string') {
        message.error(ms)
      } else {
        message.error('Error')
      }
    }
  } else {
    message.error('Error')
  }

  return resp;
}

//var str = "js实现用{two}自符串替换占位符{two} {three}  {one} ".format({one: "I",two: "LOVE",three: "YOU"});
//var str2 = "js实现用{1}自符串替换占位符{1} {2}  {0} ".format("I","LOVE","YOU");
String.prototype.format = function () {
  const param = arguments[0];
  let obj = this;
  if (typeof (param) == 'object') {
    for (const key in param) {
      obj = obj.replace(new RegExp("\\$\\{" + key + "\\}", "g"), param[key]);
    }
  } else {
    for (let i = 0; i < arguments.length; i++)
      obj = obj.replace(new RegExp("$\\{" + i + "\\}", "g"), arguments[i]);
  }

  obj = obj.replace(new RegExp("\\$\\{.*?\\}", "g"), 'undefined');

  return obj
}

export default withAxios(apiConfig)
