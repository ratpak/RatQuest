import React, {Component} from 'react'
import {fetchStages} from '../store/stage'
import {fetchSolvedProblems} from '../store/problem'
import {connect} from 'react-redux'
import {compose} from 'redux'

const withBoardProgress = WrappedComponent => {
  class BoardProgress extends Component {
    constructor() {
      super()
      this.previousPlayerProgressFunc = this.previousPlayerProgressFunc.bind(
        this
      )
      this.playerProgressFunc = this.playerProgressFunc.bind(this)
    }

    componentDidMount() {
      const userId = this.props.user.id
      this.props.fetchStages(userId)
      this.props.fetchSolvedProblems(userId)
    }

    // helper func - previous board spot - manipulating svg elements by id via this result
    previousPlayerProgressFunc(curStage, progressWithinStage) {
      if (curStage === 1 && progressWithinStage === 0) {
        return '00'
      } else {
        const progress = progressWithinStage + (curStage - 1) * 5 - 1
        return progress < 10 ? '0' + progress.toString() : progress.toString()
      }
    }

    // helper func - new board spot - manipulating svg elements by id via this result
    playerProgressFunc(curStage, progressWithinStage) {
      const progress = progressWithinStage + (curStage - 1) * 5
      return progress < 10 ? '0' + progress.toString() : progress.toString()
    }

    render() {
      // format current stage and number of solved problems to pass to calc playerProgress
      // translate playerProgress into prev and current board position and pass as props to <Rat /> and <Board />
      // pass in identifier for stage level box and problem props into <HomeStage /> instances
      const currentStage = this.props.stage.id
      const currStageProgress = this.props.solvedProblems[currentStage]
        ? this.props.solvedProblems[currentStage].problems.length // length of solvedProblems = how many problems solved in a stage
        : 0

      const prevBoardPosition = this.previousPlayerProgressFunc(
        currentStage,
        currStageProgress
      )
      const boardPosition = this.playerProgressFunc(
        currentStage,
        currStageProgress
      )

      return (
        <WrappedComponent
          prevBoardPosition={prevBoardPosition}
          boardPosition={boardPosition}
        />
      )
    }
  }
  return BoardProgress
}

// getting stage info from store to pass to wrapped components
const mapState = state => {
  return {
    stage: state.stage,
    user: state.user,
    solvedProblems: state.problem.solvedProblems //object with keys for stage levels
  }
}

const mapDispatch = dispatch => ({
  fetchStages(userId) {
    return dispatch(fetchStages(userId))
  },
  fetchSolvedProblems(userId) {
    return dispatch(fetchSolvedProblems(userId))
  }
})

// use redux compose to make sure end export is function rather than class
// cannot wrap 'wrapped components' with class only with function
const composedWithBoardProgress = compose(
  connect(mapState, mapDispatch),
  withBoardProgress
)

export default composedWithBoardProgress
