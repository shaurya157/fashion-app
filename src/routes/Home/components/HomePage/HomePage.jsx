import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import styles from './HomePage.styles'
import { useAllPostsList } from 'utils/databaseUtils'
import PostsDisplay from 'components/PostsDisplay'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import Card from '@material-ui/core/Card'
const useStyles = makeStyles(styles)

function Home() {
  const classes = useStyles()
  let { posts } = useAllPostsList();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

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

export default Home
