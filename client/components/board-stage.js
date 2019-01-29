import React, {Fragment} from 'react'
import HomeStage from './home-stage'

const BoardStage = () => {
  let styles = {
    width: '400px',
    height: '300px',
    backgroundColor: 'pink',
    textAlign: 'center'
  }
  return (
    <Fragment>
      <div style={styles}>
        <HomeStage />
        <button>Play</button>
      </div>
    </Fragment>
  )
}

export default BoardStage
