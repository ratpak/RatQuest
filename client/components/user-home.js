import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Navbar from './navbar'
import HomeStage from './home-stage'
import Board from './board'

import {withTheme} from '@material-ui/core/styles'

/**
 *
 * COMPONENT
 */
export const UserHome = props => {
  const {email, theme} = props

  // const hStyle = {
  //   color: theme.palette.primary.light
  // }
  return (
    <Fragment>
      <Navbar email={email} />
      <div id="board-wrapper">
        <div id="board-01">
          <Board />
        </div>
        <div className="stage" id="stage-box-01">
          <HomeStage stageInHome={1} />
        </div>
        <div className="stage" id="stage-box-02">
          <HomeStage stageInHome={2} />
        </div>
        <div className="stage" id="stage-box-03">
          <HomeStage stageInHome={3} />
        </div>
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
    // stage: state.stage,
  }
}

export default connect(mapState)(withTheme()(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
