import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import { makeStyles } from '@material-ui/core/styles'
import styles from './PostsPage.styles'
import { renderChildren } from 'utils/router'
import PostRoute from 'routes/Posts/routes/Posts'

const useStyles = makeStyles(styles)

function PostsPage() {
  const match = useRouteMatch()
  const classes = useStyles()

  return (
    <Switch className={classes.root}>
      {/* Child routes */}
      {renderChildren([PostRoute])}
      {/* Main Route */}

    </Switch>
  )
}

export default PostsPage
