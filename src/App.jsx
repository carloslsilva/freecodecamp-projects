import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App as Calculator } from './apps/calculator/App'
import { App as Pomodoro } from './apps/pomodoro/App'
import { Home } from './components/Home'
import { Layout } from './components/Layout'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'calculator',
        element: <Calculator />
      },
      {
        path: 'pomodoro',
        element: <Pomodoro />
      },
      {
        path: 'quote-machine',
        element: <h1>Quote Machine</h1>
      }
    ]
  }
])

export const App = () => <RouterProvider router={router} />
