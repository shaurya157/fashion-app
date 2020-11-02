import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
// import ProfileData from '../ProfileData'
import styles from './PostPage.styles'
import { useParams } from 'react-router-dom'
import PostData from '../PostData'
import {useSinglePost} from 'utils/databaseUtils'
import {useNewCommentCreation, useCommentsList} from 'utils/databaseUtils'

const useStyles = makeStyles(styles)

function PostPage() {
  const classes = useStyles()
  const { postId } = useParams()
  const { post } = useSinglePost(postId)
  const { addComment } = useNewCommentCreation(postId)

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="load-project">
          <PostData post={post} onSubmit={addComment}/>
        </SuspenseWithPerf>
      </Card>
    </div>
  )
}

export default PostPage
