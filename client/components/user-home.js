import React, {Fragment} from 'react'
import Navbar from './navbar'
import HomeStage from './home-stage'
import Board from './board'
import Rat from './rat'
import {withTheme} from '@material-ui/core/styles'

const UserHome = props => {
  const {theme} = props
  return (
    <Fragment>
      <Navbar />
      <div id="board-wrapper">
        <div id="rat-board-state">
          <Rat />
        </div>
        <div id="board-01">
          <Board />
        </div>
        <div className="stage" id="stage-box-01">
          <HomeStage stageInHome={1} />
        </div>
        <div className="stage" id="stage-box-02">
          <HomeStage stageInHome={2} />
        </div>
        <div className="stage" id="stage-box-03">
          <HomeStage stageInHome={3} />
        </div>
      </div>
    </Fragment>
  )
}

export default withTheme()(UserHome)
