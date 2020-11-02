import { loadable } from 'utils/router'

export default {
  path: ':postId',
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'Project' */ './components/PostPage')
  )
}
