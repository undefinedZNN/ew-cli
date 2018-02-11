import React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '@/routes/Home'

export default class RouterConfig extends React.Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home}/>
          </Switch>
        </BrowserRouter>
      </LocaleProvider>
    )
  }
}
