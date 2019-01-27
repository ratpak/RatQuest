import React, {Fragment} from 'react'
import withStageInfo from './stage-info'

const HomeStage = props => {
  const {id, name, progress, goal} = props.stage
  let styles = {
    width: '400px',
    height: '200px',
    backgroundColor: '#f48fb1'
  }
  console.log(props, '<<< props in home-stage')
  return (
    <Fragment>
      <div style={styles}>
        <h1>Test</h1>
        <h1>{`Stage ${id}: ${name}`}</h1>
        <h2>{`${progress}/${goal}`}</h2>
      </div>
    </Fragment>
  )
}

export default withStageInfo(HomeStage)
