import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App as Calculator } from './apps/calculator/App'
import { App as Pomodoro } from './apps/pomodoro/App'
import { App as QuoteMachine } from './apps/quote-machine/App'
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
        element: <QuoteMachine />
      }
    ]
  }
])

export const App = () => <RouterProvider router={router} />
