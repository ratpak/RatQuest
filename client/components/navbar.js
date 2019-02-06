import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Button from '@material-ui/core/Button'
import {withTheme, withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
    // background: '#bbdefb',
    background: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    boxShadow: theme.shadows[3],
    '&:hover': {
      background: theme.palette.secondary.main
    }
  }
})

const Navbar = props => {
  const {handleClick, isLoggedIn, user, classes} = props
  return (
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
              <Link to="/home">
                <Button varient="contained" className={classes.button}>
                  Rat Home
                </Button>
              </Link>
            </div>
            <div className="nav-game-links">
              <Link to="/multiplayer">
                <Button varient="contained" className={classes.button}>
                  Multi Rat Race
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
  )
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
