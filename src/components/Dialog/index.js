import './style.less'
import _ from 'lodash'
import React from 'react'
import { Button } from 'antd'
export default class ComponentDialog extends React.Component {

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
    let {bodyStyle, cancelText, closable, confirmLoading, footer, footerHeight, mask, maskStyle, okText, title, headerHeight, visible, width, zIndex, className, style} = this.props
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
    confirmLoading = confirmLoading === 'undefined' ? false : confirmLoading

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
      <div className={className} style={dialogStyle} ref={ref => this.dialogEl = ref}>
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