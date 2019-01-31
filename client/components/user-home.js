import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Navbar from './navbar'
import HomeStage from './home-stage'
import Board from './board'
import {withTheme} from '@material-ui/core/styles'

// commenting out - looks like not using for pop-up anymore?
// import BoardStage from './board-stage'
// import Button from '@material-ui/core/Button'
// import Dialog from '@material-ui/core/Dialog'
// import DialogActions from '@material-ui/core/DialogActions'
// import DialogTitle from '@material-ui/core/DialogTitle'
// import Slide from '@material-ui/core/Slide'
// import {nextStage} from '../store/stage'

// commenting out - looks like not using for pop-up anymore?
// function Transition(props) {
//   return <Slide direction="up" {...props} />
// }

export const UserHome = props => {
  const {email, user, theme} = props

  // commenting out - looks like not using for pop-up anymore?
  // const [open, setOpen] = React.useState(false)
  // if (
  //   props.problem.solvedProblems[user.stageId].problems.length ===
  //     props.stage.goal &&
  //   open === false
  // ) {
  //   setOpen(true)
  // }

  // reactivate when settle on global styles in theme
  // const hStyle = {
  //   color: theme.palette.primary.light
  // }

  // commenting out - looks like not using for pop-up anymore?
  // function handleClose() {
  //   setOpen(false)
  // }

  return (
    <Fragment>
      <Navbar email={email} />
      <div id="board-wrapper">
        <div id="board-01">
          <Board />
        </div>
        <div className="stage" id="stage-box-01">
          <HomeStage stageInHome={1} problem={props.problem} />
        </div>
        <div className="stage" id="stage-box-02">
          <HomeStage stageInHome={2} problem={props.problem} />
        </div>
        <div className="stage" id="stage-box-03">
          <HomeStage stageInHome={3} problem={props.problem} />
        </div>
      </div>
    </Fragment>
  )
  //make sure to pass email props into stage-info
  // return (
  //   <Fragment>
  //     {/* <Dialog
  //       open={open}
  //       TransitionComponent={Transition}
  //       keepMounted
  //       onClose={handleClose}
  //       aria-labelledby="alert-dialog-slide-title"
  //       aria-describedby="alert-dialog-slide-description"
  //     >
  //       <DialogTitle id="alert-dialog-slide-title">
  //         Stage {user.stageId} Complete!!
  //       </DialogTitle>
  //       <DialogActions>
  //         <Button onClick={handleClose} color="primary">
  //           Yayyy
  //         </Button>
  //       </DialogActions>
  //     </Dialog> */}
  //     <div>
  //       <h3 style={hStyle}>Welcome, {user.email}</h3>
  //     </div>
  //     <div>
  //       <BoardStage problem={props.problem} />
  //     </div>
  //   </Fragment>
  // )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    stage: state.stage,
    problem: state.problem
  }
}

export default connect(mapState)(withTheme()(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
