import React, {Fragment, Component} from 'react'
import {TweenMax, SteppedEase} from 'gsap/all'

var M1 = TweenMax.to('.character', 1, {
  repeat: -1,
  backgroundPosition: '-2400px',
  ease: SteppedEase.config(16)
})

class Rat extends Component {
  constructor() {
    super()
    this.rat = null
    this.ratTween = null
  }

  componentDidMount() {
    this.ratTween = TweenMax.to('.character', 1, {
      repeat: -1,
      backgroundPosition: '-2400px',
      ease: SteppedEase.config(16)
    })
  }

  render() {
    return (
      <Fragment>
        {/* <div ref={(div) => {this.rat = div}}>Rat</div> */}
        <div
          className="character"
          ref={div => {
            this.rat = div
          }}
        >
          Rat
        </div>
      </Fragment>
    )
  }
}

export default Rat
