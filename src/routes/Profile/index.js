import { loadable } from 'utils/router';
import { PROFILE_PATH as path } from 'constants/paths'

export default {
  path,
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'Profile' */ './components/ProfilePage'),
  ),
}
