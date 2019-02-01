import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {setAvatar} from '../store'
import {Button} from '@material-ui/core'

let dummyData = [
  'https://robohash.org/1',
  'https://robohash.org/2',
  'https://robohash.org/3',
  'https://robohash.org/4',
  'https://robohash.org/5',
  'https://robohash.org/6',
  'https://robohash.org/7',
  'https://robohash.org/8'
]

class AvatarSelect extends Component {
  async handleClick(e, imgURL) {
    console.log('TCL: AvatarSelect -> handleClick -> imgURL', imgURL)
    await this.props.setAvatar(imgURL, this.props.user.id)
  }
  render() {
    console.log('TCL: AvatarSelect -> render -> this.props', this.props)
    return (
      <Fragment>
        <h2>current avatar </h2>
        <img src={this.props.user.avatarUrl} />
        <Button
          style={{backgroundColor: 'blue'}}
          onClick={() => {
            this.props.history.push('/home')
          }}
        >
          Confirm
        </Button>
        <h1>select an avatar</h1>
        {dummyData.map(imgURL => {
          return (
            <Fragment key={imgURL}>
              {/* <button onClick={e => this.handleClick(e, imgURL)}>HI</button> */}
              <img
                src={imgURL}
                style={{cursor: 'crosshair'}}
                onClick={e => this.handleClick(e, imgURL)}
              />
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
}
const mapState = state => ({user: state.user})
const mapDispatch = dispatch => ({
  setAvatar: (imgURL, userId) => dispatch(setAvatar(imgURL, userId))
})
export default connect(mapState, mapDispatch)(AvatarSelect)
