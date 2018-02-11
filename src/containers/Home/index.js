import React from 'react'
import { Button } from 'antd'
import Test from '@/components/Test'
import './style.less'

export default class Home extends React.Component {
  render() {
    return (
      <div className="home-containers">
        <Button type="primary" shape="circle" icon="search" />
        <Button type="primary" icon="search">Search</Button>
        <Button shape="circle" icon="search" />
        <Button icon="search">Search</Button>
        <br />
        <Button shape="circle" icon="search" />
        <Button icon="search">Search</Button>
        <Button type="dashed" shape="circle" icon="search" />
        <Button type="dashed" icon="search">Search</Button>
        <div className="testdiv"> <div> 2 </div> <div> 3 </div> <div> 3 </div></div>
        <Test/>
        hello world --)!)
        <input />
      </div>
    )
  }
}
