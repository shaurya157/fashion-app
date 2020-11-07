import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import styles from './ProfilePage.styles'
import ProfileInfo from '../ProfileInfo'
import ProfileTab from '../ProfileTab'
const useStyles = makeStyles(styles)

function ProfilePage() {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={10} md={8} lg={6} className={classes.gridItem}>
        <Paper className={classes.pane}>
          <ProfileInfo />
          <ProfileTab />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ProfilePage
