import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import HomeStage from './home-stage'
import Board from './board'

import {withTheme} from '@material-ui/core/styles'

/**
 *
 * COMPONENT
 */
export const UserHome = props => {
  const {email, theme} = props

  const hStyle = {
    color: theme.palette.primary.light
  }
  return (
    <Fragment>
      <div>
        <h3 style={hStyle}>Welcome, {email}</h3>
      </div>
      <div id="board-wrapper">
        <Board />
      </div>
      {/* <div>
        <HomeStage />
      </div> */}
    </Fragment>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(withTheme()(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
