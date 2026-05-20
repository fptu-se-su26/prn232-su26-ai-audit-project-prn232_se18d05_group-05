import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthGuard from './middleware/AuthGuard'
import ProtectedRoute from './middleware/ProtectedRoute'
import NotFoundPage from './pages/errors/NotFoundPage'
import { protectedRoutes, publicRoutes } from './routes/AppRoute'
import RoutePath from './routes/RoutePath'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.ROOT} element={<Navigate to={RoutePath.PORTAL} replace />} />

        {publicRoutes.map((route) => {
          const Page = route.component

          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.guestOnly ? <AuthGuard><Page /></AuthGuard> : <Page />}
            />
          )
        })}

        {protectedRoutes.map((route) => {
          const Page = route.component

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={route.roles}>
                  <Page />
                </ProtectedRoute>
              }
            />
          )
        })}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
