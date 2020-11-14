import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useParams } from 'react-router-dom'
import { useDatabaseObject, useDatabase, useUser, useDatabaseList } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { POSTS_COLLECTION, PROJECTS_COLLECTION } from 'constants/firebasePaths'
import PostsDisplay from 'components/PostsDisplay'

function ProfileData() {
  const { profileId } = useParams()

  const database = useDatabase()
  const profileRef = database.ref(`${PROJECTS_COLLECTION}/${profileId}`)

  const profileSnap = useDatabaseObject(profileRef)
  const profile = profileSnap.snapshot.val()

  return (
    <CardContent>
      <Typography component="h2">
        {(profile && profile.name) || 'Project'}
      </Typography>
      <Typography>{profileId}</Typography>
      <div style={{ marginTop: '4rem' }}>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </CardContent>
  )
}

export default ProfileData
