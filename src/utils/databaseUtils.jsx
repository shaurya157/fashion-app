import { useNotifications } from 'modules/notification'
import { useDatabaseObject, useDatabase, useUser, useDatabaseList, useStorage } from 'reactfire'
import { POSTS_COLLECTION, TAGS_COLLECTION, USERS_COLLECTION } from 'constants/firebasePaths'
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
  let postsSnapshot = useDatabaseList(postsRef)
  let posts = []
  postsSnapshot.map(({ snapshot }, ind) => {
    let tempObj = snapshot.val();
    tempObj.postId = snapshot.key;
    posts.push(tempObj);
  });

  return { posts }
}

export function useAllPostsList() {
  const { showSuccess, showError } = useNotifications()

  // Create a ref for posts owned by the current user
  const database = useDatabase()
  const postsRef = database
    .ref(POSTS_COLLECTION)
    .orderByChild('createdBy')

  // Query for posts (loading handled by Suspense in PostsList)
  let postsSnapshot = useDatabaseList(postsRef)
  let posts = []
  postsSnapshot.map(({ snapshot }, ind) => {
    let tempObj = snapshot.val();
    tempObj.postId = snapshot.key;
    posts.push(tempObj);
  });

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
    var newTags = {}
    //formats tags for firebase
    if(newInstance.tags !== "") {
      let tags = newInstance.tags.split(",");

      tags.forEach((tag) => {
        newTags[tag.trim()] = true;
      })

      newInstance.tags = newTags
    }

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
           createdBy: auth.displayName,
           imageUrl: fireBaseUrl,
           createdAt: Date.now()
         })
         .then(() => {
           toggleDialog()
           showSuccess('Post added successfully')
         })
         .catch((err) => {
           console.error('Error:', err) // eslint-disable-line no-console
           showError(err.message || 'Could not add post')
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

export function useSearchByTag(tag) {
  const database = useDatabase()
  const postsRef = database
  .ref(POSTS_COLLECTION)
  .orderByChild(`${TAGS_COLLECTION}/${tag}`)
  .equalTo(true)

  let postsSnapshot = useDatabaseList(postsRef)
  let posts = []
  postsSnapshot.map(({ snapshot }, ind) => {
    let tempObj = snapshot.val();
    tempObj.postId = snapshot.key;
    posts.push(tempObj);
  });

  return { posts }
}

export function usePostLike() {
  const { showSuccess, showError } = useNotifications()
  const auth = useUser()
  const database = useDatabase()

  function addLike(postId, userId, likeId) {
    const likesRef = database.ref(`${POSTS_COLLECTION}/${postId}/likes`)
    const profileLikesRef = database.ref(`${USERS_COLLECTION}/${userId}/likes`)
    likesRef.transaction(function(likes) {
        return (likes || 0) + 1
    })

    let data = {}
    data[postId] = true

    if(likeId) {
      const likeRef = database.ref(`${USERS_COLLECTION}/${userId}/likes/${likeId}`);
      likeRef.set(data).then(() => {
        showSuccess('Like added successfully')
      })
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not add Like')
        return Promise.reject(err)
      })
    } else {
      profileLikesRef.push(data)
      .then(() => {
        showSuccess('Like added successfully')
      })
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not add Like')
        return Promise.reject(err)
      })
    }
  }

  function removeLike(postId, userId, likeId) {
    const likesRef = database.ref(`${POSTS_COLLECTION}/${postId}/likes`)
    const profileLikesRef = database.ref(`${USERS_COLLECTION}/${userId}/likes/${likeId}`)
    likesRef.transaction(function(likes) {
        return (likes || 0) - 1
    })

    let data = {}
    data[postId] = false

    profileLikesRef.update(data)
    .then(() => {
      showSuccess('Like deleted successfully')
    })
    .catch((err) => {
      console.error('Error:', err) // eslint-disable-line no-console
      showError(err.message || 'Could not delete Like')
      return Promise.reject(err)
    })
  }

  return {addLike, removeLike}
}

export function useUserDetails() {
  const auth = useUser()
  const database = useDatabase()
  const profileRef = database.ref(`${USERS_COLLECTION}/${auth.uid}`)
  const profileSnap = useDatabaseObject(profileRef)
  const profile = profileSnap.snapshot.val()
  profile.displayName = profile.username
  profile.uid = auth.uid;

  let formattedLikes = []
  Object.keys(profile.likes).forEach(likeKey => {
    let tempLike = profile.likes[likeKey]
    tempLike.likeId = likeKey
    formattedLikes.push(tempLike)
  })

  profile.likes = formattedLikes
  return {profile}
}

export function useLikedPosts() {
  const database = useDatabase()
  const postsRef = database.ref(`${POSTS_COLLECTION}`)
  const postsSnap = useDatabaseObject(postsRef)

  // const postsRef = database
  //   .ref(POSTS_COLLECTION)
  //   .orderByChild('createdBy')
  //
  // // Query for posts (loading handled by Suspense in PostsList)
  // const posts = useDatabaseList(postsRef)


  function likedPosts(likeIds) {
    const result = []
    // Object.keys(posts).forEach(postKey => {
    //   let tempLike = profile.likes[likeKey]
    //   tempLike.likeId = likeKey
    //   formattedLikes.push(tempLike)
    // })

    postsRef.once("value", function(snapshot) {
      // debugger
        snapshot.forEach(function(childSnapshot) {
            if (likeIds.includes(childSnapshot.key)) {
              let tempObj = childSnapshot.val();
              tempObj.postId = childSnapshot.key;
              result.push(tempObj);
            }
        });
    });

    return result
  }

  return {likedPosts}
}
