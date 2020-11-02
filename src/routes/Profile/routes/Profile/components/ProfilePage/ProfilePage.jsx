import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
// import ProfileData from '../ProfileData'
import styles from './ProfilePage.styles'
import { useParams } from 'react-router-dom'
import PostsDisplay from 'components/PostsDisplay'
import {usePostsList} from 'utils/databaseUtils'

const useStyles = makeStyles(styles)

function ProfilePage() {
  const classes = useStyles()
  const { profileId } = useParams()

  const { posts } = usePostsList(profileId)

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="load-project">
          <PostsDisplay posts={posts}/>
        </SuspenseWithPerf>
      </Card>
    </div>
  )
}

export default ProfilePage
