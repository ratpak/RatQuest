import React, {Fragment, Component} from 'react'
import {TweenMax, SteppedEase} from 'gsap'

class SandboxRat extends Component {
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

  render() {
    return (
      <Fragment>
        <div
          className="character"
          ref={div => {
            this.rat = div
          }}
        />
      </Fragment>
    )
  }
}

export default SandboxRat
