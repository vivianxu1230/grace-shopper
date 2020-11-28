import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Provider as StyletronProvider} from 'styletron-react'
import {Client as Styletron} from 'styletron-engine-atomic'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {StyleReset, Container} from 'atomize'

// establishes socket connection
import './socket'

const engine = new Styletron()

process.on('unhandledRejection', (reason, p) => {
  throw reason
})

ReactDOM.render(
  <Container>
    <StyletronProvider value={engine}>
      <Provider store={store}>
        <Router history={history}>
          <StyleReset />
          <App />
        </Router>
      </Provider>
    </StyletronProvider>
  </Container>,
  document.getElementById('app')
)
