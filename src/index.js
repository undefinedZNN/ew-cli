const React = require('react');
const ReactDOM = require('react-dom')
import { AppContainer } from 'react-hot-loader'
import Home from 'Containers/Home'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Home)
// 模块热替换的 API
if (module.hot) {
  module.hot.accept(
    '/',
    () => {
      render(Home)
    }
  )
}
