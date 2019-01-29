import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withTheme} from '@material-ui/core/styles'
import BoardStage from './board-stage'

/**
 *
 * COMPONENT
 */
export const UserHome = props => {
  const {email, theme} = props

  const hStyle = {
    color: theme.palette.primary.light
  }
  //make sure to pass email props into stage-info
  return (
    <Fragment>
      <div>
        <h3 style={hStyle}>Welcome, {email}</h3>
      </div>
      <div>
        <BoardStage />
      </div>
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
