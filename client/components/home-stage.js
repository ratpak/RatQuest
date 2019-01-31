import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import withStageInfo from './stage-info'
import Button from '@material-ui/core/Button'

const HomeStage = props => {
  const {id, name, progress, goal} = props.stage
  let styles = {
    width: '400px',
    height: '100px',
    backgroundColor: '#f48fb1'
  }

  const {displayInfo, problem} = props

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
              <Button>
                Play
                {/* <Link to={`/sandbox/${problem.currentProblem.id}`}>Play</Link>   */}
              </Button>
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
