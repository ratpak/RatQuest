import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom' // keep for possible Single Player | Rat Race links
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, email}) => (
  <div className="navbar">
    <div className="simple-flex">
      <div id="avatar" />
      <div id="nav-info">
        <h1>Rat Quest</h1>
        <h4>Welcome, {email}</h4>
      </div>
    </div>
    <nav>
      {isLoggedIn && (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/sandbox/1">tempPlay</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
