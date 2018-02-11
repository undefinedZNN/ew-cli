import React from 'react'
import { Layout } from 'antd'
import { NavLink } from 'react-router-dom'
import './index.less'
import './index.css'
import wologo from '@/assets/img/wologo.png'
const { Header, Content } = Layout

export default class App extends React.Component {
  componentDidMount() {
  }
  loginOut = () => {
    console.log('============================= loginOut ================================')
    // User.loginOut()
    // this.props.history.replace('/')
    // window.location.reload()
  }
  render() {
    return (
      <Layout className="basic-layout">
        <Header className="basic-layout-header">
          <img src={wologo} className="wowoo-logo" alt="" />
          <ul className='menu'>
            <li><NavLink className='nav' to="/index">首页</NavLink></li>
            <li><NavLink className='nav' to="/doc/1">API文档</NavLink></li>
            <li><NavLink className='nav' to="/as">账户信息</NavLink></li>
            <li><NavLink className='nav' to="/km">开发配置</NavLink></li>
          </ul>

          <div className='right-block'>
            <div className='user-menu'>
              <div className="split"></div>
              <div className='dropdown-wrap'>
                <div className="avatar">
                  <span><i className="icon-touxiang"></i></span>
                </div>
                <div className="username">
                  <a>znnn</a>
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    )
  }
}
