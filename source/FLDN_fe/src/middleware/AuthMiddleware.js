import { jwtDecode } from 'jwt-decode'
import { getAuthToken } from '../utils/authUtils'

function extractUserRoles(decodedToken) {
  const schemaRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  const userRole = schemaRole ?? decodedToken.role ?? decodedToken.roles ?? null

  if (!userRole) {
    return []
  }

  return Array.isArray(userRole) ? userRole : [userRole]
}

/**
 * Middleware xac thuc va phan quyen nguoi dung.
 * - Kiem tra token xac thuc
 * - Kiem tra vai tro cua nguoi dung
 * - Cho phep hoac tu choi truy cap dua vao vai tro
 */
export function checkUserRole(token, requiredRoles) {
  if (!token) {
    return false
  }

  try {
    const decodedToken = jwtDecode(token)
    const userRoles = extractUserRoles(decodedToken)
    const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]

    return userRoles.some((role) => rolesArray.includes(role))
  } catch {
    return false
  }
}

export function hasRole(roleToCheck) {
  const token = getAuthToken()

  if (!token) {
    return false
  }

  try {
    return extractUserRoles(jwtDecode(token)).includes(roleToCheck)
  } catch {
    return false
  }
}

export function getUserRole() {
  const token = getAuthToken()

  if (!token) {
    return null
  }

  try {
    const roles = extractUserRoles(jwtDecode(token))
    return roles.length <= 1 ? (roles[0] ?? null) : roles
  } catch {
    return null
  }
}
