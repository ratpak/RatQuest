import React, {Fragment} from 'react'
import withStageInfo from './stage-info'

const GameStage = props => {
  const {id, name, goal} = props.stage
  const {solvedProblems} = props.problem
  let styles = {
    width: '400px',
    height: '100px',
    backgroundColor: '#bbdefb'
  }
  console.log(solvedProblems)
  return (
    <Fragment>
      <div style={styles}>
        <h1>{`Stage ${id}: ${name}`}</h1>
        {solvedProblems[id] ? (
          <h2>{`${solvedProblems[id].problems.length}/${goal}`}</h2>
        ) : (
          <h2>{`0/${goal}`}</h2>
        )}
      </div>
    </Fragment>
  )
}

export default withStageInfo(GameStage)
