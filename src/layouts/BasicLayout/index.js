import './style.less'
import React from 'react'
import { Layout, Spin, Badge } from 'antd'
import { NavLink } from 'react-router-dom'
import wologo from '@/assets/img/wologo.png'
const { Header, Content } = Layout

export default class App extends React.Component {
  componentDidMount() {
  }
  loginOut = () => {
    console.log('============================= loginOut ================================')
  }

  /**
   * [description]
   * @param  {[type]} data
   * [
      {
        type: 'left',
        badge: 100,
        title: '增员订单',
        path: '/'
      }
    ]
   * @return {[type]}      [description]
   */
  siderMenu = (data) => {
    if (typeof data === 'undefined') {
      data = []
    }
    let leftLinks = []
    let rightLinks = []
    const match = /^((ht|f)tps?):\/\//i
    let key = 0
    for (let item of data) {
      key++
      let itemLink
      let itemBadge = parseInt(item.badge, 2)
      if (isNaN(itemBadge)) {
        itemBadge = 0
      }
      // let Badge
      // if (isNaN(itemBadge) || itemBadge === 0) {
      //   itemBadge = ''
      // } else if (itemBadge < 9) {
      //   itemBadge = '···'
      // } else {
      //   itemBadge = ''
      // }
      // if (itemBadge !== '') {
      //   Badge = (<i className="badge">{itemBadge}</i>)
      // }
      if(match.test(item.path)) {
        itemLink = (<li key={key}><a className="nav" href={item.path}><Badge offset={[18, 4]} dot={itemBadge > 0}>{item.title}</Badge></a></li>)
      } else {
        itemLink = (<li key={key}><NavLink className="nav" to={item.path}><Badge offset={[18, 4]} dot={itemBadge > 0}>{item.title}</Badge></NavLink></li>)
      }

      if (item.type === 'right') {
        rightLinks.push(itemLink)
      } else {
        leftLinks.push(itemLink)
      }
    }
    return (
      <div className="basic-layout-sider-wrap">
        <ul className="menu"> {leftLinks}</ul>
        <ul className="menu right"> {rightLinks} </ul>
      </div>
    )
  }

  render() {
    const { navData } = this.props

    return (
      <Layout className="basic-layout">

        <div className="public-loading" style={{display: 'none'}}>
          <Spin size="large"/>
        </div>
        <Header className="basic-layout-header">
          <div className="basic-layout-header-wrap">
            <img src={wologo} className="wowoo-logo" alt="" />
            <div className="menu-login">
              <i className="icon-17"></i>
              <i className="icon-touxiang"></i>
              <span className="user-name">123211111111111</span>
            </div>
            <ul className="menu">
              <li><NavLink className="nav" to="/">我的订单</NavLink></li>
              <li><NavLink className="nav" to="/doc/1">我的社保公积金</NavLink></li>
              <li><NavLink className="nav" to="/as">我的账单</NavLink></li>
              <li><NavLink className="nav" to="/km">福利享受管理</NavLink></li>
            </ul>
          </div>
        </Header>
        <Header className="basic-layout-sider">
          {this.siderMenu(navData)}
        </Header>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    )
  }
}
