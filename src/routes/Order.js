import React from 'react'
import BasicLayout from '@/layouts/BasicLayout'
import { Route, Switch } from 'react-router-dom'
import OrderAll from '@/containers/OrderAll'
import OrderFail from '@/containers/OrderFail'
import OrderCancel from '@/containers/OrderCancel'
import OrderDelect from '@/containers/OrderDelect'
import OrderIncrease from '@/containers/OrderIncrease'

export default class RouterConfig extends React.Component {
  render() {
    let navData = [
      {
        type: 'left',
        title: '增员订单',
        path: '/order/increase'
      },
      {
        type: 'left',
        title: '减员订单',
        path: '/order/delect'
      },
      {
        type: 'left',
        title: '待取消订单',
        path: '/order/cancel'
      },
      {
        type: 'left',
        title: '所有订单',
        path: '/order/all'
      },
      {
        type: 'left',
        title: '失败订单',
        path: '/order/fail'
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
          <Route path="/order/increase" component={OrderIncrease}/>
          <Route path="/order/delect" component={OrderDelect}/>
          <Route path="/order/cancel" component={OrderCancel}/>
          <Route path="/order/fail" component={OrderFail}/>
          <Route path="/order/all" component={OrderAll}/>
        </Switch>
      </BasicLayout>
    )
  }
}
