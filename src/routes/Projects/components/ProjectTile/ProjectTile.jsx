import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDatabase } from 'reactfire'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import { LIST_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import styles from './ProjectTile.styles'

const useStyles = makeStyles(styles)

function ProjectTile({ project, projectId, showDelete }) {
  const classes = useStyles()
  const history = useHistory()
  const { showError, showSuccess } = useNotifications()
  const database = useDatabase()

  function goToProject() {
    return history.push(`${LIST_PATH}/${projectId}`)
  }

  function deleteProject() {
    return database
      .ref(`projects/${projectId}`)
      .remove()
      .then(() => showSuccess('Project deleted successfully'))
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not delete project')
        return Promise.reject(err)
      })
  }
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={project.imageUrl}
          title={project.name}
          onClick={goToProject}
        />
      </CardActionArea>
      <CardContent >
        <Avatar src={""} />
        <Typography gutterBottom variant="p" component="h2">
            {project.name || 'No Name'}
          </Typography>
          <Typography color="textSecondary">
            {project.createdBy || 'No Name'}
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon /> 
        </IconButton>
        {showDelete ? (
          <Tooltip title="delete">
            <IconButton onClick={deleteProject}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </CardActions>
    </Card>
  )
}

ProjectTile.propTypes = {
  projectId: PropTypes.string.isRequired,
  showDelete: PropTypes.bool,
  project: PropTypes.object
}

ProjectTile.defaultProps = {
  showDelete: true
}

export default ProjectTile
