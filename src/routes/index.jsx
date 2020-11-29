import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from '../components/LoadingSpinner'
import { PrivateRoute } from '../utils/router'
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import AccountRoute from './Account'
import NotFoundRoute from './NotFound'
import ProfileRoute from './Profile'
import PostsRoute from './Posts'
import SearchRoute from './Search'
import HomeRoute from './Home'

// {/* eslint-disable-next-line react/jsx-pascal-case */}
// <Route exact path={Home.path} component={() => <Home.component />} />

export default function createRoutes() {
  return (
    <CoreLayout>
      <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="router-wait">
        <Switch>
          {
            /* Build Route components from routeSettings */
            [
              AccountRoute,
              SignupRoute,
              LoginRoute,
              ProfileRoute,
              PostsRoute,
              SearchRoute,
              HomeRoute,
              /* Add More Routes Here */
            ].map((settings) =>
              settings.authRequired ? (
                <PrivateRoute key={`Route-${settings.path}`} {...settings} />
              ) : (
                <Route key={`Route-${settings.path}`} {...settings} />
              )
            )
          }
          <Route component={NotFoundRoute.component} />
        </Switch>
      </SuspenseWithPerf>
    </CoreLayout>
  )
}
