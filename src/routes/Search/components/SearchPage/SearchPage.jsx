import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import { makeStyles } from '@material-ui/core/styles'
import styles from './SearchPage.styles'
import { renderChildren } from 'utils/router'
import SearchRoute from 'routes/Search/routes/Search'
// import ProjectRoute from 'routes/Projects/routes/Project'
const useStyles = makeStyles(styles)

function SearchPage() {
  //Router for Search page. Subcomponents are the actual display components
  // const classes = useStyles()
  const match = useRouteMatch()

  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([SearchRoute])}
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

export default SearchPage
