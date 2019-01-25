import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import HomeStage from './home-stage'

// thunk call to grab stage info
// import {fetchStage} from '../store/stage'
// import {connect} from 'react-redux'

// change to dumb component when have store set up as don't need this on local state
const withStageInfo = (WrappedComponent, props) => {
  class StageInfo extends Component {
    constructor(props) {
      super()
      this.state = {
        id: 1,
        name: 'Stage 1',
        progress: 5,
        goal: 10 // we need goal in db to make calc when finished with stage
      }
    }

    // componentDidMount() {
    //     this.props.fetchStage(this.props.fetchStage(this.props.email)) // make sure to pass
    // }

    render() {
      // pass these into wrapped components as stage
      const stage = this.state
      return <WrappedComponent stage={stage} />
    }
  }
  return StageInfo
}

// getting stage info from store to pass to wrapped components
// const mapState = state => {
//     return {
//         stage: state.stage
//     }
// }

// map dispatch for fetchStage - assuming will use user email - better to have id
// const mapDispatch = dispatch => ({
//     fetchStage(email) {
//         return dispatch(fetchStage(email))
//     }
// })

export default withStageInfo
// export default connect(mapState, mapDispatch)(withStageInfo)
