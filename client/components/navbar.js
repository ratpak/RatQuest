import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Instructions from './instructions'
import Button from '@material-ui/core/Button'
import {withTheme, withStyles} from '@material-ui/core/styles'
import Music from './music'

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

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      openInstructions: false
    }
  }

  handleClick = () => {
    this.setState(prev => ({openInstructions: !prev.openInstructions}))
  }

  handleInstructions = () => {
    this.setState(prev => ({openInstructions: !prev.openInstructions}))
  }

  render() {
    const {handleClick, isLoggedIn, user, classes} = this.props
    return (
      <Fragment>
        <Instructions
          openInstructions={this.state.openInstructions}
          handleInstructions={this.handleInstructions}
        />
        <div className="navbar">
          <div className="simple-flex">
            <div id="avatar">
              <img src={`${user.avatarUrl}`} />
            </div>
            <div id="nav-info">
              <h1>Rat Quest</h1>
              <h5>Welcome, {user.email}</h5>
            </div>
          </div>

          {/* The navbar will show these links after you log in */}
          {isLoggedIn && (
            <Fragment>
              <div className="simple-flex">
                <div className="nav-game-links">
                  {/* <Link to="/home"> */}
                  <Button
                    varient="contained"
                    className={classes.button}
                    onClick={this.handleClick}
                  >
                    Instructions
                  </Button>
                  {/* </Link> */}
                </div>
                <div className="nav-game-links">
                  <Link to="/multiplayer">
                    <Button varient="contained" className={classes.button}>
                      Multiplayer Rat Race
                    </Button>
                  </Link>
                </div>
                {user.isAdmin && (
                  <div className="nav-game-links">
                    <Link to="/admin">
                      <Button varient="contained" className={classes.button}>
                        Admin
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
              <Music classes={classes} />
              <div>
                <a href="#" onClick={handleClick}>
                  <Button varient="contained" className={classes.button}>
                    Logout
                  </Button>
                </a>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(
  withTheme()(withStyles(styles)(Navbar))
)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
