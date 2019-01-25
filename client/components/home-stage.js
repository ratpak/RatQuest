import React, {Fragment} from 'react'
import withStageInfo from './stage-info'

const HomeStage = props => {
  const {id, name, progress, goal} = props.stage
  let styles = {
    width: '400px',
    height: '200px',
    backgroundColor: '#f48fb1'
  }
  return (
    <Fragment>
      <div style={styles}>
        <h1>{`Stage Number: ${id} ${name}`}</h1>
        <h2>{`${progress}/${goal}`}</h2>
      </div>
    </Fragment>
  )
}

export default withStageInfo(HomeStage)
// export default HomeStage
