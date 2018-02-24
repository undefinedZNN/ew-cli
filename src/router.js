import React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Order from '@/routes/Order'

export default class RouterConfig extends React.Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path="/" component={Order}/>
          </Switch>
        </Router>
      </LocaleProvider>
    )
  }
}
