import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#c9ffff',
      main: '#96cff1',
      dark: '#649ebe',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffffcb',
      main: '#ffff99',
      dark: '#cacc69',
      contrastText: '#323232'
    }
  }
})

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
