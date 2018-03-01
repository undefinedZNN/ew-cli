/**
 * 页面滚动到底部触发监听
 * @param  {function} callBack 回调方法
 * @return {[type]}          [description]
 */
export function windowScrollTheEnd (callBack) {
  window.onscroll = () => {
    let scrollTop = 0
    let bodyScrollTop = 0
    let documentScrollTop = 0
    if(document.body) {
      bodyScrollTop = document.body.scrollTop
    }
    if(document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
    let scrollHeight = 0
    let bodyScrollHeight = 0
    let documentScrollHeight = 0
    if(document.body) {
      bodyScrollHeight = document.body.scrollHeight
    }
    if(document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
    let windowHeight = 0
    if(document.compatMode === 'CSS1Compat') {
      windowHeight = document.documentElement.clientHeight
    } else {
      windowHeight = document.body.clientHeight
    }
    if(scrollTop + windowHeight === scrollHeight) {
      callBack()
    }
  }
}
/**
 * 回收页面滚动监听
 * @return {[type]} [description]
 */
export function recoverWindowScrollTheEnd () {
  window.onscroll = () => {}
}
