import { loadable } from 'utils/router';
import { SEARCH_PATH as path } from 'constants/paths'

export default {
  path,
  authRequired: true,
  component: loadable(() =>
    import(/* webpackChunkName: 'Search' */ './components/SearchPage'),
  ),
}
