import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const Instructions = props => {
  return (
    <Dialog
      open={props.openInstructions}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleInstructions}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Rat Quest Instructions
      </DialogTitle>
      <DialogContent>
        Rat Quest is a JavaScript coding challenge game where the player takes
        on the roll of a lab rat working to escape the lab. The more problems
        the rat solves, the smarter she becomes and the closer she is to
        escaping through the rat hole. The primary game mode is single player.
        Work through three stages of javascript coding problems to escape the
        lab. Problems increase in difficulty with each stage. Multiplayer Rat
        Race mode is your opportunity to race other players to finish a set of
        problems first. Each player logs into the game separately. Join a room
        to race your rat friends in that room. May the best rat win!
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleInstructions} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Instructions
