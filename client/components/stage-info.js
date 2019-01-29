import React, {Component} from 'react'
import {fetchStages} from '../store/stage'
import {fetchSolvedProblems} from '../store/problem'
import {connect} from 'react-redux'
import {compose} from 'redux'

const withStageInfo = WrappedComponent => {
  class StageInfo extends Component {
    async componentDidMount() {
      const userId = this.props.user.id
      await this.props.fetchStages(userId)
      await this.props.fetchSolvedProblems(userId)
    }

    render() {
      // pass stage info into wrapped components as stage
      const stage = this.props.stage
      const user = this.props.user
      const problem = this.props.problem
      return user ? (
        <WrappedComponent stage={stage} user={user} problem={problem} />
      ) : (
        <div>loading</div>
      )
    }
  }
  return StageInfo
}

// getting stage info from store to pass to wrapped components
const mapState = state => {
  return {
    stage: state.stage,
    user: state.user,
    problem: state.problem
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
const composedWithStageInfo = compose(
  connect(mapState, mapDispatch),
  withStageInfo
)

export default composedWithStageInfo
