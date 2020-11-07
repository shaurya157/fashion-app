import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import defaultUserImageUrl from 'static/User.png'
import styles from './ProfileInfo.styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(styles)

function ProfileInfo() {
  const history = useHistory()
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={4} lg={4} className={classes.pane}>
          <Avatar src={defaultUserImageUrl} className={classes.xlarge} />
        </Grid>
        <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
          <Typography variant="h5">Account Name</Typography>
          <Typography variant="span">{`${0} Posts `}</Typography>
          <Typography variant="span">{`${0} Likes `}</Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
          <Button variant="outlined" onClick={() => history.push('/account')}>
            Edit Profile
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfileInfo
