import Roles from './roles'
import { RouteNames } from './routeNames'

const routeConfig: { [key: string]: { [key: string]: string } } = {
  auth: {
    default: RouteNames.login,
    [RouteNames.register]: RouteNames.register,
    [RouteNames.login]: RouteNames.login
  },
  [Roles.user]: {
    default: RouteNames.home,
    [RouteNames.explore]: RouteNames.explore,
    [RouteNames.home]: RouteNames.home,
    [RouteNames.profile]: RouteNames.profile,
    [RouteNames.messages]: RouteNames.messages
  }
}

export default routeConfig
