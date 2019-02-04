import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import withStageInfo from './stage-info'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
    // backgroundColor: '#ffee33'
    background: '#ffee33',
    color: '#4b4b4b',
    '&:hover': {
      background: 'linear-gradient(180deg, #ffee33 30%, #FF8E53 90%)',
      color: '#fff'
    }
  }
})

const HomeStage = props => {
  const {displayInfo, classes} = props
  return (
    <Fragment>
      <div className="stage-info">
        {displayInfo.id ? (
          <div>
            <h3>STAGE</h3>
            <h1>{displayInfo.id}</h1>
            <p>{displayInfo.name}</p>
            <div className="flex">
              <h3>{`${displayInfo.progress} / ${displayInfo.goal}`}</h3>
              <Link to={`/sandbox/${displayInfo.userId}`}>
                <Button
                  varient="contained"
                  className={classes.button}
                  size="small"
                >
                  Play
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div
            id={
              displayInfo.stageId > displayInfo.stageInHome
                ? 'complete'
                : 'locked'
            }
          >
            <h3>STAGE</h3>
            <h1>{displayInfo.stageInHome}</h1>
            <h2>
              {displayInfo.stageId > displayInfo.stageInHome
                ? 'COMPLETE'
                : 'LOCKED'}
            </h2>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default withStageInfo(withStyles(styles)(HomeStage))
// export default withStageInfo(HomeStage)
