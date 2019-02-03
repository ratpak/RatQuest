import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import withStageInfo from './stage-info'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
    color: 'blue'
  },
  input: {
    display: 'none'
  }
})

const HomeStage = props => {
  const {displayInfo, classes} = props
  return (
    <Fragment>
      <div className="stage-info">
        <h3>STAGE</h3>
        {displayInfo.id ? (
          <Fragment>
            <h1>{displayInfo.id}</h1>
            <p>{displayInfo.name}</p>
            <div className="flex">
              <h3>{`${displayInfo.progress} /${displayInfo.goal}`}</h3>
              <Button className={classes.button}>
                <Link to={`/sandbox/${displayInfo.userId}`}>Play</Link>
              </Button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h1>{displayInfo.stageInHome}</h1>
            <h2>
              {displayInfo.stageId > displayInfo.stageInHome
                ? 'COMPLETE'
                : 'LOCKED'}
            </h2>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default withStageInfo(withStyles(styles)(HomeStage))
