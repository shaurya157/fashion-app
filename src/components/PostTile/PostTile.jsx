import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import styles from './PostTile.styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { POSTS_PATH, PROFILE_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import { useHistory } from 'react-router-dom'
import { useDatabase, useUser } from 'reactfire'
import { useSinglePost, usePostLike, useUserDetails } from 'utils/databaseUtils'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles(styles)

function PostTile({ name, postId, showDelete }) {
  const classes = useStyles()
  const { showError, showSuccess } = useNotifications()
  const history = useHistory()
  const database = useDatabase()
  const {post} = useSinglePost(postId);
  const {addLike, removeLike} = usePostLike()
  const {profile} = useUserDetails()

  function goToPost() {
    return history.push(`${POSTS_PATH}/${postId}`)
  }

  function goToProfile() {
    return history.push(`${PROFILE_PATH}/${post.createdBy}`)
  }

  function sendAddLike() {
    let liked = checkLike();
    if(liked) {
      addLike(postId, profile.uid, liked.likeId)
    } else {
      addLike(postId, profile.uid)
    }
  }

  function sendRemoveLike() {
    removeLike(postId, profile.uid, checkLike().likeId)
  }

  function checkLike() {
    return profile.likes.find( like => {
      let key = Object.keys(like)[0]
      return key === postId
    })
  }

  let liked = checkLike()
  liked = liked && liked[postId]

  function deletePost() {
    return database
      .ref(`posts/${postId}`)
      .remove()
      .then(() => showSuccess('Post deleted successfully'))
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not delete post')
        return Promise.reject(err)
      })
  }

  let likeDislikeorDelete = (value) => {
    return (e) => {
      e.stopPropagation();
      if(value === "like") {
        sendAddLike();
      } else if (value === "dislike") {
        sendRemoveLike();
      } else {
        deletePost();
      }
    }
  }

  const styles = {
    imageContainer: {
        height: 250,
        backgroundImage: `url(${post.imageUrl})`,
        backgroundPosition: `center`,
        width: 250,
        cursor: 'pointer',
    }
  };

  return (
    <GridListTile key={postId} >
      <div style={styles.imageContainer} onClick={goToPost}>
      </div>
      <GridListTileBar
        onClick={goToProfile}
        style={{cursor: "pointer"}}
        title={post.description}
        subtitle={<span>by: {post.createdBy}</span>}
        actionIcon={
          !showDelete ? (
            liked ? (
              <IconButton name="like" onClick={likeDislikeorDelete("dislike")} aria-label={`info about ${post.description}`} className={classes.icon}>
                <FavoriteIcon style={{color:`white`}} />
              </IconButton>
            ) : (
              <IconButton onClick={likeDislikeorDelete("like")} aria-label={`info about ${post.description}`} className={classes.icon}>
                <FavoriteBorderIcon style={{color:`white`}} />
              </IconButton>
            )
          ) : (
            <IconButton onClick={likeDislikeorDelete("delete")}>
              <DeleteIcon style={{color:`white`}}/>
            </IconButton>
          )
        }
      />
    </GridListTile>
  )
}
// <Paper className={classes.root}>
//   <div className={classes.top}>
//     <span className={classes.name} onClick={goToPost}>
//       {name || 'No Name'}
//     </span>
//     {showDelete ? (
//       <Tooltip title="delete">
//         <IconButton onClick={deletePost}>
//           <DeleteIcon />
//         </IconButton>
//       </Tooltip>
//     ) : null}
//   </div>
// </Paper>



PostTile.propTypes = {
  postId: PropTypes.string.isRequired,
  showDelete: PropTypes.bool,
  name: PropTypes.string
}

PostTile.defaultProps = {
  showDelete: true
}

export default PostTile
