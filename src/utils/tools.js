/**
 * 错误类型的全局通知
 * @param  {Strin} message  提示通知内容
 * @param  {Number} duration 出现秒数默认4秒
 * @return {[type]}          [description]
 */
export function errorMsg(message, duration = 4) {
  duration = duration * 1000
  let bodyDom = document.querySelector('body')
  let wrap = document.querySelector('body .wowoo-message')

  // 判断消息 dom 容器是否存在, 不存在将其重新创建
  if (wrap === null) {
    let wrapDom = document.createElement('div')
    wrapDom.setAttribute('class', 'wowoo-message')
    bodyDom.appendChild(wrapDom)
    wrap = document.querySelector('body .wowoo-message')
  }

  let msgDom = document.createElement('div')
  msgDom.setAttribute('class', 'wowoo-message-nocite error')
  msgDom.innerHTML = message || '错误'
  wrap.appendChild(msgDom)

  setTimeout(() => {
    msgDom.setAttribute('class', 'wowoo-message-nocite error move-up')
    setTimeout(() => {
      wrap.removeChild(msgDom)
    }, 700)
  }, duration)
}

/**
 * 正确类型的全局通知
 * @param  {Strin} message  提示通知内容
 * @param  {Number} duration 出现秒数默认4秒
 * @return {[type]}          [description]
 */
export function okMsg(message, duration = 4) {
  duration = duration * 1000
  let bodyDom = document.querySelector('body')
  let wrap = document.querySelector('body .wowoo-message')

  // 判断消息 dom 容器是否存在, 不存在将其重新创建
  if (wrap === null) {
    let wrapDom = document.createElement('div')
    wrapDom.setAttribute('class', 'wowoo-message')
    bodyDom.appendChild(wrapDom)
    wrap = document.querySelector('body .wowoo-message')
  }

  let msgDom = document.createElement('div')
  msgDom.setAttribute('class', 'wowoo-message-nocite ok')
  msgDom.innerHTML = message || '错误'
  wrap.appendChild(msgDom)

  setTimeout(() => {
    msgDom.setAttribute('class', 'wowoo-message-nocite ok move-up')
    setTimeout(() => {
      wrap.removeChild(msgDom)
    }, 700)
  }, duration)
}

/**
 * toast类型的全局通知
 * @param  {Strin} message  提示通知内容
 * @param  {Number} duration 出现秒数默认2秒
 * @return {[type]}          [description]
 */
export function toast(message, duration = 2) {
  duration = duration * 1000
  let bodyDom = document.querySelector('body')
  let wrap = document.querySelector('body .wowoo-message')
  // 判断消息 dom 容器是否存在, 不存在将其重新创建
  if (wrap === null) {
    let wrapDom = document.createElement('div')
    wrapDom.setAttribute('class', 'wowoo-message')
    bodyDom.appendChild(wrapDom)
    wrap = document.querySelector('body .wowoo-message')
  }

  let msgDom = document.createElement('div')
  msgDom.setAttribute('class', 'wowoo-toast-nocite')
  msgDom.innerHTML = message
  wrap.appendChild(msgDom)

  setTimeout(() => {
    msgDom.setAttribute('class', 'wowoo-toast-nocite move-up')
    setTimeout(() => {
      wrap.removeChild(msgDom)
    }, 700)
  }, duration)
}

/**
 * 显示隐藏全局 loading 层
 * @param  {publicLoading} visible true 显示 false 隐藏
 * @return void
 */
export function publicLoading (visible) {
  const LoadingDom = document.querySelector('.public-loading')
  if (LoadingDom) {
    if (visible === true) {
      LoadingDom.setAttribute('style', 'display:block')
    } else {
      LoadingDom.setAttribute('style', 'display:none')
    }
  }
}
