import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import styles from './SearchPage.styles'
import { useParams } from 'react-router-dom'
import PostsDisplay from 'components/PostsDisplay'
import { useSearchByTag } from 'utils/databaseUtils'

const useStyles = makeStyles(styles)

function SearchPage() {
  const classes = useStyles()
  const { searchParam } = useParams()

  const { posts } = useSearchByTag(searchParam)

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="load-project">
          <PostsDisplay posts={posts} showDelete={false}/>
        </SuspenseWithPerf>
      </Card>
    </div>
  )
}

export default SearchPage
