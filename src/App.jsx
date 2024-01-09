import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App as Calculator } from './apps/calculator/App'
import { App as Pomodoro } from './apps/pomodoro/App'
import { App as QuoteMachine } from './apps/quote-machine/App'
import { Home } from './components/Home'
import { Layout } from './components/Layout'
import { PageTitle } from './components/PageTitle'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <PageTitle title='freeCodeCamp Projects' />
            <Home />
          </>
        )
      },
      {
        path: 'calculator',
        element: (
          <>
            <PageTitle title='Calculator' />
            <Calculator />
          </>
        )
      },
      {
        path: 'pomodoro',
        element: (
          <>
            <PageTitle title='Pomodoro Clock' />
            <Pomodoro />
          </>
        )
      },
      {
        path: 'quote-machine',
        element: (
          <>
            <PageTitle title='Quote Machine' />
            <QuoteMachine />
          </>
        )
      }
    ]
  }
])

export const App = () => <RouterProvider router={router} />
