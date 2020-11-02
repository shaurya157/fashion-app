import { useNotifications } from 'modules/notification'
import { useDatabaseObject, useDatabase, useUser, useDatabaseList, useStorage } from 'reactfire'
import { POSTS_COLLECTION } from 'constants/firebasePaths'
import React, { useState } from 'react'
import {PROFILE_PATH} from 'constants/paths'

export function usePostsList(profileId) {
  const { showSuccess, showError } = useNotifications()
  // Get current user (loading handled by Suspense in PostsList)
  const auth = useUser()
  // Create a ref for posts owned by the current user
  const database = useDatabase()
  const postsRef = database
    .ref(POSTS_COLLECTION)
    .orderByChild('createdBy')
    .equalTo(profileId)

  // Query for posts (loading handled by Suspense in PostsList)
  const posts = useDatabaseList(postsRef)

  return { posts }
}

export function useSinglePost(postId) {
  // Create a ref for posts owned by the current user
  const database = useDatabase()
  const postsRef = database.ref(`${POSTS_COLLECTION}/${postId}`)

  // Query for posts (loading handled by Suspense in PostsList)
  const post = useDatabaseObject(postsRef).snapshot.val()

  return { post }
}

export function useNewPostCreation() {
  const { showSuccess, showError } = useNotifications()
  // Get current user (loading handled by Suspense in ProjectsList)
  const auth = useUser()
  const storage = useStorage();
  // Create a ref for projects owned by the current user
  const database = useDatabase()

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const [imageAsFile, setImageAsFile] = useState('')

  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function addPost(newInstance) {
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
         .ref(POSTS_COLLECTION)
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

  return { addPost, newDialogOpen, toggleDialog, uploadImage }
}

export function useNewCommentCreation(postId) {
  const { showSuccess, showError } = useNotifications()
  const auth = useUser()
  const database = useDatabase()

  function addComment(body) {
    const data = {
      description: body.description,
      userId: auth.uid,
      photoUrl: auth.photoURL,
      username: auth.displayName
    }
    const profileRef = database.ref(`${POSTS_COLLECTION}/${postId}/comments`)

    profileRef.push(data)
    .then(() => {
      showSuccess('Comment added successfully')
    })
    .catch((err) => {
      console.error('Error:', err) // eslint-disable-line no-console
      showError(err.message || 'Could not add comment')
      return Promise.reject(err)
    })
  }

  return { addComment }
}

export function useCommentsList(postId) {
  const database = useDatabase()
  const commentsRef = database.ref(`${POSTS_COLLECTION}/${postId}/comments`)

  const comments = useDatabaseObject(commentsRef).snapshot.val()
  return { comments }
}
