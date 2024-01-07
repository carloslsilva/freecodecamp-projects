import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Calculator } from './components/calculator'
import { Pomodoro } from './components/pomodoro'

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
