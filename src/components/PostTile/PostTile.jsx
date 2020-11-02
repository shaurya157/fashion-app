import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import styles from './PostTile.styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { POSTS_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import { useHistory } from 'react-router-dom'
import { useDatabase } from 'reactfire'

const useStyles = makeStyles(styles)

function PostTile({ name, postId, showDelete }) {
  const classes = useStyles()
  const { showError, showSuccess } = useNotifications()
  const history = useHistory()
  const database = useDatabase()

  function goToPost() {
    return history.push(`${POSTS_PATH}/${postId}`)
  }

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

  return (
    <Paper className={classes.root}>
      <div className={classes.top}>
        <span className={classes.name} onClick={goToPost}>
          {name || 'No Name'}
        </span>
        {showDelete ? (
          <Tooltip title="delete">
            <IconButton onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </Paper>
  )
}


PostTile.propTypes = {
  postId: PropTypes.string.isRequired,
  showDelete: PropTypes.bool,
  name: PropTypes.string
}

PostTile.defaultProps = {
  showDelete: true
}

export default PostTile
