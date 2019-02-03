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
    // format current stage and number of solved problems to pass to calc playerProgress
    // translate playerProgress into prev and current board position and pass as props to <Rat /> and <Board />
    // pass in identifier for stage level box and problem props into <HomeStage /> instances

    const currentStage = this.props.stage.id
    const currStageProgress = this.props.problem.solvedProblems[currentStage]
      ? this.props.problem.solvedProblems[currentStage].problems.length // length of solvedProblems = how many problems solved in a stage
      : 0

    // helper func - previous board spot - manipulating svg elements by id via this result
    const previousPlayerProgressFunc = (curStage, progressWithinStage) => {
      if (curStage === 1 && progressWithinStage === 0) {
        return '00'
      } else {
        const progress = progressWithinStage + (curStage - 1) * 5 - 1
        return progress < 10 ? '0' + progress.toString() : progress.toString()
      }
    }

    // helper func - new board spot - manipulating svg elements by id via this result
    const playerProgressFunc = (curStage, progressWithinStage) => {
      const progress = progressWithinStage + (curStage - 1) * 5
      return progress < 10 ? '0' + progress.toString() : progress.toString()
    }

    const prevBoardPosition = previousPlayerProgressFunc(
      currentStage,
      currStageProgress
    )
    const boardPosition = playerProgressFunc(currentStage, currStageProgress)

    const {email, problem, theme} = this.props
    return (
      <Fragment>
        <Navbar email={email} />
        <div id="board-wrapper">
          <div
            id="rat-board-state"
            ref={div => {
              this.ratDiv = div
            }}
          >
            <Rat boardPosition={boardPosition} />
          </div>
          <div id="board-01">
            <Board
              stage={this.props.stage}
              problem={this.props.problem}
              boardPosition={boardPosition}
              prevBoardPosition={prevBoardPosition}
            />
          </div>
          <div className="stage" id="stage-box-01">
            <HomeStage stageInHome={1} problem={problem} />
          </div>
          <div className="stage" id="stage-box-02">
            <HomeStage stageInHome={2} problem={problem} />
          </div>
          <div className="stage" id="stage-box-03">
            <HomeStage stageInHome={3} problem={problem} />
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
