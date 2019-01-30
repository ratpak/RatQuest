import React, {Fragment} from 'react'
import HomeStage from './home-stage'
import BoardGraphics from './board-graphics'

const Board = props => {
  return (
    <Fragment>
      {/* One strategy board in div - cumbersome for accessing svg elements
                <div id="board-background" /> */}

      {/* Another strategy work with SVG data in components */}
      {/* iterate over array of total levels with HomeStage??? Create dummy component that only displays if  current stage? */}
      <div id="stage-01">
        <HomeStage />
      </div>
      <BoardGraphics />
    </Fragment>
  )
}

export default Board
