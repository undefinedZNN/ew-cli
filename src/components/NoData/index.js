import './style.less'
import React from 'react'
import noDataImg from '@/assets/img/rm-NOproduct.png'

export default class ComponentNoData extends React.Component {
  render() {
    let style = {display: 'block'}
    let {visible} = this.props
    if (visible === false) {
      style.display = 'none'
    }
    return (
      <div className="component-no-data" style={style}>
        <img src={noDataImg} alt=""/>
        <div>暂无数据</div>
      </div>
    )
  }
}
