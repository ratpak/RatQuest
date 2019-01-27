import React, {Fragment} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import HomeStage from './home-stage'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  //make sure to pass email props into stage-info
  return (
    <Fragment>
      <div>
        <h3>Welcome, {email}</h3>
      </div>
      <div>
        <HomeStage />
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
