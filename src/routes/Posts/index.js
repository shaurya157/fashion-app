import { loadable } from 'utils/router';
import { POSTS_PATH as path } from 'constants/paths'

export default {
  path,
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'Posts' */ './components/PostsPage'),
  ),
}
