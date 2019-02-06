import React from 'react'
import Button from '@material-ui/core/Button'
import {withTheme, withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    boxShadow: theme.shadows[3],
    '&:hover': {
      background: theme.palette.secondary.main
    }
  }
})

class Music extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      play: true
    }
    this.url =
      'https://soundimage.org/wp-content/uploads/2014/02/Winding-Down_Looping.mp3'
    this.bgm = new Audio(this.url)
    this.bgm.loop = true
    this.bgm.autoplay = true
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
  }

  play() {
    this.bgm.play()
    this.setState({play: true})
  }

  pause() {
    this.bgm.pause()
    this.setState({play: false})
  }

  render() {
    return (
      <div>
        {this.state.play ? (
          <Button
            varient="contained"
            className={this.props.classes.button}
            onClick={this.pause}
          >
            Pause BGM
          </Button>
        ) : (
          <Button
            varient="contained"
            className={this.props.classes.button}
            onClick={this.play}
          >
            Play BGM
          </Button>
        )}
      </div>
    )
  }
}

export default withTheme()(withStyles(styles)(Music))
