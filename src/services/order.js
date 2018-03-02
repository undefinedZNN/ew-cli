// import { stringify } from 'qs'
import callApi from './callApi'
// const entrySrc = 'http://v.test.b.renliwo.com/entry/apicenter'
const entrySrc = 'http://v.test.renliwo.com/entry/apicenter'
const appId = 'wowoohr_my_vendor'

/**
 * 获取增员订单列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function increaseOrderQuery(params) {
  let formData = {
    'order.v1.orderQuery.increaseOrderQuery': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 批量增员
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function recruitOverOrder(params) {
  let formData = {
    'order.v1.orderOperate.recruitOverOrder': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取订单失败原因
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function failReason(params) {
  let formData = {
    'order.v1.order.apply.failReason': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 申报失败订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function confirmFail(params) {
  let formData = {
    'order.v1.order.apply.confirmFail': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

export async function moreScreening(params) {
  let formData = {
    'order.v1.orderQuery.moreScreening': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 文件下载列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getFileDownloadList(params) {
  let formData = {
    'order.download.getFileDownloadList': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 添加文件下载
 * @param {[type]} params [description]
 */
export async function addOrderDownload(params) {
  let formData = {
    'order.download.addOrderDownload': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取订单详情信息
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getOrderDetailInfo(params) {
  let formData = {
    'order.v1.orderQuery.getOrderDetailInfo': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取减员订单列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getReduceOrder(params) {
  let formData = {
    'order.v1.orderQuery.getReduceOrder': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 减员操作
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function reduceComplete(params) {
  let formData = {
    'order.v1.orderOperate.reduceComplete': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取待取消订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function waitCancelOrderQuery(params) {
  let formData = {
    'order.v1.orderQuery.waitCancelOrderQuery': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取所哟订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getVAllOrderList(params) {
  let formData = {
    'order.v1.orderQuery.getVAllOrderList': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取失败订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function getFailedOrderList(params) {
  let formData = {
    'order.v1.orderQuery.getFailedOrderList': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 确认取消订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function confirmCancel(params) {
  let formData = {
    'order.v1.orderQuery.getFailedOrderList': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 获取订单驳回原因
 * @return {[type]} [description]
 */
export async function refuseToLiftReason() {
  let formData = {
    'order.v1.orderOperate.refuseToLiftReason': {
      appId
    }
  }
  return callApi.post(entrySrc, formData)
}

/**
 * 驳回待取消订单
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export async function refuseToLift(params) {
  let formData = {
    'order.v1.orderOperate.refuseToLift': {
      appId,
      ...params
    }
  }
  return callApi.post(entrySrc, formData)
}
// {"order.v1.orderOperate.refuseToLift":{"id":"fd805f7f2f0362f2","cancelOrderId":"3c114736c9d05b4e","applyId":"eaabbe3ae119c536","rejectReason":"申报成功","appId":"wowoohr_my_vendor","token":"FezkJmyarPTZVtGvnDZyFB","userId":"4361ee267c9b71f2","sign":"308574f414e4467060af5c0de9d1b210b1cb9fe4"}}
