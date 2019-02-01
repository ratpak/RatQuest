import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {setAvatar} from '../store'

let dummyData = [
  'https://robohash.org/1',
  'https://robohash.org/2',
  'https://robohash.org/3',
  'https://robohash.org/4',
  'https://robohash.org/5',
  'https://robohash.org/6',
  'https://robohash.org/7',
  'https://robohash.org/8',
  'http://www.strangehistory.net/blog/wp-content/uploads/2015/03/rat.jpg'
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
        <h1>select an avatar</h1>
        {dummyData.map(imgURL => {
          return (
            <Fragment key={imgURL}>
              <button onClick={e => this.handleClick(e, imgURL)}>HI</button>
              <img src={imgURL} />
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
