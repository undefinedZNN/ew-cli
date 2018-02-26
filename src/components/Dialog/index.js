import './style.less'
import _ from 'lodash'
import React from 'react'
import {render} from 'react-dom'
import { Button } from 'antd'

// confirm 实现
function confirm (props) {
  let confirmEl
  let {onCancel, onOk, content, bodyStyle, cancelText, mask, maskStyle, okText, width, zIndex, className, style} = props
  if (typeof bodyStyle === 'undefined') {
    bodyStyle = {
      paddingTop: '30px'
    }
  }
  let dialogProps = {bodyStyle, cancelText, mask, maskStyle, okText, width, zIndex, className, style}
  let bodyDom = document.querySelector('body')
  let wrapDom = document.createElement('div')
  /**
   * 取消时触发
   * @return {[type]} [description]
   */
  const funOnCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel(confirmEl)
    }
    bodyDom.removeChild(wrapDom)
  }
  /**
   * 确认时触发
   * @return {[type]} [description]
   */
  const funOnOk = async () => {
    confirmEl.setState({confirmLoading: true})
    if (typeof onOk === 'function') {
      await onOk(confirmEl)
    }
    bodyDom.removeChild(wrapDom)
  }

  render(
    <ComponentDialog {...dialogProps} confirmLoading={false} visible={true} title={null} onCancel={funOnCancel} onOk={funOnOk} ref={ref => {
      confirmEl = ref
    }}>{content}</ComponentDialog>,
    wrapDom
  )
  bodyDom.appendChild(wrapDom)
}

export default class ComponentDialog extends React.Component {
  state = {
    confirmLoading: this.props.confirmLoading === 'undefined' ? false : this.props.confirmLoading
  }
  static confirm = confirm
  /**
   * 隐藏当前弹窗
   * @return {[type]} [description]
   */
  hideDialog = () => {
    this.dialogEl.setAttribute('style', 'display: none')
  }
  /**
   * 点击关闭窗口
   * @return {[type]} [description]
   */
  close = () => {
    this.hideDialog()
    let {onCancel} = this.props
    if (typeof onCancel === 'function') {
      onCancel(this.dialogEl)
    }
  }
  /**
   * 点击确认
   * @return {[type]} [description]
   */
  ok = () => {
    // this.hideDialog()
    let {onOk} = this.props
    if (typeof onOk === 'function') {
      onOk(this.dialogEl)
    }
  }

  render() {
    let {bodyStyle, cancelText, closable, footer, footerHeight, mask, maskStyle, okText, title, headerHeight, visible, width, zIndex, className, style} = this.props
    let {confirmLoading} = this.state
    cancelText = cancelText ? cancelText : '取消'
    okText = okText ? okText : '确认'

    let dialogStyle = {}
    let contentStyle = {}
    let closeButtonStyle = {}
    let footerStyle = {}
    let headerStyle = {}
    if (typeof footerHeight !== 'undefined') {
      footerStyle.height = footerHeight
    }
    if (typeof headerHeight !== 'undefined') {
      headerStyle.height = headerHeight
    }
    if (title === null) {
      headerStyle.display = 'none'
    }
    // 添加类名
    if (typeof className === 'undefined') {
      className = 'component-dialog'
    } else {
      className = 'component-dialog ' + _.trim(className)
    }
    // 遮罩层样式
    let maskDisplay = mask === false ? 'none' : 'block'
    if (typeof maskStyle === 'undefined') {
      maskStyle = {}
    }
    maskStyle.display = maskDisplay
    // 判断是否下显示
    let dialogDisplay = visible === true ? 'block' : 'none'
    dialogStyle.display = dialogDisplay
    // 判断是否显示右上角关闭按钮
    let closeDisplay = closable === false ? 'none' : 'block'
    closeButtonStyle.display = closeDisplay
    // 设置弹窗宽度
    if (typeof width !== 'undefined') {
      contentStyle.width = width
    }
    if (typeof style !== 'undefined') {
      contentStyle = {...contentStyle, ...style}
    }
    // 设置弹窗的z_index
    if (typeof zIndex !== 'undefined') {
      dialogStyle.zIndex = zIndex
    }

    // 确认按钮Loading
    // confirmLoading = confirmLoading === 'undefined' ? false : confirmLoading

    let footerDom = (
      <div>
        <Button className='cancel' onClick={this.close} style={{ width: 140 }} >{cancelText}</Button>
        <Button type='primary' loading={confirmLoading} onClick={this.ok} style={{ width: 140, marginRight: 20 }} >{okText}</Button>
      </div>
    )
    if (typeof footer !== 'undefined') {
      footerDom = footer
      if (footer === null) {
        footerStyle.display = 'none'
      }
    }

    return (
      <div className={className} style={dialogStyle} ref={ref => {
        this.dialogEl = ref
      }}>
        <div className='component-dialog-mask' style={maskStyle}></div>
        <div className='component-dialog-wrap'>
          <div className='component-dialog-content' style={contentStyle}>
            <div className='component-dialog-header' style={headerStyle}>
              <div className='component-dialog-title'>
                {title}
              </div>
              <div className='component-dialog-close-button' style={closeButtonStyle} onClick={this.close}>
                <span className='icon-cross'></span>
              </div>
            </div>
            <div className='component-dialog-body' style={bodyStyle}>
              {this.props.children}
            </div>
            <div className='component-dialog-footer' style={footerStyle}>
              {footerDom}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
