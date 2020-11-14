import { loadable } from 'utils/router'

export default {
  path: ':searchParam',
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'Project' */ './components/SearchPage')
  )
}
