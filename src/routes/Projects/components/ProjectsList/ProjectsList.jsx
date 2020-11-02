import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDatabase, useUser, useDatabaseList, useStorage } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsList.styles'

const useStyles = makeStyles(styles)

function useProjectsList() {
  const { showSuccess, showError } = useNotifications()
  // Get current user (loading handled by Suspense in ProjectsList)
  const auth = useUser()
  const storage = useStorage();
  // Create a ref for projects owned by the current user
  const database = useDatabase()
  const projectsRef = database
    .ref(PROJECTS_COLLECTION)
    .orderByChild('createdBy')
    .equalTo(auth?.uid)

  // Query for projects (loading handled by Suspense in ProjectsList)
  const projects = useDatabaseList(projectsRef)

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const [imageAsFile, setImageAsFile] = useState('')

  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function addProject(newInstance) {
    if(imageAsFile === '' ) {
      showError(`Please upload a valid image`)
    } else {
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      //initiates the firebase side uploading
      uploadTask.on('state_changed',
        (snapShot) => { console.log(snapShot) },
        (err) => { console.log(err) },
        () => {storage.ref('images').child(imageAsFile.name).getDownloadURL().then(fireBaseUrl => {
         return database
         .ref(PROJECTS_COLLECTION)
         .push({
           ...newInstance,
           createdBy: auth.uid,
           imageUrl: fireBaseUrl,
           createdAt: Date.now()
         })
         .then(() => {
           toggleDialog()
           showSuccess('Project added successfully')
         })
         .catch((err) => {
           console.error('Error:', err) // eslint-disable-line no-console
           showError(err.message || 'Could not add project')
           return Promise.reject(err)
         })
       })
     })
    }
  }

  function uploadImage(e) {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
  }

  return { projects, addProject, newDialogOpen, toggleDialog, uploadImage }
}

function ProjectsList() {
  const classes = useStyles()
  const {
    projects,
    addProject,
    newDialogOpen,
    toggleDialog,
    uploadImage
  } = useProjectsList()

  return (
    <div className={classes.root}>
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
        uploadImage={uploadImage}
      />
      <div className={classes.tiles}>
        <NewProjectTile onClick={toggleDialog} />
        {projects &&
          projects.map(({ snapshot }, ind) => {
            const project = snapshot.val()
            return (
              <ProjectTile
                key={`Project-${snapshot.key}-${ind}`}
                name={project && project.name}
                projectId={snapshot.key}
              />
            )
          })}
      </div>
    </div>
  )
}

export default ProjectsList
