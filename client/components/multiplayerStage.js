import React, {Fragment, Component} from 'react'
import {TweenMax} from 'gsap'
import MsandboxRat from './msandbox-rat'

class MultiStage extends Component {
  constructor() {
    super()
    this.sandboxRatDiv = null
    this.sandboxRatDivTween = null
  }

  componentDidMount() {
    console.log('didmount?!')
    this.sandboxRatDivTween = TweenMax.to(this.sandboxRatDiv, 1, {
      x: 300,
      paused: true
    })
  }

  componentDidUpdate() {
    switch (this.props.displayInfo.progress) {
      case 1:
        return TweenMax.to(this.sandboxRatDivTween, 0.5, {progress: 0.12})
      case 2:
        return TweenMax.to(this.sandboxRatDivTween, 0.5, {progress: 0.24})
      case 3:
        return TweenMax.to(this.sandboxRatDivTween, 0.5, {progress: 0.38})
      case 4:
        return TweenMax.to(this.sandboxRatDivTween, 0.5, {progress: 0.56})
      case 5:
        return TweenMax.to(this.sandboxRatDivTween, 0.5, {progress: 1})
      default:
        return TweenMax.to(this.sandboxRatDivTween, 0.5, {progress: 0})
    }
  }

  render() {
    const displayInfo = this.props.displayInfo
    console.log('TCL: multiStage -> render -> displayInfo', displayInfo)

    return (
      <Fragment>
        <div className="sandbox-stage">
          <div className="simple-flex">
            <h3>
              <span className="progress-glow">{`${displayInfo.progress}`}</span>
              {` /`}
              <span className="progress-glow">{`${displayInfo.goal}`}</span>
            </h3>
          </div>
          <div className="simple-flex">
            <div
              className="sandbox-rat"
              ref={div => {
                this.sandboxRatDiv = div
              }}
            >
              <MsandboxRat />
            </div>
            <div className="simple-flex sandbox-progress-bar">
              {/* <div className="sandbox-progress-circle">1</div>
              <div className="sandbox-progress-circle">2</div>
              <div className="sandbox-progress-circle">3</div>
              <div className="sandbox-progress-circle">4</div>
              <div className="sandbox-progress-circle">5</div> */}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MultiStage
