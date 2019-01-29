import React, {Fragment} from 'react'
import withStageInfo from './stage-info'
import Button from '@material-ui/core/Button'

const HomeStage = props => {
  const {id, name, progress, goal} = props.stage
  // let styles = {
  //   width: '400px',
  //   height: '100px',
  //   backgroundColor: '#f48fb1'
  // }
  return (
    <Fragment>
      <div className="stage-info">
        <h3>STAGE</h3>
        <h1>{id}</h1>
        <p>{name}</p>
        <div className="flex">
          <h2>{`${progress}/${goal}`}</h2>
          <Button>Play</Button>
        </div>
      </div>
    </Fragment>
  )
}

export default withStageInfo(HomeStage)
