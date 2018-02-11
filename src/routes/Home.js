import React from 'react'
import BasicLayout from '@/layouts/BasicLayout'
import { Route, Switch } from 'react-router-dom'

import Home from '@/containers/Home'

export default class RouterConfig extends React.Component {
  render() {
    return (
      <BasicLayout>
        <Switch>
          <Route path="/" component={Home}/>
        </Switch>
      </BasicLayout>
    )
  }
}
