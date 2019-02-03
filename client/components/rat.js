import React, {Fragment, Component} from 'react'
import withBoardProgress from './board-progress'
import {TweenMax, SteppedEase} from 'gsap/all'

class Rat extends Component {
  constructor() {
    super()
    this.rat = null
    this.ratTween = null
  }

  componentDidMount() {
    this.ratTween = TweenMax.to('.character', 1.5, {
      repeat: -1,
      backgroundPosition: '-3600px',
      ease: SteppedEase.config(18)
    })
  }

  componentDidUpdate() {
    const positions = {
      '00': {x: '25px', y: '250px', opacity: 0},
      '01': {x: '110px', y: '250px', opacity: 100},
      '02': {x: '190px', y: '275px', opacity: 100},
      '03': {x: '290px', y: '300px', opacity: 100}, // real 03
      // '03': {x: '425px', y: '238px', opacity: 100, transform: 'scaleX(-1)'},
      '04': {x: '363px', y: '273px', opacity: 100}, //
      '05': {x: '425px', y: '238px', opacity: 100}, //
      '06': {x: '390px', y: '180px', opacity: 100}, //
      '07': {x: '190px', y: '275px', opacity: 100, transform: 'scaleX(-1)'},
      '08': {x: '190px', y: '275px', opacity: 100, transform: 'scaleX(-1)'},
      '09': {x: '190px', y: '275px', opacity: 100, transform: 'scaleX(-1)'},
      '10': {x: '190px', y: '275px', opacity: 100, transform: 'scaleX(-1)'},
      '11': {x: '190px', y: '275px', opacity: 100, transform: 'scaleX(-1)'},
      '12': {x: '190px', y: '275px', opacity: 100, transform: 'scaleX(-1)'},
      '13': {x: '190px', y: '275px', opacity: 100, transform: 'scaleX(-1)'},
      '14': {x: '190px', y: '275px', opacity: 100, transform: 'scaleX(-1)'},
      '15': {x: '190px', y: '275px', opacity: 100, transform: 'scaleX(-1)'}
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
