import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {withTheme} from '@material-ui/core/styles'

/**
 *
 * COMPONENT
 */
export const UserHome = props => {
  const {email, theme} = props
  console.log('theme.............', theme)
  const hStyle = {
    color: theme.palette.primary.light
  }
  //theme.palette.primary.light
  return (
    <div>
      <h3 style={hStyle}>Welcome, {email}</h3>
    </div>
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
