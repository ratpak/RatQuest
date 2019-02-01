import React from 'react'
import {connect} from 'react-redux'
import {deleteUser, fetchUsers, toggleisAdmin, fetchAllProblems} from '../store'

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
    console.log('users--------', users)
    console.log('problem---------', problems)
    const imgStyle = {
      maxWidth: '100px',
      maxHeight: '100px',
      borderRadius: '10px',
      marginRight: '20px'
    }
    return (
      <div>
        <h1>Admin page</h1>
        <h3>Edit/Delete Users</h3>
        {!users ? (
          <div>There are no users</div>
        ) : (
          users.map(user => (
            <div key={user.id}>
              <img src={user.avatarUrl} style={imgStyle} />
              {user.email}
              {' -  '}
              <button
                type="button"
                onClick={() => this.handleUserDelete(user.id)}
              >
                &times;
              </button>
              <button
                type="button"
                onClick={() => this.handleToggleisAdmin(user.id)}
              >
                {user.isAdmin ? 'true' : 'false'}
              </button>
            </div>
          ))
        )}
        <h3> Edit/Disable Problems</h3>
        {!problems || !problems.length ? (
          <div>There are no problems</div>
        ) : (
          problems.map(problem => (
            <div key={problem.id}>
              <p>
                {problem.id}. Descripton: {problem.description}
              </p>
              <div>Function Name: {problem.funcName} </div>
              <p>
                Arguments:{' '}
                {problem.arguments.map(arg => (
                  <span key={problem.id + arg}> {arg}, </span>
                ))}
              </p>
              <p>
                Inputs:{' '}
                {problem.inputs.map(input => (
                  <span key={input}>
                    [{' '}
                    {input.map(item => (
                      <span key={input + item}> {item}, </span>
                    ))}],{' '}
                  </span>
                ))}
              </p>
              <p>
                Outputs:
                {/* {problem.outputs} */}
                {problem.outputs.map(output => (
                  <span key={output}> {output}, </span>
                ))}
              </p>
            </div>
          ))
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
