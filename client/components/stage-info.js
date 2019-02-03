import React, {Component} from 'react'
import {fetchStages} from '../store/stage'
import {fetchSolvedProblems, fetchProblem} from '../store/problem'
import {connect} from 'react-redux'
import {compose} from 'redux'

const withStageInfo = WrappedComponent => {
  class StageInfo extends Component {
    componentDidMount() {
      const userId = this.props.user.id
      this.props.fetchStages(userId)
      this.props.fetchSolvedProblems(userId)
      this.props.fetchProblem(userId)
    }

    render() {
      const stageInHome = this.props.stageInHome // info for which stage box (home-stage) is being rendered (1, 2, or 3) on user-home
      const stage = this.props.stage // stage info from db
      let displayInfo

      // if for stage box (home-stage) for current stage || for game-stage give stage
      if (stageInHome === stage.id || !this.props.stageInHome) {
        stage.progress = this.props.problem[stage.id]
          ? this.props.problem[stage.id].problems.length
          : 0
        displayInfo = stage

        // else its for stage box (home-stage) for non-current stage on user-home
        // give stageInHomeInfo to set COMPLETE vs LOCKED display with stage.id
      } else {
        const stageInHomeInfo = {stageInHome, stageId: stage.id}
        displayInfo = stageInHomeInfo
      }
      displayInfo.userId = this.props.user.id
      return <WrappedComponent displayInfo={displayInfo} />
    }
  }
  return StageInfo
}

// getting stage info from store to pass to wrapped components
const mapState = state => {
  return {
    stage: state.stage,
    user: state.user,
    problem: state.problem.solvedProblems //object with keys for stage levels
  }
}

const mapDispatch = dispatch => ({
  fetchStages(userId) {
    return dispatch(fetchStages(userId))
  },
  fetchSolvedProblems(userId) {
    return dispatch(fetchSolvedProblems(userId))
  },
  fetchProblem(userId) {
    return dispatch(fetchProblem(userId))
  }
})

// use redux compose to make sure end export is function rather than class
// cannot wrap 'wrapped components' with class only with function
const composedWithStageInfo = compose(
  connect(mapState, mapDispatch),
  withStageInfo
)

export default composedWithStageInfo
