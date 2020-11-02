import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import { makeStyles } from '@material-ui/core/styles'
import styles from './ProfilePage.styles'
import { renderChildren } from 'utils/router'
import ProfileRoute from 'routes/Profile/routes/Profile'
// import ProjectRoute from 'routes/Projects/routes/Project'
const useStyles = makeStyles(styles)

function ProfilePage() {
  //Router for Profile page. Subcomponents are the actual display components
  // const classes = useStyles()
  const match = useRouteMatch()

  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([ProfileRoute])}
      {/* Main Route */}

    </Switch>
  )
}

// <Route
//   exact
//   path={match.path}
//   render={() => (
//     <SuspenseWithPerf
//       fallback={<LoadingSpinner />}
//       traceId="load-projects">
//       <ProjectsList />
//     </SuspenseWithPerf>
//   )}
// />

export default ProfilePage
