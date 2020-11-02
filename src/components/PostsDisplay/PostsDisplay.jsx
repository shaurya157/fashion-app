import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './PostsDisplay.styles'
import PostTile from '../PostTile'
const useStyles = makeStyles(styles)

function PostsDisplay({posts}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
    {posts &&
      posts.map(({ snapshot }, ind) => {
        const post = snapshot.val()
        return (
          <PostTile
            key={`Project-${snapshot.key}-${ind}`}
            name={post && post.description}
            postId={snapshot.key}
          />
        )
      })}
    </div>
  )
}

export default PostsDisplay
