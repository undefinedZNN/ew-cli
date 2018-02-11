const React = require('react')
const ReactDOM = require('react-dom')
import { AppContainer } from 'react-hot-loader'
import Pilot from './router'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Pilot)

// 模块热替换的 API
if (module.hot) {
  module.hot.accept(
    () => {
      render(Pilot)
    }
  )
}
