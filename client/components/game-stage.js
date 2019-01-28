import React, {Fragment} from 'react'
import withStageInfo from './stage-info'

const GameStage = props => {
  const {id, name, progress, goal} = props.stage
  let styles = {
    width: '400px',
    height: '100px',
    backgroundColor: '#bbdefb'
  }
  return (
    <Fragment>
      <div style={styles}>
        <h1>{`Stage ${id}: ${name}`}</h1>
        <h2>{`${progress}/${goal}`}</h2>
      </div>
    </Fragment>
  )
}

export default withStageInfo(GameStage)
