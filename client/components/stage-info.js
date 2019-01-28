import React, {Component} from 'react'
import {fetchStages} from '../store/stage'
import {connect} from 'react-redux'
import {compose} from 'redux'

const withStageInfo = WrappedComponent => {
  class StageInfo extends Component {
    async componentDidMount() {
      const userId = this.props.userId
      await this.props.fetchStages(userId)
    }

    render() {
      console.log(this.props.userId, '<<< userID in stage-info')
      // pass stage info into wrapped components as stage
      const stage = this.props.stage
      const userId = this.props.userId
      return userId ? <WrappedComponent stage={stage} /> : <div>loading</div>
    }
  }
  return StageInfo
}

// getting stage info from store to pass to wrapped components
const mapState = state => {
  return {
    stage: state.stage,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  fetchStages(userId) {
    return dispatch(fetchStages(userId))
  }
})

// use redux compose to make sure end export is function rather than class
// cannot wrap 'wrapped components' with class only with function
const composedWithStageInfo = compose(
  connect(mapState, mapDispatch),
  withStageInfo
)

export default composedWithStageInfo
