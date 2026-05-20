import { Navigate } from 'react-router-dom'
import { ROLES } from '../middleware/roles'
import RoutePath from '../routes/RoutePath'
import { checkTokenValidity, getAuthToken } from '../utils/authUtils'
import { checkUserRole } from './AuthMiddleware'

function AuthGuard({ children }) {
  const token = getAuthToken()

  if (token && checkTokenValidity(token)) {
    if (checkUserRole(token, ROLES.ADMIN)) {
      return <Navigate to={RoutePath.ADMIN} replace />
    }

    return <Navigate to={RoutePath.DASHBOARD} replace />
  }

  return children
}

export default AuthGuard
