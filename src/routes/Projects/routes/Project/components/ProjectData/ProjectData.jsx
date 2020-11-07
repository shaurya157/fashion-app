import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useParams } from 'react-router-dom'
import { useDatabaseObject, useDatabase } from 'reactfire'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import { makeStyles } from '@material-ui/core/styles'
import styles from './ProjectData.styles'

const useStyles = makeStyles(styles)

function ProjectData() {
  const classes = useStyles()
  const { projectId } = useParams()
  console.log(projectId);
  const database = useDatabase()
  const projectRef = database.ref(`${PROJECTS_COLLECTION}/${projectId}`)

  const projectSnap = useDatabaseObject(projectRef)
  const project = projectSnap.snapshot.val()
  let dateCreated = new Date(project && project.createdAt)
  return (
    <Card>
      <CardMedia
          className={classes.media}
          image={project.imageUrl}
          title={project.name}
      />
      <CardContent>
        <Typography component="h1">
          {(project && project.name) || 'Project'}
        </Typography>
        <Typography>{projectId}</Typography>
        <Typography>Created By: {project && project.createdBy}</Typography>
        <Typography>Created At: {project && dateCreated.toLocaleDateString()}</Typography>
        {/* <div style={{ marginTop: '4rem' }}>
          <pre>{JSON.stringify(project, null, 2)}</pre>
        </div> */}
      </CardContent>
    </Card>
  )
}

export default ProjectData
