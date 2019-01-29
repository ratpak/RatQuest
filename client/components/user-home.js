import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withTheme} from '@material-ui/core/styles'
import BoardStage from './board-stage'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import {nextStage} from '../store/stage'

/**
 *
 * COMPONENT
 */

function Transition(props) {
  return <Slide direction="up" {...props} />
}

export const UserHome = props => {
  const {user, theme} = props
  const [open, setOpen] = React.useState(false)
  console.log(props)
  if (
    props.problem.solvedProblems[user.stageId].problems.length ===
      props.stage.goal &&
    open === false
  ) {
    setOpen(true)
  }

  const hStyle = {
    color: theme.palette.primary.light
  }
  function handleClose() {
    setOpen(false)
  }
  //make sure to pass email props into stage-info
  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Stage {user.stageId} Complete!!
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yayyy
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <h3 style={hStyle}>Welcome, {user.email}</h3>
      </div>
      <div>
        <BoardStage />
      </div>
    </Fragment>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
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
