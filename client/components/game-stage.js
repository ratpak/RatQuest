import React, {Fragment} from 'react'
import withStageInfo from './stage-info'

const GameStage = props => {
  const displayInfo = props.displayInfo

  return (
    <Fragment>
      <div>
        <h1>{`Stage ${displayInfo.id}: ${displayInfo.name}`}</h1>
        <h2>{`${displayInfo.progress}/${displayInfo.goal}`}</h2>
      </div>
    </Fragment>
  )
}

export default withStageInfo(GameStage)
