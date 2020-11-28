import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Provider as StyletronProvider} from 'styletron-react'
import {Client as Styletron} from 'styletron-engine-atomic'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {ThemeProvider, StyleReset, Container} from 'atomize'

// establishes socket connection
import './socket'

const engine = new Styletron()

const theme = {
  shadows: {
    'blue-shadow': '0 16px 24px -2px rgba(147, 203, 230, 0.5)'
  }
}

process.on('unhandledRejection', (reason, p) => {
  throw reason
})

ReactDOM.render(
  <Container>
    <StyletronProvider value={engine}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={history}>
            <StyleReset />
            <App />
          </Router>
        </Provider>
      </ThemeProvider>
    </StyletronProvider>
  </Container>,
  document.getElementById('app')
)
