import { Navigate, useLocation } from 'react-router-dom'
import RoutePath from '../routes/RoutePath'
import { checkUserRole } from './AuthMiddleware'
import { checkTokenValidity, getAuthToken } from '../utils/authUtils'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation()
  const token = getAuthToken()

  if (!token || !checkTokenValidity(token)) {
    return <Navigate to={RoutePath.LOGIN} replace state={{ from: location.pathname }} />
  }

  if (allowedRoles.length > 0 && !checkUserRole(token, allowedRoles)) {
    return <Navigate to={RoutePath.UNAUTHORIZED} replace />
  }

  return children
}

export default ProtectedRoute
