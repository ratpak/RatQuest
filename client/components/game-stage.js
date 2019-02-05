import React, {Fragment} from 'react'
import SandboxRat from './sandbox-rat'
import withStageInfo from './stage-info'

const GameStage = props => {
  const displayInfo = props.displayInfo

  return (
    <Fragment>
      <div className="sandbox-stage">
        <h3>{`Stage ${displayInfo.id}: ${displayInfo.name} ${
          displayInfo.progress
        }/${displayInfo.goal}`}</h3>
        <div className="sandbox-rat">
          <SandboxRat />
        </div>
        <div className="simple-flex sandbox-progress-bar">
          <div className="sandbox-progress-circle" id="sandbox-progress-1" />
          <div className="sandbox-progress-circle" id="sandbox-progress-1" />
          <div className="sandbox-progress-circle" id="sandbox-progress-1" />
          <div className="sandbox-progress-circle" id="sandbox-progress-1" />
          <div className="sandbox-progress-circle" id="sandbox-progress-1" />
        </div>
      </div>
    </Fragment>
  )
}

export default withStageInfo(GameStage)
