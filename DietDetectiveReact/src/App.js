import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

// layouts and pages
import Main from './pages/Main'
import Monitor from './pages/Monitor'
import Recipes from './pages/Recipes'
import Interview from './pages/Interview'
import Account from './pages/Account'
import Login from './pages/Login'
import Register from './pages/Register'
import RootLayout from './layouts/RootLayout'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Main />} />
      <Route path="monitor" element={<Monitor />} />
      <Route path="recipes" element={<Recipes />} />
      <Route path="interview" element={<Interview />} />
      <Route path="account" element={<Account />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App