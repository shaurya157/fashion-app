import { loadable } from 'utils/router'

export default {
  path: ':profileId',
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'Project' */ './components/ProfilePage')
  )
}
