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

function ProfileInfo({user, posts}) {
  const history = useHistory()
  const classes = useStyles()

  function numLikes() {
    let result = 0;
    user.likes.forEach(like => {
      if(like[Object.keys(like)[0]] && !like.temp){
        result++;
      }
    })

    return result;
  }

  numLikes()
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={4} lg={4} className={classes.pane}>
          <Avatar src={user.photoURL} className={classes.xlarge} />
        </Grid>
        <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
          <Typography variant="h5">{user.username}</Typography>
          <Typography variant="subtitle2">{`${posts.length} Posts `}</Typography>
          <Typography variant="subtitle2">{`${numLikes()} Likes `}</Typography>
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
