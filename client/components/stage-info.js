import React, {Component} from 'react'
import {fetchStages} from '../store/stage'
import {connect} from 'react-redux'
import {compose} from 'redux'

const withStageInfo = WrappedComponent => {
  class StageInfo extends Component {
    constructor() {
      super()
      // this.state = {
      //   id: 1,
      //   name: 'Stage 1',
      //   progress: 5,
      //   goal: 10 // we need goal in db to make calc when finished with stage
      // }
    }

    componentDidMount() {
      const userId = this.props.user.id
      console.log(this.props.user.id, '<<< this.props.user')
      this.props.fetchStages(userId) // make sure to pass
    }

    render() {
      // pass these into wrapped components as stage
      console.log(this.props, '<<< props in stage-info')
      const stage = this.props.stage
      return <WrappedComponent stage={stage} />
    }
  }
  return StageInfo
}

// getting stage info from store to pass to wrapped components
const mapState = state => {
  return {
    stage: state.stage.stages,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  fetchStages(userId) {
    return dispatch(fetchStages(userId))
  }
})

const composedWithStageInfo = compose(
  connect(mapState, mapDispatch),
  withStageInfo
)

export default composedWithStageInfo
// export default withStageInfo
