import React from 'react'
import {connect} from 'react-redux'
import {deleteUser, fetchUsers, toggleisAdmin, fetchAllProblems} from '../store'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

class Admin extends React.Component {
  componentDidMount() {
    this.props.getUsers()
    this.props.getProblems()
  }
  handleUserDelete = userId => {
    this.props.deleteUser(userId)
  }

  handleToggleisAdmin = userId => {
    this.props.toggleisAdmin(userId)
  }

  render() {
    const users = this.props.users.users
    const problems = this.props.problems
    let count = 77718177410473

    const imgStyle = {
      maxWidth: '100px',
      maxHeight: '100px',
      borderRadius: '10px'
    }

    const buttonStyle = {
      backgroundColor: 'lightGrey',
      margin: '3px'
    }

    return (
      <div>
        <h1 id="adminCenter">Admin page</h1>
        <h3>Edit/Delete Users</h3>

        {!users || users.length === 0 ? (
          <div>There are no users</div>
        ) : (
          <div className="simple-flex-problems adminCenter">
            {users.map(user => (
              <div key={user.id}>
                <div className="userCard">
                  <img src={user.avatarUrl} style={imgStyle} />
                  {user.email}

                  <Button
                    type="button"
                    onClick={() => this.handleUserDelete(user.id)}
                    style={buttonStyle}
                  >
                    Delete
                  </Button>
                  <Button
                    type="button"
                    style={buttonStyle}
                    onClick={() => this.handleToggleisAdmin(user.id)}
                  >
                    {user.isAdmin ? 'Admin' : 'Not Admin'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <h3> Edit/Disable Problems</h3>
        {!problems || !problems.length ? (
          <div>There are no problems</div>
        ) : (
          <div className="simple-flex-problems adminCenter">
            {problems.map(problem => (
              <div className="problemCard" key={count++}>
                <div>
                  {problem.id}. Descripton: {problem.description}
                </div>
                <div>Function Name: {problem.funcName} </div>
                <div>
                  Arguments:{' '}
                  {problem.arguments.map(arg => (
                    <span key={count++}> {arg}, </span>
                  ))}
                </div>
                <div>
                  Inputs:{' '}
                  {problem.inputs.map(input => (
                    <span key={count++}>
                      [{' '}
                      {input.map(item => <span key={count++}> {item}, </span>)}],{' '}
                    </span>
                  ))}
                </div>
                <div>
                  Outputs:
                  {/* {problem.outputs} */}
                  {problem.outputs.map(output => (
                    <span key={count++}> {output}, </span>
                  ))}
                </div>
                <div>Stage: {problem.stageId}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    problems: state.problem.allProblems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: userId => dispatch(deleteUser(userId)),
    toggleisAdmin: userId => dispatch(toggleisAdmin(userId)),
    getUsers: () => dispatch(fetchUsers()),
    getProblems: () => dispatch(fetchAllProblems())
  }
}

const ConnectedAdmin = connect(mapStateToProps, mapDispatchToProps)(Admin)
export default ConnectedAdmin
