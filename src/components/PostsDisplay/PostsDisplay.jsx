import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './PostsDisplay.styles'
import PostTile from '../PostTile'
import GridList from '@material-ui/core/GridList';

const useStyles = makeStyles(styles)

function PostsDisplay({posts, showDelete}) {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {posts &&
          posts.map((post, ind) => {
            // post.featured = true
            return (
              <PostTile showDelete={showDelete}
                key={`Project-${post.postId}-${ind}`}
                name={post && post.description}
                postId={post.postId}
              />
            )
        })}
      </GridList>
    </div>
  )
}

export default PostsDisplay
