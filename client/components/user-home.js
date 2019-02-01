import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Navbar from './navbar'
import HomeStage from './home-stage'
import Board from './board'
import Rat from './rat'
// import {TweenLite} from 'gsap/all'
import {withTheme} from '@material-ui/core/styles'

class UserHome extends Component {
  constructor() {
    super()
    this.ratDiv = null
    this.ratDivTween = null

    // keep current board position in store??? need to test how  this work on refresh... or after solve problem
    this.state = {
      boardPosition: '00'
    }
  }

  componentDidMount() {
    // setup current stage and number of solved problems for rat
    const currentStage = this.props.stage.id
    const ratPosition = this.props.problem.solvedProblems[currentStage]
      ? this.props.problem.solvedProblems[currentStage].problems.length
      : 0

    // helper function to convert progress to double digit string to get gameboard step element by ID
    const playerProgressFunc = (curStage, progressWithinStage) => {
      const progress = progressWithinStage + (curStage - 1) * 5
      return progress < 10 ? '0' + progress.toString() : progress.toString()
    }
    const result = playerProgressFunc(currentStage, ratPosition)
    this.setState({boardPosition: result})
  }

  render() {
    console.log(this.state, '<<< state in user-home')
    // props
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
            <Rat />
          </div>
          <div id="board-01">
            <Board boardPosition={this.state.boardPosition} />
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
