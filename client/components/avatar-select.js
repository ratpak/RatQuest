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
  constructor(props) {
    super(props)

    this.state = {url: props.user.avatarUrl}
  }

  handleClick = (e, imgURL) => {
    console.log('TCL: AvatarSelect -> handleClick -> imgURL', imgURL)
    this.setState({url: imgURL})
  }
  handleSubmit = async () => {
    await this.props.setAvatar(this.state.url, this.props.user.id)
    this.props.history.push('/home')
  }
  render() {
    console.log('TCL: AvatarSelect -> render -> this.props', this.props)
    return (
      <Fragment>
        <h2>current avatar </h2>
        <img src={this.state.url} height="200px" width="200px" />
        <br />
        <Button style={{backgroundColor: 'blue'}} onClick={this.handleSubmit}>
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
