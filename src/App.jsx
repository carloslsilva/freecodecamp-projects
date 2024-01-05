import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>
      },
      {
        path: 'calculator',
        element: <h1>Calculator</h1>
      },
      {
        path: 'pomodoro',
        element: <h1>Pomodoro</h1>
      },
      {
        path: 'quote-machine',
        element: <h1>Quote Machine</h1>
      }
    ]
  }
])

export const App = () => <RouterProvider router={router} />
