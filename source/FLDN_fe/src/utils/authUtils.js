import { jwtDecode } from 'jwt-decode'

const TOKEN_KEY = 'accessToken'

export function getAuthToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function removeAuthToken() {
  window.localStorage.removeItem(TOKEN_KEY)
}

export function checkTokenValidity(token = getAuthToken()) {
  if (!token) {
    return false
  }

  try {
    const decodedToken = jwtDecode(token)

    if (!decodedToken.exp) {
      return true
    }

    return decodedToken.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

// Temporary helper so the auth flow can be exercised before backend login is wired in.
export function createDevToken(role) {
  const header = { alg: 'none', typ: 'JWT' }
  const payload = {
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
  }

  const encode = (value) =>
    btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')

  return `${encode(header)}.${encode(payload)}.`
}
