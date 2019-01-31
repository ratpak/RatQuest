import React, {Fragment} from 'react'
import HomeStage from './home-stage'
import {Link} from 'react-router-dom'

const BoardStage = props => {
  let styles = {
    width: '400px',
    height: '300px',
    backgroundColor: 'pink',
    textAlign: 'center'
  }
  const {problem} = props
  return (
    <Fragment>
      <div style={styles}>
        <HomeStage />
        <button type="button">
          <Link to={`/sandbox/${problem.currentProblem.id}`}>Play</Link>
        </button>
      </div>
    </Fragment>
  )
}

export default BoardStage
