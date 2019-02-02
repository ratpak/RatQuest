import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Navbar from './navbar'
import HomeStage from './home-stage'
import Board from './board'
import Rat from './rat'
// import ratPositionFunc from '../utils/ratPosition'
// import {TweenLite} from 'gsap/all'
import {withTheme} from '@material-ui/core/styles'

class UserHome extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     boardPosition: '00',
  //     ratPosition: {
  //       x: '0px',
  //       y: '0px',
  //       opacity: 0,
  //       transform: ''
  //     }
  //   }
  // }

  // componentDidMount() {
  //   // setup current stage and number of solved problems for rat
  //   const currentStage = this.props.stage.id
  //   const currStageProgress = this.props.problem.solvedProblems[currentStage]
  //     ? this.props.problem.solvedProblems[currentStage].problems.length
  //     : 0

  //   // helper function to convert progress to double digit string to get gameboard step element by ID
  //   const playerProgressFunc = (curStage, progressWithinStage) => {
  //     const progress = progressWithinStage + (curStage - 1) * 5
  //     return progress < 10 ? '0' + progress.toString() : progress.toString()
  //   }
  //   const boardPosition = playerProgressFunc(currentStage, currStageProgress)
  //   const ratPosition = ratPositionFunc(boardPosition)

  //   this.setState({boardPosition, ratPosition})
  //   console.log('home mounted', this.props, this.state, '<<< home state')
  // }

  // componentDidUpdate () {
  //   document.getElementById('rat-board-state').style.left = this.state.ratPosition.x
  //   document.getElementById('rat-board-state').style.top = this.state.ratPosition.y
  //   document.getElementById('rat-board-state').style.opacity =
  //     this.state.ratPosition.opacity
  //   document.getElementById('rat-board-state').style.transform =
  //     this.state.ratPosition.transform
  // }

  render() {
    // console.log('home render', this.props, this.state, '<<<home state')
    // props
    // setup current stage and number of solved problems board
    // const currentStage = this.props.stage.id
    // // length of solvedProblems = how many problems solved in a stage
    // const currStageProgress = this.props.problem.solvedProblems[currentStage]
    //   ? this.props.problem.solvedProblems[currentStage].problems.length
    //   : 0
    // console.log(currStageProgress, '<<< currStageProgress')

    // // if (currentStage === 1 && currStageProgress === 0) {
    // //     const newGameBoardPositionElement = document.getElementById(`step-${this.state.boardPosition}`)
    // //     newGameBoardPositionElement.style.fill = '#ffff99'
    // //   } else {
    //     // helper function to convert progress to double digit string to get gameboard step element by ID
    //   const playerProgressFunc = (curStage, progressWithinStage) => {
    //     const progress = progressWithinStage + (curStage - 1) * 5
    //     return progress < 10 ? '0' + progress.toString() : progress.toString()
    //   }
    // // }
    // const boardPosition = playerProgressFunc(currentStage, currStageProgress)

    const {email, problem, theme} = this.props
    return (
      <Fragment>
        <Navbar email={email} />
        <div id="board-wrapper">
          <div id="rat-board-state">
            <Rat />
          </div>
          <div id="board-01">
            {/* <Board boardPosition={this.state.boardPosition} /> */}
            <Board
              stage={this.props.stage}
              problem={this.props.problem}
              // boardPosition={boardPosition}
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
