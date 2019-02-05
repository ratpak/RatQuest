import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Navbar from './navbar'
import HomeStage from './home-stage'
import Board from './board'
import Rat from './rat'
// import {withTheme} from '@material-ui/core/styles'

const UserHome = props => {
  const {user} = props
  return (
    <Fragment>
      <Navbar />
      <div id="board-wrapper">
        <div id="rat-board-state">
          <Link to={`/sandbox/${user.id}`}>
            <Rat />
          </Link>
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

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(UserHome)
