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
      backgroundPosition: '-1800px',
      ease: SteppedEase.config(18)
    })
  }

  componentDidUpdate() {
    const positions = {
      '00': {x: '70px', y: '344px', opacity: 0}, // done
      '01': {x: '174px', y: '344px', opacity: 100}, // done
      '02': {x: '248px', y: '373px', opacity: 100}, // done
      '03': {x: '342px', y: '400px', opacity: 100}, // done
      '04': {x: '495px', y: '344px', opacity: 100},
      // '04': {x: '426px', y: '372px', opacity: 100}, // done
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
