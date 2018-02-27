import React from 'react'
import BasicLayout from '@/layouts/BasicLayout'
import { Route, Switch } from 'react-router-dom'

import OrderIncrease from '@/containers/OrderIncrease'

export default class RouterConfig extends React.Component {
  render() {
    let navData = [
      {
        type: 'left',
        title: '增员订单',
        path: '/'
      },
      {
        type: 'left',
        title: '减员订单',
        path: '/1'
      },
      {
        type: 'left',
        title: '待取消订单',
        path: '/2'
      },
      {
        type: 'left',
        title: '所有订单',
        path: '/3'
      },
      {
        type: 'left',
        title: '失败订单',
        path: '/4'
      },
      {
        type: 'right',
        badge: 100,
        title: '下载列表',
        path: '/1'
      }
    ]
    return (
      <BasicLayout navData={navData}>
        <Switch>
          <Route path="/" component={OrderIncrease}/>
        </Switch>
      </BasicLayout>
    )
  }
}
