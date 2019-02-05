import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {setAvatar} from '../store'
import {Button} from '@material-ui/core'

let mouses = [
  '/images/mouses/basil.png',
  '/images/mouses/bianca.png',
  '/images/mouses/bernard.png',
  '/images/mouses/bojack.png',
  '/images/mouses/brain.png',
  '/images/mouses/brisby.png',
  '/images/mouses/emile.png',
  '/images/mouses/fievel.png',
  '/images/mouses/gadget.png',
  '/images/mouses/jerry.png',
  '/images/mouses/mighty.png',
  '/images/mouses/nibbles.png',
  '/images/mouses/pinky.png',
  '/images/mouses/ratatouille.png',
  '/images/mouses/speedy.png'
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
        <img src={this.props.user.avatarUrl} height="200px" width="200px" />
        <Button
          style={{backgroundColor: 'blue'}}
          onClick={() => {
            this.props.history.push('/home')
          }}
        >
          Confirm
        </Button>
        <h1>select an avatar</h1>
        {mouses.map(imgURL => {
          return (
            <Fragment key={imgURL}>
              {/* <button onClick={e => this.handleClick(e, imgURL)}>HI</button> */}
              <img
                src={imgURL}
                height="200px"
                width="200px"
                style={{cursor: 'pointer'}}
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
