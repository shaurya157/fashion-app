import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
// import { SuspenseWithPerf } from 'reactfire'
// import LoadingSpinner from 'components/LoadingSpinner'
import styles from './ProfilePage.styles'
import { useParams } from 'react-router-dom'
import {usePostsList, useUserDetails } from 'utils/databaseUtils'
import { useDatabase, useDatabaseObject, useUser } from 'reactfire'
import { USERS_COLLECTION } from 'constants/firebasePaths'
import ProfileInfo from '../ProfileInfo'
import ProfileTab from '../ProfileTab'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(styles)

function ProfilePage() {
  const classes = useStyles()
  const { profileId } = useParams()
  const database = useDatabase()
  const { posts } = usePostsList(profileId)
  const {profile} = useUserDetails();

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={10} className={classes.gridItem}>
        <Paper className={classes.pane}>
          <ProfileInfo user={profile} posts={posts}/>
          <ProfileTab user={profile} posts={posts}/>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ProfilePage
