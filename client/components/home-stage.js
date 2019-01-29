import React, {Fragment} from 'react'
import withStageInfo from './stage-info'

const HomeStage = props => {
  const {id, name, goal} = props.stage
  const {solvedProblems} = props.problem
  let styles = {
    width: '400px',
    height: '100px',
    backgroundColor: '#f48fb1'
  }
  return (
    <Fragment>
      <div style={styles}>
        <h1>{`Stage ${id}: ${name}`}</h1>
        <h2>{`${solvedProblems[id].length}/${goal}`}</h2>
      </div>
    </Fragment>
  )
}

export default withStageInfo(HomeStage)
