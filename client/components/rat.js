import React, {Fragment, Component} from 'react'
import {TweenMax, SteppedEase} from 'gsap/all'

class Rat extends Component {
  constructor() {
    super()
    this.rat = null
    this.ratTween = null
  }

  componentDidMount() {
    this.ratTween = TweenMax.to('.character', 1, {
      repeat: -1,
      // repeat: 1,
      backgroundPosition: '-3600px',
      ease: SteppedEase.config(18)
    })
  }

  render() {
    return (
      <Fragment>
        <div
          // use wrapper in parent component to move rat in
          className="character"
          ref={div => {
            this.rat = div
          }}
        />
      </Fragment>
    )
  }
}

export default Rat
