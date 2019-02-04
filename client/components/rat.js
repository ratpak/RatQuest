import React, {Fragment, Component} from 'react'
import withBoardProgress from './board-progress'
import {TweenMax, SteppedEase, TweenLite} from 'gsap/all'
const plugins = [TweenMax, SteppedEase, TweenLite] // adding to file re possible tree shaking - failing travis build

class Rat extends Component {
  constructor() {
    super()
    this.rat = null
    this.ratTween = null
  }

  componentDidMount() {
    this.ratTween = TweenMax.to('.character', 1.5, {
      repeat: -1,
      backgroundPosition: '-1800px',
      ease: SteppedEase.config(18)
    })
  }

  componentDidUpdate() {
    const positions = {
      '00': {x: '70px', y: '344px', opacity: 0},
      '01': {x: '174px', y: '344px', opacity: 100},
      '02': {x: '248px', y: '373px', opacity: 100},
      '03': {x: '342px', y: '400px', opacity: 100},
      '04': {x: '432px', y: '372px', opacity: 100},
      '05': {x: '448px', y: '338px', opacity: 100},
      '06': {x: '438px', y: '282px', opacity: 100, transform: 'scaleX(-1)'},
      '07': {x: '402px', y: '245px', opacity: 100, transform: 'scaleX(-1)'},
      '08': {x: '360px', y: '204px', opacity: 100, transform: 'scaleX(-1)'},
      '09': {x: '386px', y: '165px', opacity: 100, transform: 'scaleX(-1)'},
      '10': {x: '436px', y: '130px', opacity: 100, transform: 'scaleX(-1)'},
      '11': {x: '312px', y: '110px', opacity: 100, transform: 'scaleX(-1)'},
      '12': {x: '213px', y: '93px', opacity: 100, transform: 'scaleX(-1)'},
      '13': {x: '135px', y: '68px', opacity: 100, transform: 'scaleX(-1)'},
      '14': {x: '162px', y: '35px', opacity: 100},
      '15': {x: '233px', y: '10px', opacity: 100}
    }

    const ratPositionFunc = function(boardPositionStr) {
      return positions[boardPositionStr]
    }

    if (this.props.boardPosition) {
      const ratPosition = ratPositionFunc(this.props.boardPosition)
      document.getElementById('rat-board-state').style.left = ratPosition.x
      document.getElementById('rat-board-state').style.top = ratPosition.y
      document.getElementById('rat-board-state').style.opacity =
        ratPosition.opacity
      document.getElementById('rat-board-state').style.transform =
        ratPosition.transform
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.boardPosition && (
          <div
            className="character"
            ref={div => {
              this.rat = div
            }}
          />
        )}
      </Fragment>
    )
  }
}

export default withBoardProgress(Rat)
