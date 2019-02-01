import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Navbar from './navbar'
import HomeStage from './home-stage'
import Board from './board'
import Rat from './rat'
import {withTheme} from '@material-ui/core/styles'

class UserHome extends Component {
  render() {
    const {email, stage, problem, theme} = this.props

    // getting current state and number of solved problems for rat
    const currentStage = stage.id
    const ratPosition = problem.solvedProblems[currentStage]
      ? problem.solvedProblems[currentStage].problems.length
      : 0
    return (
      <Fragment>
        <Navbar email={email} />
        <div id="board-wrapper">
          <div id="rat-board-state">
            <Rat />
          </div>
          <div id="board-01">
            <Board />
          </div>
          <div className="stage" id="stage-box-01">
            <HomeStage stageInHome={1} problem={this.props.problem} />
          </div>
          <div className="stage" id="stage-box-02">
            <HomeStage stageInHome={2} problem={this.props.problem} />
          </div>
          <div className="stage" id="stage-box-03">
            <HomeStage stageInHome={3} problem={this.props.problem} />
          </div>
        </div>
      </Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    stage: state.stage,
    problem: state.problem
  }
}

export default connect(mapState)(withTheme()(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
