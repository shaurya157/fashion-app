import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './ProfilePage.styles'
import { renderChildren } from 'utils/router'
import ProfileRoute from 'routes/Profile/routes/Profile'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const useStyles = makeStyles(styles)

function ProfilePage() {
  const classes = useStyles()
  const match = useRouteMatch()

  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([ProfileRoute])}
      {/* Main Route */}

    </Switch>
  )
}

export default ProfilePage
