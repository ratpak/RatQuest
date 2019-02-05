import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = props => {
  const {handleClick, isLoggedIn, user} = props
  return (
    <div className="navbar">
      <div className="simple-flex">
        <div id="avatar">
          <Link to="/avatar">
            <img src={`${user.avatarUrl}`} />
          </Link>
        </div>
        <div id="nav-info">
          <h1>Rat Quest</h1>
          <h5>Welcome, {user.email}</h5>
        </div>
      </div>

      {user.isAdmin && (
        <div>
          <Link to="/admin">Admin</Link>
        </div>
      )}
      {isLoggedIn && (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/multiplayer">Multiplayer</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
