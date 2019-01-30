import React, {Fragment} from 'react'
import withStageInfo from './stage-info'
import Button from '@material-ui/core/Button'

const HomeStage = props => {
  const displayInfo = props.displayInfo
  return (
    <Fragment>
      <div className="stage-info">
        <h3>STAGE</h3>
        {displayInfo.id ? (
          <Fragment>
            <h1>{displayInfo.id}</h1>
            <p>{displayInfo.name}</p>
            <div className="flex">
              <h2>{`${displayInfo.progress} /${displayInfo.goal}`}</h2>
              <Button>Play</Button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h1>{displayInfo.stageInHome}</h1>
            <h2>
              {displayInfo.stageId > displayInfo.stageInHome
                ? 'COMPLETE'
                : 'LOCKED'}
            </h2>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default withStageInfo(HomeStage)
